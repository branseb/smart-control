import { AppBar, Button, Drawer, IconButton, MenuList, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import { Outlet } from "react-router-dom"
import { useDevices } from "./hooks/hooks";
import { DeviceItem } from "./components/deviceItem";
import { Login } from "./components/login";
import { Menu } from "@mui/icons-material";


export const App = () => {
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const devices = useDevices();

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => setShowDrawer(true)}>
						<Menu />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Smarthome
					</Typography>
					<Login></Login>
				</Toolbar>
			</AppBar>
			<Drawer open={showDrawer} onClose={() => setShowDrawer(false)}>
				<MenuList>
					{devices?.length && devices.map(device =>
						<DeviceItem key={device.id} device={device} onItemClick={() => setShowDrawer(false)} />)}
				</MenuList>
			</Drawer>
			<Outlet />
		</div>
	)
}
