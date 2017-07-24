/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module Core.Services {

    export class ViewService {

        static $inject: Array<string> = ['storageService'];

        constructor(private storageService: StorageService) { }

        private activeView: any;
        private key: string = "activeView";

        getActiveView(): any {
            var activeViewSt = this.storageService.getItem(this.key);
            if (activeViewSt) {
                this.activeView = activeViewSt;
            }
            return this.activeView;
        }

        setActiveView(viewName:any): void {
            this.activeView = viewName;
            this.storageService.setItem(this.key, viewName);
        }
    }

}