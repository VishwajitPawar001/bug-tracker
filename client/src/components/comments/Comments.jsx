import { useEffect, useState } from "react";
import API from "../../services/api";

function Comments({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${ticketId}`);
      setComments(res.data);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [ticketId]);

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      await API.post("/comments", {
        text,
        ticketId,
      });

      setText("");
      fetchComments(); // 🔥 refresh
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="mt-4">

      <h3 className="text-white mb-2">Comments</h3>

      {/* LIST */}
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {comments.map((c) => (
          <div key={c._id} className="bg-white/10 p-2 rounded text-sm text-white">
            <div className="text-xs text-gray-400">
              {c.user?.name} • {new Date(c.createdAt).toLocaleString()}
            </div>
            {c.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="flex gap-2 mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 rounded bg-black/30 text-white"
          placeholder="Add comment..."
        />
        <button
          onClick={addComment}
          className="bg-pink-500 px-3 rounded text-white"
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default Comments;