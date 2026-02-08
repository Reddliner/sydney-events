import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Dashboard() {
  const [events, setEvents] = useState([])
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    api.get('/dashboard/events')
      .then(res => setEvents(res.data))
      .catch(() => (window.location.href = '#/login'))
  }, [])

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase())
  )

  const importEvent = async (id) => {
    await api.post(`/dashboard/events/${id}/import`)
    setEvents(events =>
      events.map(e =>
        e._id === id ? { ...e, status: 'imported' } : e
      )
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* LEFT */}
      <div style={{ width: '60%', padding: 24 }}>
        <h2>Event Dashboard</h2>

        <input
          placeholder="Search events…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <table width="100%" style={{ marginTop: 16 }}>
          <thead>
            <tr>
              <th align="left">Title</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e._id}
                  onClick={() => setSelected(e)}
                  style={{ cursor: 'pointer' }}>
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

      {/* RIGHT PREVIEW */}
      <div style={{
        width: '40%',
        borderLeft: '1px solid #eee',
        padding: 24
      }}>
        {selected ? (
          <>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <p><strong>Source:</strong> {selected.sourceName}</p>
            <p><strong>Status:</strong> {selected.status}</p>
          </>
        ) : (
          <p>Select an event to preview</p>
        )}
      </div>
    </div>
  )
}
