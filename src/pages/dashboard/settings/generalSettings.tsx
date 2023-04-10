import Image from 'next/image';
import React from 'react';

function general() {
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
        <div className="flex flex-row items-center space-x-7">
          <input
            type="First_Name"
            id="First_Name"
            className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="First Name"
          />
          <input
            type="Last_Name"
            id="Last_Name"
            className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-row items-center space-x-7 mt-10">
          <input
            type="number"
            id="phone"
            className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="mobile"
          />
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col items-center mt-10 mr-0 w-full">
          <textarea
            name="about"
            id="about"
            className="border border-gray-500 rounded-md resize py-2 w-96"
            placeholder="  About"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-10 inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default general;
