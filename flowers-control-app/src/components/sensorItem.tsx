import { Paper, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Sensor } from "../models/deviceDetail";
import { CircularWithLabel } from "./circularWithLabel";
import { StatusIcon } from "./statusIcon";

const useStyles = makeStyles({ name: 'sensor-item' })(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,

    },
    sensor: {
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center'
    },
    paper: {
        background: 'rgba(55, 55, 55, 0.85)',
        boxShadow: '0px 5px 22px 5px rgba(0, 0, 0, 0.15) inset',
        marginTop: '31px',
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        height: 162,
        borderRadius: 10,
    }
}))

type SensorItemTypeProps = {
    sensor: Sensor
}

export const SensorItem = (props: SensorItemTypeProps) => {
    const { classes } = useStyles();
    const { sensor } = props

    return (
        <Paper elevation={4} className={classes.paper}>
            <div className={classes.root}>
                <div className={classes.content}>
                    <h1>{sensor.name}</h1>
                    <StatusIcon status={sensor.status} />
                </div>
                {sensor.data.humidity &&
                    <div className={classes.sensor}>
                        <Typography>{sensor.sensorType === 0 && 'Humidity sensor'}</Typography>
                        <CircularWithLabel value={sensor.data.humidity} />
                    </div>}
            </div>
        </Paper>
    )
}