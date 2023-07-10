import { makeStyles } from 'tss-react/mui';
import { SensorStatus } from '../models/deviceDetail';
import { Status } from '../models/deviceItem';

const useStyles = makeStyles<{status: Status | SensorStatus}>({name:'status-icon'})((theme, props)=>({
    root:{
        display:'flex',
        alignItems:'center', 
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset',
        borderRadius:'50%',
        background: props.status === Status.Offline ? '#777777' : theme.palette.secondary.main,
        width: 24,
        height: 24
    },
}))

type StatusIconTypeProps = {
status:Status|SensorStatus
}

export const StatusIcon = (props:StatusIconTypeProps) => {

    const {classes} = useStyles({status: props.status});

    return(
        <div className={classes.root}/>        
    )

}