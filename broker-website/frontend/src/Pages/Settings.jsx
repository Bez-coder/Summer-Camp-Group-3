import React, { useState, useEffect } from "react";
import Seller_nav from "../Components/seller_nav";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("Personal details");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    location: "",
    birthday: "",
    sex: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

 const handleUpdate = (e) => {
  e.preventDefault();

  let endpoint = "/api/user/update";
  let payload = {};

  if (activeSection === "Change email") {
    endpoint = "/api/user/change-email";
    payload = {
      currentEmail: user.currentEmail,
      newEmail: user.email,
    };
  } else if (activeSection === "Change password") {
    endpoint = "/api/user/change-password";
    payload = {
      currentPassword: user.currentPassword,
      newPassword: user.password,
    };
  } else {
    payload = user;
  }

  fetch(endpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then(() => alert(`${activeSection} updated!`))
    .catch((err) => console.error("Update error:", err));
};


  const sections = [
    "Personal details",
    "Add phone number",
    "Change email",
    "Change password",
  ];

  return (
    <>
      <Seller_nav />
  
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <aside className="bg-white border rounded-lg shadow p-4 space-y-2 h-fit">
          <h2 className="text-lg font-bold mb-4">Settings</h2>
          {sections.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`w-full text-left px-4 py-2 rounded font-medium ${
                activeSection === item
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </aside>

        {/* Dynamic Form Section */}
        <form
          onSubmit={handleUpdate}
          className="lg:col-span-2 bg-white border rounded-lg shadow p-6 space-y-6"
        >
          <h1 className="text-2xl font-bold mb-4">{activeSection}</h1>

          {activeSection === "Personal details" && (
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="col-span-2 flex items-center space-x-4 mb-4">
                    <img
                    src={user.profilePic }
                    alt="Profile"
                    className="w-16 h-16 rounded-full border"
                    />
                    <input
                    type="file"
                    className="border p-2 rounded"
                    onChange={(e) => setUser({ ...user, profilePic: e.target.files[0] })}
                    />
                </div>
              <div>
                <label className="block font-medium mb-1">First Name*</label>
                <input
                  type="text"
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Last Name*</label>
                <input
                  type="text"
                  value={user.lastName}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Location*</label>
                <select
                  value={user.location}
                  onChange={(e) =>
                    setUser({ ...user, location: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Location</option>
                  <option value="Addis Ababa">Addis Ababa</option>
                  <option value="Adama">Adama</option>
                  <option value="Hawassa">Hawassa</option>
                  <option value="Hawassa">Diredawa</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Birthday</label>
                <input
                  type="date"
                  value={user.birthday}
                  onChange={(e) =>
                    setUser({ ...user, birthday: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Sex</label>
                <select
                  value={user.sex}
                  onChange={(e) => setUser({ ...user, sex: e.target.value })}
                  className="w-full border p-2 rounded"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          )}

          {activeSection === "Add phone number" && (
            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
          )}

          {activeSection === "Change email" && (
  <div className="space-y-4">
    <div>
      <label className="block font-medium mb-1">Current Email</label>
      <input
        type="email"
        value={user.currentEmail || ""}
        onChange={(e) =>
          setUser({ ...user, currentEmail: e.target.value })
        }
        className="w-full border p-2 rounded"
      />
    </div>
    <div>
      <label className="block font-medium mb-1">New Email</label>
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="w-full border p-2 rounded"
      />
    </div>
  </div>
)}

{activeSection === "Change password" && (
  <div className="space-y-4">
    <div>
      <label className="block font-medium mb-1">Current Password</label>
      <input
        type="password"
        value={user.currentPassword || ""}
        onChange={(e) =>
          setUser({ ...user, currentPassword: e.target.value })
        }
        className="w-full border p-2 rounded"
      />
    </div>
    <div>
      <label className="block font-medium mb-1">New Password</label>
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="w-full border p-2 rounded"
      />
    </div>
  </div>
)}


          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
