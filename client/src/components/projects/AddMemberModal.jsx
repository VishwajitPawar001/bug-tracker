import { useEffect, useState } from "react";
import API from "../../services/api";

function AddMemberModal({ projectId, setOpen, refreshProject }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);

      // 🔥 auto select first user (better UX)
      if (res.data.length > 0) {
        setSelectedUser(res.data[0]._id);
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const addMember = async () => {
    if (!selectedUser) return;

    setLoading(true);

    try {
      await API.post(`/projects/${projectId}/members`, {
        userId: selectedUser,
      });

      refreshProject();
      setOpen(false);
    } catch (err) {
      console.log(err?.response?.data || err.message);
      alert("Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl w-80">

        <h2 className="text-white text-lg mb-4">Add Member</h2>

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full p-2 rounded bg-black/30 text-white border border-white/20"
        >
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <button
          onClick={addMember}
          disabled={loading}
          className={`mt-4 w-full p-2 rounded text-white ${
            loading ? "bg-gray-500" : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          {loading ? "Adding..." : "Add"}
        </button>

        <button
          onClick={() => setOpen(false)}
          className="mt-2 w-full text-gray-300 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddMemberModal;