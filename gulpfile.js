var gulp = require("gulp");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var jade = require("gulp-jade");
var watch = require("gulp-watch");
var browserify = require("browserify");
var jadeify = require("jadeify");
var watchify = require("watchify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var sourcemaps = require("gulp-sourcemaps");
var KarmaServer = require("karma").Server;

function browserifyBundler(setup) {
  var opts = {
    entries: [setup.input],
    debug: true,
    cache: {},
    packageCache: {},
    transform: [jadeify]
  };
  var b = browserify(opts);
  var w = watchify(b);

  var sourceMapsOpts = {
    loadMaps: true
  };

  function bundle() {
    return w.bundle()
    .on("error", gutil.log.bind(gutil, "Browserify Error"))
    .pipe(source(setup.output))
    .pipe(buffer())
    .pipe(sourcemaps.init(sourceMapsOpts))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(setup.dest));
  }

  w.on("update", bundle);
  w.on("log", gutil.log);

  return bundle;
};

gulp.task("sass", function() {
  return gulp.src("./app/app.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(gulp.dest("./dist/css/"))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
  .pipe(rename({ extname: ".min.css" }))
  .pipe(gulp.dest("./dist/css/"));
});

gulp.task("sass:watch", function() {
  watch(["./app/*.scss",
         "./app/**/*.scss",
         "./app/**/**/*.scss"], function() {
    gulp.src("./app/app.scss")
      .pipe(sass())
      .pipe(gulp.dest("./dist/css/"));
  });
});

gulp.task("html", function() {
  return gulp.src("./app/app.jade")
    .pipe(jade({
      pretty: true
    }))
    .pipe(rename("index.html"))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("html:watch", function() {
  watch("./app/**/*.jade", function() {
    gulp.run("html");
  });
});

gulp.task("js", function() {
  return gulp.src(["./app/*.js", "./app/**/*.js"])
    .pipe(concat("app.js"))
    .pipe(gulp.dest("./dist/js/"));
});

gulp.task("js:watch", browserifyBundler({
  input: "./app/app.js",
  output: "app.js",
  dest: "./dist/js/"
}));

gulp.task("karma", function (done) {
  new KarmaServer({
    configFile: __dirname + "/karma.conf.js",
    singleRun: false
  }, done).start();
});

gulp.task("watch", ["html:watch", "sass:watch", "js:watch"]);
