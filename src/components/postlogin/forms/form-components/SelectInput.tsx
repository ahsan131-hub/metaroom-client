const SelectInput = ({
  userData,
  setUserData,
  fieldName,
  label,
  classNames,
  placeholder,
  options,
}: any) => {
  return (
    <div className={classNames}>
      <label
        htmlFor="time-zone"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          name="ampm"
          placeholder={placeholder}
          onChange={(e) => {
            setUserData({ ...userData, [fieldName]: e.target.value });
          }}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option>{placeholder}</option>
          {options.map((option: string, index: number) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default SelectInput;
