import { Fab, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { DeviceItem } from "../components/deviceItem";
import { useDevices } from "../hooks/hooks";
import { loginUserAtom } from "../store/loginAtom";
import { Add } from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";
import { useState } from "react";
import { PairDeviceDialog } from "../components/pairDeviceDialog";

const useStyles = makeStyles({ name: 'home-page' })(() => ({
    addIcon: {
        display: 'flex',
        position: "absolute",
        right: '20px',
        bottom: '15px'


    }
}))

export const HomePage = () => {
    const {devices, fetchData} = useDevices();
    const loginUser = useAtomValue(loginUserAtom);
    const { classes } = useStyles();
    const [openPairDialog, setOpenPairDialog] = useState<boolean>(false);

    const onAddButtonClick = () => {
        setOpenPairDialog(true);
    }

    return (
        <div>
            {loginUser
                ? <div>
                    {devices?.length && devices.map(device =>
                        <DeviceItem key={device.id} device={device} />)}
                    <Fab
                        color="primary"
                        className={classes.addIcon}
                        onClick={onAddButtonClick}>
                        <Add />
                    </Fab>
                    <PairDeviceDialog open={openPairDialog} onSuccsess={fetchData} onClose={() => setOpenPairDialog(false)} />
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