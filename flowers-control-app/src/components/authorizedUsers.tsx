import { useAtomValue } from "jotai";
import { makeStyles } from "tss-react/mui";
import { loginUserAtom } from "../store/loginAtom";
import { DeviceDetailType } from "../models/deviceDetail";
import { Avatar, IconButton } from "@mui/material";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';


const useStyles = makeStyles({ name: 'AuthorizedUsers' })(theme => ({
    users: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
    },
    adminAvatar: {
        backgroundColor: theme.palette.primary.main,
        height: 36,
        width: 36,
        color: "white",
        marginLeft: "-10px",
        position: 'static',
        border: '1px solid black'
    },
    guestAvatar: {
        height: 36,
        width: 36,
        color: "white",
        marginLeft: "-10px",
        position: 'static',
        border: '1px solid black'
    },
    usersAndAddUser: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addButton: {
        background: theme.palette.secondary.dark
    }
}));

type AuthorizedUsersTypeProps = {
    deviceDetail: DeviceDetailType;
    onAddButtonClick: () => void;
}

export const AuthorizedUsers = (props: AuthorizedUsersTypeProps) => {
    const { classes } = useStyles();
    const { deviceDetail, onAddButtonClick } = props;
    const loginUser = useAtomValue(loginUserAtom);

    return (
        <div className={classes.usersAndAddUser}>
            <div className={classes.users}>
                {deviceDetail.guests
                    .map(guest =>
                        <Avatar className={classes.guestAvatar}>
                            {guest.toUpperCase()[0]}
                        </Avatar>)}
                {deviceDetail.admins
                    .filter(a => a != loginUser.email)
                    .map((admin, i) =>
                        <Avatar key={i} className={classes.adminAvatar} >
                            {admin.toUpperCase()[0]}
                        </Avatar>)}

                <img
                    src={loginUser.picture}
                    height={36}
                    style={{ borderRadius: '50%', marginLeft: '-10px', border: '1px solid black' }}
                />
            </div>
            <IconButton size="medium" className={classes.addButton} color="inherit" onClick={onAddButtonClick}>
                <PersonAddAltRoundedIcon fontSize='small' />
            </IconButton>
        </div>
    )
}