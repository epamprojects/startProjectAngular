var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    connectLivereload = require('connect-livereload'),
    concat = require('gulp-concat'),
    spritesmith = require('gulp.spritesmith'),
    sass = require('gulp-sass');

/*vendors*/
var directivesVendor = './src/js/directives/',
    stylesVendor ='./src/styles/',
    templatesVendor = './src/templates/';

var path = {
    'indexHtml': './src/*.html',

    /*templates*/
    "templates": templatesVendor +'*.html',

    /*directives*/
    "directivesPath": directivesVendor + '*.js',

    /*styles*/
    'styles':{
        'main_cssPath'  : stylesVendor + '*_main.css',
        'media_cssPath' : stylesVendor + '*_media.css',
        'main_sassPath' : stylesVendor + '*_main.scss',
        'media_sassPath': stylesVendor + '*_media.scss'
    }
};

var destVendor = './build/';

var compiledDist = {
    'css'              : destVendor +'styles',
    'angularDirectives': destVendor +'angularDirectives'
};

/**
 * init gulp server
 * */
gulp.task('connect', function () {
    connect.server({
        root: '',
        port: 8000,
        livereload: true
    });
});

/**
 * livereload index*/
gulp.task('indexHtml', function(){
    gulp.src(path.indexHtml)
        .pipe(connect.reload())
});

/**
 * livereload and build directives
 * */
gulp.task('build:directives', function(){
    gulp.src(path.directivesPath)
        .pipe(concat('buildDirectives.js'))
        .pipe(connect.reload())
        .pipe(gulp.dest(compiledDist.angularDirectives))
});

/**
 * livereload templates
 * */
gulp.task('watch:templates', function(){
    gulp.src(path.templates)
        .pipe(connect.reload())
});

/**
 * livereload and build  mainCss
 * */
gulp.task('build:main_css', function(){
    gulp.src(path.styles.main_cssPath)
        .pipe(concat('main.css'))
        .pipe(connect.reload())
        .pipe(gulp.dest(compiledDist.css))

});

/**
 * livereload and build mediaCss
 * */
gulp.task('build:media_css', function(){
    gulp.src(path.styles.media_cssPath)
        .pipe(concat('media.css'))
        .pipe(connect.reload())
        .pipe(gulp.dest(compiledDist.css))

});

/**
 * livereload and build mainScss
 * */
gulp.task('build:main_scss', function(){
    return gulp.src(path.styles.main_sassPath)
        .on('error', function(err){ console.log(err.message); })
        .pipe(sass())
        .on('error', function(err){ console.log(err.message); })
        .pipe(concat('mainSass.css'))
        .pipe(gulp.dest(compiledDist.css))
        .pipe(connect.reload())
});


/**
 * livereload and build mediaScss
 * */
gulp.task('build:media_scss', function(){
    return gulp.src(path.styles.media_sassPath)
        .on('error', function(err){ console.log(err.message); })
        .pipe(sass())
        .on('error', function(err){ console.log(err.message); })
        .pipe(concat('mediaSass.css'))
        .pipe(gulp.dest(compiledDist.css))
        .pipe(connect.reload())
});




gulp.task('watch', ['indexHtml',
                    'watch:templates',
                    'build:directives',
                    'build:main_css',
                    'build:media_css',
                    'build:main_scss',
                    'build:media_scss'], function () {
    /*livereload*/
    gulp.watch(path.indexHtml,             ['indexHtml']);
    gulp.watch(path.templates,             ['watch:templates']);

    /*livereload and build*/
    gulp.watch(path.directivesPath,        ['build:directives']);

    gulp.watch(path.styles.main_cssPath,   ['build:main_css']);
    gulp.watch(path.styles.media_sassPath, ['build:media_css']);

    gulp.watch(path.styles.main_sassPath,  ['build:main_scss']);
    gulp.watch(path.styles.media_sassPath, ['build:media_scss']);

});
/*sprite*/
gulp.task('sprite', function() {
    var spriteData =
        gulp.src('./src/img/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                /* cssTemplate: 'stylus.template.mustache',*/
                cssVarMap: function(sprite) {
                    sprite.name = 's' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('./build/images/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./build/styles/')); // путь, куда сохраняем стили
});

gulp.task('default',['connect', 'watch']);