export enum Status  {
   Offline ,Online
}

export type DeviceItemType= {
    id: string,
    name: string,
    status: Status,
    warnings: string[]
}