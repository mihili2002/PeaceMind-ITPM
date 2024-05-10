import React from 'react'
import '../styles/Therapistcontent.css'
import TherapistSidebar from './TherapistSidebar'
import TherapistPrescription from './TherapistPrescription'

const  Prehandling = () => {
  return (
    <div>
     <div className="dashboard">
        <TherapistSidebar/>
        <div className='dashboard-content'>
        <div>
            <TherapistPrescription/>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Prehandling