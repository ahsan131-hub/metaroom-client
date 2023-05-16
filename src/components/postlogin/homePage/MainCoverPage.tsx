import Image from 'next/image';
import React from 'react';

const MainCoverPage = ({
  displayText,
  profile,
  cover,
}: {
  displayText: string;
  profile: string;
  cover: string;
}) => {
  return (
    <div
      style={{
        backgroundImage: `url('${cover}')`,
        backgroundSize: 'cover',
      }}
      className="h-1/4"
    >
      <div className="items-center flex p-5 ">
        <Image
          // loader={myLoader}
          src={profile}
          style={{ borderRadius: '50%' }}
          alt="profile"
          width={150}
          height={100}
        />
        <div className="h-full flex items-center ml-4">
          <span className="text-gray-300 font-bold text-3xl py-2 px-4 pb-7">
            {displayText.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainCoverPage;
