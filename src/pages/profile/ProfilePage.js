// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../assets/AuthContext';

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
        <div>
            <h1>Profile Page</h1>
            {isAuthenticated ? (
                userData ? (
                    <div>
                        <i class="fa-regular fa-user"></i><p>Username: {userData.username}</p>
                        <p>Email: {userData.email}</p>
                        <p>Bank Account: {userData.bank_account}</p>
                        <img src={userData.pic} alt='profile pic' />
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )
            ) : (
                <p>You are not authenticated. Please log in.</p>
            )}
        </div>
    );
};

export default ProfilePage;
