import { useState } from 'react'
import { api } from '../services/api'

export default function TicketModal({ event, onClose }) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)

  const submit = async () => {
    if (!email || !consent) return alert('Email + consent required')

    const res = await api.post(`/events/${event._id}/lead`, {
      email,
      consent
    })

    window.location.href = res.data.redirectUrl
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff',
        padding: 24,
        borderRadius: 12,
        width: 320
      }}>
        <h3>{event.title}</h3>

        <input
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div style={{ marginTop: 8 }}>
          <input
            type="checkbox"
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
          />{' '}
          I agree to receive updates
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button onClick={submit}>Continue</button>
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
