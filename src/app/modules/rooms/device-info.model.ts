export class DeviceInfo {
    constructor(public userid: string, public room: string, public type: string, public no: number,
        public status: number, public updated_date: Date, public ack: boolean) {
    }
}
