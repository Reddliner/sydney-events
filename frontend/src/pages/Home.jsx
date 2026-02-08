import React from 'react'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import EventCard from '../components/EventCard'


export default function Home() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api.get('/events').then(res => setEvents(res.data))
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h2>Sydney Events</h2>
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  )
}
