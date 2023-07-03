import { useParams } from "react-router-dom"

export const DetailPage = () => {

    const {id} = useParams()
    return(
        <div>
            detail page
            <h1>Id : {id}</h1>
        </div>
    )
}