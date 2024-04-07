import React, { useState, useEffect } from 'react';
import { useAuth } from '../../assets/AuthContext';
import MyCourses from '../../components/MyCourses';
import '../../statics/css/profile.css';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { isAuthenticated, userData, fetchUserData } = useAuth();
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        if (isAuthenticated && loadingData) {
            fetchUserData();
            setLoadingData(false);
        }
    }, [isAuthenticated, fetchUserData, loadingData]);
    return (
        <div className='profile'>
            <div>
            <h1>Profile Page</h1>
            {isAuthenticated ? (
                userData ? (
                    <div >
                        <div className='main-profile '>
                            <img src={userData.pic} alt='profile pic' />
                            <p><i className="fa-regular fa-user"></i> Username: {userData.username}</p>
                        </div>
                        <p><i className="fa-regular fa-envelope"></i> Email: {userData.email}</p>
                        <p><i className="fa-solid fa-money-check-dollar"></i> Bank Account: {userData.bank_account}</p>
                        <Link to='/profile/update' className='update'>Update Profile</Link>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )
            ) : (
                <p>You are not authenticated. Please log in.</p>
            )}
            </div>
            <div className='my-courses-cont'>
                <MyCourses/>
            </div>
        </div>
    );
};

export default ProfilePage;
