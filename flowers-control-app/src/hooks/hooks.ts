import { config } from "../config";
import { useEffect, useState } from "react";
import { DeviceItemType } from "../models/deviceItem";
import { DeviceDetailType } from "../models/deviceDetail";



export const useDevices = () => {
    const [devices, setDevices] = useState<DeviceItemType[]>([]);

    const fetchData = () => fetch(config.api + 'Devices')
        .then(resp => resp.json())
        .then(resp => setDevices(resp))

    useEffect(() => {
        fetchData()
        console.log('fetch')
        const timer = setInterval(() => { fetchData();}, 1000 * 60);
        return()=>{clearInterval(timer)}
        
    },[])

    return devices
}

export const useDeviceDetail = (id: string) => {
    const [deviceDetail, setDeviceDetail] = useState<DeviceDetailType>();

    useEffect(() => {
        fetch(config.api + 'Devices/detail?id=' + id)
            .then(resp => resp.json())
            .then(resp => setDeviceDetail(resp))
    }, [id])
    return deviceDetail

}