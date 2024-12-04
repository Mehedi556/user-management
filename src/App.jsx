/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "./redux/api/baseApi";
import SidePanel from "./components/SidePanel";
import CreateAndUpdateForm from "./components/CreateAndUpdateForm";
import LeftPanel from "./components/LeftPanel";
import UserDetails from "./components/UserDetails";

function App() {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [isLeftPanelOpen, setLeftPanelOpen] = useState(false);
  const [panelType, setPanelType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: selectedUser?.name || "",
    email: selectedUser?.email || "",
    phone: selectedUser?.phone || "",
    image: selectedUser?.image || "",
    age: selectedUser?.age || 0,
    gender: selectedUser?.gender || "",
    nationality: selectedUser?.nationality || "",
    skills: selectedUser?.skills || "",
    nid: selectedUser?.nid || "",
    address: selectedUser?.address || "",
    website: selectedUser?.website || "",
    educationalQualifications: {
      degree: selectedUser?.educationalQualifications?.degree || "",
      university: selectedUser?.educationalQualifications?.university || "",
      session: selectedUser?.educationalQualifications?.session || "",
      cgpa: selectedUser?.educationalQualifications?.cgpa || "",
    },
  });
  // console.log(formData);

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data: userData, isLoading } = useGetAllUsersQuery();

  useEffect(() => {
    setFormData(selectedUser);
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // First I'm checking that, name (I mean property) is educationalQualifications or not. if propertyName is educationalQualification then I'm extracting the name property like ["educationalQualification", "degree"] and I also add [1], it's mean the nestedKey is ["degree"]. Then I set the nested key in the educationalQualification object. Lastly if the name property is not educationalQualifications then I'm just setting the value normally.(destructuring previous data then add the new value)
    if (name.startsWith("educationalQualifications.")) {
      const nestedKey = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        educationalQualifications: {
          ...prevState.educationalQualifications,
          [nestedKey]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const openPanel = (type, user = null) => {
    setPanelType(type);
    setSelectedUser(user);
    setPanelOpen(true);
  };

  const openLeftPanel = (user = null) => {
    // console.log(user);
    setSelectedUser(user);
    setLeftPanelOpen(true);
  };

  const handleCreateOrUpdateUser = async (e) => {
    e.preventDefault();
    if (panelType === "create") {
      const result = await createUser(formData);
      console.log(result);
    } else {
      const result = await updateUser(formData);
      console.log(result);
    }

    setFormData({});
    setPanelOpen(false);
  };

  const handleDelete = async (_id) => {
    const result = await deleteUser(_id);
    setPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-200">
        User Management
      </h1>
      <div className="flex w-full justify-end">
        <button
          onClick={() => openPanel("create")}
          className="order-last text-white rounded-sm px-5 p-2 m-2 bg-green-500"
        >
          Create User
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="text-white">
            <p>Loading...</p>
          </div>
        ) : (
          userData?.map((user) => (
            <div
              key={user?._id}
              className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl shadow-slate-500 rounded-lg overflow-hidden"
            >
              <div className="p-6 pb-20">
                <div className="flex items-center space-x-4">
                  <div>
                    <img
                      src={user?.image || "https://via.placeholder.com/80"}
                      alt={user?.name}
                      className="h-20 w-20 rounded-full border-4 border-gray-700 shadow-md"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {user?.name}
                    </h2>
                    <p className="text-sm text-gray-300">{user?.email}</p>
                    <p className="text-sm text-gray-400">{user?.phone}</p>
                  </div>
                </div>

                <div className="mt-4 text-gray-300">
                  <p>
                    <span className="font-semibold text-white">Age:</span>{" "}
                    {user?.age}
                  </p>
                  <p>
                    <span className="font-semibold text-white">
                      Nationality:
                    </span>{" "}
                    {user?.nationality}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Skills:</span>{" "}
                    {Array.isArray(user?.skills)
                      ? user?.skills.join(", ")
                      : user?.skills}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Degree:</span>{" "}
                    {user?.educationalQualifications?.degree}
                  </p>
                  <p>
                    <span className="font-semibold text-white">
                      University:
                    </span>{" "}
                    {user?.educationalQualifications?.university}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-95 flex items-center justify-between py-4 px-6 shadow-inner">
                <button
                  className="flex items-center justify-center text-gray-300 hover:text-white px-4 py-2 rounded-md border border-gray-600 hover:border-gray-500 transition-all"
                  onClick={() => openLeftPanel(user)}
                >
                  View Details
                </button>

                <div className="flex space-x-4">
                  <button
                    className="flex items-center justify-center text-gray-300 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md shadow-md transition-all"
                    onClick={() => openPanel("update", user)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12H9m4 8H9m6-16v2a4 4 0 004 4h2m-6 4v2a4 4 0 01-4 4H7"
                      />
                    </svg>
                    Update
                  </button>

                  <button
                    className="flex items-center justify-center text-gray-300 bg-gray-700 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md shadow-md transition-all"
                    onClick={() => openPanel("delete", user)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right side Panel */}
      <SidePanel
        isOpen={isPanelOpen}
        onClose={() => setPanelOpen(false)}
        title={
          panelType === "create"
            ? "Create User"
            : panelType === "update"
            ? "Update User"
            : "Delete Confirmation"
        }
      >
        {panelType === "create" || panelType === "update" ? (
          <CreateAndUpdateForm
            formData={formData}
            handleChange={handleChange}
            handleCreateOrUpdateUser={handleCreateOrUpdateUser}
          />
        ) : panelType === "delete" ? (
          <div>
            <p className="text-white">
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedUser?.name}</span>?
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setPanelOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(selectedUser?._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ) : null}
      </SidePanel>

      {/* Left side panel */}
      <LeftPanel
        isOpen={isLeftPanelOpen}
        onClose={() => setLeftPanelOpen(false)}
      >
        <UserDetails selectedUser={selectedUser?._id} />
      </LeftPanel>
    </div>
  );
}

export default App;
