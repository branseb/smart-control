import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette:{
        secondary:{main:'#3CB499'},
        primary:{main:'#796EBD'},
        background:{
            default:'#1e1e1e',
            paper:'#373737'
        },
        error:{main:'#BD472D'},
        warning:{main:'#DBA844'},
        text:{primary:'#ccc'}
    }
})