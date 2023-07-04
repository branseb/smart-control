import { makeStyles } from "tss-react/mui";
import { useNavigate } from "react-router-dom";
import { DeviceItemType } from "../models/deviceItem";
import { StatusIcon } from "./statusIcon";
import { MenuItem, Typography } from "@mui/material";

const useStyles = makeStyles({ name: 'device-item' })(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        padding: '5px',
        margin: '10px',
        cursor: 'pointer'
    },
    nameAndStatus: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    }
}));

type DeviceItemTypeProps = {
    device: DeviceItemType,
    onItemClick: () => void;
}

export const DeviceItem = (props: DeviceItemTypeProps) => {
    const { device } = props;
    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <MenuItem>
            <div className={classes.root} onClick={() => { navigate(`detail/${device.id}`), props.onItemClick() }}>
                <Typography>{device.name}</Typography>
                <StatusIcon status={device.status} />
            </div>
        </MenuItem>
    )
}