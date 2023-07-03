
export type Device = {
    id: string,
    name: string,
    status: string
};

export type DeviceInfo = {

    flowers: {
        id: string,
        name: string,
        humidity: number,
    }[],
    status:string,
}