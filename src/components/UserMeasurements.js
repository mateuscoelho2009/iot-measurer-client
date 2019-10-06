import React from 'react';
import { UserConsumer } from '../contexts/UserContext';

function UserMeasurements() {
    return (
        <UserConsumer>
            {({ userId }) => <h1>Welcome {userId}!</h1>}
        </UserConsumer>
    )
}

export default UserMeasurements;