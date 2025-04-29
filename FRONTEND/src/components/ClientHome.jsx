import "../styles/ClientHome.css";
import ClientSlider from "./ClientSlider";
import { slidesData } from "../slidesData";
import ClientNavigation from "./ClientNavigation";
import "../index.css";
import { Link } from "react-router-dom";


function Home() {
  return (
    <>
      <ClientNavigation />
      <ClientSlider slides={slidesData} />
      <p className="font-body font-extrabold text-gray-700 text-5xl text-center mt-4 ">
        This is where your
      </p>
      <p className="font-body font-extrabold text-5xl text-center mt-4 text-blue-400">
        mental health comes first
      </p>
      <p className="font-body text-center mt-3 font-semibold  text-gray-700 text-base">
        Get the help you need, when you need it, from the comfort of your own
        home.
        <br />
        Let’s take the first step towards a better you, one session at a time.
      </p>
      //commented client manager button
{/*       <div className="flex justify-center">
        <button><Link to={'/User'}>Client-Manager</Link></button>
      </div> */}

    </>
  );
}
export default Home;
