var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-js-beautify');
grunt.loadNpmTasks('grunt-casperjs');
grunt.loadNpmTasks('grunt-run-node');
grunt.loadNpmTasks('grunt-wait-server');

grunt.initConfig({
	jshint: {
		options: {
			'node': true,
			'esversion': 6,
		},
		all: ['routes/**/*.js',
			'utils/**/*.js',
			'views/**/*.js',
			'public/static/scripts/**/*.js',
			'Gruntfile.js',
			'app.js',
			'config.js',
			'package.json'
		],
	},
	js_beautify: {
		options: {
			"end_with_newline": true,
			"indent_size": 1,
			"indent_char": " ",
			"eol": "\n",
			"indent_with_tabs": true,
			"preserve_newlines": true,
			"max_preserve_newlines": 10,
			"jslint_happy": false,
		},
		files: ['routes/**/*.js',
			'utils/**/*.js',
			'views/**/*.js',
			'public/static/scripts/**/*.js',
			'Gruntfile.js',
			'app.js',
			'config.js',
		]
	},
	mochaTest: {
		test: {
			options: {
				reporter: 'spec',
				timeout: 10000,
				//captureFile: 'results.txt', // Optionally capture the reporter output to a file
				quiet: false, // Optionally suppress output to standard out (defaults to false)
				clearRequireCache: true // Optionally clear the require cache before running tests (defaults to false)
			},
			src: ['tests/back/**/*.js']
		}
	},
	casperjs: {
		options: {
			async: {
				parallel: false
			},
			silent: false
		},
		casperjsOptions: ['--no-colors', '--web-security=false'],
		files: ['tests/front/**/*.js'],
	},
	run_node: {
		start: {
			options: {
				// cwd: 'test',
				stdio: ['ignore', 'ignore', 'inherit'],
				env: {
					'PORT': '3010'
				},
				detached: false
			},
			files: {
				src: ['bin/www']
			}
		}
	},
	stop_node: {
		stop: {}
	},
	waitServer: {
		server: {
			options: {
				req: 'http://localhost:3010',
				fail: function () {
					console.error('The server had not start. Check error log above.');
					process.exit(1);
				},
				timeout: 5000,
				interval: 200,
				print: false
			}
		},
	},
});

grunt.registerTask('doc', 'generates static markdown documentation', function () {
	require('mdoc').run({
		// configuration options (specified below)
		inputDir: 'docs',
		outputDir: 'dist'
	});
});

grunt.registerTask('start', 'Starts Nodejs Server', function () {

});

grunt.registerTask('default', ['jshint', 'js_beautify:files:all']);
grunt.registerTask('test-back', ['jshint', 'mochaTest']);
grunt.registerTask('test-front', ['run_node', 'waitServer', 'casperjs', 'stop_node']);
grunt.registerTask('test', ['test-back', 'test-front']);
grunt.registerTask('beautify', ['js_beautify:files:all']);
