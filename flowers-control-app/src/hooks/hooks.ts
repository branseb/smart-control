import { useAtomValue } from "jotai";
import { loginUserAtom } from "../store/loginAtom"
import { devicesFake } from "../fakeData/devices";
import { decicesFakeInfo } from "../fakeData/deviceInfo";



export const getDevices = () => {
    const loginUser = useAtomValue(loginUserAtom);
        if (loginUser.id === '') {
        return }
    else {
        return (
            devicesFake
        )
    }
}

export const getDeviceInfo = () => {   
    return decicesFakeInfo

}