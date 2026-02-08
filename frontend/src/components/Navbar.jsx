export default function Navbar() {
  return (
    <nav style={{ padding: 16, borderBottom: '1px solid #eee' }}>
      <a href="/">Events</a>
      <span style={{ float: 'right' }}>
        <a href="/login">Admin</a>
      </span>
    </nav>
  )
}
