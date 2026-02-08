import cron from 'node-cron'
import { scrapeEventbrite } from '../scrapers/eventbrite.scraper.js'

// Every 6 hours
export const startScrapeJob = () => {
  cron.schedule('0 */6 * * *', async () => {
    try {
      console.log('⏰ Scheduled scrape started')
      await scrapeEventbrite()
    } catch (err) {
      console.error('❌ Scrape failed', err.message)
    }
  })
}
