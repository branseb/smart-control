import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        secondary: { main: '#3CB499' },
        primary: { main: '#796EBD' },
        background: {
            default: '#1e1e1e',
            paper: '#373737'
        },
        error: { main: '#BD472D' },
        warning: { main: '#DBA844' },
        text: {
            primary: '#ccc',
            secondary: '#bbb'
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: ({ theme }) => ({
                    borderColor: theme.palette.primary.main
                })
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: { background: 'rgba(204, 204, 204, 0.5)', backdropFilter: 'blur(2px)' }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '25px'
                }
            }
        },
        MuiDialog:{
            styleOverrides:{
                paper:{
                    borderRadius:"10px"
                }
            }
        }        
    }
})