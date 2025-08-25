// src/Components/LoginSignUp.jsx

import React, { useState } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';

function LoginSignUp() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {isLogin ? (
          <SignIn redirectUrl="/dashboard" />
        ) : (
          <SignUp redirectUrl="/dashboard" />
        )}

        <p className="mt-6 text-center text-sm text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 hover:text-indigo-500 font-semibold"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginSignUp;