import React from "react";
import ClientSidebar from './ClientSidebar'
import ClientContentHeader from './ClientContentHeader'
import {ClientUpcomingsessions} from "./ClientUpcomingsessions"
const Upcoming = () => {
  return (
    <div>
      {/* <div className="dashboard"> */}
      <div className="flex gap-20 bg-blue-200 p-4">
        <ClientSidebar />
        {/* <div className="dashboard-content"> */}
        <div className="flex flex-col w-4/5 bg-white rounded-lg p-8 gap-6">
          <ClientContentHeader />
          <h1 className="font-light text-xl">Upcoming Sessions</h1>
          <div>
            <ClientUpcomingsessions/>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Upcoming;
