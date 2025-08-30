import { Button, Paper, Popper, Stack, Tooltip } from "@mui/material"
import { REACTIONS } from "../../utils/data"


const ReactionModal = ({ open, handlePickReaction, reaction }) => {
    return (
        <Popper
            open={open}
            anchorEl={reaction}
            placement="top"
        >
            <Paper
                sx={{
                    px: 1,
                    py: 0.75,
                    borderRadius: 3,
                    backgroundColor: "#242526"
                }}
            >
                <Stack direction="row" spacing={1}>
                    {REACTIONS.map((item) => (
                        <Tooltip
                            key={item.reaction}
                            title={item.label}
                        >
                            <Button
                                onClick={(e) => handlePickReaction(e, item)}
                                sx={{ p: 0 }}
                            >
                                <img
                                    src={item.emoji}
                                    alt=""
                                    className="w-15 h-15"
                                />
                            </Button>
                        </Tooltip>
                    ))}
                </Stack>
            </Paper>
        </Popper>
    )
}

export default ReactionModal