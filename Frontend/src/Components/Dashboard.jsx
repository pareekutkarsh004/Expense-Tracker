import React, { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

export default function Dashboard() {
  const { user } = useUser();
  const { signOut, getToken } = useAuth();

  useEffect(() => {
    const logToken = async () => {
      const token = await getToken();
      console.log("Clerk Authentication Token:", token);
    };

    logToken();
  }, [getToken]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome, {user?.fullName}!</h1>
      <p>This is your dashboard. You are successfully logged in!</p>
      <button 
        onClick={() => signOut()}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'purple', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Sign Out
      </button>
    </div>
  );
}