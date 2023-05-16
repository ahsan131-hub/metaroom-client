import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

import Layout from '@/components/postlogin/Layouts/Layout';
import Loading from '@/components/postlogin/shared/Loading';
import NotLoggedIn from '@/components/utils/NotLoggedIn';
import { useUser } from '@/context/UserDataProvider';
import { GET_STATS } from '@/graphql/Queries/user';

const Admin = () => {
  const { data: session, status }: any = useSession();
  const user = useUser();

  if (status === 'loading') return <Loading />;
  if (status !== 'authenticated') <NotLoggedIn />;
  const {
    data,
    loading,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery(GET_STATS, {
    context: {
      headers: {
        Authorization:
          session && (session as any).infraToken
            ? (session as any).infraToken
            : '',
      },
    },
  });

  return (
    <Layout>
      <div className="h-screen">
        <span className="text-2xl ml-5">Admin</span>
        {!loading ? (
          <div className="p-6 bg-gray-100 rounded-md shadow-lg">
            <h2 className="text-base font-semibold leading-6 text-gray-900">
              Statistics
            </h2>
            {user.role !== 'ADMIN' && (
              <div>Only Admin user can access this page</div>
            )}
            {user.role === 'ADMIN' && (
              <div className="flex justify-between">
                <div className="p-4 bg-white rounded-md shadow-md w-1/3">
                  <p className="text-lg font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {data.getStatistics.statistics?.totalUsers}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-md w-1/3">
                  <p className="text-lg font-medium text-gray-600">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {data.getStatistics.statistics?.totalStudents}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-md w-1/3">
                  <p className="text-lg font-medium text-gray-600">
                    Total Instructors
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {data.getStatistics.statistics?.totalInstructor}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-md w-1/3">
                  <p className="text-lg font-medium text-gray-600">
                    Total Courses
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {data.getStatistics.statistics?.totalCourses}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-md w-1/3">
                  <p className="text-lg font-medium text-gray-600">
                    Total Enrollements
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {data.getStatistics.statistics?.totalEnrollments}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-md w-1/3">
                  <p className="text-lg font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {data.getStatistics.statistics?.totalRevenue}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </Layout>
  );
};

export default Admin;
