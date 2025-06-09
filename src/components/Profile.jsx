import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser?.id) return;

    fetch('http://localhost/backend/GetUser.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: localUser.id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=JohnDoe)}`;
          setUser({ ...data.user, avatar });
        } else {
          alert("User not found");
        }
      })
      .catch(err => {
        console.error("Error fetching user:", err);
        alert("Failed to load profile");
      });
  }, []);

  if (!user) return <div className="text-center mt-24 text-2xl text-gray-500">Loading profile...</div>;

  return (
    <div className="h-[400px] flex justify-center mt-26">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full transition-all duration-300">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full animate-bounce"
          />
          <h2 className="mt-4 text-3xl font-extrabold text-purple-700 drop-shadow-sm">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="mt-3 px-3 py-2 bg-purple-100 rounded-xl text-purple-700 font-medium">
            Minimalist Buyer | Quality Over Quantity | Smooth Checkout
          </p>
          <p className="mt-2 text-sm text-gray-600">📍 {user.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
