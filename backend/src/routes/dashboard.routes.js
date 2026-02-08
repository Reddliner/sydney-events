import express from 'express'
import Event from '../models/Event.js'
import { requireAuth } from '../middleware/auth.middleware.js'

const router = express.Router()

// Protected dashboard event list
router.get('/events', requireAuth, async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 }).limit(200)
  res.json(events)
})

// Import event
router.post('/events/:id/import', requireAuth, async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, {
    status: 'imported',
    importedAt: new Date(),
    importedBy: req.user.email
  })

  res.json({ success: true })
})

export default router
