import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const ErrorPage = () => {

    const navigate = useNavigate()

    const onButtonClick = () => {
        navigate('/')
    }

    return (
        <div>
            <Typography>Error Page</Typography>
            <Typography>Upss.. Something its wrong!</Typography>
            <Button onClick={onButtonClick}>Go to Home page</Button>
        </div>
    )
}