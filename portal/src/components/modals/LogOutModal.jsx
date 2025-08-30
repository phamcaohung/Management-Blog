import { Avatar, Collapse, Divider } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const LogOutModal = ({ user, open }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        await dispatch(logout())
        navigate("/signin")
    }

    return (
        <>
            {open &&
                <Collapse in={open}>
                    <div className='bg-[#242627] w-[400px] h-[350px] absolute right-5 top-20 rounded-xl px-5 py-7'>
                        <div className='p-5 bg-[#252728] shadow-2xl rounded-xl'>
                            <div className='flex items-center mb-3 py-3 px-2 hover:bg-white/10 rounded-xl'>
                                <Avatar
                                    src={user.avatar}
                                    sx={{ width: 50, height: 50, marginRight: 3 }}
                                />
                                <h2 className='text-gray-200 text-xl font-bold'>{user.name}</h2>
                            </div>
                            <Divider className="bg-gray-400" />
                            <button
                                className='w-full bg-[#4F5151] mt-5 text-white font-bold text-lg'
                            >
                                See All Profiles
                            </button>
                        </div>
                        <div 
                            onClick={handleLogOut}
                            className="flex items-center px-2 py-3 hover:bg-white/10 mt-2 rounded-xl cursor-pointer"
                        >
                            <div className="bg-[#4F5151] p-3 rounded-4xl mr-5">
                                <LogoutIcon 
                                    className='text-white' 
                                    sx={{ fontSize: 40 }}
                                />
                            </div>
                            <h3 className='text-gray-200 text-xl font-bold'>Log Out</h3>
                        </div>
                    </div>
                </Collapse>
            }
        </>
    )
}

export default LogOutModal