import { useState } from 'react'
import TicketModal from './TicketModal'

export default function EventCard({ event }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ border: '1px solid #ddd', padding: 16, marginBottom: 16 }}>
      <h3>{event.title}</h3>
      <p>{event.venueName}</p>
      <p>{event.description}</p>

      <button onClick={() => setOpen(true)}>
        GET TICKETS
      </button>

      {open && (
        <TicketModal
          event={event}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}
