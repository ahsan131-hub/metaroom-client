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
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="p-4 bg-white rounded-tl-md text-lg font-medium text-gray-600">
                      Category
                    </th>
                    <th className="p-4 bg-white text-lg font-medium text-gray-600">
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 bg-white text-lg font-medium text-gray-600">
                      Total Users
                    </td>
                    <td className="p-4 bg-white text-3xl font-bold text-blue-600">
                      {data.getStatistics?.statistics?.totalUsers || 32}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 bg-white text-lg font-medium text-gray-600">
                      Total Students
                    </td>
                    <td className="p-4 bg-white text-3xl font-bold text-green-600">
                      {data.getStatistics?.statistics?.totalStudents || 44}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 bg-white text-lg font-medium text-gray-600">
                      Total Instructors
                    </td>
                    <td className="p-4 bg-white text-3xl font-bold text-purple-600">
                      {data.getStatistics?.statistics?.totalInstructor || 42}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 bg-white text-lg font-medium text-gray-600">
                      Total Courses
                    </td>
                    <td className="p-4 bg-white text-3xl font-bold text-blue-600">
                      {data.getStatistics?.statistics?.totalCourses || 22}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 bg-white text-lg font-medium text-gray-600">
                      Total Enrollments
                    </td>
                    <td className="p-4 bg-white text-3xl font-bold text-green-600">
                      {data.getStatistics?.statistics?.totalEnrollments || 11}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 bg-white rounded-bl-md text-lg font-medium text-gray-600">
                      Total Revenue
                    </td>
                    <td className="p-4 bg-white text-3xl font-bold text-purple-600">
                      {data.getStatistics?.statistics?.totalRevenue || 90}
                    </td>
                  </tr>
                </tbody>
              </table>
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
