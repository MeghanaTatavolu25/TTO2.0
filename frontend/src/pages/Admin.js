import React, { useEffect } from 'react';

const AdminJS = () => {
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      window.location.href = 'http://localhost:3002/admin'; // Replace with your desired URL
    }, 0); // Redirect after 3 seconds

    return () => clearTimeout(redirectTimeout); // Clean up the timeout on component unmount
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      <h1>Automatic Redirect</h1>
      <p>Redirecting in 3 seconds...</p>
    </div>
  );
};


export default AdminJS;