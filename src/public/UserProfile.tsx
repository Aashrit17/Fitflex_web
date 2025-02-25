import React, { useEffect, useState } from "react";
import { useUpdateUser } from "./query"; // Adjust the path

interface User {
  name: string;
  avatarUrl: string;
  phone: string;
  email: string;
  id: string; // Assuming you store userId as part of the user object
}

const UserDetails: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editableUser, setEditableUser] = useState<User | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State to store success message
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to store error message
  const [image, setImage] = useState<string | null>(null); // State for storing the base64 image

  // Fetch the update mutation from your hooks
  const { mutate: updateUser, isPending } = useUpdateUser();

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditableUser(parsedUser); // Set the user for editing
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editableUser) {
      setEditableUser({
        ...editableUser,
        [e.target.name]: e.target.value, // Dynamically update the edited fields
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string); // Set the base64 image
        }
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  const handleUpdate = () => {
    if (editableUser) {
      // Retrieve userId from editableUser (now using actual userId)
      const userId = editableUser.email;

      // Pass the user data to the update function (passing userId for update)
      updateUser({
        userId: userId, // Pass the correct userId here
        name: editableUser.name,
        phone: editableUser.phone,
        image: image || editableUser.avatarUrl, // Use the new image if available
      }, {
        onSuccess: () => {
          setSuccessMessage("Profile updated successfully!"); // Set success message
          setErrorMessage(null); // Clear any previous error message
        },
        onError: () => {
          setErrorMessage("Failed to update profile."); // Set error message
          setSuccessMessage(null); // Clear any previous success message
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-3xl font-semibold mb-8">User Details</h2>

      {successMessage && (
        <div className="mb-4 text-green-500">{successMessage}</div> // Display success message
      )}

      {errorMessage && (
        <div className="mb-4 text-red-500">{errorMessage}</div> // Display error message
      )}

      {user ? (
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <img
              src={image || editableUser?.avatarUrl || "https://via.placeholder.com/150"} // Fallback image
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={editableUser?.name || ""}
                onChange={handleInputChange}
                className="mt-2 w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={editableUser?.email || ""}
                readOnly
                className="mt-2 w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Phone</label>
              <input
                type="text"
                name="phone"
                value={editableUser?.phone || ""}
                onChange={handleInputChange}
                className="mt-2 w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpdate}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-200"
              disabled={isPending} // Disable button while updating
            >
              {isPending ? "Updating..." : "UPDATE"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 mt-4">No user data available. Please log in.</p>
      )}
    </div>
  );
};

export default UserDetails;
