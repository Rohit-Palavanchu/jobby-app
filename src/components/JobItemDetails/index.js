import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const SkillItem = props => {
  const {skillItem} = props
  const {name, imageUrl} = skillItem
  console.log(skillItem)
  return (
    <li className="skill-item-container">
      <img className="skill-icon" src={imageUrl} alt={name} />
      <p className="company-title">{name}</p>
    </li>
  )
}

const SimilarJobItem = props => {
  const {similarJobItem} = props
  const {
    title,
    companyLogoUrl,
    location,
    employmentType,
    jobDescription,
    rating,
  } = similarJobItem
  return (
    <div className="similar-job-item-container">
      <div className="job-item-logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-container">
          <h1 className="company-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="rating-icon" />
            <p className="rating-number">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="company-title">Description</h1>
      <p className="job-item-description">{jobDescription}</p>
      <div className="job-item-location-employment-type-container">
        <div className="job-item-location-container">
          <IoLocationSharp className="location-icon" />
          <p className="company-title">{location}</p>
        </div>
        <div className="job-item-employment-type-container">
          <BsBriefcaseFill className="job-type-icon" />
          <p className="company-title">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

class JobItemDetails extends Component {
  state = {apiState: apiStatus.initial, jobItems: {}}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiState: apiStatus.loading}, this.renderJobItemDetails)
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        jobDetails: {
          id: data.job_details.id,
          title: data.job_details.title,
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          rating: data.job_details.rating,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(i => ({
            name: i.name,
            imageUrl: i.image_url,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          employmentType: data.job_details.employment_type,
        },
        similarJobs: data.similar_jobs.map(i => ({
          id: i.id,
          title: i.title,
          companyLogoUrl: i.company_logo_url,
          location: i.location,
          employmentType: i.employment_type,
          jobDescription: i.job_description,
          rating: i.rating,
        })),
      }
      this.setState(
        {apiState: apiStatus.success, jobItems: {...formattedData}},
        this.renderJobItemDetails,
      )
    } else {
      this.setState({apiState: apiStatus.failure}, this.renderJobItemDetails)
    }
  }

  renderLoadingState = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessState = () => {
    const {jobItems} = this.state
    const {jobDetails, similarJobs} = jobItems
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      rating,
      location,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <div className="job-item-container-1">
          <div className="job-item-logo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-container">
              <h1 className="company-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="rating-icon" />
                <p className="rating-number">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-location-employment-type-package-container">
            <div className="job-item-location-employment-type-container">
              <div className="job-item-location-container">
                <IoLocationSharp className="location-icon" />
                <p className="company-title">{location}</p>
              </div>
              <div className="job-item-employment-type-container">
                <BsBriefcaseFill className="job-type-icon" />
                <p className="company-title">{employmentType}</p>
              </div>
            </div>
            <p className="company-title">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-link-container">
            <h1 className="company-title">Description</h1>
            <a
              rel="external"
              className="anchor-element"
              href={companyWebsiteUrl}
            >
              <span className="span-element">Visit</span>
              <FiExternalLink className="link-icon" />
            </a>
          </div>
          <p className="job-item-description">{jobDescription}</p>
          <h1 className="company-title">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(i => (
              <SkillItem key={i.name} skillItem={i} />
            ))}
          </ul>
          <div className="life-at-company-container">
            <div>
              <h1 className="company-title">Life at Company</h1>
              <p className="job-item-description">{description}</p>
            </div>
            <img src={imageUrl} alt="life at company" />
          </div>
        </div>
        <ul className="similar-jobs-container">
          <h1 className="company-title">Similar Jobs</h1>
          {similarJobs.map(i => (
            <SimilarJobItem key={i.id} similarJobItem={i} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureState = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-products-image"
      />
      <h1 className="no-jobs-found-title">Oops! Something Went Wrong</h1>
      <p className="no-jobs-found-description">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.getJobItemDetails} type="button">
        Retry
      </button>
    </div>
  )

  renderJobItemDetails = () => {
    const {apiState} = this.state
    let p
    switch (apiState) {
      case apiStatus.loading:
        p = this.renderLoadingState()
        break
      case apiStatus.success:
        p = this.renderSuccessState()
        break
      case apiStatus.failure:
        p = this.renderFailureState()
        break
      default:
        break
    }
    return p
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobItemDetails()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
