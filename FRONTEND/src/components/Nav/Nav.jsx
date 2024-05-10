import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';



function Nav() {
  return (
    <div>
      <ul className="home-ul">

<li className="home-ll">
 <Link to="/mainhome" className="active home -a">
     <h3>Home</h3>
     </Link>
</li>
<li className="home-ll">
<Link to="/adduser" className="active home -a">
     <h3>Add Employee</h3>
     </Link>
</li>
<li className="home-ll">
<Link to="/userdetails" className="active home -a">
     <h3>Employee Details</h3>
     </Link>
</li>







</ul>
    </div>
  )
}

export default Nav

