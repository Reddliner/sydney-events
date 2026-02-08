import mongoose from 'mongoose'

const LeadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true
    },

    consent: {
      type: Boolean,
      required: true
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },

    source: {
      type: String,
      default: 'event_listing'
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Lead', LeadSchema)
