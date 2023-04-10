import { PaperClipIcon } from '@heroicons/react/20/solid';

export default function CourseContent({ data }: any) {
  return (
    <div className="border-t border-gray-200">
      <div className={'m-2 ml-10 pt-5 font-semibold sm:rounded-lg '}>
        <span>{data.uploadDate}</span>
      </div>
      <dl>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0">
            <ul
              role="list"
              className="divide-y divide-gray-200 rounded-md border border-gray-200"
            >
              <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    className="h-5 w-5 shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-2 w-0 flex-1 truncate">
                    Machine Learning Basics.pdf
                  </span>
                </div>
                <div className="ml-4 shrink-0">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Download
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
