import { Button, Drawer } from "@mui/material"
import { useState } from "react";
import { Outlet } from "react-router-dom"
import { getDevices } from "./hooks/hooks";
import { DeviceItem } from "./components/deviceItem";


export const App = () => {
  const [showDrawer,setShowDrawer] = useState<boolean>(false);
    const devices = getDevices();

  

  return (
      <div>
        <Button onClick={()=>setShowDrawer(true)}>Show Drawer</Button>
        <Drawer open={showDrawer}
        onClose={()=>setShowDrawer(false)}>
          <h1>Drawer</h1>
          {devices?.length&&devices.map(device=>
            <DeviceItem key={device.id} device={device}/>)}
        </Drawer>
       <h1>Vite + React</h1>
       <Outlet/>
      </div>
  )
}
