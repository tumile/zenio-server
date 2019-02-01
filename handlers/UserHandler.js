const User = require("../models/User")

exports.findUser = async (req, res, next) => {
    try {
        const { searchVal, selected } = req.body
        const users = await User.find(
            {
                _id: { $nin: [...selected, req.userId] },
                $or: [
                    { firstName: { $regex: `${searchVal}` } },
                    { lastName: { $regex: `${searchVal}` } }
                ]
            },
            "firstName lastName avatar"
        ).limit(10)
        res.status(200).json({ users })
    } catch (error) {
        next({
            status: 500,
            type: "DATABASE_ERROR"
        })
    }
}
