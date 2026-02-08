import { useState } from 'react'
import { api } from '../services/api'

export default function TicketModal({ event, onClose }) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)

  const submit = async () => {
    const res = await api.post(`/events/${event._id}/lead`, {
      email,
      consent
    })

    window.location.href = res.data.redirectUrl
  }

  return (
    <div style={{ background: '#fff', padding: 20, border: '1px solid #000' }}>
      <h3>Get Tickets</h3>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <div>
        <input
          type="checkbox"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
        />
        I agree to receive emails
      </div>

      <button onClick={submit}>Continue</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  )
}
