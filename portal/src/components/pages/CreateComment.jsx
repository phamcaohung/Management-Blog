import { Avatar } from "@mui/material"
import { useState } from "react"
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/actions/commentAction";
import { showNotification } from "../../redux/actions/notificationAction";


const CreateComment = ({ blogId }) => {
    const user = useSelector(store => store.auth?.user)
    const [content, setContent] = useState("")
    const isDisabled = content === ""
    const dispatch = useDispatch()

    const handleCreateComment = async (e) => {
        e.preventDefault()
        const data = {
            content: content,
            blogId: blogId
        }
        await dispatch(addComment(user._id, data))
        dispatch(showNotification("Create Comment Successfully", "success"))
        setContent("")
    }
    return (
        <div className="flex">
            <Avatar
                src={user.avatar}
                sx={{ width: 70, height: 70, marginRight: 3 }}
            />

            <div className="bg-[#333334] rounded-2xl px-5 py-2 w-full flex items-center">
                <textarea
                    rows={1}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`Write a public comment...`}
                    className="
                            w-full rounded-3xl py-3 text-gray-200 text-xl
                            placeholder-gray-400 focus:outline-none resize-none
                        "
                />
                <SendIcon
                    className={`${isDisabled ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer text-indigo-300'}`}
                    fontSize="large"
                    onClick={handleCreateComment}
                />
            </div>
        </div>
    )
}

export default CreateComment