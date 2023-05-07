import { PaperClipIcon } from '@heroicons/react/20/solid';
import dayjs from 'dayjs';
import React, { useState } from 'react';

export default function CourseContent({ data }: any) {
  const [selectedFile, setSelectedFile] = useState();
  function handleFileSelect(event) {
    const { files } = event.target;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  }
  console.log(`type ${data.contentType}`);
  return (
    <div className="">
      <div className={' ml-10 pt-5 font-semibold sm:rounded-lg '}>
        <span>{data.contentType}</span>
      </div>
      <dl>
        <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
            <ul
              role="list"
              className="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                <div className="flex w-0 flex-1 items-center">
                  <div>
                    <div className="flex">
                      <PaperClipIcon
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 truncate">{data.name}</span>
                    </div>
                    <div className="flex">
                      <PaperClipIcon
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 truncate">
                        description :{data.description}
                      </span>
                    </div>
                    <div className="flex">
                      <PaperClipIcon
                        className="h-5 w-5 shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 truncate">
                        deadline :
                        {dayjs(data.deadline || '03-19-2023').format(
                          'DD/MM/YYYY'
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-4 shrink-0">
                  <label className="flex flex-col items-center w-full border-4 border-dashed border-gray-400 p-2 bg-white text-gray-600 rounded-md hover:bg-gray-50">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2c.513 0 1.024.195 1.414.586l3.172 3.172c.781.781.781 2.047 0 2.828l-1.414 1.414-2.828-2.828v7.586c0 1.106-.894 2-2 2s-2-.894-2-2v-7.586l-2.828 2.828-1.414-1.414c-.781-.781-.781-2.047 0-2.828l3.172-3.172c.39-.39.901-.586 1.414-.586zM5 13v-1h10v1h-2v2h-2v-2h-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                      Select a file
                    </span>
                  </label>
                </div>
                <div className="ml-4 shrink-0">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    download[ {data.contentFiles.length} ]
                  </a>
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
}
