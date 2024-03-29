import React from 'react';

const DateInput = ({
  selectedDate,
  selectedDateChange,
  classNames,
  label,
}: any) => {
  return (
    <div className={`${classNames} `}>
      <label
        htmlFor="user-name"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="date"
          name="user-name"
          id="user-name"
          onChange={(e) => {
            selectedDateChange(e.target.value);
          }}
          value={selectedDate}
          className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};
export default DateInput;
