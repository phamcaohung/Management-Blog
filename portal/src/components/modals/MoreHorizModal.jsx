import { Collapse } from "@mui/material"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { saveOrUnSaveBlog } from "../../redux/actions/blogAction";
import EditIcon from '@mui/icons-material/Edit';


const MoreHorizModal = ({ open, blogId, conditionShow, setNotification }) => {
    const savedBlog = useSelector(store => store.auth?.user)?.saveBlog
    const dispatch = useDispatch()
    console.log("savedBlog: ", savedBlog);
    
    const isSave = savedBlog.some(id => id === blogId)
    console.log("isSave: ", isSave);
    const handleSaveBlog = async () => {
        const type = isSave ? "unsave" : "save"
        await dispatch(saveOrUnSaveBlog(blogId, { type: type }))
        setNotification(
            isSave 
                ? `UnSave Blog Successfully - ${Date.now()}` 
                : `Save Blog Successfully - ${Date.now()}`
        )
    }

    return (
        <>
            {open &&
                <Collapse in={open}>
                    <div className="bg-[#252728] w-60 h-auto absolute rounded-xl p-3 -translate-x-50 shadow-2xl">
                        {/* Save Blog */}
                        {!conditionShow &&
                            <div
                                onClick={handleSaveBlog}
                                className="flex items-center p-2 mt-5 hover:bg-white/10 cursor-pointer rounded-xl"
                            >
                                <BookmarkIcon
                                    fontSize="large"
                                    className="text-orange-300"
                                />
                                <h3 className="text-xl text-gray-200 ml-5">
                                    {isSave ? 'UnSave Blog' : 'Save Blog'}
                                </h3>
                            </div>
                        }

                        {conditionShow &&
                            <>
                                {/* Edit Blog */}
                                <div
                                    onClick={handleSaveBlog}
                                    className="flex items-center p-2 mt-5 hover:bg-white/10 cursor-pointer rounded-xl"
                                >
                                    <EditIcon
                                        fontSize="large"
                                        className="text-pink-400"
                                    />
                                    <h3 className="text-xl text-gray-200 ml-5">
                                        Edit Blog
                                    </h3>
                                </div>


                                {/* Delete Blog */}
                                <div
                                    onClick={handleSaveBlog}
                                    className="flex items-center p-2 mt-5 hover:bg-white/10 cursor-pointer rounded-xl"
                                >
                                    <DeleteIcon
                                        fontSize="large"
                                        className="text-red-400"
                                    />
                                    <h3 className="text-xl text-gray-200 ml-5">
                                        Delete Blog
                                    </h3>
                                </div>
                            </>
                        }
                    </div>
                </Collapse>
            }
        </>
    )
}

export default MoreHorizModal