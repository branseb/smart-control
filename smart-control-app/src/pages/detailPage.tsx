import { useParams } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { SensorItem } from "../components/sensorItem";
import { useDeviceDetail } from "../hooks/hooks";
import { loginUserAtom } from "../store/loginAtom";
import { useAtomValue } from "jotai";
import { AuthorizedUsers } from "../components/authorizedUsers";
import { AddRoleUserDialog } from "../components/addRoleUserDialog";
import { useState } from "react";
import { Grid } from "@mui/material";


const useStyles = makeStyles({ name: 'detail-page' })(() => ({
    flowers: {
        display: 'flex',
        flexDirection: 'column',

    },
    root: {
        display: 'flex',
        padding: '20px',
        justifyContent: 'center',
    }
}))

export const DetailPage = () => {

    const { id } = useParams();
    const { deviceDetail, fetchData } = useDeviceDetail(id ?? '');
    const { classes } = useStyles();
    const loginUser = useAtomValue(loginUserAtom);
    const [openAddUserDialog, setOpenAddUserDialog] = useState<boolean>(false);

    return (
        <div>
            {deviceDetail
                ? <div className={classes.root}>
                    {loginUser
                        ? <div className={classes.flowers}>
                            <h1>{deviceDetail.name}</h1>
                            <AuthorizedUsers deviceDetail={deviceDetail} onAddButtonClick={() => { setOpenAddUserDialog(true) }}></AuthorizedUsers>
                            {deviceDetail.status === 0
                                ? <h1>Offline</h1>
                                : <h1>Online</h1>}
                            {deviceDetail.sensors &&
                                <Grid container spacing={3}>
                                    {deviceDetail.sensors.map(sensor =>
                                        <Grid xs={12} sm={6} md={4} item key={sensor.id}>
                                            <SensorItem sensor={sensor} />
                                        </Grid>)}
                                </Grid>}
                            <AddRoleUserDialog deviceId={deviceDetail.id} onClose={() => { fetchData(), setOpenAddUserDialog(false) }} open={openAddUserDialog}></AddRoleUserDialog>
                        </div>
                        : <div></div>}
                </div>
                : <div>Device Not found</div>
            }
        </div>
    )
}