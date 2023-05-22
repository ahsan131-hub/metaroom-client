import {
  GlobeAltIcon,
  SquaresPlusIcon,
  UsersIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Access class content from your work desk',
    description:
      'Whatever goes on in a traditional classroom, assignments, quizzes, lecture notes, you get everything under one page at MetaRoom',
    icon: GlobeAltIcon,
  },
  {
    name: 'Manage your courses under one platform',
    description:
      'If you are a teacher, you get all your courses you are teaching under one single platfrom.',
    icon: SquaresPlusIcon,
  },
  {
    name: 'Host real-time video lectures',
    description:
      'Host video sessions at MetaRoom where your students can join and take a remote class.',
    icon: VideoCameraIcon,
  },
  {
    name: 'Communicate with your teachers one-to-one',
    description:
      'Apart from the video sessions, students can book a one-on-one session with their teachers.',
    icon: UsersIcon,
  },
];

export default function Aboutus() {
  return (
    <div className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <div className="flex items-center justify-center">
            <div className="bg-indigo-600 rounded-full text-white flex items-center justify-center h-12 w-12 mr-2">
              <span className="text-2xl font-bold italic">M</span>
            </div>
            <h1 className="text-indigo-600 text-2xl font-bold">Metaroom</h1>
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            A better way to learn
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            <i>Meta</i> where everything you ever need for remote learning is
            provided, <i>Room</i> where you can interact with your teachers with
            no hurdles. <i>MetaRoom</i>, where remote learning meets comfort.
          </p>
        </div>

        <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0">
                  <feature.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900">
                    {feature.name}
                  </p>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
