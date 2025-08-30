import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { getBlogs } from "../../redux/actions/blogAction";
import SkeletonBlog from "../loading/SkeletonBlog";
import LeftBlog from "../blogs/LeftBlog";
import FirstBlog from "../blogs/FirstBlog";
import Blogs from "../blogs/Blogs";
import RightBlog from "../blogs/RightBlog";


const Home = () => {
    const blogs = useSelector(store => store.blogs?.blogs)
    const user = useSelector(store => store.auth?.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    console.log("user: ", user)

    useEffect(() => {
        const fetch = async () => {
            if (user) {
                setLoading(true)
                await dispatch(getBlogs(10, 0))
                setLoading(false)
            }
        }
        fetch()
    }, [user, dispatch])

    return (
        <div className={`bg-[#1C1C1D] ${blogs.length === 0 ? 'h-screen' : 'h-auto'} w-full pb-14`}>
            <Grid container>
                <Grid size={3} marginTop={2}>
                    <LeftBlog
                        user={user}
                    />
                </Grid>

                <Grid
                    size={6}
                    paddingX={10}
                    marginTop={2}
                >
                    <FirstBlog />
                    {loading ? (
                        blogs.map((item) =>
                            <SkeletonBlog key={item._id} />
                        )
                    ) : (
                        blogs.map((item) =>
                            <Blogs
                                loading={loading}
                                userId={user._id}
                                key={item._id}
                                blog={item}
                            />
                        )
                    )}
                </Grid>

                <Grid size={3} marginTop={2}>
                    <RightBlog />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home