module App {
    export function getErrorMessage(reason): string {
        if (reason == undefined) return '';
        if (typeof (reason) == 'string') return reason;
        return reason.message || reason.Message || '';
    }
}