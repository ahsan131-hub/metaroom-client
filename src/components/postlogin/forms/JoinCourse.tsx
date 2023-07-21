import { useMutation } from '@apollo/client';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import notify from '@/components/toasts/toast';
import { useUser } from '@/context/UserDataProvider';
import { ENROLL_COURSE } from '@/graphql/mutations/course';

import Loading from '../shared/Loading';

function JoinCourse({
  showAnimation,
  setShowAnimation,
}: {
  showAnimation: boolean;
  setShowAnimation: any;
}) {
  const [courseId, setCourseId] = useState<string>('');
  const user = useUser();
  const router = useRouter();
  const { data: session } = useSession();
  const [enrollCourse, { loading }] = useMutation(ENROLL_COURSE);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const enroll = await enrollCourse({
      variables: { courseId, studentEmail: user.email },
      context: {
        headers: {
          Authorization:
            session && (session as any).infraToken
              ? (session as any).infraToken
              : '',
        },
      },
    });
    if (enroll.data.enrollInCourse.status === 200) {
      notify({
        type: 'SUCCESS',
        message: 'Enrollment successful',
        description: 'Enrollment successfully completed',
        position: 'bottom-right',
      });
      setShowAnimation(!showAnimation);
    }

    if (enroll.data.enrollInCourse.status !== 200) {
      notify({
        type: 'ERROR',
        message: 'Enrollment failed',
        description: enroll.data.enrollInCourse.message,
        position: 'bottom-right',
      });
    }
    setCourseId('');
    router.reload();
  };
  return (
    <Transition
      show={showAnimation}
      enter="transition-all ease-in-out duration-500 delay-[500ms]"
      enterFrom="opacity-0 translate-y-6"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all ease-in-out duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="m-2 ">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
          Join Course
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Create courses and Share Link with Students for Joining.
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className=" items-center pl-5  justify-center    align-middle "
        >
          <div className="scrollbar-hide w-3/4 overflow-y-scroll space-y-12 p-5">
            <div className="border-b border-gray-900/10 pb-12">
              <div className=" pb-6">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="course-key"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Course Key
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="course-key"
                        id="course-key"
                        value={courseId}
                        onChange={(e) => {
                          setCourseId(e.target.value);
                        }}
                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center w-3/4 justify-end gap-x-6 mr-10">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </Transition>
  );
}

export default JoinCourse;
