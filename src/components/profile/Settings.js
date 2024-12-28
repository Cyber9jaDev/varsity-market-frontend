import React, { useState } from 'react';
import avatar from '../../assets/profile.png';
import Select from 'react-select';
import schools from '../../utilities/schools';
import { displayAlert, findSchoolByCode, refresh } from '../../utilities/utils';
import UsersService from '../../services/UsersService';

const Settings = ({ currentUser }) => {
  const [ profile, setProfile ] = useState({ ...currentUser });

  const updateProfile = async (e) => {
    e.preventDefault();
    const payload = { userId: currentUser.userId, name: profile.name, phone: profile.phone, school: profile.school };
    try {
      const { data } = await UsersService.updateUserProfile(payload);
      displayAlert('success', 'Profile updated successfully');
      localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, name: data.updatedName, phone: data.updatedPhone, school: data.updatedSchool }))
      refresh();
    } catch (error) {
      displayAlert('error', error.response.data.message);
    }
  }

  const changeDisplayPicture = async (e) => {
    const file = [e.target.files[0]][0];

    if(!file){ return }; // No file is chosen

    if(file.size > 270000) {
      return displayAlert('error', 'File size must not be greater than 270kb');
    }

    // convert image to base 64
    const base64Image = new FileReader();
    base64Image.readAsDataURL(file);
    return (base64Image.onloadend = async () => {
      const body = { image: base64Image.result, userId: currentUser.userId }
      try {
        const { data } = await UsersService.uploadProfilePicture(currentUser.userId, body);
        localStorage.setItem('currentUser', JSON.stringify({...currentUser, displayPicture: data.displayPicture, hasDisplayPicture: data.hasDisplayPicture }));
        displayAlert('success', 'Picture uploaded successfully');
        return refresh();
      } catch (error) {
        return displayAlert("error", 'An error occurred while uploading the picture');
      }
    })
  }

  return (
    <section id='settings'>
      {/* <header className="top-header-container">
        <div className="header-text-wrapper">
          <h2>Personal details</h2>
        </div>
        <div className="data-wrapper d-flex justify-content-between align-items-center">
          <div className="all adverts-wrapper">
            <span className="text">Saved</span>
          </div>
          
        </div>
      </header> */}

      <div className="settings-container">
        <div onSubmit={changeDisplayPicture} className="display-picture-wrapper">
          <label htmlFor="display-picture">
            <div className='display-picture-img-wrapper'>
              <img src={ currentUser.hasDisplayPicture ? currentUser.displayPicture.secure_url : avatar } alt="display-pic" />
              <div className="icon-wrapper">
                <i className="fa-solid fa-pen-to-square"></i>
              </div>
            </div>
            <input accept='image/*' onChange={changeDisplayPicture} type="file" name="display-picture" id="display-picture" />
          </label>
        </div>
        <form onSubmit={updateProfile}>
          <fieldset>
            <legend>Name</legend>
            <input onChange={(e) => setProfile({ ...profile, name: e.target.value })} defaultValue={ currentUser.name } type="text" />
          </fieldset>
          <fieldset>
            <legend>Email</legend>
            <input readOnly onChange={(e) => setProfile({ ...profile, email: e.target.value })} defaultValue={ currentUser.email } type="text" />
          </fieldset>
          <fieldset>
            <legend>School</legend>
            <Select onChange={(e) => setProfile({ ...profile, school: e.value })} defaultValue={ findSchoolByCode(currentUser.school) } isSearchable options={schools.slice(1)} />
          </fieldset>
          <fieldset>
            <legend className=''>Phone number</legend>
            <input onChange={(e) => setProfile({ ...profile, phone: e.target.value })} defaultValue={ currentUser.phone }  type='tel' />
          </fieldset>
          <div className="my-4 submit-btn-wrapper">
            <input className='submit-btn w-100 p-2' type="submit" value="Save" />
          </div>
        </form>
      </div>

    </section>
  )
}

export default Settings