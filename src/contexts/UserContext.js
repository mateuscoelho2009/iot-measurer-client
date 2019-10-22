import React from 'react';

const UserContext = React.createContext({
    userId: '',
    username: '',
    measurements: [],
    updateUser: () => {},
});

export class UserProvider extends React.Component {
    updateUser = newUserId => {
        this.setState({
            userId: newUserId,
            username: '',
            measurements: [],
        });
    }

    state = {
        userId: '',
        username: '',
        measurements: [],
        updateUser: this.updateUser,
    }

    render() {
        const {
            children,
        } = this.props;

        return (
            <UserContext.Provider value={this.state}>
                {children}
            </UserContext.Provider>
        )
    }
}

export const UserConsumer = UserContext.Consumer;
