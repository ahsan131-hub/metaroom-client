import { useMutation } from '@apollo/client';
import { Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import notify from '@/components/toasts/toast';
import { CREATE_CONTENT } from '@/graphql/mutations/content';
import { BUCKET_URL } from '@/utils/S3';

import Loading from '../shared/Loading';
import DateInput from './form-components/DateInput';
import SelectInput from './form-components/SelectInput';
import TextInput from './form-components/TextInput';

function CreateAssignment({
  courseId,
  instructorId,
  showAnimation,
  setRefetchContent,
}: any) {
  const { data: session }: any = useSession();
  const [createContent, { data, loading, error }] = useMutation(CREATE_CONTENT);
  const [deadline, setDeadline] = useState(dayjs().format('YYYY-MM-DD'));
  const [contentData, setContentData] = useState<any>({
    name: '',
    description: '',
    contentFiles: '',
    contentType: '',
  });
  const [file, setFile] = useState<any>(null);
  let fileRes: any = null;
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (file) {
        // upload cover photo
        const { data: uploadedData }: { data: any } = await axios.post(
          '/api/s3/upload',
          {
            name: file?.name,
            type: file?.type,
          }
        );
        const { url } = uploadedData;
        fileRes = await axios.put(url, file, {
          headers: {
            'Content-type': file.type,
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      // console.log({
      //   ...contentData,
      //   contentFiles: [
      //     ...contentData.contentFiles,
      //     BUCKET_URL.concat(fileRes?.config?.data?.name as string),
      //   ],
      // });
      const response = await createContent({
        variables: {
          content: {
            ...contentData,
            contentFiles: [
              ...contentData.contentFiles,
              BUCKET_URL.concat(fileRes?.config?.data?.name as string),
            ],
            deadline,
          },
          courseId,
          instructorId,
        },
        context: {
          headers: {
            Authorization: session ? session.infraToken : '',
          },
        },
      });
      console.log(response);
      if (response.data.createContent?.status === 200) {
        notify({
          type: 'SUCCESS',
          position: 'bottom-right',
          message: 'Assignment Created',
          description: 'Assignment has been created successfully',
        });
        setRefetchContent(true);
        return;
      }
      console.log(data);
      if (response.data?.createContent?.status !== 200) {
        throw new Error(data?.createContent?.message);
      }
    } catch (err: any) {
      console.log(err);
      notify({
        type: 'ERROR',
        position: 'bottom-right',
        message: 'Assingment creation failed',
        description: err.message,
      });
    }
  };
  if (loading) {
    return <Loading />;
  }
  const selectfile = (e: any) => {
    setFile(e.target.files[0]);
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
          Create Assingment
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Create Assignment for better Assesments.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className=" items-center pl-5  justify-center    align-middle "
      >
        <div className="scrollbar-hide w-3/4 overflow-y-scroll space-y-12 p-5">
          <div className="border-b border-gray-900/10 pb-12">
            <div className=" pb-6">
              {/* assignment  */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <TextInput
                  classNames={'sm:col-span-3'}
                  fieldName={'name'}
                  data={contentData}
                  setData={setContentData}
                  label={'Content Name'}
                  placeholder={'Introduction to Python'}
                />

                <SelectInput
                  classNames={'sm:col-span-3'}
                  fieldName={'contentType'}
                  data={contentData}
                  setData={setContentData}
                  label={'Content Type'}
                  placeholder={'Select Content Type'}
                  options={['ASSIGNMENT', 'CONTENT']}
                />
              </div>
              {/* deade line */}
              <div className="mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Deadline
                </label>
                <DateInput
                  selectedDate={deadline}
                  selectedDateChange={setDeadline}
                  classNames={'col-span-2'}
                  label={''}
                />
              </div>
              {/* attached file */}
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
                        <span>{!file ? 'Course Outline' : file.name}</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={(e) => {
                            selectfile(e);
                          }}
                          className="sr-only"
                        />
                      </label>
                      {!file && <p className="pl-1">or drag and drop</p>}
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              {/* assignment description */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="Description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description (minimum 10 characters)
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="Description"
                      name="Description"
                      rows={3}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      value={contentData.description}
                      onChange={(e) => {
                        setContentData({
                          ...contentData,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about Content.
                  </p>
                </div>
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
