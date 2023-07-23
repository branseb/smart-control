import { useParams } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { SensorItem } from "../components/sensorItem";
import { useDeviceDetail } from "../hooks/hooks";
import { DeviceDetailType } from "../models/deviceDetail";
import { loginUserAtom } from "../store/loginAtom";
import { useAtomValue } from "jotai";
import { AuthorizedUsers } from "../components/authorizedUsers";
import { AddRoleUserDialog } from "../components/addRoleUserDialog";
import { useState } from "react";


const useStyles = makeStyles({ name: 'detail-page' })(theme => ({
    flowers: {
        display: 'flex',
        flexDirection: 'column',

    },
    root:{
        display:'flex',
        padding:'5px',
        justifyContent:'center'
    }
}))

export const DetailPage = () => {

    const { id } = useParams();
    const {deviceDetail,fetchData }= useDeviceDetail(id ?? '');
    const { classes } = useStyles();
    const loginUser = useAtomValue(loginUserAtom);
    const [openAddUserDialog ,setOpenAddUserDialog] = useState<boolean>(false);

    return (
        <div>
            {deviceDetail
                ? <div  className={classes.root}>
                    {loginUser
                        ? <div className={classes.flowers}>
                            <h1>{deviceDetail.name}</h1>
                            <AuthorizedUsers deviceDetail={deviceDetail} onAddButtonClick={()=>{setOpenAddUserDialog(true)}}></AuthorizedUsers>
                            {deviceDetail.status === 0
                                ? <h1>Offline</h1>
                                : <h1>Online</h1>}
                            {deviceDetail.sensors && (deviceDetail.sensors.map(sensor => <SensorItem key={sensor.id} sensor={sensor} />))}
                                <AddRoleUserDialog deviceId={deviceDetail.id} onClose={()=>{fetchData(),setOpenAddUserDialog(false)}} open={openAddUserDialog}></AddRoleUserDialog>
                        </div>
                        : <div></div>}
                </div>
                : <div>Device Not found</div>
            }
        </div>
    )
}