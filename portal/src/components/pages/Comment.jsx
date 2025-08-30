import { Avatar } from "@mui/material"
import ReactionComment from "./ReactionComment"


const Comment = ({ comment }) => {
    return (
        <div className="mt-5">
            <div className="flex">
                <Avatar
                    src={comment.user?.avatar}
                    sx={{ width: 70, height: 70, marginRight: 3 }}
                />
                <div className="">
                    <div className="bg-[#333334] rounded-2xl px-5 py-2 w-auto">
                        <div className="flex items-center">
                            <h2 className="font-bold mr-5 text-gray-300 text-lg">{comment.user?.name}</h2>
                        </div>
                        <h3 className="text-gray-300 text-xl">
                            {comment.content}
                        </h3>
                    </div>
                    <div className="flex">
                        <h6 className="text-gray-300 text-base ml-4 mt-2">
                            {comment.createdAt}
                        </h6>
                        <ReactionComment myReaction={comment.myReaction}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Comment