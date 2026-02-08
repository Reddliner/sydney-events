export default function Login() {
  const login = () => {
    window.location.href =
      import.meta.env.VITE_API_URL + '/auth/google'
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Login</h2>
      <button onClick={login}>Sign in with Google</button>
    </div>
  )
}
