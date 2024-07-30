import React from "react";
import ClientSidebar from "./ClientSidebar";
import ClientContentHeader from "./ClientContentHeader";
import { ClientCompletedsessions } from "./ClientCompletedsessions";
import guide from '../images/note.png'
import book from '../images/book.png'
import schedule from '../images/schedule.png'
import join from '../images/join.png'
import { ClientThoughtTable } from "./ClientThoughtTable";
//import mental from '../images/mental.jpg';
import '../styles/Clientdashboard.css'
import '../styles/Clientcontent.css'

const Dashboard = () => {
  return (
    <div className="flex gap-20 bg-blue-200 p-4">
      <ClientSidebar />
      <div className="flex flex-col w-4/5 bg-white rounded-lg p-8 gap-6 mr-60">
        <ClientContentHeader />
        <div className="overflow-y-auto">
          <div className="mx-10 my-7">
            <h1 className="font-light text-xl">Completed Sessions</h1>
            <ClientCompletedsessions />
          </div>
          <div className="mx-10 my-7">
            <h1 className="font-light text-xl">Thoughts</h1>
            <ClientThoughtTable />
          </div>
          <div className="flex flex-col gap-5 absolute top-0 right-0 mt-5 mr-5">
            <div>
              <p className="font-body font-light text-sm bg-gray-300 p-1 rounded-xl">Here are some<br /> guidelines to<br /> help your Happy<br /> Mind journey be easier.<img src={guide} className="h-50" /></p>
            </div>
            <div>
              <p className="font-body font-light text-sm bg-gray-300 p-1 rounded-xl"><p className="text-purple-700 font-bold text-xl">How to</p>book a therapist<img src={book} className="h-20" /></p>
            </div>
            <div>
              <p className="font-body font-light text-sm bg-gray-300 p-1 rounded-xl"><p className="text-purple-700 font-bold text-xl">How to</p>schedule a session<img src={schedule} className="h-20" /></p>
            </div>
            <div>
              <p className="font-body font-light text-sm bg-gray-300 p-1 rounded-xl"><p className="text-purple-700 font-bold text-xl">How to</p>join a session<img src={join} className="h-20" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
