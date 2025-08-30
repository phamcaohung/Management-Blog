import { Avatar, Skeleton, styled, TextField } from "@mui/material";


export const VisuallyHiddenInput = styled('input')({
    height: 1,
    overflow: 'hidden',
    width: 1
})

export const CustomTextField = styled(TextField)({
    "& label": { color: "white" },
    "& label.Mui-focused": { color: "white" },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#3A3B3C" },
        "&:hover fieldset": { borderColor: "#3A3B3C" },
        "&.Mui-focused fieldset": { borderColor: "#3A3B3C" },
    },
    "& .MuiInputBase-root": {
        color: "white",
    },
})

export const CustomAvatar = (props) => {
    return (
        <Avatar
            {...props}
            sx={{
                cursor: "pointer",
                "&:hover": {
                    filter: "brightness(1.2)",
                },
                ...props.sx,
            }}
        />
    )
}
