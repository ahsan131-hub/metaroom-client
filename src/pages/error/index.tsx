import Link from 'next/link';
import React from 'react';

const Error = () => {
  // useEffect(() => {
  //   signOut();
  // });
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 justify-center text-center">
        <div className="flex items-center justify-center text-center w-full">
          <div className="bg-indigo-600 rounded-full text-white flex items-center justify-center h-12 w-12 mr-2">
            <span className="text-xl font-bold italic">M</span>
          </div>
          <h1 className="text-indigo-600 text-xl font-bold">Metaroom</h1>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Login Error
        </h2>
        <div className="flex text-center w-full justify-center flex-row">
          <Link href={'/signin'}>
            <div className="m-5">
              <div className="">
                <span className="text-indigo-600">Go to Login</span>
              </div>
            </div>
          </Link>
          <Link href={'/signup'} className="">
            <div className="m-5">
              <div className="">
                <span className="text-indigo-600">Go to Register</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Error;
