import { config } from "../config";
import { useEffect, useState } from "react";
import { DeviceItemType } from "../models/deviceItem";
import { DeviceDetailType } from "../models/deviceDetail";
import { loginUserAtom, tokenResponseAtom } from "../store/loginAtom";
import { useAtomValue } from "jotai";



export const useDevices = () => {
    const [devices, setDevices] = useState<DeviceItemType[]>([]);
    const token = useAtomValue(tokenResponseAtom)



    useEffect(() => {
        if (token.credential) {
            const headers = { 'Authorization': 'Bearer ' + token.credential };
            const fetchData = () => fetch(config.api + 'Devices', { headers })
                .then(resp => resp.json())
                .then(resp => setDevices(resp))
            fetchData()
            console.log('fetch')
            const timer = setInterval(() => { fetchData(); }, 1000 * 60);
            return () => { clearInterval(timer) }
        }

    }, [token])

    return devices
}

export const useDeviceDetail = (id: string) => {
    const [deviceDetail, setDeviceDetail] = useState<DeviceDetailType>();
    const token = useAtomValue(tokenResponseAtom)

    useEffect(() => {
        const headers = { 'Authorization': 'Bearer ' + token.credential };
        fetch(config.api + 'Devices/detail?id=' + id , { headers })
            .then(resp => resp.json())
            .then(resp => setDeviceDetail(resp))
    }, [id,token])
    return deviceDetail

}