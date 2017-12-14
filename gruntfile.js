module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        sass: {
            dist: {
                options: { noCache: true, style: 'compressed', sourcemap: 'none'},
                files: [{
                    expand: true,
                    cwd: './src/public/assets/css',
                    src: ['**.scss', '!**/lib/'],
                    dest: './dist/public/assets/css',
                    ext: '.css'
                }]
            }
        },
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "./src/public",
                        src: ["**","!**/assets/css/lib/**",'!**/*.scss'],
                        dest: "./dist/public"
                    },
                    {
                        expand: true,
                        cwd: "./views",
                        src: ["**"],
                        dest: "./dist/views"
                    }
                ]
            }
        },
        ts: {
            app: {
                files: [{
                    src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
                    dest: "./dist"
                }],
                options: {
                    module: "commonjs",
                    target: "es5",
                    sourceMap: false,
                    rootDir: "src"
                }
            }
        },
        watch: {
            ts: {
                files: ["src/\*\*/\*.ts"],
                tasks: ["ts"]
            },
            sass: {
                files: ["src/public/assets/css/\*.scss"],
                tasks: ["sass"],
            },
            views: {
                files: ["views/**/*.pug"],
                tasks: ["copy"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", [
        "sass",
        "ts",        
        "copy",
        "watch"
    ]);

};