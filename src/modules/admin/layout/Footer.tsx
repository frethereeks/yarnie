import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-white flex justify-center py-2 px-4 w-full'>
      <small className="p-2 text-xsmall">&copy; Copyright {new Date().getFullYear()}. Al-Ameen Restaurant. All rights reserved.</small>
    </footer>
  )
}
