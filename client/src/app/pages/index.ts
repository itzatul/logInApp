module App {

    export class PageFactory {
        static get(classType: IDirective): ng.IDirectiveFactory {
            const factory = (...args: any[]): IDirective => {
                var newInstance = Object.create(classType.prototype);
                newInstance.constructor.apply(newInstance, args);
                return newInstance;
            };
            factory.$inject = classType.$inject;
            return factory;
        }
    }

    export abstract class PageController extends ComponentController {
        goBack() {
            window.history.back();
        }
    }

    export abstract class Page extends Component { }

}