import { useMutation } from '@apollo/client';
import { Transition } from '@headlessui/react';
import { DocumentArrowUpIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import notify from '@/components/toasts/toast';
import { useUser } from '@/context/UserDataProvider';
import { SUBMIT_ASSIGNMENT } from '@/graphql/mutations/content';
import { BUCKET_URL } from '@/utils/S3';

import Loading from '../shared/Loading';
import TextInput from './form-components/TextInput';

function CreateSubmission({
  courseId,
  submissionData,
  setX,
  showAnimation,
}: any) {
  const { data: session }: any = useSession();
  const user = useUser();
  const [submitAssginment, { data, loading }] = useMutation(SUBMIT_ASSIGNMENT);
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
      const response = await submitAssginment({
        variables: {
          submission: {
            contentId: submissionData.contentId,
            description: 'some',
            courseId,
            instructorId: submissionData.instructorId,
            studentId: user?.id,
            submissionFiles: BUCKET_URL.concat(
              fileRes?.config?.data?.name as string
            ),
            submissionType: 'ASSIGNMENT',
          },
        },
        context: {
          headers: {
            Authorization:
              session && (session as any).infraToken
                ? (session as any).infraToken
                : '',
          },
        },
      });
      if (response.data.createSubmission?.status === 200) {
        notify({
          type: 'SUCCESS',
          position: 'bottom-right',
          message: 'Submission Created',
          description: 'Submission has been created successfully',
        });
        return;
      }
      if (response.data?.createSubmission?.status !== 200) {
        throw new Error(data?.createSubmission?.message);
      }
    } catch (err: any) {
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
      <div className="m-3 ml-5">
        <span className="text-3xl font-bold pr-2 ml-4">Submit Assignment</span>
      </div>
      <form
        onSubmit={onSubmit}
        className="items-center pl-5 justify-center align-middle"
      >
        <div className="scrollbar-hide w-3/4 overflow-y-scroll space-y-12 p-5">
          <div className=" pb-6">
            {/* Submission  */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <TextInput
                classNames={'sm:col-span-3'}
                fieldName={'name'}
                data={contentData}
                setData={setContentData}
                label={'Assignment Name'}
                placeholder={'Introduction to Python'}
              />
            </div>

            {/* attached file */}
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Assginment Upload
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
                      <span>{!file ? 'Assignmnet Upload' : file.name}</span>

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
                    Any file upto 10MB.
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
              setX(false);
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

export default CreateSubmission;
