import { useMutation } from '@apollo/client';
import { Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import notify from '@/components/toasts/toast';
import { UPDATE_USER } from '@/graphql/mutations/user';

import Loading from '../shared/Loading';
import DateInput from './form-components/DateInput';
import SelectInput from './form-components/SelectInput';
import TextInput from './form-components/TextInput';

export default function UpdateUser({
  showRoleInput,
  prevUserData,
}: {
  showRoleInput: Boolean;
  prevUserData: any;
}) {
  const { data: session }: any = useSession();
  const router = useRouter();
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
  const [userData, setUserData] = useState({
    fName: prevUserData.fName,
    lName: prevUserData.lName,
    phone: prevUserData.phone,
    dateOfBirth: prevUserData.dateOfBirth,
    timezone: prevUserData.timezone,
    role: prevUserData.role,
  });
  const [dob, setDob] = useState('');

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await updateUser({
      variables: { user: { ...userData, dateOfBirth: dayjs().toISOString() } },
      context: {
        headers: {
          Authorization:
            session && (session as any).infraToken
              ? (session as any).infraToken
              : '',
        },
      },
    });
    if (res.data.updateUser.status === 200) {
      notify({
        type: 'SUCCESS',
        position: 'bottom-right',
        message: 'User Updated',
        description: 'User has been updated successfully',
      });
      router.reload();
    }
    if (res.data.updateUser.status !== 200) {
      notify({
        type: 'ERROR',
        position: 'bottom-right',
        message: 'User update failed',
        description: res.data.updateUser.message,
      });
    }
  };

  if (error) {
    notify({
      type: 'ERROR',
      position: 'bottom-right',
      message: 'User Updated Failed',
      description: error.message,
    });
  }

  return (
    <Transition
      show={true}
      enter="transition-all ease-in-out duration-500 delay-[500ms]"
      enterFrom="opacity-0 translate-y-6"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all ease-in-out duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="m-2 ">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
          Complete Registration
        </h2>
      </div>
      {loading && <Loading />}

      {!data && (
        <form
          onSubmit={onSubmit}
          className=" items-center pl-5 w-1/2 justify-center    align-middle "
        >
          <div className="scrollbar-hide  overflow-y-scroll space-y-12 p-5">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="pb-6">
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-6">
                  <TextInput
                    classNames={'sm:col-span-3'}
                    fieldName={'userName'}
                    data={userData}
                    setData={setUserData}
                    label={'User Name'}
                    placeholder={'johnsmith'}
                  />
                  <TextInput
                    classNames={'sm:col-span-3'}
                    fieldName={'fName'}
                    data={userData}
                    setData={setUserData}
                    label={'First Name'}
                    placeholder={'John'}
                  />
                  <TextInput
                    classNames={'sm:col-span-3'}
                    fieldName={'lName'}
                    data={userData}
                    setData={setUserData}
                    label={'Last Name'}
                    placeholder={'Smith'}
                  />
                  <TextInput
                    classNames={'sm:col-span-3'}
                    fieldName={'phone'}
                    data={userData}
                    placeholder={'(123) 456-7890'}
                    setData={setUserData}
                    label={'Phone Name'}
                  />
                  <DateInput
                    classNames={'sm:col-span-3'}
                    selectedDate={dob}
                    selectedDateChange={setDob}
                    label={'Date of Birth'}
                  />
                  <SelectInput
                    classNames={'sm:col-span-3'}
                    fieldName={'timezone'}
                    data={userData}
                    setData={setUserData}
                    label={'Timezone'}
                    placeholder={'Select Timezone'}
                    options={['Asia/Karachi', 'Asia/Kolkata']}
                  />
                  {showRoleInput && (
                    <SelectInput
                      classNames={'sm:col-span-3'}
                      fieldName={'role'}
                      data={userData}
                      setData={setUserData}
                      label={'Role'}
                      placeholder={'Select Role'}
                      options={['STUDENT', 'INSTRUCTOR']}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6 mr-10">
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
      )}
    </Transition>
  );
}
