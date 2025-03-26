import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

async function DesktopNavbar() {
  const user = await currentUser()
  console.log("user is here", user)
  return (
    <div>DesktopNavbar</div>
  )
}

export default DesktopNavbar