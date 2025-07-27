import "./Profile.css"

import { useSelector } from "react-redux"

const Profile = () => {
  
 
  const {user}=useSelector(state=>state.user)
  return (
    <>
      <div className="profile-container">
        
        {user && (
  <div className="profile-container">
    <div className="img">
      <img className="logo-img" src={user?.avatar?.url} alt="Avatar" />
    </div>

    <div className="profile-details">
      <div className="detail">
        <p className="label">Full Name:</p>
        <p className="data">{ user && user?.username}</p>
      </div>

      <div className="detail">
        <p className="label">E-mail:</p>
        <p className="data">{user?.email}</p>
      </div>

      <div className="detail">
        <p className="label">Phone:</p>
        <p className="data">{user?.phone}</p>
      </div>

      <div className="detail">
        <p className="label">Role:</p>
        <p className="data">{user?.role}</p>
      </div>

      <div className="detail">
        <p className="label">Joined On:</p>
        <p className="data">{new Date(user?.createdAt).toLocaleDateString()}</p>
      </div>

      {user?.role === "Host" && (
        <>
          <h2>Address:</h2>

          <div className="detail">
            <p className="label">Street:</p>
            <p className="data">{user?.address.street}</p>
          </div>

          <div className="detail">
            <p className="label">City:</p>
            <p className="data">{user?.address.city}</p>
          </div>

          <div className="detail">
            <p className="label">Pincode:</p>
            <p className="data">{user?.address.pincode}</p>
          </div>

          <div className="detail">
            <p className="label">State:</p>
            <p className="data">{user?.address.state}</p>
          </div>

          <div className="detail">
            <p className="label">Country:</p>
            <p className="data">{user?.address.country}</p>
          </div>
        </>
      )}
    </div>
  </div>
)}

        
       
      </div>
    </>
  )
}

export default Profile
