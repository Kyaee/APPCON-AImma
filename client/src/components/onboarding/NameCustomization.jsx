import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoBackground } from "@/components/layout/Background";

export default function NameCustomization() {
  const [nameType, setNameType] = useState('username'); // 'username' or 'realname'
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameType === 'username' && username.trim()) {
      localStorage.setItem('user_preferred_name', username.trim());
      localStorage.setItem('name_type', 'username');
      navigate('/start/assessment');
    } else if (nameType === 'realname' && firstName.trim() && lastName.trim()) {
      localStorage.setItem('user_preferred_name', `${firstName.trim()} ${lastName.trim()}`);
      localStorage.setItem('first_name', firstName.trim());
      localStorage.setItem('last_name', lastName.trim());
      localStorage.setItem('name_type', 'realname');
      navigate('/start/assessment');
    }
  };

  const isFormValid = () => {
    return nameType === 'username' ? username.trim() !== '' : (firstName.trim() !== '' && lastName.trim() !== '');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <VideoBackground />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              What should I call you?
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Choose how you'd like to be identified
            </p>

            {/* Toggle buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                type="button"
                onClick={() => setNameType('username')}
                className={`px-6 py-2 rounded-lg transition-all duration-200
                  ${nameType === 'username'
                    ? 'bg-amber-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
              >
                Username
              </button>
              <button
                type="button"
                onClick={() => setNameType('realname')}
                className={`px-6 py-2 rounded-lg transition-all duration-200
                  ${nameType === 'realname'
                    ? 'bg-amber-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
              >
                Real Name
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {nameType === 'username' ? (
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                            text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                            focus:ring-amber-500/50 focus:border-transparent transition-all
                            hover:bg-white/[0.15]"
                  required
                />
                <p className="mt-2 text-sm text-gray-400">
                  This is how you'll appear to others in the community
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                            text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                            focus:ring-amber-500/50 focus:border-transparent transition-all
                            hover:bg-white/[0.15]"
                  required
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                            text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                            focus:ring-amber-500/50 focus:border-transparent transition-all
                            hover:bg-white/[0.15]"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-3 rounded-lg transition-all duration-200 text-lg font-medium
                ${isFormValid()
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }`}
            >
              Continue
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            You can always change this later in your settings
          </p>
        </div>
      </div>
    </div>
  );
} 