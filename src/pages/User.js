import React from 'react';
import { UserProvider } from '../contexts/UserContext';
import UserMeasurements from '../components/UserMeasurements';

function User() {
    return (
        <UserProvider>
            <UserMeasurements />
        </UserProvider>
    )
}

export default User;