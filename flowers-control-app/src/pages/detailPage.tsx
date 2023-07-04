import { useParams } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { SensorItem } from "../components/sensorItem";
import { useDeviceDetail } from "../hooks/hooks";
import { DeviceDetailType } from "../models/deviceDetail";

const useStyles = makeStyles({ name: 'detail-page' })(theme => ({
    flowers: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    }
}))

export const DetailPage = () => {

    const { id } = useParams();
    const deviceDetail: DeviceDetailType | undefined = useDeviceDetail(id ?? '');
    const { classes } = useStyles();

    return (
        <div>
            {deviceDetail
                ? <div className={classes.flowers}>
                    <h1>{deviceDetail.name}</h1>
                    {deviceDetail.status === 0
                        ? <h1>Offline</h1>
                        : <h1>Online</h1>}
                    {deviceDetail.sensors && (deviceDetail.sensors.map(sensor => <SensorItem key={sensor.id} sensor={sensor} />))}

                </div>
                : <div>Device Not found</div>
            }
        </div>
    )
}