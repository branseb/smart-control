import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Typography } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import warningIcon from '../../public/warning.svg';
import { DeviceItemType, Role } from "../models/deviceItem";
import { ItemWraper } from './itemWraper';

const useStyles = makeStyles({ name: 'device-item' })(() => ({

    warningsText: {
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
    },
}));

type DeviceItemProps = {
    device: DeviceItemType,
    className?: string,
}

export const DeviceItem = (props: DeviceItemProps) => {
    const { device, className } = props;
    const warnings = device.warnings;
    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <ItemWraper
            icon={device.role === Role.Admin && <AdminPanelSettingsIcon sx={{ fontSize: 30, color: '#777777' }} />}
            status={device.status}
            title={device.name}
            onClick={() => { navigate(`/detail/${device.id}`) }}
            className={className}
        >
            <div>
                {device.status === 0 &&
                    <Fragment>
                        <img src={warningIcon}></img>
                        <Typography className={classes.warningsText}>Device is offline</Typography>
                    </Fragment>}
                {warnings.length !== 0 &&
                    <Fragment>
                        <img src={warningIcon}></img>
                        {warnings.length < 4
                            ? <Fragment>
                                {warnings.map(w => <Typography className={classes.warningsText}>{w}</Typography>)}
                            </Fragment>
                            : <Fragment>
                                <Typography className={classes.warningsText}>{warnings[0]}</Typography>
                                <Typography className={classes.warningsText}>{warnings[1]}</Typography>
                                <Typography className={classes.warningsText}>{warnings.length - 2} more warnings</Typography>
                            </Fragment>}
                    </Fragment>
                }
            </div>
        </ItemWraper>
    )
}