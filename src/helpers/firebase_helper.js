import firebase from 'firebase/compat/app';

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";

class FirebaseAuthBackend {
  constructor(firebaseConfig) {
    if (firebaseConfig) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          sessionStorage.setItem("authUser", JSON.stringify(user));
        } else {
          sessionStorage.removeItem("authUser");
        }
      });
    }
  }

  /**
   * Registers the user with given details
   */
 registerUser = (email, password, additionalInfo) => {
  return new Promise((resolve, reject) => {
    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        // Get uid from the created user
        const uid = result.user.uid;

        // Save additional information in Firestore
        firebase.firestore().collection('users').doc(uid).set(additionalInfo)
          .then(() => {
            resolve({ success: true, user: additionalInfo });
          })
          .catch(error => {
            reject({ success: false, error: error.message });
          });
      })
      .catch(error => {
        reject({ success: false, error: error.message });
      });
  });
};

  /**
   * Registers the user with given details
   */
  editProfileAPI = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser);
          },
          error => {
            reject(this._handleError(error));
          }
        );
    });
  };

    getUserProfile = uid => {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            resolve(doc.data());
          } else {
            reject(new Error('User profile not found'));
          }
        })
        .catch(error => {
          console.log('whats wrong' + error)
          reject(error);
        });
    });
  };

      updateUserProfile = (uid, updatedProfile) => {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .update(updatedProfile)
        .then(() => {
          resolve({ success: true });
        })
        .catch(error => {
          reject({ success: false, error: error.message });
        });
    });
  };



  /**
   * Login user with given details
   */
  loginUser = (email, password) => {
    // console.log('loginingUser')
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          user => {
            // console.log('loginingUser2')
            resolve(firebase.auth().currentUser);
          },
          error => {
            // console.log('loginingUser3')
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * forget Password user with given details
   */
  forgetPassword = email => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email, {
          url:
            window.location.protocol + "//" + window.location.host + "/login",
        })
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Logout the user
   */
  logout = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(this._handleError(error));
        });
    });
  };

  /**
   * Social Login user with given details
   */
  socialLoginUser = (data, type) => {
    let credential = {};
    if (type === "google") {
      credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.token);
    } else if (type === "facebook") {
      credential = firebase.auth.FacebookAuthProvider.credential(data.token);
    }
    return new Promise((resolve, reject) => {
      if (!credential) {
        firebase.auth().signInWithCredential(credential)
          .then(user => {
            resolve(this.addNewUserToFirestore(user));
          })
          .catch(error => {
            reject(this._handleError(error));
          });
      } else {
        // reject(this._handleError(error));
      }
    });
  };

onAuthStateChanged = (onUserChanged) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      onUserChanged(user);
    } else {
      onUserChanged(null);
    }
  });
  return unsubscribe;
};

  // ..

  addNewUserToFirestore = (user) => {
    const collection = firebase.firestore().collection("users");
    const { profile } = user.additionalUserInfo;
    const details = {
      firstName: profile.given_name ? profile.given_name : profile.first_name,
      lastName: profile.family_name ? profile.family_name : profile.last_name,
      fullName: profile.name,
      email: profile.email,
      picture: profile.picture,
      createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
    };
    collection.doc(firebase.auth().currentUser.uid).set(details);
    return { user, details };
  };

  setLoggeedInUser = user => {
    sessionStorage.setItem("authUser", JSON.stringify(user));
  };

  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = () => {
    if (!sessionStorage.getItem("authUser")) return null;
    return JSON.parse(sessionStorage.getItem("authUser"));
  };

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage;
  }
}

let _fireBaseBackend = null;

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = config => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
  return _fireBaseBackend;
};

export { initFirebaseBackend, getFirebaseBackend };