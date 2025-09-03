import { Avatar, Button, Divider, Modal } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { VisuallyHiddenInput } from "../pages/CustomStyle";
import { createBlog } from "../../redux/actions/blogAction";
import EmojiEmotionsIcon from '@mui/icons-material/Mood';
import EmojiModal from "./EmojiModal";
import { showNotification } from "../../redux/actions/notificationAction";



const CreateBlogModal = ({ open, setOpenModal }) => {
    const user = useSelector(store => store.auth?.user)
    const [content, setContent] = useState("")
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const isDisabled = file === null && content === ""
    const [openEmoji, setOpenEmoji] = useState(false)


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (
            selectedFile.type !== "image/jpeg" &&
            selectedFile.type !== "image/png" &&
            selectedFile.type !== "image/jpg" &&
            selectedFile.type !== "video/mp4"
        )
            dispatch(showNotification(
                "Please upload a valid image file (jpeg, jpg, png) or video file mp4.",
                "error"
            ))
        else if (
            selectedFile.type === "image/jpeg" &&
            selectedFile.type === "image/png" &&
            selectedFile.type === "image/jpg" &&
            file.size > 10 * 1024 * 1024
        )
            dispatch(showNotification(
                "Please upload an image file less than 10MB",
                "error"
            ))
        else if (selectedFile.type === "video/mp4" && selectedFile.size > 50 * 1024 * 1024)
            dispatch(showNotification(
                "Please select an image or video file under 50MB.",
                "error"
            ))
        else
            setFile(selectedFile)
    }

    const handleCreateBlog = async (e) => {
        e.preventDefault()
        const data = {
            content: content,
            file: file
        }
        await dispatch(createBlog(data))
        dispatch(showNotification("Create Blog Successfully", "success"))
        setOpenModal(false)
    }

    const handleChangeEmoji = () => {
        setOpenEmoji(!openEmoji)
    }


    return (
        <Modal open={open} onClose={() => setOpenModal(false)}>
            <div className="bg-[#252728] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-auto">
                <div className="mb-3 flex justify-between mt-3 px-5 ">
                    <div></div>
                    <h6 className="text-3xl font-bold text-white">Create Blog</h6>

                    <div
                        className="cursor-pointer bg-gray-600 rounded-2xl"
                        onClick={() => setOpenModal(false)}
                    >
                        <ClearIcon
                            fontSize="large"
                            className="text-gray-300"
                        />
                    </div>
                </div>
                <Divider className="bg-gray-400" />
                <div className="mt-5 px-5 pb-5">
                    <div className="flex items-center">
                        <Avatar
                            src={user.avatar}
                            sx={{ width: 70, height: 70, marginRight: 3 }}
                        />
                        <h2 className="font-bold mr-5 text-gray-300 text-xl">{user.name}</h2>
                    </div>
                    <textarea
                        rows={file ? 2 : 4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What's on your mind, ${user.name} ?`}
                        className="
                                w-full rounded-3xl py-3 text-gray-200 text-2xl mt-3
                                placeholder-gray-400 focus:outline-none resize-none cursor-pointer
                            "
                    />
                    {file &&
                        <div className="w-full h-[290px] border border-gray-400 rounded-xl mb-5">
                            <img
                                src={URL.createObjectURL(file)}
                                alt=""
                                className="w-full h-full"
                            />
                        </div>
                    }
                    <div className="border border-gray-400 flex items-center justify-between px-5 py-4 rounded-xl">
                        <h2 className="text-2xl text-gray-300 font-semibold">Add To Your Blog</h2>
                        <div>
                            <Button
                                component="label"
                                onChange={handleFileChange}
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                <CollectionsIcon className="text-[#57C271] mr-2" fontSize="large" />
                                <VisuallyHiddenInput type="file" />
                            </Button>
                            <Button
                                onClick={handleChangeEmoji}
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                <EmojiEmotionsIcon className="text-[#F8C03E] mr-2" fontSize="large" />
                            </Button>
                            <EmojiModal 
                                open={openEmoji} 
                                setContent={setContent}
                            />
                        </div>
                    </div>
                    <button
                        disabled={isDisabled}
                        onClick={handleCreateBlog}
                        className={`${isDisabled ? 'bg-[#3B3D3E] cursor-not-allowed' : 'bg-[#2176FF] cursor-pointer'} w-full  mt-5 text-2xl text-white font-bold`}
                    >
                        Post
                    </button>
                </div>
            </div>
        </Modal >
    )
}

export default CreateBlogModal