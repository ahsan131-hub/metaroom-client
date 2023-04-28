import React from 'react';

const TimePicker = ({ value, setValue }: { value: any; setValue: any }) => {
  return (
    <div className="mt-2">
      <div className="flex ">
        <select
          name="hours"
          value={value.hour}
          onChange={(e) => setValue({ ...value, hour: e.target.value })}
          className="block p-2 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
        </select>
        <span className="text-xl mr-3">:</span>
        <select
          name="minutes"
          value={value.minute}
          onChange={(e) => {
            setValue({ ...value, minute: e.target.value });
          }}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option value="0">00</option>
          <option value="30">30</option>
        </select>
        {/* <span className="text-xl mr-3">:</span> */}
        {/* <select
          name="ampm"
          value={value.period}
          onChange={(e) => {
            setValue({ ...value, period: e.target.value });
          }}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option value="am">AM</option>
          <option value="pm">PM</option>
        </select> */}
      </div>
    </div>
  );
};

export default TimePicker;
