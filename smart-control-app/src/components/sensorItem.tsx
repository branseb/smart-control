import { Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Sensor } from "../models/deviceDetail";
import { CircularWithLabel } from "./circularWithLabel";
import { ItemWraper } from "./itemWraper";

const useStyles = makeStyles({ name: 'sensor-item' })(() => ({
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
    const { classes } = useStyles();
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
}