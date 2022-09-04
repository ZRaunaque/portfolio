var gulp = require("gulp"),
  babel = require("gulp-babel"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  autoprefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify"),
  jshint = require("gulp-jshint"),
  header = require("gulp-header"),
  rename = require("gulp-rename"),
  cssnano = require("gulp-cssnano"),
  concatjs = require('gulp-concat'),
  sourcemaps = require("gulp-sourcemaps"),
  plumber = require("gulp-plumber"),
  package = require("./package.json");


gulp.task("customCss", function() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer("last 4 version"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("assets/css"))
    .pipe(cssnano())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("customSscripts", function() {
  gulp
    .src(["src/js/scripts.js"])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concatjs('script.js'))
    .pipe(plumber())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("assets/js"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest("assets/js"))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task("images", function() {
  gulp
    .src("src/img/**/*.*")
    .pipe(plumber())
    .pipe(gulp.dest("assets/img"));
});

gulp.task("fonts", function() {
  gulp
    .src("src/fonts/**/*.*")
    .pipe(plumber())
    .pipe(gulp.dest("assets/fonts"));
});

gulp.task("components", function() {
  gulp
    .src("src/components/**/*.*")
    .pipe(plumber())
    .pipe(gulp.dest("assets/components"));
});

gulp.task("browser-sync", function() {
  browserSync.init(null, {
    proxy: "localhost/portfolio"
  });
});

gulp.task("bs-reload", function() {
  browserSync.reload();
});

gulp.task(
  "default",
  ["customCss", "customSscripts", "images", "fonts", "components", "browser-sync"],
  function() {
    gulp.watch("src/scss/**/*", ["customCss"]);
    gulp.watch("src/js/**/*", ["customSscripts"]);
    gulp.watch("src/img/**/*", ["images"]);
    gulp.watch("src/fonts/**/*", ["fonts"]);
    gulp.watch("src/components/**/*.*", ["components"]);
    gulp.watch("**/*.html", ["bs-reload"]);
  }
);

// If required to give permission
var fs = require('fs');
if (1) fs.chmod = function (a, b, cb) {
    cb(0);
}