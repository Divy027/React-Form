import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import MultiStepForm from './StepForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError,setLoginError] = useState(false);
  const [isAuthenticate,setAuthenticate] = useState(false);

  const handleForgotPassword = () => {
    navigate('/forgotPassword'); //render this page on click
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login', {
        email,
        password,
      });

      console.log(response);
      setAuthenticate(true);
      console.log('Login successful');

    } catch (error) {
      console.error('Login failed:', error);
      setLoginError(true);
    }

    console.log('Logging in...');
    
  };
  if(isAuthenticate){
    return <MultiStepForm/>
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit}>

            {/* Email box */}
          <div className="mb-4"> 
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password box */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* button  and forgot pass box */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <p
              className="text-blue-500 cursor-pointer"
              onClick={handleForgotPassword}
            >
              Forgot Password
            </p>
          </div>
          { loginError &&
          <div> 
            <p className='text-md text-red-600 mt-1'>Incorrect email or password  </p>
          </div>
          }
         

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
