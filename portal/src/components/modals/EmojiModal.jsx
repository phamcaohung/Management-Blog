import { Collapse } from "@mui/material"
import EmojiPicker from "emoji-picker-react"


const EmojiModal = ({ open, setContent }) => {

    return (
        <>
            {open &&
                <Collapse in={open}>
                    <div className="absolute rounded-xl p-3 -translate-x-50 -translate-y-90 shadow-2xl h-30">
                            <EmojiPicker
                                categories={["smileys_people"]}
                                skinTonesDisabled={true}
                                width={500}
                                height={300}
                                onEmojiClick={(item) => setContent((prev) => prev + item.emoji)}
                            />
                    </div>
                </Collapse>
            }
        </>
    )
}

export default EmojiModal