import { DEFAULT_BUTTON } from '@/styles/defaultStyleTailwindClass';

const search = () => {
  // search button logic
};
const SearchBar: React.FC = () => {
  return (
    <form className="w-full flex items-center relative">
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="voice-search"
          className="bg-gray-50 border w-full pl-10 p-2.5  border-gray-300 text-gray-900 text-sm
           rounded-lg  block "
          placeholder="Search meetings"
        />
      </div>
      <button
        type="submit"
        onClick={() => {
          search();
        }}
        className={DEFAULT_BUTTON(
          'inline-flex items-center w-40 text-center align-middle justify-center'
        )}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5 mr-2 -ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        Search
      </button>
    </form>
  );
};
export default SearchBar;
