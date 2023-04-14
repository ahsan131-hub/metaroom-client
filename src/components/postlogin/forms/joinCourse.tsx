import { Transition } from '@headlessui/react';
import React, { useState } from 'react';

export default function JoinCourse({
  showAnimation,
}: {
  showAnimation: boolean;
}) {
  const [courseData, setCourseData] = useState({
    courseId: '',
    courseLink: '',
  });
  const onSubmit = (e: any) => {
    e.preventDefault();
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
          Course
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Join courses with id or Link.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className=" items-center pl-5  justify-center    align-middle "
      >
        <div className="scrollbar-hide w-3/4 overflow-y-scroll space-y-12 p-5">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="border-b border-gray-900/10 pb-6">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="course-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Course Id
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="course-id"
                      id="course-id"
                      onChange={(e) => {
                        setCourseData({
                          ...courseData,
                          courseId: e.target.value,
                        });
                      }}
                      value={courseData.courseId}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="course-Link"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Course Link
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="course-link"
                      id="course-link"
                      onChange={(e) => {
                        setCourseData({
                          ...courseData,
                          courseLink: e.target.value,
                        });
                      }}
                      value={courseData.courseLink}
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
            Enroll
          </button>
        </div>
      </form>
    </Transition>
  );
}
