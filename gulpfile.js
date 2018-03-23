'use strict'

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const path = require('path');
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const minifyCss = require("gulp-csso");
const rename = require("gulp-rename");
const del = require("del");
const run = require("run-sequence");
const server = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const gulplog = require("gulplog");
const gulpIf = require('gulp-if');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('webpack', function (callback) {
  
  let firstBuildReady = false;

  function done(err, stats) {
    firstBuildReady = true;
    if (err) {
      return;
    }
    gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
      colors: true
    }));
  }
  
  let options = {
    watch:   isDevelopment,
    devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
    entry: './src/main.js',
    output: {
      path: __dirname + 'build',
      publicPath: '/js/',
      filename: 'build.js'
    },
    module: {
      rules: [{
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader?name=[path][name].[ext]'
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map'
  }

  if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
  }

  return gulp.src('./src/main.js')
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'Webpack',
        message: err.message
      }))
    }))
    .pipe(webpackStream(options, null, done))
    .pipe(gulp.dest("build/js"))
    .on('data', function() {
      if (firstBuildReady) {
        callback();
      }
    });
});

gulp.task('html', function () {
  return gulp.src("src/index.html")
    .pipe(gulp.dest("build"));
});

gulp.task('style', function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minifyCss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("images", function () {
  return gulp.src("src/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("src/img"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copyImg", function () {
  return gulp.src([
      "src/img/**"
    ])
    .pipe(gulp.dest("build/img"));
});

gulp.task("copyFonts", function () {
  return gulp.src([
      "src/fonts/**/*.{woff,woff2}",
    ])
    .pipe(gulp.dest("build/fonts"));
});

gulp.task("serve", function () {
  server.init({
    server: "build"
  });
  server.watch('build/**/*.*').on('change', server.reload)
});

gulp.task('build',
  gulp.series(
    'clean',
    gulp.parallel(
      "copyImg",
      'copyFonts',
      'html',
      "style",
      'webpack'
    )
  )
);

gulp.task('dev',
  gulp.series(
    'build',
    gulp.parallel(
      'serve',
      function() {
        gulp.watch("src/sass/**/*.scss", gulp.series("style"));
        gulp.watch("src/index.html", gulp.series("html"));
      }
    )
  )
);