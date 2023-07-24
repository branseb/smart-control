import LogoutIcon from '@mui/icons-material/Logout';
import { Popover, Typography } from "@mui/material";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useAtom } from "jotai";
import { Fragment, useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { config } from "../config";
import { loginUserAtom, tokenResponseAtom } from "../store/loginAtom";

const useStyles = makeStyles({ name: 'login' })(() => ({
	popoverposition: {
		paddingLeft: 20
	},
	popoverContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'end',
		padding: '10px',
		gap: 10
	},
	logoutContent: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10
	}
}))

export const Login = () => {
	const { classes } = useStyles();
	const [tokenResponse, setTokenResponse] = useAtom(tokenResponseAtom);
	const [user, setUser] = useAtom(loginUserAtom);
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
	const openUserMenu = Boolean(anchorEl);
	var popoverId = openUserMenu ? 'simple-popover' : undefined;

	useEffect(() => {
		if (tokenResponse.credential) {
			const headers = { 'Authorization': 'Bearer ' + tokenResponse.credential };
			fetch(`${config.api}Devices/user`, { headers })
				.then(resp => resp.json())
				.then(setUser)
		}
	}, [tokenResponse]);

	if (user)
		return (
			<Fragment>
				<img
					src={user.picture}
					onClick={(e) => setAnchorEl(e.currentTarget)}
					aria-describedby={popoverId}
					height={36}
					style={{ borderRadius: '50%' }}
				/>
				<Popover
					open={openUserMenu}
					id={popoverId}
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'center',
						horizontal: 'right',
					}}
					onClose={() => setAnchorEl(null)}>
					<div className={classes.popoverContent}>
						<Typography>{user.email}</Typography>
						<div
							className={classes.logoutContent}
							onClick={() => { setUser(undefined); googleLogout() }}>
							<Typography>logout</Typography>
							<LogoutIcon sx={{ color: 'white' }} /></div>
					</div>
				</Popover>
			</Fragment>
		)

	return (
		<GoogleLogin onSuccess={setTokenResponse} auto_select useOneTap={true} theme="outline" type="icon" />
	)
};
