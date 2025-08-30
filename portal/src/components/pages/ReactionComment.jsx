import { Box, ClickAwayListener } from "@mui/material"
import NotificationModal from "../modals/NotificationModal"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ReactionModal from "../modals/ReactionModal";
import { REACTIONS } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


const ReactionComment = ({ myReaction }) => {
    const user = useSelector(store => store.auth?.user)
    const [open, setOpen] = useState(false)
    const [reaction, setReaction] = useState(null)
    const [pick, setPick] = useState(null)
    const dispatch = useDispatch()
    const [notification, setNotification] = useState(null)
    const currentReaction = REACTIONS.find(item => item.reaction === myReaction?.reaction)

    const handleEnter = (e) => {
        setReaction(e.currentTarget)
        setOpen(true)
    }

    const handleLeave = () => setOpen(false)

    const handlePickReaction = async (e, item) => {
        e.preventDefault()
        setOpen(false)

        if (pick?.reaction === item.reaction) {
            setPick(null)
            const data = {
                blogId: blogId
            }
            //await dispatch(unReactionBlog(user._id, data))
            setNotification(`UnReaction ${item.label} Successfully`)
        }
        else {
            const data = {
                reaction: item.reaction,
                blogId: blogId
            }
            setPick(item)
            //await dispatch(reactionBlog(user._id, data))
            setNotification(`Reaction ${item.label} Successfully`)
        }
    }

    useEffect(() => {
        if (myReaction)
            setPick(myReaction)
        else
            setPick(null)
    }, [myReaction])

    return (
        <>
            {notification && 
                <NotificationModal
                    notification={notification}
                    severity={'success'}
                />
            }
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Box
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                >
                    <div className="flex items-center cursor-pointer">
                        {pick && 
                            <img
                                src={currentReaction ? currentReaction.emoji : pick?.emoji}
                                alt=""
                                className="w-15 h-15 mr-2"
                            />
                        }
                        <h6 className="text-gray-300 text-base ml-4 mt-2">
                            {currentReaction
                                ? currentReaction.label
                                : pick ? pick.label : 'Like'
                            }
                        </h6>
                    </div>

                    <ReactionModal
                        open={open}
                        reaction={reaction}
                        handlePickReaction={handlePickReaction}
                    />
                </Box>
            </ClickAwayListener>
        </>
    )
}

export default ReactionComment