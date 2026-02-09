import './bootstrap.js'
import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import { connectDB } from './config/db.js'
import { startScrapeJob } from './jobs/scrape.job.js'

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()
    console.log('✅ MongoDB connected')

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)

      // Start scraper AFTER server is ready (non-blocking)
      setImmediate(() => {
        try {
          startScrapeJob()
        } catch (err) {
          console.error('❌ Scrape job failed to start', err.message)
        }
      })
    })
  } catch (err) {
    console.error('❌ Server startup failed', err)
    process.exit(1)
  }
}

startServer()
