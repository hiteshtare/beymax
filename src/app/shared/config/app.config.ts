import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface IAppConfig {
    phpEndpoint: string;
    chartsEndpoint: string;
    userId: string;
    roomDetails: Object;
    version: string;
}

export const AppConfig: IAppConfig = {
    // phpEndpoint: '../php/',
    phpEndpoint: 'http://localhost:8012/php/',
    // chartsEndpoint: '../charts/',
    chartsEndpoint: 'assets/charts',
    userId: 'SS',
    roomDetails: [
        {
            'roomNo': '01',
            'roomName': 'Room 1',
            'link': 'room1',
            'name': 'Hall',
            'noOfDevices': 3
        },
        {
            'roomNo': '02',
            'roomName': 'Room 2',
            'link': 'room2',
            'name': 'Bedroom',
            'noOfDevices': 3
        }
    ],
    version: '1.1'
};
