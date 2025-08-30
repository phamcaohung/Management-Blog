import { Skeleton } from "@mui/material"


const SkeletonBlog = () => {
    return (
        <div className="bg-[#242526] rounded-2xl mt-10 p-5">
            <div className="flex justify-between">
                <div className="flex">
                    <Skeleton
                        variant="circular"
                        animation="pulse"
                        sx={{ width: 70, height: 70, marginRight: 3, bgcolor: 'gray' }}
                    />
                    <div>
                        <div className="flex items-center">
                            <Skeleton
                                animation="pulse"
                                sx={{ width: 100, height: 20, bgcolor: "gray" }}
                            />
                        </div>
                        <Skeleton
                            animation="pulse"
                            sx={{ width: 40, height: 20, bgcolor: "gray" }}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <Skeleton
                    animation="pulse"
                    sx={{ width: 400, height: 20, bgcolor: "gray" }}
                />
            </div>
            <div className="mt-5">
                <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    sx={{ height: 400, bgcolor: "gray" }}
                />
            </div>
            <div className="flex justify-between">
                <Skeleton
                    animation="pulse"
                    sx={{ width: 300, height: 40, bgcolor: "gray" }}
                />
                <Skeleton
                    animation="pulse"
                    sx={{ width: 300, height: 40, bgcolor: "gray", mx: 5 }}
                />
                <Skeleton
                    animation="pulse"
                    sx={{ width: 300, height: 40, bgcolor: "gray" }}
                />
            </div>
        </div>
    )
}

export default SkeletonBlog