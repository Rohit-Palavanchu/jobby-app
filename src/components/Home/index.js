import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-card-container">
          <h1 className="home-card-heading">
            Find the job that fits your life
          </h1>
          <p className="home-card-description">
            Millions of people are searching for jobs, salary, information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="find-jobs-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
