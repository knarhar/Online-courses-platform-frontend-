import React, { useState, useEffect } from "react";
import { useAuth } from "../../assets/AuthContext";
import '../../statics/css/profile.css';
import { Link, useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const { fetchUserData, userData, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bank, setBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [pic, setPic] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    if (username) {
      formData.append("username", username);
    }
    if (email) {
      formData.append("email", email);
    }
    if (bank) {
      formData.append('bank_account', bank);
    }
    if (pic) {
      formData.append("pic", pic);
    }

    if (!username && !email && !pic && !bank) {
      navigate('/profile');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/api/profile/update/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setUsername("");
        setEmail("");
        setBank("");
        setPic(null);
        await fetchUserData();
        navigate('/profile');

      } else {
        setSuccess(false);
        setError(
          "Failed to update profile. Please check your data and try again."
        );
      }

      setLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSuccess(false);
      setError("Error updating profile. Please try again.");
      setLoading(false);
    }
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changeBank = (e) => {
    setBank(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePic = (e) => {
    setPic(e.target.files[0]);
  };

  return (
    <div className="update-prof-cont">
      <div className="main-upd-profile">
        <Link to='/profile' className="main-upd-back"><i className="fa-solid fa-arrow-left"></i> back to the profile</Link>
        <h1>Update Profile</h1>
      </div>
      {loading && <p>Loading profile data...</p>}
      {error && <p>{error}</p>}
      {/* {success && <p>Profile updated successfully!</p>} */}
      {!loading && !error && !success && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="change-profile">
            <label htmlFor="pic" className="change-pic-label">
              {userData && userData.pic && <img src={pic ? URL.createObjectURL(pic) : userData.pic} alt='profile pic' className="upd-prof-pic" />}
              
              <i className="fa-solid fa-camera"></i>
            </label>
            <input type="file" id='pic' onChange={changePic} className="change-pic" />
            <div className="edit">
              <div className="edit-row">
                <label htmlFor="username">Set new username:</label>
                <input type="text" id="username" name="username" value={username} onChange={changeUsername} />
              </div>
              <div className="edit-row">
                <label htmlFor="email">Set new Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={changeEmail} />
              </div>
              <div className="edit-row">
                <label htmlFor="bank">Change your Bank Account:</label>
                <input type="text" id="bank" name="bank" value={bank} onChange={changeBank} />
              </div>
            </div>
            <button type="submit" >Update Profile</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfilePage;
