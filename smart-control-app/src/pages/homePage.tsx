import { Fab, Grid, Typography } from "@mui/material";
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
        <div>
            {loginUser
                ? <Grid container
                    spacing={3}
                    className={classes.root}
                     >
                    {devices?.length && devices.map(device =>
                        <Grid key={device.id} xs={12} sm={6} md={4} item>
                            <DeviceItem device={device} />
                        </Grid>)}
                        <Fab
                            color="primary"
                            className={classes.addIcon}
                            onClick={onAddButtonClick}>
                            <Add />
                        </Fab>
                        <PairDeviceDialog open={openPairDialog} onSuccsess={fetchData} onClose={() => setOpenPairDialog(false)} />
                </Grid>
                : <div>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        You must login!
                    </Typography>
                </div>
            }
        </div>
    )
}