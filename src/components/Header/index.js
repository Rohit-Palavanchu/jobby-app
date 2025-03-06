import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
      </Link>
      <ul className="header-action-container-sm">
        <li>
          <Link to="/">
            <AiFillHome className="home-icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <BsBriefcaseFill className="home-icon" />
          </Link>
        </li>
        <li>
          <button onClick={onClickLogout} className="logout-icon" type="button">
            <FiLogOut className="home-icon" />
          </button>
        </li>
      </ul>
      <div className="header-action-container-lg">
        <Link to="/">
          <p className="home-link-title">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="home-link-title">Jobs</p>
        </Link>
      </div>
      <button onClick={onClickLogout} className="logout-button" type="button">
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
