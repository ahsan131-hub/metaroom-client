import Image from 'next/image';
import React, { useState } from 'react';

const General = () => {
  const [data, setData] = useState({
    fName: '',
    lName: '',
    email: '',
    phone: '',
    about: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission
  };
  return (
    <div>
      <div className="flex flex-col items-center my-10">
        <div className="w-48 h-48 rounded-full overflow-hidden mb-10">
          <Image
            className="object-cover w-full h-full"
            width={300}
            height={300}
            alt="Profile Image"
            src={'/assets/default-photos/profile.png'}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row items-center space-x-7">
            <input
              type="text"
              id="first-name"
              className="p-3 rounded-lg"
              placeholder="First Name"
              value={data.fName}
              onChange={(e) => setData({ ...data, fName: e.target.value })}
            />
            <input
              type="text"
              id="last-name"
              className="p-3 rounded-lg"
              placeholder="Last Name"
              value={data.lName}
              onChange={(e) => setData({ ...data, lName: e.target.value })}
            />
          </div>
          <div className="flex flex-row items-center space-x-7 mt-4">
            <input
              type="tel"
              id="phone"
              className="p-3 rounded-lg"
              placeholder="Mobile"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
            <input
              type="email"
              id="email"
              className="p-4 rounded-lg"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col items-center mt-6 w-full">
            <textarea
              name="about"
              id="about"
              className="p-4 rounded-lg"
              placeholder="About"
              rows={4}
              value={data.about}
              onChange={(e) => setData({ ...data, about: e.target.value })}
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
