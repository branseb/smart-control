import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Paper, Typography } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import warningIcon from '../../public/warning.svg';
import { DeviceItemType, Role } from "../models/deviceItem";
import { StatusIcon } from "./statusIcon";
import { ItemWraper } from './itemWraper';

const useStyles = makeStyles({ name: 'device-item' })(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'space-between'
    },
    nameAndWarnings: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingBottom: 15,
        paddingTop: 15,
        gap: 13
    },
    statusIcons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'right',
        alignItems: 'center',
        gap: 11,
    },
    warnings: {
    },
    warningsText: {
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
    },
    DeviceName: {
        fontSize: 28,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
    }
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

    return (<div>
        <ItemWraper
            icon={device.role === Role.Admin && <AdminPanelSettingsIcon sx={{ fontSize: 30, color: '#777777' }} />}
            status={device.status}
            title={device.name}
            onClick={() => { navigate(`/detail/${device.id}`) }}
            className={className}
        >
            <div className={classes.warnings}>
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
    </div>
    )
}


const OldDeviceItem = (props: DeviceItemProps) => {
    const { device, className } = props
    const { classes } = useStyles();
    const warnings = device.warnings;
    const navigate = useNavigate();
    return (<Paper className={className} onClick={() => { navigate(`/detail/${device.id}`) }}>
        <div className={classes.root} >
            <div className={classes.nameAndWarnings}>
                <div className={classes.warnings}>
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
                <Typography className={classes.DeviceName}>{device.name}</Typography>
            </div>
            <div className={classes.statusIcons}>
                <StatusIcon status={device.status} />
                {device.role === Role.Admin && <AdminPanelSettingsIcon sx={{ fontSize: 30, color: '#777777' }} />}
            </div>
        </div>
    </Paper>)
}