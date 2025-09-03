import { Grid } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"


const SaveBlogs = () => {
    const saveBlogs = useSelector(store => store.auth?.saveBlogs)

    useEffect

    return (
        <div>
            <Grid container>
                <Grid size={4}>

                </Grid>
                <Grid size={8}>
                    
                </Grid>
            </Grid>
        </div>
    )
}

export default SaveBlogs