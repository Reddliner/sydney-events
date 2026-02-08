import express from 'express'
import Event from '../models/Event.js'
import Lead from '../models/Lead.js'

const router = express.Router()

// GET /events
router.get('/', async (req, res) => {
  try {
    const {
      city = 'Sydney',
      q,
      startDate,
      endDate
    } = req.query

    const filter = {
      city,
      status: { $ne: 'inactive' }
    }

    // Date range filter
    if (startDate || endDate) {
      filter.dateTime = {}
      if (startDate) filter.dateTime.$gte = new Date(startDate)
      if (endDate) filter.dateTime.$lte = new Date(endDate)
    }

    let query = Event.find(filter)

    // Keyword search
    if (q) {
      query = query.find({
        $text: { $search: q }
      })
    }

    const events = await query
      .sort({ dateTime: 1 })
      .limit(100)

    res.json(events)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' })
  }
})


// POST /events/:id/lead
router.post('/:id/lead', async (req, res) => {
  try {
    const { email, consent } = req.body

    if (!email || consent !== true) {
      return res
        .status(400)
        .json({ error: 'Email and consent required' })
    }

    const event = await Event.findById(req.params.id)

    if (!event || event.status === 'inactive') {
      return res.status(404).json({ error: 'Event not found' })
    }

    await Lead.create({
      email,
      consent,
      event: event._id
    })

    res.json({
      redirectUrl: event.sourceUrl
    })
  } catch (err) {
    res.status(500).json({ error: 'Lead capture failed' })
  }
})

export default router
