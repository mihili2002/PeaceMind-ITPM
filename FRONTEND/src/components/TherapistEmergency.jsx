import React from 'react'
import TherapistContentHeader from './TherapistContentHeader'
import '../styles/Therapistcontent.css'
// import Etable from './Etable'
import TherapistSidebar from './TherapistSidebar'
import TherapistEmergencyAppoinments from './TherapistEmergencyAppoinments'

const Emergency = () => {
  return (
    <div>
     <div className="dashboard">
        <TherapistSidebar/>
        <div className='dashboard-content'>
          <TherapistContentHeader/>
          <div>
           <TherapistEmergencyAppoinments/>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Emergency