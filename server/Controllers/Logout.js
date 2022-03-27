const  express = require('express')
const router = express.Router()

const User=require('../DBSchemas/User')

module.exports = router.delete('', async (req, res) => {
    try {
        const FindUser = await User.findById(req.user.id)
        FindUser.refreshToken = null
        FindUser.save()
        res.clearCookie('refreshToken')
        res.json({
            status: true,
            message: 'Logout Successful'
        })
    } catch (err) {
        res.status(500).json({})
    }
})