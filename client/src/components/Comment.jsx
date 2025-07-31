import React, { useState, useEffect, useCallback } from 'react';
import axios from '../api/axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Comment = ({ videoId, user }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  }, [videoId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handlePost = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(`/comments/${videoId}`, { text });
      setText('');
      fetchComments();
    } catch (err) {
      console.error('Error posting comment:', err.response?.data || err.message);
    }
  };

  const handleEdit = async (commentId) => {
    if (!editText.trim()) return;
    try {
      await axios.put(`/comments/${commentId}`, { text: editText });
      setEditId(null);
      setEditText('');
      fetchComments();
    } catch (err) {
      console.error('Error editing comment:', err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      fetchComments();
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  return (
    <div className="mt-8 px-4">
      <h3 className="text-xl font-semibold text-white mb-4">Comments</h3>

      {/* Comment input */}
      {user && (
        <div className="mb-6">
          <textarea
            className="w-full bg-[#1f1f1f] text-white border border-gray-600 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            onClick={handlePost}
            className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition font-medium"
          >
            Post Comment
          </button>
        </div>
      )}

      {/* Comment list */}
      <div className="space-y-5">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-[#2c2c2c] p-4 rounded-md shadow-sm">
            <div className="flex justify-between items-start">
              <div className="w-full">
                <p className="text-sm text-gray-300 font-semibold">@username:{comment.username}</p>
                {editId === comment._id ? (
                  <>
                    <textarea
                      className="w-full mt-2 bg-[#1f1f1f] text-white border border-gray-600 rounded-lg p-2 resize-none focus:outline-none"
                      rows="2"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <div className="mt-2 flex gap-3">
                      <button
                        onClick={() => handleEdit(comment._id)}
                        className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditId(null);
                          setEditText('');
                        }}
                        className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="mt-1 text-gray-200">comment:-{comment.text}</p>
                )}
              </div>

              {user?.id === comment.userId && (
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <button
                    onClick={() => {
                      setEditId(comment._id);
                      setEditText(comment.text);
                    }}
                    className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-600 transition"
                  >
                    <FaEdit className="text-sm" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="flex items-center gap-1 text-sm text-red-400 hover:text-red-600 transition"
                  >
                    <FaTrash className="text-sm" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
