module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    
    grunt.initConfig({
        concurrent: {
            dev: ["less:dev", "nodemon", "watch"],
            options: {
                logConcurrentOutput: true
            }
        },
        reload: {
            port: 1664,
            proxy: {
                host: 'localhost'
            }
        },
        nodemon: {
            dev: {
                script: '**/*.js'
            }
        },
        watch: {
            files: ['views/index.html', "**/*.css"],
            tasks: '',
            options: {
                livereload: true
            }
        }
        
    });
    grunt.registerTask('default', ['nodemon']);
    grunt.registerTask('launch', ['nodemon']);
    grunt.registerTask('reload', ['reload', 'watch']);
}