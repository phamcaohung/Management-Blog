import BookmarkIcon from '@mui/icons-material/Bookmark';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupsIcon from '@mui/icons-material/Groups';
import { Avatar, Collapse } from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const LeftBlog = ({ user }) => {
    const menu = [
        { name: "Saved", image: BookmarkIcon, color: 'text-green-300' },
        { name: "Following Blogs", image: DynamicFeedIcon, color: 'text-cyan-300' },
        { name: "Groups", image: GroupsIcon, color: 'text-purple-300' },
    ]

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    
    return (
        <div className="px-5">
            <div 
                onClick={() => navigate(`/profile/${user._id}`)}
                className='flex items-center hover:bg-white/10 py-5 px-2 cursor-pointer rounded-xl'
            >
                <div className='w-[60px] mr-5'>
                    <Avatar
                        src={user.avatar}
                        sx={{ width: 60, height: 60 }}
                    />
                </div>
                <h3 className='text-gray-200 text-xl font-bold'>{user.name}</h3>
            </div>
            {menu.map((item) => (
                <div
                    key={item.name}
                    onClick={() => setOpen(!open)}
                    className='flex items-center hover:bg-white/10 py-5 px-2 cursor-pointer rounded-xl'
                >
                    <div className='w-[60px] mr-5 text-center'>
                        <item.image
                            className={`${item.color}`} 
                            sx={{ fontSize: 40 }}
                        />
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <h2 className='text-gray-200 text-xl font-bold'>
                            {item.name}
                        </h2>
                        {item.name === "Groups" ? (
                            !open ? (
                                <ExpandLess
                                    className='text-gray-300'
                                    fontSize='large'

                                />
                            ) : (
                                <ExpandMore
                                    className='text-gray-300'
                                    fontSize='large'
                                />
                            )
                        ) : <></>}
                    </div>
                </div>
            ))}
            <Collapse in={open}>
                <div className='flex items-center py-5 ml-15 hover:bg-white/10'>
                    <LayersIcon sx={{ fontSize: 40 }} className='text-yellow-300 mr-5'/>
                    <h2 className='text-gray-200 text-xl font-bold'>item.name</h2>
                </div>
            </Collapse>
        </div>
    )
}

export default LeftBlog