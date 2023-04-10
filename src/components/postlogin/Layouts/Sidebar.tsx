import classNames from 'classnames';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import type { ISideBarItem } from '@/constants';
import {
  useSideBarContext,
  useToggleSideBarContext,
} from '@/context/SideBarProvider';

export const Sidebar = ({ sidebarItems }: { sidebarItems: ISideBarItem[] }) => {
  const { data: session } = useSession();
  const sidebarcontext = useSideBarContext();
  const toggleSidebarcontext = useToggleSideBarContext();
  const wrapperClassNames = classNames(
    'flex flex-col w-80 text-black border-r-secondary-500 bg-slate-50 h-full border relative  ',
    {
      'w-20': sidebarcontext,
    }
  );

  return (
    <div
      className={wrapperClassNames}
      style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
    >
      <div className="h-20 flex flex-row p-2 justify-between mb-5">
        {!sidebarcontext && <h1 className="text-center text-xl  ">MetaRoom</h1>}
        {
          <div
            className="h-10 text-center justify-center w-10 pt-2 pl-3 "
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
          {session?.user?.name || 'John Wick'}
        </div>
      ) : (
        <div className=" h-10 m-2 text-center p-2"></div>
      )}
      <div className={' text-black'}>
        {sidebarItems.map((item: ISideBarItem, index: number) => (
          <div key={index}>
            <Link href={item.href}>
              <div
                className={
                  !sidebarcontext
                    ? ' hover:bg-white text-black flex m-2 p-2   text-center justify-items-center rounded-md'
                    : ' hover:bg-white text-black flex  m-2 p-2 text-center justify-items-center rounded-md'
                }
              >
                <span>{item.icon()}</span>
                {!sidebarcontext && (
                  <span className="text-xl mt-1 ml-3">{item.title}</span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
