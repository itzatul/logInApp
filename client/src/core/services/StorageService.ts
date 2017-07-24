/// <reference path="../../../typings/app.d.ts" />
/// <reference path="../../../typings/tsd.d.ts" />

module Core.Services {

    export class StorageService {

        private storageTypeObj = localStorage;
        private isSession = false;

        getItem(key: string, fromLocal: boolean = true): any {
            var store = fromLocal ? localStorage : sessionStorage;
            return JSON.parse(store.getItem(key));
        }

        setItem(key: string, value: any, toLocal: boolean = true): void {
            var store = toLocal ? localStorage : sessionStorage;
            store.setItem(key, JSON.stringify(value));
        }

        removeItem(key: string, fromLocal: boolean = true): void {
            var store = fromLocal ? localStorage : sessionStorage;
            store.removeItem(key);
        }

        clearAll(toLocal: boolean = true) {
            var store = toLocal ? localStorage : sessionStorage;
            store.clear();
        }

    }
}