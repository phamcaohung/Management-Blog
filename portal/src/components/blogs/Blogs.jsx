import { Collapse, Divider } from "@mui/material"
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useState } from "react";
import Comment from "../pages/Comment";
import CreateComment from "../pages/CreateComment";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreHorizModal from "../modals/MoreHorizModal";
import ReactionBlog from "../pages/ReactionBlog";
import { REACTIONS_IMAGE } from "../../utils/data";
import { CustomAvatar } from "../pages/CustomStyle";
import NotificationModal from "../modals/NotificationModal";



const Blogs = ({ blog, userId }) => {
    const [open, setOpen] = useState(false)
    const [moreHorizIcon, setMoreHorizIcon] = useState(false)
    const conditionShow = userId === blog.user?._id 
    const [notification, setNotification] = useState(null)

    return (
        <div className="bg-[#242526] rounded-2xl mt-10 p-5">
            {notification &&
                <NotificationModal 
                    notification={notification}
                    severity={'success'}
                />
            }
            <div className="flex justify-between">
                <div className="flex">
                    <CustomAvatar
                        src={blog?.user?.avatar}
                        sx={{ width: 70, height: 70, marginRight: 3 }}
                    />
                    <div>
                        <div className="flex items-center">
                            <h2 className="font-bold text-gray-300 text-xl">
                                {blog.user?.name}
                            </h2>
                            <h3 className="font-bold text-blue-400 ml-5 text-lg cursor-pointer">
                                {userId === blog.user?._id ? '' : 'Follow'}
                            </h3>
                        </div>
                        <h3 className="font-semibold text-gray-300 text-base mt-2">{blog.createdAt}</h3>
                    </div>
                </div>
                <div>
                    <MoreHorizIcon
                        fontSize="large"
                        className="text-gray-300 cursor-pointer"
                        onClick={() => setMoreHorizIcon(!moreHorizIcon)}
                    />
                    <MoreHorizModal 
                        open={moreHorizIcon} 
                        blogId={blog._id}
                        conditionShow={conditionShow}
                        setNotification={setNotification}
                    />
                </div>
            </div>
            <div className="mt-5">
                <h2 className="text-xl text-white">{blog.content}</h2>
            </div>
            <div className="mt-5">
                <img
                    src={blog.fileUrl}
                    alt=""
                    className="w-full"
                />
            </div>
            <div className="flex justify-between my-3">
                <div className="flex items-center ml-2">
                    {blog.reactions.map((item) =>
                        <img
                            key={item._id}
                            src={REACTIONS_IMAGE[item.reaction]}
                            alt=""
                            className="w-10 h-10 -ml-3"
                        />
                    )}
                    {blog.reactions.length !== 0 &&
                        <h5 className="text-lg text-gray-300 cursor-pointer ml-1">
                            {blog.reactions?.length}
                        </h5>
                    }
                </div>
                <div className="flex items-center">
                    <h5
                        className="text-lg text-gray-300 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        {blog.comments?.length} comments
                    </h5>
                </div>
            </div >
            <Divider className="bg-gray-400" />
            <div className="flex justify-between px-44 mt-3">
                <div className="flex items-center">
                    <ReactionBlog
                        blogId={blog._id}
                        myReaction={blog.myReaction}
                    />
                </div>
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    <ModeCommentIcon className="text-gray-300 mr-2" fontSize="large" />
                    <h4 className="text-gray-300 text-xl">Comments</h4>
                </div>
            </div>
            <Collapse in={open}>
                <div className="mt-2 space-y-3">
                    <Divider className="bg-gray-400" />
                    {blog.comments.length === 0 &&
                        <div className="h-20 flex justify-center items-center">
                            <h2 className="text-lg text-gray-300">Be the first to comment.</h2>
                        </div>
                    }
                    {blog.comments.map((item) =>
                        <Comment comment={item} key={item._id} />
                    )}
                    <CreateComment user={blog.user} blogId={blog._id} />
                </div>
            </Collapse>
        </div>
    )
}

export default Blogs