import { useParams } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { SensorItem } from "../components/sensorItem";
import { useDeviceDetail } from "../hooks/hooks";
import { loginUserAtom } from "../store/loginAtom";
import { useAtomValue } from "jotai";
import { AuthorizedUsers } from "../components/authorizedUsers";
import { AddRoleUserDialog } from "../components/addRoleUserDialog";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { ItemContainer } from "../components/itemContainer";


const useStyles = makeStyles({ name: 'detail-page' })(() => ({
    flowers: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    root: {
        padding: '20px',
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
                            <Typography variant='h2'>{deviceDetail.name}</Typography>
                            <AuthorizedUsers deviceDetail={deviceDetail} onAddButtonClick={() => { setOpenAddUserDialog(true) }}></AuthorizedUsers>
                            {deviceDetail.status === 0
                                ? <h1>Offline</h1>
                                : <h1>Online</h1>}
                            {deviceDetail.sensors &&
                                <ItemContainer>
                                    {deviceDetail.sensors.map(sensor =>
                                        <SensorItem sensor={sensor} key={sensor.id} />)}
                                </ItemContainer>}
                            <AddRoleUserDialog deviceId={deviceDetail.id} onClose={() => { fetchData(), setOpenAddUserDialog(false) }} open={openAddUserDialog}></AddRoleUserDialog>
                        </div>
                        : <div></div>}
                </div>
                : <div>Device Not found</div>
            }
        </div>
    )
}