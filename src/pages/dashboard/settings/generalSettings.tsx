import Image from 'next/image';
import React, { useState } from 'react';

const General = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="w-48 h-48 rounded-full overflow-hidden">
          <Image
            className="object-cover w-full h-full"
            width={300}
            height={300}
            alt="Profile Image"
            src={'/profile.jpg'}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row items-center space-x-7">
            <input
              type="text"
              id="first-name"
              className="p-3 rounded-lg"
              placeholder="First Name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
            <input
              type="text"
              id="last-name"
              className="p-3 rounded-lg"
              placeholder="Last Name"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center space-x-7 mt-4">
            <input
              type="tel"
              id="phone"
              className="p-3 rounded-lg"
              placeholder="Mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              id="email"
              className="p-4 rounded-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center mt-6 w-full">
            <textarea
              name="about"
              id="about"
              className="p-4 rounded-lg"
              placeholder="About"
              rows={4}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="mt-10 inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default General;
