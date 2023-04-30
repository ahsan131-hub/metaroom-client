import { useMutation } from '@apollo/client';
import { Transition } from '@headlessui/react';
import { DocumentArrowUpIcon, PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import notify from '@/components/toasts/toast';
import { CREATE_COURSE } from '@/graphql/mutations/course';
import { BUCKET_URL } from '@/utils/S3';

import Loading from '../shared/Loading';
import TimePicker from '../shared/TimePicker';
import DateInput from './form-components/DateInput';

export default function CreateCourse({
  showAnimation,
  refetch,
  setShowcourseForm,
}: {
  showAnimation: boolean;
  refetch: any;
  setShowcourseForm: any;
}) {
  const [time, setTime] = useState({ hour: '00', minute: '00', period: 'PM' });
  const [createCourse, { data, loading, error }] = useMutation(CREATE_COURSE);
  const [coverPhoto, setCoverPhoto] = useState<any>();
  const [courseOutline, setCourseOutline] = useState<any>();
  const { data: session, status } = useSession();

  const [endDate, setEndDate] = useState(
    dayjs().add(90, 'day').format('YYYY-MM-DD')
  );
  const [courseData, setCourseData] = useState({
    name: '',
    subject: '',
    durationOfCourse: '',
    studentLimit: 0,
    sessionTime: '',

    about: '',
    coverPhoto: '',
    courseOutline: '',
  });
  const selectCoverPhoto = (e: any) => {
    setCoverPhoto(e.target.files[0]);
  };
  const selectCourseOutline = (e: any) => {
    setCourseOutline(e.target.files[0]);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let coverRes: any = {};
      let outlineRes: any = {};
      if (!coverPhoto || !courseOutline) {
        notify({
          type: 'ERROR',
          message: 'Upload Error!',
          position: 'bottom-right',
          description: 'Please uplaod cover photo and course outline.',
        });
        return;
      }

      if (coverPhoto) {
        // upload cover photo
        const { data: uploadedData }: { data: any } = await axios.post(
          '/api/s3/upload',
          {
            name: coverPhoto?.name,
            type: coverPhoto?.type,
          }
        );
        const { url } = uploadedData;
        console.log(url);
        coverRes = axios.put(url, coverPhoto, {
          headers: {
            'Content-type': coverPhoto.type,
            'Access-Control-Allow-Origin': '*',
          },
        });
        console.log(coverRes);
      }
      if (courseOutline) {
        // upload course outline
        const { data: uploadedData }: { data: any } = await axios.post(
          '/api/s3/upload',
          {
            name: courseOutline?.name,
            type: courseOutline?.type,
          }
        );
        const { url } = uploadedData;
        console.log(url);
        outlineRes = axios.put(url, courseOutline, {
          headers: {
            'Content-type': courseOutline.type,
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      [coverRes, outlineRes] = await Promise.all([coverRes, outlineRes]);
      const course = {
        ...courseData,
        durationOfCourse: parseInt(courseData.durationOfCourse, 10),
        sessionTime: dayjs()
          .set('hour', parseInt(time.hour, 10))
          .set('minute', parseInt(time.minute, 10))
          .set('second', 0)
          .format('HH:mm:ss'),
        courseEndDate: endDate,
        coverPhoto:
          BUCKET_URL.concat(coverRes?.config?.data?.name as string) || '',
        courseOutline:
          BUCKET_URL.concat(outlineRes?.config?.data?.name as string) || '',
      };
      const res = await createCourse({
        variables: {
          course,
        },
        context: {
          headers: {
            Authorization:
              status === 'authenticated' ? session!.infraToken : '',
          },
        },
      });
      if (res.data.createCourse.status === 200) {
        notify({
          type: 'SUCCESS',
          position: 'bottom-right',
          message: 'Course Created',
          description: 'Course has been created successfully',
        });
        refetch();
        setShowcourseForm(false);
      }
      if (res.data.createCourse.status !== 200) {
        throw new Error(res.data.createCourse.message);
      }
    } catch (err: any) {
      console.log(err);
      notify({
        type: 'ERROR',
        position: 'bottom-right',
        message: 'Course Creation failed',
        description: err.message,
      });
    }
  };
  if (loading) return <Loading />;
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
          Create a course and share its link with students for joining.
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
                          name: e.target.value,
                        });
                      }}
                      value={courseData.name}
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
                        min="1"
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
                    Course End Date
                  </label>

                  <div className="mt-2">
                    <DateInput
                      classNames={'sm:col-span-3'}
                      selectedDate={endDate}
                      selectedDateChange={setEndDate}
                      label={''}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                    placeholder="Description of this course."
                    rows={3}
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    value={courseData.about}
                    onChange={(e) => {
                      setCourseData({ ...courseData, about: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Course Cover Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <PhotoIcon
                    className="h-12 w-10 text-gray-300"
                    aria-hidden="true"
                  />
                  <input
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    type="file"
                    onChange={(e) => selectCoverPhoto(e)}
                  />
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
                    <DocumentArrowUpIcon
                      className="mx-auto h-12 w-10 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>
                          {!courseOutline ? 'Choose file' : courseOutline.name}
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={(e) => {
                            selectCourseOutline(e);
                          }}
                          className="sr-only"
                        />
                      </label>
                      {!courseOutline && (
                        <p className="pl-1">or drag and drop</p>
                      )}
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      Any file upto 10MB.
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
