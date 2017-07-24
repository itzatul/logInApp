/// <binding AfterBuild='Dev' />
/// <reference path="typings/node/node.d.ts"/>

var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

var gulp = require('gulp'),
    browerSync = require("browser-sync"),
    sass = require('gulp-sass'),
    reload = browerSync.reload,
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyHTML = require('gulp-minify-html'),
    typeScript = require('gulp-typescript'),
    watch = require('gulp-watch'),
    inject = require('gulp-inject'),
    gulpIf = require('gulp-if'),
    replace = require('gulp-replace-task'),
    sourceMaps = require("gulp-sourcemaps"),
    config = require('./config/' + env),
    plumber = require("gulp-plumber"),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    runSequence = require('run-sequence'),
    del = require('del'),
    chmod = require('gulp-chmod'),
    spawn = require('child_process').spawn;

var filterByExtension = function (extension) {
    return filter(function (file) {
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};

var onError = function (err) {
    console.log(err);
};

var plumberSetting = {
    errorHandler: onError
};

gulp.task('clean',
    function (callback) {
        del(['build'], callback);
    });

gulp.task('update-ts-ref', function () {
    //moving out the typing file to a temp folder and making it writtable
    //this is not required in local dev env but required on build server
    //because on build server all the files become readonly
    gulp.src('typings/app.d.ts')
	.pipe(chmod(777))
	.pipe(gulp.dest('typingsTemp'));
    var target = gulp.src('typingsTemp/app.d.ts');
    var sources = gulp.src(['src/**/**/*.ts'], { read: false });
    return target.pipe(chmod(777)).pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="..' + filepath + '" />';
        }
    })).pipe(gulp.dest('typings'));
});

gulp.task('tinymce_files',
    function () {
        return gulp.src('bower_components/tinymce/{skins,themes,plugins}/**/*', { base: 'bower_components/tinymce' })
            .pipe(chmod(777))
            .pipe(gulp.dest(config.root + '/js'))
            .pipe(reload({ stream: true }));
    });

gulp.task('script_lib',
    ['tinymce_files'],
    function () {
        return gulp.src(config.assets.lib.js.concat(config.assets.lib.tinymce))
            .pipe(plumber(plumberSetting))
            .pipe(sourceMaps.init())
            .pipe(concat('lib.js'))
            .pipe(uglify())
            .pipe(sourceMaps.write('.'))
            .pipe(gulp.dest(config.root + "/js"))
            .pipe(reload({ stream: true }));
    });

gulp.task('script',
    ['script_lib'],
    function () {
        return gulp.src([
                '!src/**/interface/*.ts',
                'src/**/*Service.ts',
                'src/**/*Base*.ts',
                'src/**/*Controller*.ts',
                'src/**/!(*.Module)*.ts',
                'src/core/Core.Module.ts',
                'src/app/App.Module.ts'
        ])
            .pipe(plumber(plumberSetting))
            .pipe(sourceMaps.init())
            .pipe(typeScript())
            .once("error", function () {
                this.once("finish", () => process.exit(1));
            })
            .js
            // TODO: Don't do this
            .pipe(replace({
                patterns: [
                    {
                        match: 'LoginApi',
                        replacement: config.loginApi
                    }
                ]
            }))
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(sourceMaps.write('.'))
            .pipe(gulp.dest(config.root + "/js"))
            .pipe(reload({ stream: true }));
    });

gulp.task('images_components',
    function () {
        return gulp.src('src/app/components/**/*.{png,jpg}', { base: 'src/app/components' })
            .pipe(chmod(777))
            .pipe(gulp.dest(config.root + '/images/components'))
            .pipe(reload({ stream: true }));
    });

gulp.task('css_lib', function () {
    return gulp.src(config.assets.lib.css)
        .pipe(plumber(plumberSetting))
        .pipe(sourceMaps.init())
        .pipe(concat('lib.css'))
        //.pipe(cleanCss())
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(config.root + "/css"))
        .pipe(reload({ stream: true }));
});

