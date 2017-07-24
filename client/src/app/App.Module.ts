/// <reference path="../../typings/app.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />
module App {
    'use strict';
    ((): void => {

        const dependencies: string[] = [
            'app.core', 'ngRoute', 'ngAnimate', 'toaster', 'ui.bootstrap', 'ngFileUpload', 'popoverToggle',
            'angularBootstrapNavTree', 'checklist-model', 'angularjs-dropdown-multiselect', 'angular.filter',
            'ui.tinymce', 'ng-breadcrumbs', 'angular-loading-bar', 'ngDialog', 'ngTagsInput'
        ];

        angular.module('app', dependencies)

            // Constants
            .constant('appConstant', Common.AppConstants.factory())
            .service(LoginService.serviceName, LoginService)

            // Components
            .controller(ComponentController.controllerName, ComponentController)
            .controller(HeaderController.controllerName, HeaderController)
            .directive(Header.directiveName, ComponentFactory.get(Header))
            .directive(Content.directiveName, ComponentFactory.get(Content))
            .directive(Footer.directiveName, ComponentFactory.get(Footer))

            // Pages
            .controller(LoginController.controllerName, LoginController)
            .directive(Login.directiveName,PageFactory.get(Login))
            .directive(HomePage.directiveName, PageFactory.get(HomePage))
            .directive(UserAccountPage.directiveName, PageFactory.get(UserAccountPage))
            .controller(UserAccountPageController.controllerName, UserAccountPageController)

            // Configuration
            .config(RouteConfig);
    })();
}