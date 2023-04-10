import { Transition } from '@headlessui/react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

import TimePicker from '../shared/TimePicker';

export default function CreateCourse({
  showAnimation,
}: {
  showAnimation: boolean;
}) {
  const [dates, setDates] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleValueChange = (newValue: any) => {
    setDates(newValue);
  };

  const [time, setTime] = useState({ hour: '00', minute: '00', period: 'PM' });
  const [courseData, setCourseData] = useState({
    courseName: '',
    subject: '',
    durationOfCourse: '',
    studentLimit: 0,
    sessionTime: '',
    sessionId: '',
    about: '',
    coverPhoto: '',
    courseOutline: '',
  });
  const onSubmit = (e: any) => {
    e.preventDefault();
    // setCourseData(...courseData,sessionTime:time)
    console.log(courseData);
    console.log(time);
    console.log(dates);
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
          Create courses and Share Link with Students for Joining.
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
                    Course Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="course-name"
                      id="course-name"
                      onChange={(e) => {
                        setCourseData({
                          ...courseData,
                          courseName: e.target.value,
                        });
                      }}
                      value={courseData.courseName}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subject
                  </label>
                  <div className="mt-2">
                    <select
                      id="subject"
                      name="subject"
                      onChange={(e) => {
                        setCourseData({
                          ...courseData,
                          subject: e.target.value,
                        });
                      }}
                      value={courseData.subject}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Machine Learning </option>
                      <option>Web Development </option>
                      <option>Cyber Security </option>
                    </select>
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="session-time"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Session time
                  </label>
                  <TimePicker value={time} setValue={setTime} />
                </div>
                <div className="col-span-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="limit"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Student Limit
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="limit"
                        placeholder="15"
                        value={courseData.studentLimit}
                        onChange={(e) => {
                          setCourseData({
                            ...courseData,
                            studentLimit: parseInt(e.target.value, 10),
                          });
                        }}
                        className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Course Duration
                  </label>
                  <div className="mt-2">
                    <Datepicker
                      primaryColor="indigo"
                      value={dates}
                      onChange={handleValueChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Link
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      MetaRoom.edu/
                    </span>
                    <input
                      type="text"
                      name="courseId"
                      id="courseId"
                      autoComplete="courseId"
                      value={courseData.sessionId}
                      onChange={(e) =>
                        setCourseData({
                          ...courseData,
                          sessionId: e.target.value,
                        })
                      }
                      className="block flex-1 border-0 bg-transparent  pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="CS-101-IBA"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    value={courseData.about}
                    onChange={(e) => {
                      setCourseData({ ...courseData, about: e.target.value });
                    }}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Course Cover Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Course Outline
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 ">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Course Outline</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          value={courseData.courseOutline}
                          onChange={() => {
                            setCourseData({
                              ...courseData,
                              courseOutline: 'e.target',
                            });
                          }}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
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
    </Transition>
  );
}
