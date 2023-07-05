import { makeStyles } from "tss-react/mui";
import { useNavigate } from "react-router-dom";
import { DeviceItemType } from "../models/deviceItem";
import { StatusIcon } from "./statusIcon";
import { MenuItem, Paper, Typography } from "@mui/material";
import { loginUserAtom } from "../store/loginAtom";
import { useAtomValue } from "jotai";
import warningIcon from '../../public/warning.svg';
import groupIcon from '../../public/Group.svg';
import { Fragment } from "react";

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
    paper: {
        background: 'rgba(55, 55, 55, 0.85)',
        boxShadow: '0px 5px 22px 5px rgba(255, 255, 255, 0.15) inset',
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        padding: '5px',
        cursor: 'pointer',
        height: 162,
        borderRadius: 10,
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

type DeviceItemTypeProps = {
    device: DeviceItemType,
}

export const DeviceItem = (props: DeviceItemTypeProps) => {
    const { device } = props;
    const warnings = [
        '2 sensors offline',
        'humidity level low',
        'low battery',
        'low sun'
        
    ]
    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <Paper className={classes.paper} onClick={() => { navigate(`/detail/${device.id}`) }}>
            <div className={classes.root} >
                <div className={classes.nameAndWarnings}>
                    <div className={classes.warnings}>
                        {warnings &&
                            <Fragment>
                                <img src={warningIcon}></img>
                                {warnings.length<4
                                ?<Fragment>
                                    {warnings.map(w => <Typography className={classes.warningsText}>{w}</Typography> )}
                                </Fragment>
                                :<Fragment>
                                    <Typography className={classes.warningsText}>{warnings[0]}</Typography>
                                    <Typography className={classes.warningsText}>{warnings[1]}</Typography>
                                    <Typography className={classes.warningsText}>{warnings.length-2} more warnings</Typography>
                                    </Fragment>}
                            </Fragment>
                        }
                    </div>

                    <Typography className={classes.DeviceName}>{device.name}</Typography>
                </div>
                <div className={classes.statusIcons}>
                    <StatusIcon status={device.status} />
                    <img src={groupIcon}></img>
                </div>

            </div>
        </Paper>


    )
}