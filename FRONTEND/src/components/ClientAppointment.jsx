import React from 'react'
import ClientSidebar from './ClientSidebar'
import ClientContentHeader from './ClientContentHeader'

const Appointment = () => {
  return (
    <div>
      <div className='dashboard'>
      <ClientSidebar/>
      <div className='dashboard-content'>
      <ClientContentHeader/>
      </div>
      </div>
    </div>
  )
}

export default Appointment