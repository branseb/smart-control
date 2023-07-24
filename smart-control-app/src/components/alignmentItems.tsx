import { PropsWithChildren } from "react"
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({ name: 'alignment-items' })(theme => ({
    root: {
        display:'flex',
        paddingTop:'40px',
        gap:'20px',
        flexDirection:'column',
        [theme.breakpoints.up('md')]:{
            flexDirection:'row'
        }
    }
}))


export const AlignmentItems = (props: PropsWithChildren) => {

    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            {props.children}
        </div>
    )
}