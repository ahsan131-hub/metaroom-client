import classNames from 'classnames';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import type { ISideBarItem } from '@/constants';
import {
  useSideBarContext,
  useToggleSideBarContext,
} from '@/context/SideBarProvider';
import { useUser } from '@/context/UserDataProvider';
import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

import Signout from '../icons/Signout';
import UserIcon from '../icons/UserIcon';

export const Sidebar = ({ sidebarItems }: { sidebarItems: ISideBarItem[] }) => {
  const user = useUser();
  const sidebarcontext = useSideBarContext();
  const toggleSidebarcontext = useToggleSideBarContext();
  const wrapperClassNames = classNames(
    ' grid   grid-cols-1 content-between w-80 text-black border-r-secondary-500  bg-gray-50  h-full border relative  ',
    {
      'w-20': sidebarcontext,
    }
  );

  return (
    <div
      className={wrapperClassNames}
      style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
    >
      <div className="">
        <div className="h-20 flex flex-row p-2 justify-between mb-5">
          {!sidebarcontext && (
            // <div className="h-10 text-center justify-center w-10 pt-2 pl-3 ">
            //   <h1 className="text-indigo-600 font-bold text-3xl py-2 px-4 border-b-2">
            //     Metaroom
            //   </h1>
            // </div>
            <div className="flex items-center">
              <div className="bg-indigo-600 rounded-full text-white flex items-center justify-center h-12 w-12 mr-2">
                <span className="text-2xl font-bold italic">M</span>
              </div>
              <h1 className="text-indigo-600 text-2xl font-bold">Metaroom</h1>
            </div>
          )}
          {
            <div
              className="h-10 text-center justify-center w-10 mt-5 pt-2 pl-5 "
              onClick={() => {
                toggleSidebarcontext();
              }}
            >
              {!sidebarcontext ? (
                <FaArrowLeft size={'20px'} />
              ) : (
                <FaArrowRight size={'20px'} />
              )}
            </div>
          }
        </div>
        {!sidebarcontext ? (
          <div className=" border-secondary-300 h-10 m-2  border bg-white rounded-md text-center p-2">
            {user?.role}
          </div>
        ) : (
          <div className=" h-10 m-2 text-center p-2"></div>
        )}
        <div className={' text-black'}>
          {sidebarItems?.map((item: ISideBarItem, index: number) => (
            <div key={index}>
              <Link href={item.href}>
                <div
                  className={
                    !sidebarcontext
                      ? DEFAULT_BUTTON(
                          'm-5 pl-5 pr-5 flex justify-items-center align-middle'
                        )
                      : DEFAULT_BUTTON(
                          'pl-5  pr-5 flex justify-items-center align-middle'
                        )
                  }
                >
                  <span className={!sidebarcontext ? 'my-auto' : 'm-auto'}>
                    {item.icon()}
                  </span>
                  {!sidebarcontext && (
                    <span className="ml-3 my-auto">{item.title}</span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full align-text-bottom">
        <Link href={'/admin'}>
          <div
            className={
              !sidebarcontext
                ? DEFAULT_BUTTON(
                    'm-5 mb-0 pl-5 pr-5 flex justify-items-center align-middle'
                  )
                : DEFAULT_BUTTON(
                    ' pl-5  pr-5 flex justify-items-center align-middle'
                  )
            }
          >
            <span className={!sidebarcontext ? 'my-auto' : 'm-auto'}>
              <UserIcon />
            </span>
            {!sidebarcontext && <span className="ml-3 my-auto">{'Admin'}</span>}
          </div>
        </Link>
        <Link href={'/'}>
          <div
            className={
              !sidebarcontext
                ? DEFAULT_BUTTON(
                    'm-5 mb-0 pl-5 pr-5 flex justify-items-center align-middle'
                  )
                : DEFAULT_BUTTON(
                    ' pl-5  pr-5 flex justify-items-center align-middle'
                  )
            }
          >
            <span className={!sidebarcontext ? 'my-auto' : 'm-auto'}>
              <UserIcon />
            </span>
            {!sidebarcontext && <span className="ml-3 my-auto">{'User'}</span>}
          </div>
        </Link>

        <div
          className={
            !sidebarcontext
              ? DEFAULT_BUTTON(
                  'm-5 flex mt-2 pl-5 pr-5 bg-red-700 hover:bg-red-400'
                )
              : DEFAULT_BUTTON(
                  ' pl-5  pr-5  flex pl-5 pr-5 bg-red-700 hover:bg-red-400'
                )
          }
        >
          <button
            onClick={() => {
              signOut();
            }}
            className="w-full flex"
          >
            <span className={!sidebarcontext ? 'my-auto' : 'm-auto'}>
              <Signout />
            </span>
            {!sidebarcontext && <span className="ml-3 my-auto"> Sign out</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
