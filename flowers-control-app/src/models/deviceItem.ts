export enum Status  {
   Offline ,Online
}

export enum Role  {
    Admin ,Guest
 }

export type DeviceItemType= {
    id: string,
    name: string,
    status: Status,
    warnings: string[],
    role:Role
}