gulp.task('sass',
    function () {
        return gulp
            .src(['./scss/[^_]*.scss', './src/app/{components,pages}/**/*.scss'])
            .pipe(sourceMaps.init())
            .pipe(sass())
            .pipe(concat('styles.css'))
            //.pipe(cleanCss())
            .pipe(sourceMaps.write('.'))
            .pipe(gulp.dest(config.root + '/css'));
    });

gulp.task('static', function () {
    return gulp.src('src/app/static/*.json')
      .pipe(gulp.dest(config.root + '/static'));
});

gulp.task('pages',
    function () {
        return gulp.src('src/app/pages/**/*.{png,jpg,html,css}', { base: 'src/app/pages' })
            .pipe(chmod(777))
            .pipe(gulp.dest(config.root + '/pages'))
            .pipe(reload({ stream: true }));
    });


gulp.task('html',
    function () {
        var normalizeTemplatePath = function(path) {
            return path
                .replace('src/app/templates', 'templates')
                .replace('src/app/components', 'templates/components')
                .replace('src/app/pages', 'templates/pages')
                .replace(/^\//i, '');
        };
        return gulp
            .src('./index.html')
            .pipe(chmod(777))
            .pipe(inject(
                gulp.src('src/app/{templates,components,pages}/**/*.html'),
                {
                    starttag: '<!-- inject:templates:html -->',
                    transform: function(filePath, file) {
                        return '<script type="text/ng-template" id="' +
                            normalizeTemplatePath(filePath) +
                            '">\n' +
                            file.contents.toString() +
                            '\n</script>';
                    }
                }
            ))
            .pipe(gulpIf(config.isProd, minifyHTML()))
            .pipe(gulp.dest(config.root));
    });

gulp.task('serve', function () {
    browerSync({
        server: {
            baseDir: config.root
        }
    });
});

gulp.task('serve', function () {
    browerSync({
        server: {
            baseDir: config.root
        }
    });
});

gulp.task('local_data',
    function () {
        gulp.src('local_data.json')
            .pipe(chmod(777))
            .pipe(gulp.dest(config.root));
        gulp.src('locations.json')
            .pipe(chmod(777))
            .pipe(gulp.dest(config.root));
        gulp.src('filter.json')
            .pipe(chmod(777))
            .pipe(gulp.dest(config.root));
        gulp.src('UserCard.json')
            .pipe(chmod(777))
            .pipe(gulp.dest(config.root));
        gulp.src('assigncard.json')
            .pipe(chmod(777))
            .pipe(gulp.dest(config.root));
        gulp.src('profile.json')
            .pipe(chmod(777))
            .pipe(gulp.dest(config.root));
        gulp.src('bower.json')
            .pipe(chmod(777))
            .pipe(gulp.dest(config.root));
    });


gulp.task('build', function () {
    return runSequence(
        ['update-ts-ref', 'local_data']
        , ['script','css_lib', 'sass', 'html']
        , 'static', 'pages', 'watch', 'serve'
        );
});
    
gulp.task('watch', function () {
    gulp.watch(['src/**/**/*.ts', "!src/app/common/*.ts"], ['script']);
    gulp.watch('src/**/**/*.ts', ['script']);
    gulp.watch('src/**/asset/styles/*', ['sass']);
    gulp.watch('src/**/asset/css/app/*', ['css_lib']);
    gulp.watch('src/**/templates/**/*.html', ['html']);
    gulp.watch('src/app/components/**/*.{png,jpg,html,css}', ['components']);
    gulp.watch('src/app/pages/**/*.{png,jpg,html,css}', ['pages']);
    gulp.watch('src/**/asset/image/**/*', ['images']);
    gulp.watch('index.html', ['html']);
});

gulp.task('default', ['clean'], function () {
    return runSequence(
    [
        'update-ts-ref', 'local_data', 'script', 'image', 'css_lib', 'sass', 'font',
        'html', 'watch', 'serve'
    ]);
});