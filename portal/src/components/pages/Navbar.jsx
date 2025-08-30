import logo from '../../assets/logo.png'
import HomeIcon from '@mui/icons-material/Home'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LogOutModal from '../modals/LogOutModal';
import { CustomAvatar } from './CustomStyle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useLocation, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate()
    const user = useSelector(store => store.auth?.user)
    const [open, setOpen] = useState(false)
    const menu = [
        { icon: HomeIcon, route: "/" },
        { icon: AccountBoxIcon, route: `/profile/${user._id}` },
    ]
    const location = useLocation()

    return (
        <div className="bg-[#252728] h-[80px] sticky top-0">
            <div className="flex justify-between items-center h-full">
                <img
                    className="w-auto h-[70px] ml-3"
                    src={logo}
                    alt=""
                />
                <div className='flex'>
                    {menu.map((item, index) => {
                        const active = location.pathname === item.route
                        return (
                            <div
                                onClick={() => navigate(item.route)}
                                key={index}
                                className={`
                                    ${active && 'border-b-6 border-blue-500'} 
                                    pt-6 ml-10 cursor-pointer text-center w-30
                                    transition-all duration-300 hover:bg-white/10
                                `}
                            >
                                <item.icon
                                    sx={{
                                        fontSize: 50
                                    }}
                                    className={`${active ? 'text-blue-500' : 'text-gray-400'}`}
                                />
                            </div>
                        )
                    })}
                </div>

                <div className="flex items-center">
                    <div className='bg-[#4F5152] rounded-4xl p-2 mr-7'>
                        <NotificationsIcon
                            sx={{
                                fontSize: 30
                            }}
                            className='text-white'
                        />
                    </div>

                    <CustomAvatar
                        onClick={() => setOpen(!open)}
                        src={user.avatar}
                        sx={{ width: 60, height: 60, marginRight: 3 }}
                    />
                </div>
            </div>
            <LogOutModal
                user={user}
                open={open}
            />
        </div>
    )
}

export default Navbar