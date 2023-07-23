import { Box, CircularProgress, Paper, Typography } from "@mui/material"
import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles({ name: 'flower-item' })(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
}))

type FlowerItemTypeProps = {
    flower: {
        id: string,
        name: string,
        humidity: number
    }
}

export const FlowerItem = (props: FlowerItemTypeProps) => {
    const { flower } = props
    const { classes } = useStyles();

    return (
        <Paper elevation={5}>
            <div className={classes.root} key={flower.id}>
                <h1>{flower.id}</h1>
                <h1>{flower.name}</h1>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress size={50} variant="determinate" value={flower.humidity} />
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
                            color="text.secondary"
                        >{`${flower.humidity}%`}</Typography>
                    </Box>
                </Box>
            </div>
        </Paper>
    )
}