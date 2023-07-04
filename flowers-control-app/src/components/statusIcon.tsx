import CircleIcon from '@mui/icons-material/Circle';
import { Status } from '../models/deviceItem';
import { SensorStatus } from '../models/deviceDetail';
import { green, red } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles({name:'status-icon'})(()=>({
    root:{
        display:'flex',
        alignItems:'center',
    }
}))

type StatusIconTypeProps = {
status:Status|SensorStatus
}

export const StatusIcon = (props:StatusIconTypeProps) => {

    const {classes} = useStyles();

    return(
        <div className={classes.root}>
        <CircleIcon sx={{color:(props.status)?green[900]:red[900]}}/>
        </div>
        
    )

}