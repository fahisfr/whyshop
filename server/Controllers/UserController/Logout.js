const  express = require('express')
const router = express.Router()

const User=require('../../Schemas/User')

module.exports = router.delete('', async (req, res) => {
    console.log('hai')
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
        console.log(err)
        res.status(500)
    }
})