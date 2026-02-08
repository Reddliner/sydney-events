export default function Navbar() {
  return (
    <nav style={{
      padding: 16,
      borderBottom: '1px solid #eee',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <strong>Sydney Events</strong>
      <a href="#/login">Admin</a>
    </nav>
  )
}
