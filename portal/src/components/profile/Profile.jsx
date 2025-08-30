import { useDispatch, useSelector } from "react-redux"
import { Divider, Grid, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LeftProfile from "./LeftProfile";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileByUser } from "../../redux/actions/userAction";
import { CustomAvatar } from "../pages/CustomStyle";
import FirstBlog from "../blogs/FirstBlog";
import Blogs from "../blogs/Blogs";


const Profile = () => {
    const profile = useSelector(store => store.user?.profile)
    const dispatch = useDispatch()
    const { userId } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            await dispatch(getProfileByUser(userId))
            setLoading(false)
        }
        fetch()
    }, [])

    return (
        <div>
            <div className="bg-gradient-to-b from-white to-black">
                <div className="flex justify-center">
                    {loading ? (
                        <Skeleton
                            variant="rectangular"
                            animation="pulse"
                            sx={{ width: 1200, height: 600, bgcolor: "gray" }}

                        />
                    ) : (
                        <img
                            src={profile.avatar}
                            alt=""
                            className="w-[1200px] h-[600px] rounded-2xl"
                        />
                    )}

                </div>
            </div>
            <div className="px-100 bg-[#252728] h-40">
                <div className="flex items-center mb-5">
                    {loading ? (
                        <Skeleton
                            variant="circular"
                            animation="pulse"
                            sx={{
                                width: 250,
                                height: 200,
                                bgcolor: "gray",
                                marginTop: -15,
                            }}
                        />
                    ) : (
                        <CustomAvatar
                            src={profile.avatar}
                            alt=""
                            sx={{
                                width: 200,
                                height: 200,
                                borderColor: "black",
                                borderWidth: 5,
                                marginTop: -15,
                            }}
                        />
                    )}

                    <div className="flex justify-between w-full mt-4">
                        <div className="pl-5">
                            {loading ? (
                                <Skeleton
                                    animation="pulse"
                                    sx={{ width: 200, height: 30, bgcolor: "gray" }}
                                />
                            ) : (
                                <h2 className="text-4xl text-white font-bold">{profile.name}</h2>
                            )}

                            <h5 className="text-gray-300 mt-2">{profile.totalFollowing} Following</h5>
                        </div>
                        <div className="flex px-5 bg-[#3B3D3E] h-14 items-center rounded-xl hover:bg-white/20 cursor-pointer">
                            <EditIcon className="text-gray-200" />
                            <h4 className="text-xl text-white font-semibold ml-2">Edit Profile</h4>
                        </div>
                    </div>
                </div>
                <Divider className="bg-gray-400" />
            </div>
            <Grid
                container
                className='h-auto bg-[#1C1C1D] px-72'
                spacing={3}
            >
                <Grid size={5} paddingY={5}>
                    <LeftProfile photos={profile?.photos} />
                </Grid>
                <Grid size={7} paddingY={5}>
                    <FirstBlog />
                    {profile?.blogsLast30Days?.map((item) => (
                        <Blogs
                            userId={userId}
                            key={item._id}
                            blog={item}
                        />
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile