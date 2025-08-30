import { Divider } from "@mui/material"
import { CustomTextField } from "../pages/CustomStyle"
import sponsored from '../../assets/Sponsored.png'
import sponsored_1 from '../../assets/Sponsored_1.jpg'


const RightBlog = () => {
    const menu = [
        { text: "Social Media Management", link: "managementblog.com", url: sponsored },
        { text: "Social Media Management", link: "managementblog.com", url: sponsored_1 },

    ]
    return (
        <div className="px-5">
            <div className="mb-5">
                <h3 className='text-gray-200 text-xl font-bold'>Sponsored</h3>
                {menu.map((item, index) => (
                    <div 
                        key={index}
                        className="mt-5 flex items-center"
                    >
                        <img
                            src={item.url}
                            alt=""
                            className="w-[250px] h-[200px]"
                        />
                        <div className="ml-5">
                            <h4 className="text-white text-xl">{item.text}</h4>
                            <h5 className="text-gray-300">{item.link}</h5>
                        </div>
                    </div>
                ))}
            </div>

            <Divider className="bg-gray-400" />
            <div className="mt-5">
                <CustomTextField
                    label="Groups"
                    variant="outlined"
                />
            </div>
        </div>
    )
}

export default RightBlog