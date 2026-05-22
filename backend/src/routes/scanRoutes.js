import express from 'express'
const router = express.Router();

router.post('/scan', (req, res)=>{
    const {username} = req.body;

    res.status(200).json({
        username
    })
})

export default router;