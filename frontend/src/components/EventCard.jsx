import { useState } from 'react'
import TicketModal from './TicketModal'

export default function EventCard({ event }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      background: '#fff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 16,
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
    }}>
      <h3>{event.title}</h3>
      <p><strong>{event.venueName || 'Sydney'}</strong></p>
      <p style={{ opacity: 0.8 }}>
        {event.description?.slice(0, 120)}…
      </p>

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
