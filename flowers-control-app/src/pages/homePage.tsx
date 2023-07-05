import { Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { DeviceItem } from "../components/deviceItem";
import { useDevices } from "../hooks/hooks";
import { loginUserAtom } from "../store/loginAtom";

export const HomePage = () => {
    const devices = useDevices();
    const loginUser = useAtomValue(loginUserAtom)

    return (
        <div>
            {loginUser
                ? <div>
                    {devices?.length && devices.map(device =>
                        <DeviceItem key={device.id} device={device} />)}
                </div>
                : <div>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        You must login!
                    </Typography>
                </div>

            }

        </div>
    )
}