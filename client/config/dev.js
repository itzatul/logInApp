'use strict';

module.exports = {
    isProd: false,
    loginApi: "http://localhost:5000/users/authenticate",
	root: "build/dev",
	assets: {
		lib: {
			css: [
				'bower_components/bootstrap/dist/css/bootstrap.css',
				'bower_components/AngularJS-Toaster/toaster.css',
                'bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css',
                'bower_components/angular-loading-bar/build/loading-bar.min.css',
                'bower_components/ng-dialog/css/ngDialog.min.css',
                'bower_components/ng-dialog/css/ngDialog-theme-default.min.css',
                'bower_components/fontawesome/css/font-awesome.min.css',
                'bower_components/ng-tags-input/ng-tags-input.min.css'
			],
			js: [
                'bower_components/lodash/dist/lodash.js',
                'bower_components/jquery/dist/jquery.js',
				'bower_components/angular/angular.js',
				'bower_components/angular-animate/angular-animate.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
				'bower_components/angular-route/angular-route.js',
				'bower_components/AngularJS-Toaster/toaster.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                'bower_components/ng-file-upload/ng-file-upload.js',
                'bower_components/ng-file-upload/ng-file-upload-shim.js',
                'bower_components/jquery-ui/jquery-ui.js',
                'bower_components/bootstrap-filestyle/src/bootstrap-filestyle.js',
                'bower_components/angular-popover-toggle/popover-toggle.js',
                'bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                'bower_components/checklist-model/checklist-model.js',
                'bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
                'bower_components/angular-filter/dist/angular-filter.js',
                'bower_components/angular-loading-bar/build/loading-bar.min.js',
                'bower_components/ng-dialog/js/ngDialog.min.js',
                'bower_components/es6-promise/es6-promise.js',
                'bower_components/ng-breadcrumbs/dist/ng-breadcrumbs.min.js',
                'bower_components/bootstrap/dist/js/bootstrap.js',
                'bower_components/highcharts/highcharts.js',
                'bower_components/ng-tags-input/ng-tags-input.min.js'

        	],
            tinymce: [
                'bower_components/tinymce/tinymce.js',
                'bower_components/angular-ui-tinymce/src/tinymce.js'

			],
			font: [
                'bower_components/bootstrap/dist/fonts/**',
                'bower_components/fontawesome/fonts/**'
			]
		}
	}
};