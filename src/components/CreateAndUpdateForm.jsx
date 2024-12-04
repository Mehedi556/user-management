/* eslint-disable react/prop-types */

const CreateAndUpdateForm = ({
  formData,
  handleChange,
  handleCreateOrUpdateUser,
}) => {
  return (
    <form className="space-y-4 overflow-y-scroll lg:overflow-y-auto">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData?.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData?.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData?.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="image"
        placeholder="Image link"
        value={formData?.image}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <div className="flex items-center gap-x-2">
        <input
          type="text"
          name="nationality"
          placeholder="Nationality"
          value={formData?.nationality}
          onChange={handleChange}
          className="w-2/3 border p-2 rounded flex-1"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData?.age}
          onChange={handleChange}
          className="w-1/3 border p-2 rounded"
        />
      </div>

      <div className="flex items-center gap-x-2">
        <input
          type="text"
          name="nid"
          placeholder="NID"
          value={formData?.nid}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="gender"
          value={formData?.gender}
          onChange={handleChange}
          className="w-full py-[9px] rounded-sm"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <input
        type="text"
        name="skills"
        placeholder="Skills"
        value={formData?.skills}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="website"
        placeholder="Website"
        value={formData?.website}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData?.address}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <p className="text-white font-bold text-center py-2">
        Educational Qualifications
      </p>

      <input
        type="text"
        name="educationalQualifications.degree"
        placeholder="degree"
        value={formData?.educationalQualifications?.degree}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="educationalQualifications.university"
        placeholder="University"
        value={formData?.educationalQualifications?.university}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <div className="flex gap-x-2 items-center">
        <input
          type="number"
          name="educationalQualifications.session"
          placeholder="Session"
          value={formData?.educationalQualifications?.session}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="educationalQualifications.cgpa"
          placeholder="CGPA"
          value={formData?.educationalQualifications?.cgpa}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        onClick={handleCreateOrUpdateUser}
        type="button"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
};

export default CreateAndUpdateForm;
