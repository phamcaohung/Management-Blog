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
    const style = "flex items-center hover:bg-white/10 py-5 px-2 cursor-pointer rounded-xl"
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

            <div className={`${style}`}>
                <div className='w-[60px] mr-5 text-center'>
                    <BookmarkIcon
                        className="text-green-300"
                        sx={{ fontSize: 40 }}
                    />
                </div>
                <div 
                    onClick={() => navigate("/saved")}
                    className='flex justify-between items-center w-full'
                >
                    <h2 className='text-gray-200 text-xl font-bold'>
                        Saved
                    </h2>
                </div>
            </div>

            <div className={`${style}`}>
                <div className='w-[60px] mr-5 text-center'>
                    <DynamicFeedIcon
                        className="text-cyan-300"
                        sx={{ fontSize: 40 }}
                    />
                </div>
                <div className='flex justify-between items-center w-full'>
                    <h2 className='text-gray-200 text-xl font-bold'>
                        Following Blogs
                    </h2>
                </div>
            </div>
            <div
                onClick={() => setOpen(!open)}
                className={`${style}`}
            >
                <div className='w-[60px] mr-5 text-center'>
                    <GroupsIcon
                        className="text-purple-300"
                        sx={{ fontSize: 40 }}
                    />
                </div>
                <div className='flex justify-between items-center w-full'>
                    <h2 className='text-gray-200 text-xl font-bold'>
                        Groups
                    </h2>
                    {
                        !open ? (
                            <ExpandMore
                                className='text-gray-300'
                                fontSize='large'

                            />
                        ) : (
                            <ExpandLess
                                className='text-gray-300'
                                fontSize='large'
                            />
                        )
                    }
                </div>
            </div>
            <Collapse in={open}>
                <div className='flex items-center py-5 ml-15 hover:bg-white/10'>
                    <LayersIcon sx={{ fontSize: 40 }} className='text-yellow-300 mr-5' />
                    <h2 className='text-gray-200 text-xl font-bold'>item.name</h2>
                </div>
            </Collapse>
        </div>
    )
}

export default LeftBlog