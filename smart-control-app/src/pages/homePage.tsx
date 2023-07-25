import { Add } from "@mui/icons-material";
import { Fab, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { DeviceItem } from "../components/deviceItem";
import { ItemContainer } from "../components/itemContainer";
import { PairDeviceDialog } from "../components/pairDeviceDialog";
import { useDevices } from "../hooks/hooks";
import { loginUserAtom } from "../store/loginAtom";

const useStyles = makeStyles({ name: 'home-page' })(() => ({
    addIcon: {
        display: 'flex',
        position: "absolute",
        right: '20px',
        bottom: '15px'
    },
    root: {
        display: 'flex',
        padding: 20,
        paddingTop: 40
    }
}))

export const HomePage = () => {
    const { devices, fetchData } = useDevices();
    const loginUser = useAtomValue(loginUserAtom);
    const { classes } = useStyles();
    const [openPairDialog, setOpenPairDialog] = useState<boolean>(false);

    const onAddButtonClick = () => {
        setOpenPairDialog(true);
    }

    return (
        <div className={classes.root}>
            {loginUser &&
                <React.Fragment>
                    <ItemContainer>
                        {devices?.length && devices.map(device =>
                            <DeviceItem key={device.id} device={device} />
                        )}
                    </ItemContainer>
                    <Fab
                        color="primary"
                        className={classes.addIcon}
                        onClick={onAddButtonClick}>
                        <Add />
                    </Fab>
                    <PairDeviceDialog open={openPairDialog} onSuccsess={fetchData} onClose={() => setOpenPairDialog(false)} />
                </React.Fragment>}
            {!loginUser &&
                <div>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        You must login!
                    </Typography>
                </div>}
        </div>
    )
}