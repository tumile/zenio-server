const User = require("../models/User")

exports.findUsers = async (req, res, next) => {
    try {
        const { searchVal, selected } = req.body
        const users = await User.find(
            {
                _id: { $nin: [...selected, req.userId] },
                $or: [
                    { givenName: { $regex: `${searchVal}` } },
                    { familyName: { $regex: `${searchVal}` } }
                ]
            },
            "givenName familyName photo"
        ).limit(10)
        res.status(200).json({ users })
    } catch (error) {
        next({
            message: error.message
        })
    }
}
