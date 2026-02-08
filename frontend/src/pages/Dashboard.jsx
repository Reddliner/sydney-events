import React from 'react'
import { useEffect, useState } from 'react'
import { api } from '../services/api'


export default function Dashboard() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api.get('/dashboard/events')
      .then(res => setEvents(res.data))
      .catch(() => {
        window.location.href = '/login'
      })
  }, [])

  const importEvent = async (id) => {
    await api.post(`/dashboard/events/${id}/import`)
    setEvents(events =>
      events.map(e =>
        e._id === id ? { ...e, status: 'imported' } : e
      )
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map(e => (
            <tr key={e._id}>
              <td>{e.title}</td>
              <td>{e.status}</td>
              <td>
                {e.status !== 'imported' && (
                  <button onClick={() => importEvent(e._id)}>
                    Import
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
