import React from 'react'
import { Outlet } from 'react-router'
import './App.css'
import Navbar from './component/Navbar'

export default function App() {
  return (
    <>
      <Navbar/>
      <main className='min-h-screen max-w-screen-2xl mx-auto px-8 md:px-20 py-6'>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}
