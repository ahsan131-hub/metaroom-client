import { Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

function CreateAssignment(props) {
  const [dates, setDates] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleValueChange = (newValue: any) => {
    setDates(newValue);
  };
  return (
    <Transition
      show={props.showAnimation}
      enter="transition-all ease-in-out duration-500 delay-[500ms]"
      enterFrom="opacity-0 translate-y-6"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all ease-in-out duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="m-2 ">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
          Create Assingment
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Create Assignment for better Assesments.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(courseId);
        }}
        className=" items-center pl-5  justify-center    align-middle "
      >
        <div className="scrollbar-hide w-3/4 overflow-y-scroll space-y-12 p-5">
          <div className="border-b border-gray-900/10 pb-12">
            <div className=" pb-6">
              {/* assignment  */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="course-key"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Assingment Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="course-key"
                      id="course-key"
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              {/* deade line */}
              <div className="mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Deadline
                </label>
                <Datepicker
                  primaryColor="indigo"
                  value={dates}
                  onChange={handleValueChange}
                />
              </div>
              {/* attached file */}
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Resources
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
              {/* assignment description */}
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center w-3/4 justify-end gap-x-6 mr-10">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {
              props.setX(false);
            }}
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

export default CreateAssignment;
