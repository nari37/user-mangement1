

import React, { useState } from 'react';
import axios from 'axios';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import './css/Loder.css';


export default function AddFinancier() {
  const [isShow, setIsshow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    gender: '',
    password: '',
    address: '',
    phoneNumber: '',
    roleType: '', 
  });

console.log('finacer',formData)

  const [emailExists, setEmailExists] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [val, setVal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsshow(!isShow);
  };

  const handleAddFinancier = () => {
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.password ||
      !formData.gender ||
      !formData.address ||
      !formData.phoneNumber ||
      !formData.roleType // Include role type in the validation
    ) {
      setErrorMessage('Please fill all fields');
      return;
    }
    setIsLoading(true);
    axios
      .post('http://localhost:8000/backend/admin/addfinancier', formData)
      .then((res) => {
        console.log('Financier added successfully', res);
       
        const successMessage = document.getElementById('addFinancierSuccessMessage');
        successMessage.style.display = 'block';

        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 2000);

        setFormData({
          firstName: '',
          email: '',
          gender: '',
          password: '',
          address: '',
          phoneNumber: '',
          roleType: '',
        });
        setEmailExists('');
        setErrorMessage('');
        
        setVal((prevVal) => prevVal + 1);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response && error.response.status === 409) {
          setEmailExists(error.response.data);
        } else {
          setErrorMessage('An error occurred while adding financier');
        }
      })
      .finally(() => {
        // Stop loading
        setIsLoading(false);
    });
  };

  return (
    <>
      <div
        style={{
          maxWidth: '100%',
          background: 'green',
          height: '50px',
          color: 'white',
          borderRadius: '5px',
          marginTop: '0px',
          paddingTop: '.8rem',
          paddingLeft: '.6rem',
          display:'none',
          marginBottom: '30px',
        }}
        id='addFinancierSuccessMessage'
      >
        Financier Added Successfully...
      </div>
      <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)' }}>
        <h3 style={{ background: 'rgb(50, 48, 48)', padding: '1rem', color: 'white' }}>Add Financier</h3>
        <form style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }} key={val}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1' }}>
              <label>First Name:</label>
              <input
                type='text'
                name='firstName'
                placeholder='Enter First Name...'
                style={{ width: '100%' }}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <label>Email:</label>
              <input
                type='email'
                name='email'
                placeholder='Enter Email...'
                style={{ width: '100%' }}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <span style={{color:'red',display:'block'}}>{emailExists?`${emailExists}`:''}</span>       
              <label>Password:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type={isShow ? 'text' : 'password'}
                  id='typePasswordX'
                  name='password'
                  placeholder='Enter Password...'
                  style={{ width: '100%' }}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <div onClick={togglePasswordVisibility} style={{ cursor: 'pointer', marginLeft: '-45px', marginBottom: '4px' }}>
                  {isShow ? <FaEyeSlash fontSize='1.5rem' /> : <FaRegEye fontSize='1.5rem' />}
                </div>
              </div>
            </div>
            <div style={{ flex: '1' }}>
              <label>Address:</label>
              <input
                type='text'
                name='address'
                placeholder='Enter Address...'
                style={{ display: 'block', width: '100%' }}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <label>Phone Number:</label>
              <input
                type='tel'
                name='phoneNumber'
                placeholder='Enter Phone Number...'
                style={{ width: '100%' }}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
              <label>Gender:</label>
              <select
                name='gender'
                style={{ width: '100%', padding: '.6rem' }}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value=''>--Select Gender--</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>                
            </div>

          </div>
            {/* Add role type selection */}
          <label>Role Type:</label>
              <select
                name='roleType'
                style={{ padding: '.5rem', width: '100%', marginBottom: '10px' }}
                onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
              >
                <option value=''>--Select--</option>
                <option value='financier'>Financier</option>             
              </select>
          <button
            type='button'
            style={{
              background: 'rgb(28, 66, 95)',
              width: '100%',
              padding: '0.5rem',
              margin: '15px auto',
              borderRadius: '10px',
              color: 'whitesmoke',
              position: 'relative',
            }}
            onClick={handleAddFinancier}
          >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isLoading ? (
            <div className='loader'></div>
        ) : (
            'Add Financier'
        )}
      </span>
          </button>
          {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        </form>
      </div>
    </>
  );
}
