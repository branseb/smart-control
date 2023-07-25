import { Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Sensor } from "../models/deviceDetail";
import { CircularWithLabel } from "./circularWithLabel";
import { ItemWraper } from "./itemWraper";

const useStyles = makeStyles({ name: 'sensor-item' })(() => ({
    /*root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,

    },
    statusIcon: {
        display: 'flex',
        justifyItems: 'right'
    },*/
    sensor: {
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        textAlign: 'center'
    },

}))

type SensorItemTypeProps = {
    sensor: Sensor,
    className?: string
}

export const SensorItem = (props: SensorItemTypeProps) => {
    const { classes, cx } = useStyles();
    const { sensor, className } = props

    return (
        <ItemWraper
            title={sensor.name}
            status={sensor.status}
            className={className}

        >
            {sensor.data.humidity &&
                <div className={classes.sensor}>
                    <Typography>{sensor.sensorType === 0 && 'Humidity sensor'}</Typography>
                    <CircularWithLabel value={sensor.data.humidity} />
                </div>}
        </ItemWraper>

    )
} /*<Paper elevation={4} className={cx(classes.paper, className)}>
            <div className={classes.root}>
                <div className={classes.content}>
                    <h1>{sensor.name}</h1>
                   
                
                {sensor.data.humidity &&
                    <div className={classes.sensor}>
                        <Typography>{sensor.sensorType === 0 && 'Humidity sensor'}</Typography>
                        <CircularWithLabel value={sensor.data.humidity} />
                    </div>}</div>
                    <StatusIcon className={classes.statusIcon} status={sensor.status} />
            </div>
        </Paper>*/