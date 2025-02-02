import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
      <h1>Hello, Himanshu!</h1>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
