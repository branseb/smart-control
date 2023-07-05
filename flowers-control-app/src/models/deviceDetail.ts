import { Status } from "./deviceItem";


export type DeviceDetailType = {
    sensors: Sensor[];
	id: string,
    name: string,
    status: Status
}

export type Sensor = {

    id: string,

    name: string,

    sensorType: SensorType,

    status: SensorStatus,

    data: SensorDataType,

	warnings: string[]
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