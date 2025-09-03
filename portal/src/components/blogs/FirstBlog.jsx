import { Divider } from "@mui/material"
import VideocamIcon from '@mui/icons-material/Videocam';
import CollectionsIcon from '@mui/icons-material/Collections';
import EmojiEmotionsIcon from '@mui/icons-material/Mood';
import { useState } from "react";
import { useSelector } from "react-redux";
import CreateBlogModal from "../modals/CreateBlogModal";
import { CustomAvatar } from "../pages/CustomStyle";
import { useNavigate } from "react-router-dom";


const FirstBlog = () => {
    const menu = [
        { text: "Live Video", icon: VideocamIcon, color: 'text-[#F23E5C]'},
        { text: "Photo/Video", icon: CollectionsIcon, color: 'text-[#57C271]'},
        { text: "Feeling/Activity", icon: EmojiEmotionsIcon, color: 'text-[#F8C03E]'},
    ]
    const [ openModal, setOpenModal ] = useState(false)
    const user = useSelector(store => store.auth?.user)
    const navigate = useNavigate()

    return (
        <div className="bg-[#242526] rounded-2xl p-5">
            <div className="flex justify-evenly mb-5">
                <CustomAvatar
                    onClick={() => navigate(`/profile/${user._id}`)}
                    src={user.avatar}
                    sx={{ width: 70, height: 70, marginRight: 3 }}
                />
                <div 
                    onClick={() => setOpenModal(true)}
                    className="bg-[#333334] rounded-4xl flex items-center w-full h-16 hover:bg-white/10"
                >
                    <h2 className="pl-5 text-2xl text-gray-300">What's on your mind, {user.name} ?</h2>
                </div>
            </div>
            <Divider className="bg-gray-400" />
            <div className="flex justify-between mt-5">
                {menu.map((item) => (
                    <div 
                        key={item.text}
                        className="flex items-center hover:bg-white/10 rounded-lg px-8 py-3 cursor-pointer"
                    >
                        <item.icon fontSize="large" className={`${item.color} mr-2`} />
                        <h2 className="font-bold text-gray-300 text-xl">{item.text}</h2>
                    </div>
                ))}
            </div>

            {openModal && 
                <CreateBlogModal
                    open={openModal}
                    setOpenModal={setOpenModal}
                />
            }
        </div>
    )
}

export default FirstBlog 