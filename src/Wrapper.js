import React from 'react';
import firebase from 'firebase';
import { FirebaseConfig } from './private/firebase-config';
import PhonelinkRingIcon from '@material-ui/icons/PhonelinkRing';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    logOut,
    logIn,
} from './actions';
import './Wrapper.css';

firebase.initializeApp(FirebaseConfig);

class Wrapper extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      const userId = user.uid;
      const username = user.displayName;
      
      if (userId) {
        this.props.logIn(userId, username);
      }
    });
  }
  
  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  
  handleLogOut() {
    this.props.logOut();
  }

  render() {
    const {
        username,
    } = this.props;

    return (
      <div className="app">
        <div className="app__header">
          <div className="app__brand">
            <PhonelinkRingIcon className="app__icon" />
            <h2>
                Smart Valve
            </h2>
          </div>
          <div className="app__brand">
            <p>
                {username}
            </p>
            { !username ? (
                <button
                className="app__button"
                onClick={this.handleSignIn.bind(this)}
                >
                Sign in
                </button>
            ) : (
                <button
                className="app__button"
                onClick={this.handleLogOut.bind(this)}
                >
                Logout
                </button>
            )}
          </div>
        </div>
        <div className="app__list">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
    username: store.userState.username,
    userId: store.userState.userId,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
        logOut,
        logIn,
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (Wrapper);
