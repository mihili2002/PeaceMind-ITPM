import React from 'react'
import '../styles/Therapistcontent.css'
import TherapistUser from './TherapistUser'
import TherapistSidebar from './TherapistSidebar'
import TherapistContentHeader from './TherapistContentHeader'
const Userprofile = () => {
  return (
    <div>
     <div className="dashboard">
        <TherapistSidebar/>
        <div className='dashboard-content'>
        <div className="flex flex-col w-4/5 bg-white rounded-lg p-8 gap-6 mr-60">
        <TherapistContentHeader/>
          <div>
            <TherapistUser/>
          </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Userprofile