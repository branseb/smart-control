import { Paper, Typography } from "@mui/material"
import { Status } from "../models/deviceItem"
import { StatusIcon } from "./statusIcon"
import { makeStyles } from "tss-react/mui";
import { SensorStatus } from "../models/deviceDetail";

const useStyles = makeStyles({ name: 'device-item' })((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'space-between'
    },
    titleAndChildren: {
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
        boxShadow: '0px 5px 22px 5px rgba(0, 0, 0, 0.15) inset',
        display: 'flex',
        flexDirection: 'row',
        padding: '5px',
        cursor: 'pointer',
        height: 162,
        borderRadius: 10,
        [theme.breakpoints.up('sm')]: {
            width: 280
        }
    },
    statusIcons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'right',
        alignItems: 'center',
        gap: 11,
    },

    title: {
        fontSize: 28,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
    }
}));

type ItemWraperProps = {
    title: string
    children: React.ReactNode
    status: Status|SensorStatus
    icon?: React.ReactNode
    className?:string
    onClick?:()=>void
}

export const ItemWraper = (props: ItemWraperProps) => {
    const { classes,cx } = useStyles();
    const { title, children, status, icon, className,onClick } = props

    return (
        <Paper elevation={4} className={cx(classes.paper, className)} onClick={onClick}>
            <div className={classes.root}>
            <div className={classes.titleAndChildren}>
                {children}
                <Typography className={classes.title} variant="h2" >{title}</Typography>
            </div>
            <div className={classes.statusIcons}>
                <StatusIcon status={status}></StatusIcon>
                {icon}
            </div>
            </div>
        </Paper>
    )
}