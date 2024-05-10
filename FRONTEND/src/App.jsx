import React, { useState } from 'react';
//import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Payment
import PaymentHome from './components/PaymentHome';
import PaymentSidebar from './components/PaymentSidebar';
import PaymentPaymentAdmin from './components/PaymentUser/PaymentPaymentAdmin';
import PaymentContent from './components/PaymentUser/PaymentContent';
import PaymentBookingPayment from './components/PaymentUser/PaymentBooking_Payment';
import PaymentPrescriptionPayment from './components/PaymentUser/PaymentPrescription_Payment';
import PaymentMonthlyOverview from './components/PaymentUser/PaymentMonthly_Overview';
import PaymentInvoice from './components/PaymentUser/PaymentInvoice';
import PaymentPaymentForm from './components/PaymentUser/PaymentPaymentForm';
import PaymentEditPaymentForm from './components/PaymentUser/PaymentEditPaymentForm';
import PaymentPaymentHistory from './components/PaymentUser/PaymentPayment_History';
import PaymentRefund from './components/PaymentUser/PaymentRefund';
import PaymentAdminDashboard from './components/PaymentAdmin/PaymentAdminDashboard';
import PaymentLayout from './components/PaymentLayout';
import PaymentContentHeader from './components/PaymentUser/PaymentContentHeader';
import PaymentASidebar from './components/PaymentASidebar';
import PaymentALayout from './components/PaymentALayout';
import PaymentManagePayments from './components/PaymentAdmin/PaymentManagePayments';
import PaymentAInvoice from './components/PaymentAdmin/PaymentAInvoice';
import PaymentManageRefunds from './components/PaymentAdmin/PaymentManageRefunds';
import PaymentAMonthlyOverview from './components/PaymentAdmin/PaymentAMonthlyOverview';
import PaymentAPaymentHistory from './components/PaymentAdmin/PaymentAPaymentHistory';
// Client
import ClientHome from "./components/ClientHome";
import ClientCreateacc from "./components/ClientCreateacc";
import ClientSidebar from './components/ClientSidebar';
import ClientDashboard from "./components/ClientDashboard";
import ClientAppointment from "./components/ClientAppointment";
import ClientUpcoming from "./components/ClientUpcoming";
import ClientUser from "./components/ClientUser";
import ClientUpdateUser from "./components/ClientUpdateUser";
import ClientLogin from "./components/ClientLogin";
import ClientAdminlogin from "./components/ClientAdminlogin";
import ClientUserprofile from "./components/ClientUserprofile";
import ClientThoughtForm from "./components/ClientThoughtForm"
//Appointment
import AppointmenContent from './components/AppointmenContent';
import AppointmenContentHeader from './components/AppointmenContentHeader';
import AppointmenAppointment from "./components/AppointmenAppointment";
import AppointmenHistory from "./components/AppointmenHistory"
import AppointmenAdminTable from './components/AppointmenAdminTable';
import AppointmenEditAppointment from './components/AppointmenEditAppointment';
import AppointmentLayout from './components/AppointmentLayout';
//Pharmacy
import PharmacyMonthlyOverview from './components/PharmacyMonthly_Overview';  
import PharmacyInvoice from './components/PharmacyInvoice';
import PharmacyDrugForm from './components/PharmacyDrugForm';
import PharmacyEditDrugForm from './components/PharmacyEditDrugForm';
import PharmacyDrugHistory from './components/PharmacyDrug_History';
import PharmacyContentHeader from './components/PharmacyContentHeader';
import PharmacyLayout from './components/PharmacyLayout';
import PharmacyManagePrescription from './components/PharmacyManagePrescription';
import PharmacyDrugChargers from './components/Pharmacydrugchargers';
//Therapist
import TherapistSidebar from './components/TherapistSidebar.jsx';
import TherapistContent from './components/TherapistContent.jsx';
import TherapistContentHeader from './components/TherapistContentHeader.jsx';
import TherapistAppoinment from './components/TherapistAppoinment.jsx';
import TherapistDashboard from './components/TherapistDashboard.jsx';
import TherapistAddTherapist from './components/TherapistAddTherapist.jsx';
import TherapistEmergency from './components/TherapistEmergency.jsx';
import TherapistPrehandling from './components/TherapistPrehandling.jsx';
import TherapistUserprofile from './components/TherapistUserprofile.jsx';
import TherapistEmergencyAppoinments from './components/TherapistEmergencyAppoinments.jsx';
import TherapistAdmin from './components/TherapistAdmin.jsx';
import TherapistTherapistDashboard from './components/TherapistTherapistDashboard.jsx';
import TherapistTherapistLogin from './components/TherapistTherapistLogin.jsx'
import TherapistViewThought from './components/TherapistViewThought.jsx';
//Emergency
import EmeInset from './components/addemeappo';
import ALLeme from './components/allemeappo';
import UpdateemeAp from './components/UpdateEmeAppoinment';
import Emere from './components/emeReport';
import Deleme from './components/deleteemeapo';
import Addemepres from './components/addemepres';
import Dovap from './components/docviewemeapo';
import Doviewallpre from './components/docviewallpres';
import Doviewallapo from './components/doctorviewallapo';
import VIewpres from './components/viewpres';
//Salary
import Home from "./components/Home/Home";
import AddUser from"./components/AddUser/AddUser";
import Users from "./components/UserDetails/Users";
import UpdateUser from "./components/UpdateUser/UpdateUser";
//Waitlist
import WaitlistMonthlyOverview from './components/WaitlistMonthly_Overview';
import WaitlistForm from './components/WaitlistForm';
import WaitlistHistory from './components/Waitlist_History';
import EditWaitlistForm from './components/EditWaitlistForm.jsx';
import WaitlistContentHeader from './components/WaitlistContentHeader';
import WaitlistLayout from './components/WaitlistLayout';
const App = () => {
  
  return (
    <Router>
         {/* <PaymentHome/> */}
          <Routes>
          {/* Payment User route */}
            <Route path="/PaymentSidebar" element={<PaymentSidebar />} />
            <Route path="/PaymentUser/PaymentContentHeader" element={<PaymentLayout><PaymentContentHeader /></PaymentLayout>} />
            <Route path="/PaymentUser/PaymentContent" element={<PaymentLayout><PaymentContent /></PaymentLayout>} />
            <Route path="/PaymentUser/PaymentPaymentAdmin" element={<PaymentLayout><PaymentPaymentAdmin/></PaymentLayout>} />
            <Route path="/PaymentUser/PaymentBooking_Payment" element={<PaymentLayout><PaymentBookingPayment /></PaymentLayout>} />
            <Route path="/PaymentUser/PaymentPrescription_Payment" element={<PaymentLayout><PaymentPrescriptionPayment /></PaymentLayout>} />
            <Route path="/PaymentUser/PaymentInvoice" element={<PaymentLayout><PaymentInvoice /></PaymentLayout>} />
            <Route path="/Paymentinvoice/:invoiceID" element={<PaymentLayout><PaymentInvoice /></PaymentLayout>} />
            <Route path="/PaymentUser/PaymentMonthly_Overview" element={<PaymentLayout><PaymentMonthlyOverview /></PaymentLayout>} />
            <Route path="/PaymentUser/Paymentmonthly" element={<PaymentLayout><PaymentMonthlyOverview /></PaymentLayout>} />
            <Route path="/PaymentUser/Paymentweekly" element={<PaymentLayout><PaymentMonthlyOverview /></PaymentLayout>} />
            <Route path="/PaymentUser/Paymentadd" element={<PaymentLayout><PaymentPaymentForm /></PaymentLayout>} />
            <Route path="/PaymentUser/EditPaymentForm" element={<PaymentLayout><PaymentEditPaymentForm /></PaymentLayout>} />
            <Route path="/Paymentupdate/:id" element={<PaymentLayout><PaymentEditPaymentForm/></PaymentLayout>}/>
            <Route path="/allpayments" element={<PaymentLayout><PaymentPaymentHistory /></PaymentLayout>} />
            <Route path="/PaymentUser/PaymentPayment_History" element={<PaymentLayout><PaymentPaymentHistory /></PaymentLayout>} />
            <Route path="/PaymentUser/Paymentdelete/:id" element={<PaymentLayout><PaymentPaymentHistory /></PaymentLayout>} />
            <Route path="/PaymentUser/PaymentRefund" element= {<PaymentLayout><PaymentRefund /></PaymentLayout>}/>
            {/* Payment Admin route */}
            <Route path="/PaymentAdmin/PaymentAdminDashboard" element= {<PaymentALayout><PaymentAdminDashboard /></PaymentALayout>}/>
            <Route path="/PaymentASidebar" element= {<PaymentASidebar />}/>
            <Route path="/PaymentAdmin/PaymentManagePayments" element= {<PaymentALayout><PaymentManagePayments/></PaymentALayout>}/>
            <Route path="/PaymentupdateStatus/:id" element= {<PaymentALayout><PaymentManagePayments/></PaymentALayout>}/>
            <Route path="/PaymentAdmin/PaymentAInvoice" element= {<PaymentALayout><PaymentAInvoice/></PaymentALayout>}/>
            <Route path="/PaymentAdmin/PaymentManageRefunds" element= {<PaymentALayout><PaymentManageRefunds/></PaymentALayout>}/>
            <Route path="/PaymentAdmin/PaymentAMonthlyOverview" element= {<PaymentALayout><PaymentAMonthlyOverview/></PaymentALayout>}/>
            <Route path="/PaymentAdmin/PaymentAPaymentHistory" element= {<PaymentALayout><PaymentAPaymentHistory/></PaymentALayout>}/>
            <Route path="/PaymentAllinvoice/:invoiceID" element={<PaymentALayout><PaymentAInvoice /></PaymentALayout>} />
            {/* Client route */}
            <Route exact path='/' element={<ClientHome/>}/>
            <Route path='/ClientLogin' element={<ClientLogin/>}/>
            <Route path='/ClientCreateacc' element={<ClientCreateacc/>}/>
            <Route path="/ClientSidebar" element={<ClientSidebar />} />
            <Route path="/ClientUpcoming/:email" element={<ClientUpcoming />} />
            <Route path="/ClientDashboard/:email" element={<ClientDashboard />} />
            <Route path="/ClientAppointment" element={<ClientAppointment />} />
            <Route path="/ClientUser" element={<ClientUser />} />
            <Route path="/ClientThoughtForm" element={<ClientThoughtForm />} />
            <Route path="/ClientAdminlogin" element={<ClientAdminlogin />} />
            <Route path="/ClientUserprofile/:id" element={<ClientUserprofile />} />
            <Route path="/Clientupdate/:id" element={<ClientUpdateUser />} />
             {/* Appointment */}
             <Route path="/AppointmenHistory" element={<AppointmentLayout><AppointmenHistory /></AppointmentLayout>}/> 
            <Route path="/AppointmenContent" element={<AppointmentLayout><AppointmenContent /></AppointmentLayout>} />
            <Route path="/AppointmenHistory" element={<AppointmentLayout><AppointmenHistory /></AppointmentLayout>}/> 
            <Route path="/AppointmenContentHeader" element={<AppointmentLayout><AppointmenContentHeader/></AppointmentLayout>}/>
            <Route path="/AppointmenAdminTable" element={<AppointmenAdminTable />} />
            <Route path="/AppointmenAppointment" element={<AppointmentLayout><AppointmenAppointment /></AppointmentLayout>}/> 
            <Route path="/Appointmentadd" element={<AppointmentLayout><AppointmenAppointment /></AppointmentLayout>}/> 
            <Route path="/Appointmentupdate/:id" element={<AppointmentLayout><AppointmenEditAppointment /></AppointmentLayout>}/> 
             {/* Pharmacy */}
              <Route path="/PharmacyMonthly_Overview" element={<PharmacyLayout><PharmacyMonthlyOverview /></PharmacyLayout>} />
              <Route path="/PharmacyInvoice" element={<PharmacyLayout><PharmacyInvoice /></PharmacyLayout>} />
              <Route path="/Pharmacyinvoice/:invoiceID" element={<PharmacyLayout><PharmacyInvoice /></PharmacyLayout>} />
              <Route path="/Pharmacyadd" element={<PharmacyLayout><PharmacyDrugForm /></PharmacyLayout>} />
              <Route path="/PharmacyEditDrugForm" element={<PharmacyLayout><PharmacyEditDrugForm /></PharmacyLayout>} />
              <Route path="/Pharmacyupdate/:id" element={<PharmacyLayout><PharmacyEditDrugForm/></PharmacyLayout>}/>
              <Route path="/Pharmacy" element={<PharmacyLayout><PharmacyDrugHistory /></PharmacyLayout>} />
              <Route path="/Pharmacycombined-prescriptions" element={<PharmacyLayout><PharmacyManagePrescription /></PharmacyLayout>} />
              <Route path="/Pharmacyprescriptions" element={<PharmacyLayout><PharmacyManagePrescription /></PharmacyLayout>} />
              {/* <Route path="/prescriptions/:id" element={<Layout><ManagePrescription /></Layout>} />        */}
              <Route path="/PharmacyPayment_History" element={<PharmacyLayout><PharmacyDrugHistory /></PharmacyLayout>} />
              <Route path="/Pharmacydelete/:id" element={<PharmacyLayout><PharmacyDrugHistory /></PharmacyLayout>} />
              <Route path="/PharmacyContent_Header" element={<PharmacyLayout><PharmacyContentHeader/></PharmacyLayout>} />
              <Route path="/Pharmacydrugchargers" element={<PharmacyLayout><PharmacyDrugChargers /></PharmacyLayout>} />
              <Route path="/Pharmacydrugchargers/:id" element={<PharmacyLayout><PharmacyDrugChargers /></PharmacyLayout>} />
                 {/* Therapist */}
                 <Route path="/TherapistContent" element={<TherapistContent />} />
              <Route path="/TherapistAppoinment/:fullname" element={<TherapistAppoinment />} />
              {/* <Route path="/Dashboard" element={<Dashboard/>} /> */}
              <Route path="/TherapistAddTherapist" element={<TherapistAddTherapist/>} />
              <Route path="/TherapistTherapistDashboard/:email" element={<TherapistTherapistDashboard/>} />
              <Route path="/TherapistDashboard" element={<TherapistDashboard/>}/>
              <Route path="/TherapistTherapistLogin" element={<TherapistTherapistLogin/>}/>
              <Route path="/TherapistSidebar" element={<TherapistSidebar/>}/>
              <Route path="/TherapistEmergency" element={<TherapistEmergency/>}/>
              <Route path="/TherapistEmergencyAppoinments/:fullname" element={<TherapistEmergencyAppoinments/>}/>
              <Route path="/TherapistPrehandling" element={<TherapistPrehandling/>}/>
              <Route path="/TherapistUserprofile/:id" element={<TherapistUserprofile/>}/>
              <Route path="/TherapistAdmin" element={<TherapistAdmin/>}/>
              <Route path="/TherapistViewThought/:email" element={<TherapistViewThought/>}/>
              <Route path="/TherapistContentHeader"  element={<TherapistContentHeader />}/>
               {/* Emergency */}
                <Route path="/emeInset" element={<EmeInset/>}></Route>
                <Route path="/all" element={<ALLeme/>}></Route>
                <Route path="/re" element={<Emere/>}></Route>
                <Route path="/de" element={<Deleme/>}></Route>
                <Route path="/Updateeme/:id" element={<UpdateemeAp/>}></Route>
                <Route path="/addemepre/:names" element={<Addemepres/>}></Route>
                <Route path="/do" element={<Dovap/>}></Route>
                <Route path="/dopall/:names" element={<Doviewallpre/>}></Route>
                <Route path="/dova" element={<Doviewallapo/>}></Route>
                <Route path="/vip/:id" element={<VIewpres/>}></Route>
                  {/* Salary */}
                <Route path ="/salary" element={<Home/>}/> I changed here(miyuri)
                <Route path ="/mainhome" element={<Home/>}/>
                <Route path ="/adduser" element={<AddUser/>}/>
                <Route path ="/userdetails" element={<Users/>}/>
                <Route path ="/userdetails/:id" element={<UpdateUser/>}/>
                <Route path ="/:id" element={<UpdateUser/>}/>
                  {/* Waitlist */}
                  <Route path="/WaitlistMonthly_Overview" element={<WaitlistLayout><WaitlistMonthlyOverview /></WaitlistLayout>} />
                  <Route path="/WaitlistForm" element={<WaitlistLayout><WaitlistForm /></WaitlistLayout>} />
                  <Route path="/Waitlistadd" element={<WaitlistLayout><WaitlistForm /></WaitlistLayout>} />
                  <Route path="/Waitlistupdate/:id" element={<WaitlistLayout><EditWaitlistForm/></WaitlistLayout>}/>
                  <Route path="/Waitlist" element={<WaitlistLayout><WaitlistHistory /></WaitlistLayout>} />
                  <Route path="/Waitlist_History" element={<WaitlistLayout><WaitlistHistory /></WaitlistLayout>} />
                  <Route path="/Waitlistdelete/:id" element={<WaitlistLayout><WaitlistHistory /></WaitlistLayout>} />
                  <Route path="/Waitlistmonthly" element={<WaitlistLayout><WaitlistMonthlyOverview /></WaitlistLayout>} />
                  <Route path="/Waitlistweekly" element={<WaitlistLayout><WaitlistMonthlyOverview /></WaitlistLayout>} />
                  <Route path="/Waitlistsend-email" element={<WaitlistLayout><WaitlistForm /></WaitlistLayout>} />
                  <Route path="/WaitlistContent_Header" element={<WaitlistLayout><WaitlistContentHeader /></WaitlistLayout>} />

                  
          </Routes>
     
    </Router>
  );
};

export default App;
