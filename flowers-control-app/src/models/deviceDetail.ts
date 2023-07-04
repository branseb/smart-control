import { DeviceItemType } from "./deviceItem";


export type DeviceDetailType = DeviceItemType & {
    sensors: Sensor[]
}

export type Sensor = {

    id: string,

    name: string,

    sensorType: SensorType,

    status: SensorStatus,

    data: SensorDataType,
};

export type SensorDataType = {
    humidity?:number
}

export enum SensorType {
    FlowerHumiditySensor
};

export enum SensorStatus {
    Offline,
    Online
}