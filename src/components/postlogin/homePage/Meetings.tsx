import { useRouter } from 'next/router';
import React from 'react';

const meetings = [
  { name: 'Machine Learning', link: 'Dr. Sher' },
  { name: 'Machine Learning', link: 'Dr. Sher' },
  { name: 'Machine Learning', link: 'Dr. Sher' },
  { name: 'Machine Learning', link: 'Dr. Sher' },
  { name: 'Machine Learning', link: 'Dr. Sher' },
  { name: 'Machine Learning', link: 'Dr. Sher' },
  { name: 'Machine Learning', link: 'Dr. Sher' },
  { name: 'Machine Learning', link: 'Dr. Sher' },
];
const Meetings = () => {
  const router = useRouter();

  return (
    <div className="h-3/4 mt-2 ">
      <span className="text-2xl m-2 font-semibold leading-7 text-gray-900">
        Sessions
      </span>
      <div className="flex flex-wrap">
        {meetings.map((meet, index) => (
          <div
            key={index}
            className="hover:bg-white  bg-slate-100 w-80  rounded-md m-5 p-5"
          >
            <div className=" ">
              <h3 className="text-xl  overflow-hidden ">
                {`Course: ${meet.name}`}
              </h3>
              <h3 className="text-xl  overflow-hidden ">
                {`Teacher:${meet.link}`}
              </h3>
              <div className="text-xl overflow-hidden ">
                Time:<span className="text-sm"> {Date()}</span>
              </div>
            </div>
            <div className="bg-slate-300 rounded-md p-2 text-center hover:bg-slate-100">
              <button
                className="text-center text-xl"
                onClick={() => {
                  console.log('joing meeting');
                  router.push('meet');
                }}
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meetings;
