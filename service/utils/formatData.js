import dayjs from "dayjs"

export const formatRelativeTime = (date) => {
    const now = dayjs()
    const target = dayjs(date)

    const diffInMinutes = now.diff(target, "minute")
    const diffInHours = now.diff(target, "hour")
    const diffInDays = now.diff(target, "day")
    const diffInWeeks = now.diff(target, "week")
    const diffInMonths = now.diff(target, "month")
    const diffInYears = now.diff(target, "year")

    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInHours < 24) return `${diffInHours}h`
    if (diffInDays < 7) return `${diffInDays}d`
    if (diffInWeeks < 4) return `${diffInWeeks}w`
    if (diffInMonths < 12) return `${diffInMonths}mo`
    return `${diffInYears}y`
}

export const formatBlogs = (blogs, userId) => {
    return blogs.map((blog) => ({
            ...blog,
            createdAt: dayjs(blog.createdAt).fromNow(),
            comments: blog.comments.map((comment) => ({
                ...comment,
                createdAt: formatRelativeTime(comment.createdAt)
            })),
            myReaction: blog.reactions.find(item => item.user._id.toString() === userId) || null
        }))
}