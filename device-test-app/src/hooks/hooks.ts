import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";


export type DeviceType = {
    token?: string,
    id?: string,
}

export const useLoginDevice = () => {
    const [device, setCookie] = useCookies(['token', 'id']);

    useEffect(() => {
        if (!device.token)
            fetch('http://localhost:5104/device', { method: 'POST' })
                .then(resp => resp.json())
                .then(resp => {
                    setCookie('token', resp.token);
                    setCookie('id', resp.id);
                })
    }, []);

    return device;
}

export const useLoadData = (device: any) => {
    const [deviceData, setDeviceData] = useState<any>();

    const loadDeviceData = useCallback(() => {
        if (device) {
            const headers = { 'Authorization': 'Bearer ' + device.token };
            fetch('http://localhost:5104/device', { headers })
                .then(resp => resp.json())
                .then(setDeviceData);
        }
    }, [device]);

    return { deviceData, loadDeviceData }
}