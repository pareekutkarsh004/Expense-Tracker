import React from 'react'
import { useState } from 'react';

function LoginSignUp() {
  const [isLogin, setIsLogin] = useState(true);
  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form className="space-y-5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 focus:bg-white/30 outline-none"
            />
            // same as { condition ? <Component /> : null }
            
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition font-semibold"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

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
  )
}

export default LoginSignUp;