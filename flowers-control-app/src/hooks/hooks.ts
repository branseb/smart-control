import { config } from "../config";
import { useCallback, useEffect, useState } from "react";
import { DeviceItemType } from "../models/deviceItem";
import { DeviceDetailType } from "../models/deviceDetail";
import { tokenResponseAtom } from "../store/loginAtom";
import { useAtomValue } from "jotai";

export const useDevices = () => {
    const [devices, setDevices] = useState<DeviceItemType[]>([]);
    const { credential } = useAtomValue(tokenResponseAtom)

    const fetchData = useCallback(() => {
        if (credential) {
            const headers = { 'Authorization': 'Bearer ' + credential };
            fetch(config.api + 'Devices', { headers })
                .then(resp => resp.json())
                .then(resp => setDevices(resp))
        }
    }, [credential]);

    useEffect(() => {
        fetchData();
        const timer = setInterval(() => { fetchData(); }, 1000 * 60);
        return () => { clearInterval(timer) }
    }, [credential, fetchData])

    return { devices, fetchData };
}

export const useDeviceDetail = (id: string) => {
    const [deviceDetail, setDeviceDetail] = useState<DeviceDetailType>();
    const { credential } = useAtomValue(tokenResponseAtom)

    const fetchData = useCallback(() => {
        const headers = { 'Authorization': 'Bearer ' + credential };
        fetch(config.api + 'Devices/detail?id=' + id, { headers })
            .then(resp => resp.json())
            .then(resp => setDeviceDetail(resp as DeviceDetailType))
    }, [credential, id]);

    useEffect(() => {
        fetchData();
    }, [fetchData])
    return { deviceDetail, fetchData }

}