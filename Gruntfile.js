// Gruntfile.js

module.exports = function(grunt) {
    // This will load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({
        browserSync: {
            bsFiles: {
                src : 'styles/*.css'
            },
            options: {
                server: {
                    watchTask: true,
                    baseDir: "./"
                }
            }
        },
        postcss: {
            options: {
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'dist/css/maps/' // ...to the specified directory
                },

                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'styles/main.css'
            }
        },
        watch: {
            css: {
                files: '**/*.css',
                tasks: ['postcss'],
                options: {
                    livereload: true
                },
            },
        },
        concurrent: {
            target: {
                tasks: ['browserSync', 'watch']
            }
        }
    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    

    grunt.registerTask('default', ['postcss', 'concurrent']);
};