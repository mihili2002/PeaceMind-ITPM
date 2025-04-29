import React ,{useState,useEffect} from 'react'
import { Link, Route, json } from "react-router-dom";
import axios from 'axios';
import { MdEmail } from "react-icons/md";
// import { RiLockPasswordFill } from "react-icons/ri"
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast from 'react-hot-toast';
import admincover from '../images/admincover.jpg';


AOS.init({
  duration:'1000'
});

function Looginscreen() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);

  const Login = async () => {
    const userCredentials = {
      email,
      password,
    };

    try {
      setloading(true);
      const result = await axios.post('http://localhost:8070/client/adminlogin', userCredentials);
      setloading(false);

      //localStorage.setItem('currentuser', JSON.stringify(result.data.user));

      // Check the success property in the response
      if (result.data.success) {
        // Update the user state and redirect
        const role = result.data.temp.role;

        console.log(role)

        if (role == 'Therapist Manager') {
          window.location.href = '/ClientUser';
          
        } else if (role =='Therapist Manager') {
          window.location.href = '/TherapistDashboard';
         
        }else if (role == 'Financial Manager') {
          window.location.href = '/PaymentAdmin/PaymentAdminDashboard';

        } else if (role == 'Appointment Manager') {
          window.location.href = '/AppointmenAdminTable';

        }else if (role == 'Pharmacy Manager') {
          window.location.href = '/PharmacyPayment_History';

        } else if (role =='Waitlist Manager') {
          window.location.href = '/WaitlistMonthly_Overview';

        } else if (role == 'Emergency Manager') {
          window.location.href = '/financialdashboard';

        } else if (role == 'Salary Manager') {
          window.location.href = '/mainHome';
        } else {
          // Handle other roles or scenarios as needed
          console.error('Unsupported role:', role);
        }
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error(' Invalid credintial');
    }
  };
  
 
 return (
<div>

        <>
        <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${admincover})` }}
      ></div>
          <div data-aos="zoom in"
            className="flex flex-col justify-center items-center bg-zinc-800 min-h-screen"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {/* Sign In Button */}
            {/* <a href="/register" className="absolute top-0 right-5 m-6">
              <button className="text-white text-base font-semibold border border-solid border-transparent">
               Sign Up
              </button>
            </a> */}
            {/* End of Sign In Button */}
            <div className="overflow-hidden w-full max-w-screen-lg mx-auto">
              <div className="flex flex-col items-center gap-10 md:flex-row md:gap-0">
                <div className="w-full md:w-2/3 mr-32">
                  <div className="flex flex-col items-center text-white leading-[130%] md:max-w-full">
                    <br />
                    {/* <img
                      loading="lazy"
                      src={logo}
                      className="w-full md:w-[400px] "
                      alt="Farm fresh vegetables"
                    />
                    <br /> */}
                    {/* <div
                      className="mt-2 md:mt-0 text-lg font-extralight max-w-full text-center"
                      style={{ letterSpacing: "5px" }}
                    >
                      Farm fresh bounty awaits
                    </div>
                    <div
                      className="mt-2 md:mt-7 text-5xl md:text-4xl font-semibold max-w-full text-center"
                      style={{ letterSpacing: "6px", lineHeight: "1.0" }}
                    >
                      Sign up &amp; shop now!
                    </div> */}
                  </div>
                </div>
                <div className="">
                  <form 
                   
                    className="flex flex-col gap-8 bg-transparent py-5 rounded-2xl max-w-[30rem] mx-auto md:px-5 md:mt-12 mr-80"
                  >
                    <div className="text-4xl font-bold text-neutral-900 tracking-[4.9px] mb-8 text-center text-white">
                      Login
                    </div>
                    <input
                      className="px-5 py-3 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
                      type="email"
          placeholder='Email'
          required
          value={email}
          onChange={(e) => { setemail(e.target.value) }}
                    />
                    <input
                      className="px-5 py-3 bg-stone-50 rounded-[100px] lime-border-focus focus:ring-2 focus:ring-green-600 focus:ring-opacity-30 outline-none transition-all duration-500"
                      type="password"
                      placeholder='Password'
                      required
                      value={password}
                      onChange={(e) => { setpassword(e.target.value) }}
                      
              
                    />
                   

                   <div className="text-base text-stone-950 mt-5 text-center">
               <span className="text-zinc-400 text-blue-200">Fogot password? </span> <a href='' className=' text-white'> Click
                Here
                </a>
              </div>
                    

                    <button
                      type="submit" onClick={Login}
                      className="px-4 py-3 mt-7 text-md text-white bg-light-blue-500 border border-solid border-neutral-200 rounded-[36.683px] tracking-[2.52px] max-md:px-5 transition duration-500 ease-in-out transform hover:bg-blue-900 hover:scale-100"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>

    </div>
  )
}

export default Looginscreen