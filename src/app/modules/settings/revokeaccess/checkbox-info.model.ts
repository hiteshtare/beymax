export class CheckboxInfo {
    constructor(public room: string, public alias: string, public device: number, public name: string, public no: number,
        public isdim: boolean, public value: string) {
    }
}

export class RevokeInfo {
    constructor(public deviceid: string) {
    }
}
