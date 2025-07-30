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
    try {
      if (!text.trim()) return;

      await axios.post(`/comments/${videoId}`, { text });
      setText('');
      fetchComments();
    } catch (err) {
      console.error('Error posting comment:', err.response?.data || err.message);
    }
  };

  const handleEdit = async (commentId) => {
    try {
      if (!editText.trim()) return;

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
    <div className="mt-4 px-2">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>

      {user && (
        <div className="mb-4">
          <textarea
            className="w-full border p-2 rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            onClick={handlePost}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition "
          >
            Comment
          </button>
        </div>
      )}

      {comments.map((comment) => (
        <div
          key={comment._id}
          className="border-b py-2 flex justify-between items-start"
        >
          <div className="w-full">
            <p className="font-semibold">{comment.username}</p>
            {editId === comment._id ? (
              <>
                <textarea
                  className="w-full border mt-1 p-1 rounded"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="space-x-2 mt-1">
                  <button
                    onClick={() => handleEdit(comment._id)}
                    className="text-green-600 text-sm hover:text-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditId(null);
                      setEditText('');
                    }}
                    className="text-gray-500 text-sm hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p className="mt-1">{comment.text}</p>
            )}
          </div>

          {user?.id === comment.userId && (
            <div className="ml-4 mt-1 flex flex-col space-y-1 text-sm">
              <button
                onClick={() => {
                  setEditId(comment._id);
                  setEditText(comment.text);
                }}
                className="flex items-center text-blue-500 hover:text-blue-700 transition"
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                onClick={() => handleDelete(comment._id)}
                className="flex items-center text-red-500 hover:text-red-700 transition"
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comment;
