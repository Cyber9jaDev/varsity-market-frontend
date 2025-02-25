import React, { useState } from 'react';
import avatar from '../../assets/profile.png';
import { displayAlert, refresh } from '../../utilities/utils';
import UsersService from '../../services/UsersService';
import { BankList } from '../../utilities/banks';

const Settings = ({ currentUser }) => {
  const [profile, setProfile] = useState({ ...currentUser });

  const updateProfile = async (e) => {
    e.preventDefault();

    const name = ((profile.name !== currentUser.name) && profile.name.length >= 1) ? profile.name : undefined;
    const phone = (profile.phone !== currentUser.phone) ? profile.phone : undefined;
    const businessName = (currentUser === "SELLER" && profile.businessName !== currentUser.businessName) ? profile.businessName : undefined;
    const accountNumber = (currentUser === "SELLER" && profile.accountNumber !== currentUser.accountNumber) ? profile.accountNumber : undefined;
    const bankCode = (currentUser === "SELLER" && profile.bankCode !== currentUser.bankCode) ? profile.bankCode : undefined;

    const payload = {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(businessName && { businessName }),
      ...(accountNumber && { accountNumber }),
      ...(bankCode && { bankCode })
    };

    // If no changes made, ensure the user is not updated
    if (Object.keys(payload).length === 0) {
      return
    }

    try {
      const { data } = await UsersService.updateProfile(currentUser.id, payload);
      displayAlert('success', 'Profile updated successfully');
      localStorage.setItem('currentUser', JSON.stringify({ ...data }));
      refresh();
    } catch (error) {
      displayAlert('error', error.response.data.message);
      return
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
            <input name='name' defaultValue={profile.name || ""} type="text" onChange={(e) => setProfile({ ...profile, name: e.target.value.trim() })} />
          </fieldset>
          <fieldset>
            <legend>Phone number</legend>
            <input name='phone' defaultValue={profile.phone || ""} type='tel' onChange={(e) => setProfile({ ...profile, phone: e.target.value.trim() })} />
          </fieldset>
          {currentUser.userType === "SELLER" && <fieldset>
            <legend>Business Name</legend>
            <input name='businessName' defaultValue={profile.businessName || ""} type='text' onChange={(e) => setProfile({ ...profile, businessName: e.target.value.trim() })} />
          </fieldset>}
          {currentUser.userType === "SELLER" && <fieldset>
            <legend>Account Number</legend>
            <input name='accountNumber' defaultValue={profile.accountNumber || ""} type='text' onChange={(e) => setProfile({ ...profile, accountNumber: e.target.value.trim() })} />
          </fieldset>}
          {currentUser.userType === "SELLER" && <select name="bankCode" id="bankCode" defaultValue={profile.bankCode || "044"} onChange={(e) => setProfile({ ...profile, bankCode: e.target.value })} >
            {BankList.map(bank => <option value={bank.code.trim()} key={bank.slug}>{bank.name}</option>)}
          </select>}
          <div className="my-4 submit-btn-wrapper">
            <input className='submit-btn w-100 p-2' type="submit" value="Update" />
          </div>
        </form>
      </div>

    </section>
  )
}

export default Settings