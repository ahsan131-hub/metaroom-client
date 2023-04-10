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
      }}
      className="h-1/4"
    >
      <div className="flex p-5">
        <Image
          // loader={myLoader}
          src={profile}
          style={{ borderRadius: '50%' }}
          alt="profile"
          width={150}
          height={100}
        />
        <span className="text-3xl font-bold pr-2 ml-4"> {displayText}</span>
      </div>
    </div>
  );
};

export default MainCoverPage;
