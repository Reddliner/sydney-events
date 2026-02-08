import axios from 'axios'
import { load } from 'cheerio'
import Event from '../models/Event.js'

const EVENTBRITE_URL =
  'https://www.eventbrite.com.au/d/australia--sydney/events/'

export const scrapeEventbrite = async () => {
  console.log('🔍 Scraping Eventbrite Sydney events...')

  const { data } = await axios.get(EVENTBRITE_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  })

  const $ = load(data)

  const scrapedUrls = []

  $('.search-event-card-wrapper').each(async (_, el) => {
    const title = $(el).find('h3').text().trim()
    const sourceUrl = $(el).find('a').attr('href')
    const imageUrl = $(el).find('img').attr('src')

    if (!title || !sourceUrl) return

    scrapedUrls.push(sourceUrl)

    const existing = await Event.findOne({ sourceUrl })

    if (!existing) {
      await Event.create({
        title,
        imageUrl,
        sourceName: 'Eventbrite',
        sourceUrl,
        status: 'new',
        lastScrapedAt: new Date()
      })

      console.log(`🆕 New event: ${title}`)
    } else {
      let hasChanged = false

      if (existing.title !== title) {
        existing.title = title
        hasChanged = true
      }

      if (existing.imageUrl !== imageUrl) {
        existing.imageUrl = imageUrl
        hasChanged = true
      }

      if (hasChanged) {
        existing.status =
          existing.status === 'imported' ? 'imported' : 'updated'
        existing.lastChangedAt = new Date()
        console.log(`🔄 Updated event: ${title}`)
      }

      existing.lastScrapedAt = new Date()
      await existing.save()
    }
  })

  const allEvents = await Event.find({
    sourceName: 'Eventbrite',
    status: { $ne: 'inactive' }
  })

  for (const event of allEvents) {
    if (!scrapedUrls.includes(event.sourceUrl)) {
      event.status = 'inactive'
      await event.save()
      console.log(`📴 Inactive event: ${event.title}`)
    }
  }

  console.log('✅ Eventbrite scraping completed')
}
