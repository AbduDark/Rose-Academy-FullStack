import React from "react";

function DeleteAccount() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">Delete Account</h3>
      <p className="text-red-600 mb-4">
        Warning: This action cannot be undone.
      </p>
      <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
        Delete My Account
      </button>
    </div>
  );
}

export default DeleteAccount;
