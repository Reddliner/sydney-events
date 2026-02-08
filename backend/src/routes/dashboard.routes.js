import express from 'express'
import Event from '../models/Event.js'


const router = express.Router()


router.post('/:id/import', async (req, res) => {
await Event.findByIdAndUpdate(req.params.id, {
status: 'imported',
importedAt: new Date(),
importedBy: req.user.displayName
})
res.json({ success: true })
})


export default router