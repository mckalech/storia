module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify:     {
			options:{
				transform:  [ require('grunt-react').browserify ]
			},
			app: {
				src: 'public/src/js/app.js',
				dest: 'public/dist/js/app.js'
			}
		},
		compass: {
			dist: {
				options: {
					basePath:'public/',
					sassDir:'src/styles',
					cssDir:'dist/styles',
					outputStyle:'compressed'
				}
			}
		},
		watch: {
			browserify: {
				files: ['public/src/js/**/*.js'], 
				tasks: ['browserify'] 
			},
			compass: {
				files: ['public/src/styles/**/*.scss'], 
				tasks: ['compass']
			}
		}
 
	});
 
	//погружаем все необходимые модули
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify')
	grunt.loadNpmTasks('grunt-contrib-compass')
	//забиваем в задачу по умолчению все наши задачи
	grunt.registerTask('default', ['browserify','compass', 'watch']);
};