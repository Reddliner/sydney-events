import express from 'express'
import cors from 'cors'
import eventsRoutes from './routes/events.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Sydney Events API running'
  })
})

// 🔓 Public routes
app.use('/events', eventsRoutes)

export default app
