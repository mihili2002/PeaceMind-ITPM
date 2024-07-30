import logo from "../images/peace.png";
import {Link} from "react-router-dom"

function Navigation() {
    return (
        <nav>
          <ul class="navigation">
            <li>
              <img class="logo" src={logo} alt="" />
            </li>
            <li>Home</li>
            <li>About </li>
            <li>Contact us</li>
            <li>FAQ</li>
            <li>Blog and News</li>
            <li>Corporate</li>
            <div class="auth">
              <Link class="btn" to='/ClientCreateacc'>Sign Up</Link>
              <Link class="btn" to='/ClientLogin'>Sign In</Link>
            </div>  
          </ul>
        </nav>
    );
}
export default Navigation;