import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const NotLoggedIn = () => {
  const router = useRouter();
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <p className="text-lg font-medium text-gray-800">
        You are not logged in.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Please log in to access this page.
      </p>

      <p className="text-sm text-gray-500 mt-2">
        <Link href={'/signin'}>click here to login!</Link>
      </p>
    </div>
  );
};

export default NotLoggedIn;
