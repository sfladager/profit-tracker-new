import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Imports
import axios from 'axios'

import { getToken } from '../../helpers/auth'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const Profile = () => {
  const [profileData, setProfileData] = useState(null)
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log(data)
        setProfileData(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getProfile()
  }, [])


  return (
    <main className="profile-page-wrapper">
      <h1>My profile</h1>
      {profileData ?
        <>
          <div className='profile-link-flex'>
            <h2 className='profile-title'>My details</h2>
            <Link to="/edit-profile" className='btn-edit'>Edit details</Link>
          </div>
          <p className='profile-details'>username: <span id='span-username'>{profileData.username}</span></p>
          <p className='profile-details'>e-mail: <span id='span-email'>{profileData.email}</span></p>
          <hr></hr>
          <div className='profile-link-flex'>
            <h2 className='profile-title'>My plants</h2>
            {profileData.createdPlants.length < 1 &&
              <Link to="/plants/new" className='btn-post'>Post a first plant!</Link>
            }
            {profileData.createdPlants.length > 0 &&
              <Link to="/plants/new" className='btn-post'>Post a new plant!</Link>
            }
          </div>
          {profileData.createdPlants.length < 1 &&
            <p className='profile-details'>You have not posted any plants yet.</p>
          }
          <div className='profile-row'>
            {profileData.createdPlants.length > 0 &&
              profileData.createdPlants.map(plant => {
                return (
                  <div key={plant._id} className='profile-card'>
                    <Link to={`/plants/${plant._id}`}>
                      <div className="buffer">
                        <div className="profile-card-image" style={{ backgroundImage: `url(${plant.thumbnail})` }}></div>
                        <h2 className='profile-card-title'>{plant.name}</h2>
                      </div>
                    </Link>
                  </div>
                )
              }
              )
            }
          </div>
          <hr></hr>
          <div className='profile-link-flex'>
            <h2 className='profile-title'>My blogs</h2>
            {profileData.createdBlogs.length < 1 &&
              <Link to="/blogs/new" className='btn-post special-margin'>Post a first blog!</Link>
            }
            {profileData.createdBlogs.length > 0 &&
              <Link to="/blogs/new" className='btn-post special-margin'>Post a new blog!</Link>
            }
          </div>
          {profileData.createdBlogs.length < 1 &&
            <p className='profile-details'>You have not posted any blogs yet.</p>
          }

          <div className='profile-row'>
            {profileData.createdBlogs.length > 0 &&
              profileData.createdBlogs.map(blog => {
                return (
                  <div key={blog._id} className='profile-card'>
                    <Link to={`/blogs/${blog._id}`}>
                      <div className="buffer">
                        <p className='profile-card-title'>{blog.title}</p>
                        <div className="profile-card-image" style={{ backgroundImage: `url(${blog.thumbnail})` }}></div>
                      </div>
                    </Link>
                  </div>
                )
              }
              )
            }
          </div>
        </>
        :
        errors ? <h2>Something went wrong! Please try again later!</h2> : <h2>Loading</h2>
      }
    </main >

  )
}

export default Profile