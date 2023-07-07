import React, { useState,useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
  


const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [file, setFile] = useState<File|null>(null)
  const [multiFiles, setMultiFiles] = useState<File[]>([]);
  const [geolocationStatus, setGeolocationStatus] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (step === 4) {
      // Fetch geolocation once Step 4 is reached
      fetchGeolocation();
    }
  }, [step]);

  const fetchGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGeolocationStatus(`Geolocation captured: ${latitude}, ${longitude}`);
        },
        (error) => {
          setGeolocationStatus(`Geolocation error: ${error.message}`);
        }
      );
    } else {
      setGeolocationStatus('Geolocation not supported');
    }
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(multiFiles);
    
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('addressLine1', addressLine1);
        formData.append('addressLine2', addressLine2);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('pincode', pincode);
        formData.append('country', country);
        formData.append('geolocation', geolocationStatus);

        formData.append('single_file', file as File); 
        formData.append('multi_file', JSON.stringify(multiFiles));
        
            
    
        const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        if (response.status === 200) {
          setIsFormSubmitted(true);
        } else {
          console.log('Form submission failed');
        }
      } catch (error) {
        console.log('Form submission error:', error);
      }
  };

const LabelClass = "block text-gray-700 text-sm font-bold mb-2";
const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

const handleChangeMultiFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setMultiFiles(filesArray);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Step 1: Basic Details</h2>
            <label className={`${LabelClass}`}>
                  Name
                </label>
                <input className={`${inputClass}`}
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            <label className={`${LabelClass}`}>
                  Email
                </label>
                <input
                  className={`${inputClass}`}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className={`${LabelClass}`}>
                  Phone Number
                </label>
                <PhoneInput
                value={ phoneNumber}
                onChange={(number: string) => setPhoneNumber(number)}
                inputProps={{
                    name: 'phone',
                    required: true,
                    className:
                    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-14',
                }}
                buttonClass="absolute top-0 left-0 pl-2 pt-1"
                />

                 
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: Address</h2>
            <label className={`${LabelClass}`}> 
                Address Line 1
            </label>
            <input
              className={`${inputClass}`}
              type="text"
              placeholder="Address Line 1"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />
            <label className={`${LabelClass}`}> 
                Address Line 2
            </label>
            <input
              className={`${inputClass}`}
              type="text"
              placeholder="Address Line 2"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />
            <label className={`${LabelClass}`}> 
                City
            </label>
            <input
              className={`${inputClass}`}
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label className={`${LabelClass}`}> 
                State
            </label>
            <input
              className={`${inputClass}`}
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <label className={`${LabelClass}`}> 
                Pincode
            </label>
            <input
              className={`${inputClass}`}
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <label className={`${LabelClass}`}> 
                Country
            </label>
            <input
              className={`${inputClass}`}
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Step 3: File Upload</h2>
            <input
              className={`${inputClass}`}
              type="file"
              accept=".png,.pdf"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setFile(selectedFile);
                }
              }}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Step 4: Multi File Upload</h2>
            <input
              className={`${inputClass}`}
              type="file"
              multiple
              accept=".png,.pdf"
              onChange={handleChangeMultiFiles}
            />
            <p>{geolocationStatus}</p>
          </div>
        );
      case 5:
        return (
          <div>
            <h2>Step 5: Status</h2>
          {isFormSubmitted ? (
            <p>Form submitted successfully!</p>
          ) : (
            <p>Form not submitted yet.</p>
          )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
      <h1 className="text-2xl mb-4">Multi-Step Form</h1>
      <div className="mb-4">
        <p className="text-sm">Step {step} of 5</p>
        <progress className="w-full" value={step} max={5} />
      </div>
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="flex items-center justify-between mt-3">
          {step > 1 && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mr-5"
              type="button"
              onClick={handlePreviousStep}
            >
              Previous
            </button>
          )}
          {step < 5 ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              type="button"
              onClick={handleNextStep}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  </div>
  );
};

export default MultiStepForm;
