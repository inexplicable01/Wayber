import React from "react";
import { Button } from "reactstrap";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, signOut, deleteUser } from "firebase/auth";

const handleSignInWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Signed in:", result); // Print detailed login info or result.user for user data
  } catch (err) {
    console.error("Sign in error:", err);
  }
};

const handleSignOut = () => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      console.log("You have been signed out successfully.");
      // Here you could redirect the user or update the UI state
      // window.location.href = '/login'; // Example redirect
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
};

const handleDeleteUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  deleteUser(user)
    .then(() => {
      console.log("User deleted successfully.");
      // User deleted from Firebase Authentication. Further actions here.
    })
    .catch((error) => {
      console.error("Error deleting user: ", error);
    });
};
const SignInWithGoogle = () => {
  const auth = getAuth();

  return (
    <div>
      <button onClick={handleSignInWithGoogle}>SignIn With Goggle</button>
      {/* <Button onClick={handleSignOut}>Logout</Button>
      <Button onClick={handleDeleteUser}>Delete</Button> */}
    </div>
  );
};

export default SignInWithGoogle;
