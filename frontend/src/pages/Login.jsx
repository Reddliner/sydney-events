import React from 'react'

export default function Login() {
  const login = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    if (!backendUrl) {
      alert('Backend URL is not configured')
      return
    }

    window.location.href = `${backendUrl}/auth/google`
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Login</h2>
      <button onClick={login}>Sign in with Google</button>
    </div>
  )
}
