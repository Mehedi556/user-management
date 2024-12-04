/* eslint-disable react/prop-types */

import { useGetSingleUserQuery } from "../redux/api/baseApi";

const UserDetails = ({ selectedUser }) => {
  console.log(selectedUser);
  const { data: userData, isLoading } = useGetSingleUserQuery(selectedUser);
  // console.log(userData);

  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center text-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }
  return (
    <div className="p-4 text-white">
      <div className="flex justify-center mb-6">
        <img
          src={userData?.image || "https://via.placeholder.com/150"}
          alt={userData?.name}
          className="h-32 w-32 rounded-full border-2 border-gray-500"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">{userData?.name}</h3>
        <p className="text-center text-gray-400">{userData?.email}</p>
        <p className="text-center">{userData?.phone}</p>
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <h4 className="text-lg font-semibold">Basic Info</h4>
          <p>
            <span className="font-semibold">Age:</span> {userData?.age}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {userData?.gender}
          </p>
          <p>
            <span className="font-semibold">Nationality:</span>{" "}
            {userData?.nationality}
          </p>
        </div>

        <div className="overflow-hidden text-ellipsis">
          <h4 className="text-lg font-semibold">Skills</h4>
          <p>{userData?.skills}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Education</h4>
          <p>
            <span className="font-semibold">Degree:</span>{" "}
            {userData?.educationalQualifications?.degree}
          </p>
          <p>
            <span className="font-semibold">University:</span>{" "}
            {userData?.educationalQualifications?.university}
          </p>
          <p>
            <span className="font-semibold">Session:</span>{" "}
            {userData?.educationalQualifications?.session}
          </p>
          <p>
            <span className="font-semibold">CGPA:</span>{" "}
            {userData?.educationalQualifications?.cgpa}
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold">Other Info</h4>
          <p>
            <span className="font-semibold">NID:</span> {userData?.nid}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {userData?.address}
          </p>
          <p>
            <span className="font-semibold">Website:</span>{" "}
            <a
              href={userData?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              {userData?.website}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
