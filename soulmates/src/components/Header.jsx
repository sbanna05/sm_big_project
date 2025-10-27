import React from 'react'

function Header() {
  return (
    <nav className="navbar">
        <h1 className="logo">SoulMates</h1>
        <ul>
          <li>Home</li>
          <li>Reading</li>
          <li>Daily Mood</li>
          <li>Friends</li>
          <li className="active">Profile</li>
        </ul>
      </nav>
  )
}

export default Header
