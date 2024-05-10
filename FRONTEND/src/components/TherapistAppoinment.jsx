import React from 'react'
import TherapistContentHeader from './TherapistContentHeader'
import '../styles/Therapistcontent.css'
import TherapistDefaultTable from './TherapistDefaultTable'
import TherapistSidebar from './TherapistSidebar'

const Appoinment = () => {
  return (
    <div>
     <div className="dashboard">
        <TherapistSidebar/>
        <div className='dashboard-content'>
        <div className="flex flex-col w-4/5 bg-white rounded-lg p-8 gap-6 mr-60">
          <TherapistContentHeader/>
          <div>
            <TherapistDefaultTable/>
          </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Appoinment