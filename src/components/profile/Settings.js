import React, { useState } from 'react';
import avatar from '../../assets/profile.png';
import { displayAlert, refresh } from '../../utilities/utils';
import UsersService from '../../services/UsersService';
import { BankList } from '../../utilities/banks';

const Settings = ({ currentUser }) => {
  const [profile, setProfile] = useState({ ...currentUser });

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
    if (!file) { return }; // No file is chosen
    if (file.size > 270000) {
      return displayAlert('error', 'File size must not be greater than 270kb');
    }

    try {
      displayAlert('loading', 'We are uploading your picture, please wait');
      const { data } = await UsersService.uploadProfilePicture(file);
      localStorage.setItem('currentUser', JSON.stringify({
        ...currentUser,
        hasDisplayPicture: data.hasDisplayPicture,
        displayPicture: {
          secure_url: data.secure_url,
        },
      }));
      displayAlert('success', 'Picture uploaded successfully');
      return refresh();
    } catch (error) {
      return displayAlert("error", 'An error occurred while uploading the picture');
    }
  }

  return (
    <section id='settings'>
      <div className="settings-container">
        <div onSubmit={changeDisplayPicture} className="display-picture-wrapper">
          <label htmlFor="display-picture">
            <div className='display-picture-img-wrapper'>
              <img src={currentUser.hasDisplayPicture ? currentUser.displayPicture.secure_url : avatar} alt="display-pic" />
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
            <input onChange={(e) => setProfile({ ...profile, name: e.target.value })} defaultValue={currentUser.name} type="text" />
          </fieldset>
          <fieldset>
            <legend className=''>Phone number</legend>
            <input onChange={(e) => setProfile({ ...profile, phone: e.target.value })} defaultValue={currentUser.phone} type='tel' />
          </fieldset>
          <fieldset>
            <legend className=''>Business Name</legend>
            <input onChange={(e) => setProfile({ ...profile, phone: e.target.value })} defaultValue={currentUser.phone} type='tel' />
          </fieldset>
          <select defaultValue="044" name="bankCode" id="bankCode">
            {BankList.map(bank => <option value={bank.code} key={bank.slug}>{bank.name}</option>)}
          </select>
          <div className="my-4 submit-btn-wrapper">
            <input className='submit-btn w-100 p-2' type="submit" value="Update" />
          </div>
        </form>
      </div>

    </section>
  )
}

export default Settings