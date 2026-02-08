import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true
    },

    description: {
      type: String
    },

    dateTime: {
      type: Date,
      index: true
    },

    venueName: {
      type: String
    },

    venueAddress: {
      type: String
    },

    city: {
      type: String,
      default: 'Sydney',
      index: true
    },

    categories: {
      type: [String],
      default: []
    },

    imageUrl: {
      type: String
    },

    sourceName: {
      type: String,
      required: true
    },

    sourceUrl: {
      type: String,
      required: true,
      unique: true
    },

    // 🔁 Status lifecycle
    status: {
      type: String,
      enum: ['new', 'updated', 'inactive', 'imported'],
      default: 'new',
      index: true
    },

    // 🕒 Scraping metadata
    lastScrapedAt: {
      type: Date
    },

    lastChangedAt: {
      type: Date
    },

    // 📦 Dashboard import info
    importedAt: {
      type: Date
    },

    importedBy: {
      type: String
    },

    importNotes: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

// Helpful indexes for dashboard filters
EventSchema.index({ title: 'text', description: 'text', venueName: 'text' })

export default mongoose.model('Event', EventSchema)
