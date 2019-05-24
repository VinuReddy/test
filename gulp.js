
// gulp

var gulp = require("gulp");
var del = require("del");
var less = require("gulp-less");
var concat = require("gulp-concat");

//Temporary hack for running tasks sequentially. This will be fixed in gulp 4.0
//So this has to revisted in the future
var runSequence = require("run-sequence");

var paths = {
  associate: {
    root: "associate/src/main/",
    lessFiles: "styles/less/**/*.less",
    jsFiles: "scripts/",
    libFiles: "scripts/lib/",
    test: "/associate/src/test/"
  }
};

gulp.task("clean", function() {
  return del.sync([paths.associate.root + "public/*"]);
});

gulp.task("less", function() {
  return gulp
    .src(paths.associate.root + paths.associate.lessFiles)
    .pipe(less())
    .pipe(gulp.dest(paths.associate.root + "public/css"));
});

gulp.task("concat", function() {
  return gulp
    .src([
      paths.associate.root + "styles/main.css",
      paths.associate.root + "styles/general.css",
      paths.associate.root + "public/css/**/*.css"
    ])
    .pipe(concat("cvs-style.css"))
    .pipe(gulp.dest(paths.associate.root + "public/css"));
});

gulp.task("watch", function() {
  gulp.watch(
    [
      paths.associate.root + "styles/main.css",
      paths.associate.root + "styles/general.css",
      paths.associate.root + paths.associate.lessFiles,
      paths.associate.root + paths.associate.jsFiles + "/**/*.js"
    ],
    ["build-dev"]
  );
});

gulp.task("libjs-prod", function() {
  return gulp
    .src([
      paths.associate.root + paths.associate.libFiles + "angular.min.js",
      paths.associate.root + paths.associate.libFiles + "angular-filter.js",
      paths.associate.root + paths.associate.libFiles + "angular-resource.js",
      paths.associate.root + paths.associate.libFiles + "angular-cookies.js",
      paths.associate.root + paths.associate.libFiles + "angular-route.js",
      paths.associate.root + paths.associate.libFiles + "angular-ui-router.js",
      paths.associate.root +
        paths.associate.libFiles +
        "angular-sanitize.min.js",
      paths.associate.root +
        paths.associate.libFiles +
        "angular-utf8-base64.js",
      paths.associate.root + paths.associate.libFiles + "repeat-polyfill.js",
      paths.associate.root + paths.associate.libFiles + "ui-bootstrap.js",
      paths.associate.root + paths.associate.libFiles + "ui-bootstrap-tpls.js",
      paths.associate.root + paths.associate.libFiles + "main.js",
      paths.associate.root + paths.associate.libFiles + "mqtt.js",
      paths.associate.root + paths.associate.libFiles + "RetailPlatform.js",
      paths.associate.root + paths.associate.libFiles + "wecare.js"
    ])
    .pipe(concat("lib.js"))
    .pipe(gulp.dest(paths.associate.root + "public/js"));
});

gulp.task("libjs-dev", function() {
  return gulp
    .src([
      paths.associate.root + paths.associate.libFiles + "angular.min.js",
      paths.associate.root + paths.associate.libFiles + "angular-filter.js",
      paths.associate.root + paths.associate.libFiles + "angular-resource.js",
      paths.associate.root + paths.associate.libFiles + "angular-cookies.js",
      paths.associate.root + paths.associate.libFiles + "angular-route.js",
      paths.associate.root + paths.associate.libFiles + "angular-ui-router.js",
      paths.associate.root +
        paths.associate.libFiles +
        "angular-sanitize.min.js",
      paths.associate.root +
        paths.associate.libFiles +
        "angular-utf8-base64.js",
      paths.associate.root + paths.associate.libFiles + "repeat-polyfill.js",
      paths.associate.root + paths.associate.libFiles + "ui-bootstrap.js",
      paths.associate.root + paths.associate.libFiles + "ui-bootstrap-tpls.js",
      paths.associate.root + paths.associate.libFiles + "main.js",
      paths.associate.root + paths.associate.libFiles + "mqtt.js",
      paths.associate.root + paths.associate.libFiles + "RetailPlatformDbg.js",
      paths.associate.root + paths.associate.libFiles + "wecare.js"
    ])
    .pipe(concat("lib.js"))
    .pipe(gulp.dest(paths.associate.root + "public/js"));
});

gulp.task("wecarejs", function() {
  return gulp
    .src([
      paths.associate.root + paths.associate.jsFiles + "app.js",
      paths.associate.root + paths.associate.jsFiles + "config.js",
      paths.associate.root + paths.associate.jsFiles + "logger.js",
      paths.associate.root + paths.associate.jsFiles + "utils.js",
      paths.associate.root + paths.associate.jsFiles + "services/**/*.js",
      paths.associate.root + paths.associate.jsFiles + "controllers/**/*.js",
      paths.associate.root + paths.associate.jsFiles + "directives/**/*.js",
      paths.associate.root + paths.associate.jsFiles + "factories/**/*.js",
      paths.associate.root + paths.associate.jsFiles + "filters/**/*.js"
    ])
    .pipe(concat("cvs.js"))
    .pipe(gulp.dest(paths.associate.root + "public/js"));
});

gulp.task("build-dev", function(callback) {
  runSequence(
    "clean",
    "less",
    "concat",
    "libjs-dev",
    "wecarejs",
    "watch",
    callback
  );
});

gulp.task("dev", ["build-dev"]);

gulp.task("build", function(callback) {
  runSequence("clean", "less", "concat", "libjs-prod", "wecarejs", callback);
});
gulp.task("default", ["build"]);
