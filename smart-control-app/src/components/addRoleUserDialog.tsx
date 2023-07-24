import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material"
import { useAtomValue } from "jotai"
import { useState } from "react"
import { config } from "../config"
import { Role } from "../models/deviceItem"
import { tokenResponseAtom } from "../store/loginAtom"

type AddRoleUserDialogTypeProps = {
    open: boolean
    onClose: () => void
    deviceId: string;
}

export const AddRoleUserDialog = (props: AddRoleUserDialogTypeProps) => {
    const { open, onClose, deviceId } = props;
    const [role, setRole] = useState<Role>(Role.Admin);
    const [email, setEmail] = useState<string>("");
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const validEmail = expression.test(email);
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const error = buttonClicked && !validEmail;
    const tokenResponse = useAtomValue(tokenResponseAtom);

    const onButtonClick = () => {
        setButtonClicked(true);
        if (validEmail) {
            const headers = { 'Authorization': 'Bearer ' + tokenResponse.credential };
            fetch(config.api + "Device/addRole?email=" + email
                + "&deviceId=" + deviceId
                + "&roleStatus=" + role,
                { headers, method: "POST" })
                .then(resp => {
                    if (resp.ok) {
                        setEmail("");
                        onClose();
                    }
                })
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add new user to your device</DialogTitle>
            <DialogContent>
                <Stack gap={2}>
                    <TextField label="email" helperText={error && "Wrong email!"} error={error} value={email} onChange={e => setEmail(e.target.value)}></TextField>
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <RadioGroup
                            row
                            value={role}
                            onChange={(_, newValue) => setRole(+newValue)}
                        >
                            <FormControlLabel value={Role.Admin} label="Admin" control={<Radio />} />
                            <FormControlLabel value={Role.Guest} label="Guest" control={<Radio />} />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onButtonClick} disabled={error} variant="text">Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}