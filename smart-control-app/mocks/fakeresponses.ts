import {DeviceItemType} from '../src/models/deviceItem'

export const fakeDeviceItems : DeviceItemType[] = [
    {
        "name": "Pi test room",
        "id": "000001",
        "status": 1,
        "warnings": [
            "humidity-high",
            "humidity-low"
        ],
        "role": 0
    },
    {
        "name": "Pi kitchen",
        "id": "000002",
        "status": 1,
        "warnings": [],
        "role": 1
    },
    {
        "name": "Pi library",
        "id": "000003",
        "status": 0,
        "warnings": [],
        "role": 1
    }
];

export const fakeUser =
    {
        "picture": "test",
        "email": "testEmail@test.com"
    }

export const fakeDeviceDetail = {
    "name": "Pi living room",
    "id": "000001",
    "status": 1,
    "sensors": [
        {
            "id": "000001-01",
            "name": "Avocado",
            "sensorType": 0,
            "status": 1,
            "warnings": [
                "humidity-high"
            ],
            "data": {
                "humidity": 90
            }
        },
        {
            "id": "000001-02",
            "name": "Cacti",
            "sensorType": 0,
            "status": 1,
            "warnings": [
                "humidity-low"
            ],
            "data": {
                "humidity": 2
            }
        },
        {
            "id": "000001-03",
            "name": "Aloe",
            "sensorType": 0,
            "status": 0,
            "warnings": null,
            "data": {
                "humidity": 20
            }
        }
    ],
    "admins": [
        "testEmail@test.com",
        "adminTest@test.com"
    ],
    "guests": [
        'guestTest@test.com'
    ]
};
