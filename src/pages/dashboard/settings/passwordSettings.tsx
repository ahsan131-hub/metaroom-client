import React, { useState } from 'react';

const PasswordSettings = () => {
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  return (
    <div className="">
      <div className="flex flex-col items-center mt-10 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 rounded-lg md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <label
                htmlFor="oldpassword"
                className="block mb-2 text-sm font-medium"
              >
                old password
              </label>
              <input
                type="password"
                name="email"
                id="oldpassword"
                className="p-3 rounded-lg w-full"
                placeholder="••••••••"
                required
                onChange={(e) => {
                  setPassword({ ...password, oldPassword: e.target.value });
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="p-3 rounded-lg w-full"
                required
                onChange={(e) => {
                  setPassword({ ...password, newPassword: e.target.value });
                }}
              />
            </div>
            <div>
              <label
                htmlFor="confim_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confim_password"
                id="confim_password"
                placeholder="••••••••"
                className="p-3 rounded-lg w-full"
                required
                onChange={(e) => {
                  setPassword({ ...password, confirmPassword: e.target.value });
                }}
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  className="focus:ring-3 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="newsletter"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{' '}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
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
    </div>
  );
};
export default PasswordSettings;
