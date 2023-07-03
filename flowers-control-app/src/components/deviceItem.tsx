import { makeStyles } from "tss-react/mui";
import { Device } from "../models/models";

const useStyles = makeStyles({name:'device-item'})(theme=>({
    root:{
        display:'flex',
        flexDirection:'row',
        gap:10
    }
}));

type DeviceItemTypeProps = {
    device:Device,
}

export const DeviceItem = (props:DeviceItemTypeProps) => {
    const {device} = props;
const {classes} = useStyles();

    return(
        <div className={classes.root}>
            <h1>ID: {device.id}</h1>
            <h1>Name: {device.name}</h1>
            <h1>Status: {device.status}</h1>
        </div>
    )
}