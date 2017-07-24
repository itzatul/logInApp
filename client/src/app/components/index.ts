module App {
    export class ComponentFactory {
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

    export class ComponentController {
        static controllerName = 'ComponentController';
        static $inject: string[] = [];
    }

    export abstract class Component implements ng.IDirective {
        restrict = 'E';
        scope = {};
        controllerAs = '$ctrl';
        controller = ComponentController.controllerName;
        bindToController = true;
        replace = false;
    }

    export interface IDirective extends Function, ng.IDirective {
        directiveName: string;
        $inject?: string[];
    }
}