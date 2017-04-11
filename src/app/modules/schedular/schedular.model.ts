export class Schedular {
    constructor(public room: string, public type: string, public no: number, public status: string,
        public timeslice: string, public comment: string, public isactive: string, public frequency: number,
        public prev_schedule: Date, public next_schedule: Date) {
    }
}

export class Value {
    constructor(public id: string, public name: string) {
    }
}

export class Dropdown {
    constructor(public label: string, public value: Value) {
    }
}

export class DropdownData {
    constructor(public room: number, public device: number, public name: string, public no: number, public isdim: boolean) {
    }
}
