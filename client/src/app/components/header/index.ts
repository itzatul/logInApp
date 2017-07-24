module App {
    export class Header extends Component {
        static directiveName = 'header';
        controller = HeaderController.controllerName;
        templateUrl = 'templates/components/header/template.html';
    }
}