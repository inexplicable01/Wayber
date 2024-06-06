import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignInWithGoogle = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      navigate('/dashboard');
      console.log("Signed in:", result); // Print detailed login info or result.user for user data
    } catch (err) {
      console.error("Sign in error:", err);
    }
  };

  const handleSignOut = () => {
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
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        console.log("User deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
  };

  return (
    <div>
      <button onClick={handleSignInWithGoogle}>SignIn With Google</button>
      {/* <Button onClick={handleSignOut}>Logout</Button>
      <Button onClick={handleDeleteUser}>Delete</Button> */}
    </div>
  );
};

export default SignInWithGoogle;
