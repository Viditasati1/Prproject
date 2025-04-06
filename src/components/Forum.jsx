import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const formatTime = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;
  return `${Math.floor(seconds)} second${seconds === 1 ? '' : 's'} ago`;
};

const Forum = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [replyText, setReplyText] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const createPost = async () => {
    if (!user) return alert("You must be logged in to post");
    if (!title.trim() || !content.trim()) return alert("Title and Content required");

    await addDoc(collection(db, "posts"), {
      title,
      content,
      author: user.displayName,
      timestamp: new Date(),
      replies: [],
    });

    setTitle("");
    setContent("");
  };

  const addReply = async (postId) => {
    if (!user) return alert("You must be logged in to reply");
    if (!replyText[postId]?.trim()) return alert("Reply cannot be empty");

    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      replies: arrayUnion({
        text: replyText[postId],
        author: user.displayName,
        timestamp: new Date(),
      }),
    });

    setReplyText({ ...replyText, [postId]: "" });
    setShowReplyInput({ ...showReplyInput, [postId]: false });
  };

  const deletePost = async (postId) => {
    if (!user) return alert("You must be logged in to delete posts");
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", postId));
    }
  };

  const deleteReply = async (postId, reply) => {
    if (!user) return alert("You must be logged in to delete replies");
    if (window.confirm("Are you sure you want to delete this reply?")) {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        replies: arrayRemove(reply),
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Community Forum</h2>
      
      {user ? (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Post Title"
            className="w-full p-2 border rounded mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write something..."
            className="w-full p-2 border rounded mb-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            onClick={createPost}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      ) : (
        <p className="text-gray-600">Log in to post and comment.</p>
      )}

      <div className="mt-6">
        {posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-sm text-gray-500">
                Posted by {post.author} • {formatTime(post.timestamp?.toDate())}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setShowReplyInput({
                      ...showReplyInput,
                      [post.id]: !showReplyInput[post.id],
                    })
                  }
                  className="text-blue-500 hover:text-blue-700"
                  title="Reply"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                  </svg>
                </button>
                {user && post.author === user.displayName && (
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {showReplyInput[post.id] && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  className="w-full p-2 border rounded"
                  value={replyText[post.id] || ""}
                  onChange={(e) =>
                    setReplyText({ ...replyText, [post.id]: e.target.value })
                  }
                />
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => addReply(post.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowReplyInput({...showReplyInput, [post.id]: false})}
                    className="text-red-500 hover:text-red-700"
                    title="Cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {post.replies?.length > 0 && (
              <div className="mt-3 pl-4 border-l">
                <h4 className="font-semibold">Replies:</h4>
                {post.replies.map((reply, index) => (
                  <div key={index} className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-gray-600">
                        <strong>{reply.author}:</strong> {reply.text}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatTime(reply.timestamp?.toDate())}
                      </p>
                    </div>
                    {user && reply.author === user.displayName && (
                      <button
                        onClick={() => deleteReply(post.id, reply)}
                        className="text-red-500 hover:text-red-700 ml-4"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
