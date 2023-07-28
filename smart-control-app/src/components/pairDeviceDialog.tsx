import { Button, Dialog, TextField, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { makeStyles } from "tss-react/mui"
import { tokenResponseAtom } from "../store/loginAtom"
import { useAtomValue } from "jotai"
import { config } from "../config"

type AddDeviceTypeProps = {
    open: boolean,
    onClose: () => void,
    onSuccsess: () => void,
}

const useStyles = makeStyles({ name: 'pair-device-dialog' })(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        gap: 23,
    },
    text1: {
        //fontFamily: 'Inter',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        margin: 0,
        paddingBottom: 8
    },
    text2: {
        //fontFamily: 'Inter',
        alignItems: 'start',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        margin: 0,
    },
    texts: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 5
    },
    button: {
        marginTop: 10,
        padding: 14,
        minWidth: 145,
    }
}))

export const PairDeviceDialog = (props: AddDeviceTypeProps) => {

    const { classes } = useStyles();
    const [id, setId] = useState<string>('');
    const [pin, setPin] = useState<string>('');
    const { credential } = useAtomValue(tokenResponseAtom);
    const [error, setError] = useState<boolean>(false);

    const onPairButtonClick = useCallback(() => {
        const headers = { 'Authorization': 'Bearer ' + credential };
        fetch(`${config.api}Device/pair?id=${id}&pin=${pin}`, { headers, method: 'POST' })
            .then((resp) => {
                if (resp.status == 200) {
                    props.onClose();
                    props.onSuccsess();
                }
                if (resp.status == 403)
                    setError(true);
            })
    }, [credential, id, pin])

    return (
        <Dialog
            open={props.open}
            onClose={() => props.onClose()}>
            <div className={classes.root} data-test='pair-device-dialog' >
                <div className={classes.texts}>
                    <p className={classes.text1}>Add new device</p>
                    <p className={classes.text2}>Type in device id and pin from manual</p>
                    <p className={classes.text2}>Device must be connected to internet</p>
                </div>
                <TextField
                    data-test='pair-device-id'
                    variant="outlined"
                    label='Device id'
                    color="primary"
                    value={id}
                    error={error}
                    onChange={e => {
                        setId(e.target.value);
                        setError(false)
                    }}
                />
                <TextField
                    data-test='pair-device-pin'
                    variant="outlined"
                    label='Pin'
                    value={pin}
                    error={error}
                    onChange={(e => {
                        setPin(e.target.value);
                        setError(false)
                    })}
                />
                {error && <Typography color='error'>
                    Error! Try again!</Typography>}
                <Button
                    //disabled={pin.length!=12&&id.length!=6}
                    data-test='confirm-pair-device-button'
                    className={classes.button}
                    variant="contained"
                    onClick={onPairButtonClick}>Pair Device</Button>
            </div>
        </Dialog>
    )
}