import { AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import image from '../public/background.png';
import { Login } from "./components/login";

const useStyles = makeStyles({ name: 'app' })(() => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundImage: `url(${image})`
  }
}))

export const App = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Smarthome
          </Typography>
          <Login></Login>
        </Toolbar>
      </AppBar>

      <Outlet />
    </div>
  )
}
