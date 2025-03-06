import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {IoLocationSharp} from 'react-icons/io5'
import {BsSearch, BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noProducts: 'NOPRODUCTS',
}
const profileApiStatus = {
  initial: 'INITIAl',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const EmploymentTypeItem = props => {
  const {item, onAddEmploymentItem, onRemoveEmploymentItem} = props
  const {label, employmentTypeId} = item
  const onClickEmploymentItem = event => {
    if (event.target.checked === true) {
      onAddEmploymentItem(employmentTypeId)
    } else {
      onRemoveEmploymentItem(employmentTypeId)
    }
  }
  return (
    <>
      <div className="employment-item-container">
        <input
          value={employmentTypeId}
          id={employmentTypeId}
          type="checkbox"
          className="checkbox-element"
          onClick={onClickEmploymentItem}
        />
        <label htmlFor={employmentTypeId} className="checkbox-label-element">
          {label}
        </label>
      </div>
    </>
  )
}
const SalaryRangeItem = props => {
  const {salaryRangeItem, onAddSalaryItem} = props
  const {salaryRangeId, label} = salaryRangeItem
  const onClickSalaryItem = event => {
    if (event.target.checked === true) {
      onAddSalaryItem(salaryRangeId)
    }
  }
  return (
    <div className="employment-item-container">
      <input
        id={salaryRangeId}
        name="salaryItem"
        value={salaryRangeId}
        type="radio"
        className="checkbox-element"
        onClick={onClickSalaryItem}
      />
      <label htmlFor={salaryRangeId} className="checkbox-label-element">
        {label}
      </label>
    </div>
  )
}
const JobItem = props => {
  const {jobItem} = props
  const {
    id,
    title,
    location,
    companyLogoUrl,
    jobDescription,
    rating,
    packagePerAnnum,
    employmentType,
  } = jobItem
  return (
    <Link to={`/jobs/${id}`}>
      <div className="job-item-container">
        <div className="job-item-logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="company-title">Description</h1>
        <p className="job-item-description">{jobDescription}</p>
      </div>
    </Link>
  )
}
let searchValue
class Jobs extends Component {
  state = {
    jobsList: '',
    profileDetails: '',
    profileApiState: profileApiStatus.initial,
    employmentItems: [],
    salaryItem: '',
    searchInput: '',
    apiState: apiStatus.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  onChangeSearchElement = event => {
    searchValue = event.target.value
  }

  onClickSearchIcon = () => {
    this.setState({searchInput: searchValue}, this.getJobsList)
  }

  onResetValues = () => {
    this.setState(
      {
        apiState: apiStatus.initial,
        searchInput: '',
        employmentItems: [],
        salaryItem: '',
      },
      this.getJobsList,
    )
  }

  renderJobsList = () => {
    const {apiState} = this.state
    let p
    switch (apiState) {
      case 'LOADING':
        p = this.renderLoadingState()
        break
      case 'NOPRODUCTS':
        p = this.renderNoProductsState()
        break
      case 'FAILURE':
        p = this.renderFailureState()
        break
      case 'SUCCESS':
        p = this.renderSuccessState()
        break

      default:
        break
    }
    return p
  }

  renderLoadingState = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoProductsState = () => (
    <div className="no-products-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-products-image"
      />
      <h1 className="no-jobs-found-title">No Jobs Found</h1>
      <p className="no-jobs-found-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

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
      <button data-testid="button" onClick={this.getJobsList} type="button">
        Retry
      </button>
    </div>
  )

  renderSuccessState = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.length > 1 ? (
          jobsList.map(i => <JobItem key={i.id} jobItem={i} />)
        ) : (
          <JobItem key={jobsList.id} jobItem={jobsList} />
        )}
      </ul>
    )
  }

  getJobsList = async () => {
    this.setState({apiState: apiStatus.loading}, this.renderJobsList)
    const {searchInput, employmentItems, salaryItem} = this.state
    const options = {
      method: 'GET',
      headers: {
        Authorization: ` Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const employmentType = employmentItems.join(',')
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryItem}&search=${searchInput}`,
      options,
    )
    const data = await response.json()
    const {jobs} = data
    if (response.ok) {
      if (jobs.length === 0) {
        this.setState(
          {apiState: apiStatus.noProducts},
          this.renderNoProductsState,
        )
      } else if (jobs.length === 1) {
        const formattedData = {
          id: jobs.id,
          title: jobs.title,
          location: jobs.location,
          rating: jobs.rating,
          packagePerAnnum: jobs.package_per_annum,
          jobDescription: jobs.job_description,
          employmentType: jobs.employment_type,
          companyLogoUrl: jobs.company_logo_url,
        }
        this.setState(
          {jobsList: [...formattedData], apiState: apiStatus.success},
          this.renderJobsList,
        )
      } else if (jobs.length > 1) {
        const formattedData = jobs.map(i => ({
          id: i.id,
          title: i.title,
          location: i.location,
          rating: i.rating,
          packagePerAnnum: i.package_per_annum,
          jobDescription: i.job_description,
          employmentType: i.employment_type,
          companyLogoUrl: i.company_logo_url,
        }))
        this.setState(
          {jobsList: [...formattedData], apiState: apiStatus.success},
          this.renderJobsList,
        )
      }
    } else {
      this.setState({apiState: apiStatus.failure}, this.renderJobsList)
    }
  }

  onAddEmploymentItem = i => {
    this.setState(
      prevState => ({
        employmentItems: [...prevState.employmentItems, i],
      }),
      this.getJobsList,
    )
  }

  onRemoveEmploymentItem = i => {
    this.setState(prevState => {
      const {employmentItems} = prevState
      const modifiedArray = employmentItems.filter(eachItem => eachItem !== i)
      return {employmentItems: [...modifiedArray]}
    }, this.getJobsList)
  }

  onAddSalaryItem = i => {
    this.setState({salaryItem: i}, this.getJobsList)
  }

  getProfileDetails = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: ` Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok) {
      let data = await response.json()
      data = data.profile_details
      const formattedData = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      this.setState(
        {
          profileDetails: formattedData,
          profileApiState: profileApiStatus.success,
        },
        this.renderProfileDetails,
      )
    }
    if (response.status === 401) {
      this.setState(
        {profileApiState: profileApiStatus.failure},
        this.renderProfileDetails,
      )
    }
  }

  renderProfileDetails = () => {
    const {profileApiState, profileDetails} = this.state
    if (profileApiState === profileApiStatus.success) {
      const {profileImageUrl, name, shortBio} = profileDetails
      return (
        <div className="profile-container">
          <img src={profileImageUrl} alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      )
    }
    return (
      <div className="profile-container">
        <button onClick={this.getProfileDetails} type="button">
          Retry
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-bg-container">
          <div className="filter-select-container">
            <div className="input-container-sm">
              <input
                onChange={this.onChangeSearchElement}
                placeholder="Search"
                type="search"
                className="search-element"
              />
              <div>
                <button
                  onClick={this.onClickSearchIcon}
                  data-testid="searchButton"
                  className="search-button"
                  type="button"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderProfileDetails()}
            <hr className="line-break-element" />
            <ul className="employment-type-container">
              <h1 className="company-title">Type of Employment</h1>
              {employmentTypesList.map(i => (
                <EmploymentTypeItem
                  key={i.employmentTypeId}
                  item={i}
                  onAddEmploymentItem={this.onAddEmploymentItem}
                  onRemoveEmploymentItem={this.onRemoveEmploymentItem}
                />
              ))}
            </ul>
            <hr className="line-break-element" />
            <ul className="employment-type-container">
              <h1 className="company-title">Salary Range</h1>
              {salaryRangesList.map(i => (
                <SalaryRangeItem
                  key={i.salaryRangeId}
                  salaryRangeItem={i}
                  onAddSalaryItem={this.onAddSalaryItem}
                />
              ))}
            </ul>
          </div>
          <div className="filters-display-container">
            <div className="input-container-lg">
              <input
                onChange={this.onChangeSearchElement}
                placeholder="Search"
                type="search"
                className="search-element"
              />
              <div>
                <button
                  onClick={this.onClickSearchIcon}
                  data-testid="searchButton"
                  className="search-button"
                  type="button"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
