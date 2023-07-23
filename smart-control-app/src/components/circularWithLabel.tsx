import { Box, CircularProgress, Typography } from "@mui/material"
import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles({ name: 'circular-with-label' })(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

export const CircularWithLabel = (props: { value: number }) => {

    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress size={50} variant="determinate" value={props.value} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                    >{`${props.value}%`}</Typography>
                </Box>
            </Box></div>
    )
}