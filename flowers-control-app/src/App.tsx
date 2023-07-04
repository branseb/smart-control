import { Button, Drawer, MenuList } from "@mui/material"
import { useState } from "react";
import { Outlet } from "react-router-dom"
import { useDevices } from "./hooks/hooks";
import { DeviceItem } from "./components/deviceItem";


export const App = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const devices = useDevices();


  return (
    <div>
      <Button variant="contained" onClick={() => setShowDrawer(true)}>Show Drawer</Button>
      <Drawer open={showDrawer}
        onClose={() => setShowDrawer(false)}>
        <h1>Drawer</h1>
        <MenuList>
          {devices?.length && devices.map(device =>
            <DeviceItem key={device.id} device={device} onItemClick={() => setShowDrawer(false)} />)}
        </MenuList>
      </Drawer>
      <Outlet />
    </div>
  )
}
