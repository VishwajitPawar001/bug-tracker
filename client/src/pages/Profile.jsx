import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../services/api";

function Profile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ FETCH PROFILE
    const fetchProfile = async () => {
        try {
            const res = await API.get("/users/me");
            setUser(res.data);
            setName(res.data.name);
            setAvatar(res.data.avatar || "");
        } catch (err) {
            setError("Something went wrong");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // ✅ HANDLE IMAGE UPLOAD
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await API.post("/tickets/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setAvatar(res.data.filePath);
        } catch (err) {
            setError("Something went wrong");
        }
    };

    // ✅ SAVE PROFILE
    const handleSave = async () => {
        setLoading(true);

        try {
            await API.put("/users/profile", {
                name,
                avatar,
            });

            alert("Profile updated ✅");
            fetchProfile();
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <Layout>
                <p className="text-white">Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-xl mx-auto">

                <h1 className="text-white text-3xl mb-6">Profile</h1>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">

                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-3">

                        <img
                            src={
                                avatar
                                    ? `http://localhost:5000/${avatar}`
                                    : `data:image/svg+xml;utf8,
      <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
        <circle cx='50' cy='50' r='50' fill='%233b82f6'/>
        <text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='white'>
          ${name?.charAt(0).toUpperCase()}
        </text>
      </svg>`
                            }
                            alt="avatar"
                            className="w-24 h-24 rounded-full object-cover border border-white/20"
                        />

                        <input
                            type="file"
                            onChange={handleUpload}
                            className="text-sm text-gray-400"
                        />

                    </div>

                    {/* Name */}
                    <div>
                        <label className="text-gray-400 text-sm">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 p-3 rounded bg-black/30 text-white border border-white/20 focus:outline-none"
                        />
                    </div>

                    {/* Email (readonly) */}
                    <div>
                        <label className="text-gray-400 text-sm">Email</label>
                        <input
                            type="text"
                            value={user.email}
                            disabled
                            className="w-full mt-1 p-3 rounded bg-black/20 text-gray-400 border border-white/10"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="text-gray-400 text-sm">Role</label>
                        <input
                            type="text"
                            value={user.role}
                            disabled
                            className="w-full mt-1 p-3 rounded bg-black/20 text-gray-400 border border-white/10"
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full py-3 rounded bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-medium hover:opacity-90 transition"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            </div>
        </Layout>
    );
}

export default Profile;