import { CustomAvatar } from "../pages/CustomStyle"


const LeftProfile = ({ photos }) => {
    

    return (
        <div className="bg-[#252728] rounded-xl px-5 py-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl text-gray-200 font-bold cursor-pointer hover:underline">
                    Photos
                </h2>
                <h3 className="text-xl text-blue-400 px-3 py-2 hover:bg-white/10 rounded-lg cursor-pointer">
                    See All Photos
                </h3>
            </div>
            <div className="flex justify-around mt-5">
                {photos?.map((item, index) => (
                    <CustomAvatar
                        key={index}
                        src={item}
                        variant="square"
                        sx={{
                            width: 150,
                            height: 150,
                            borderRadius: 2,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default LeftProfile