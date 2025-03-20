import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowUturnLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Navbar from "../HomePage/Navbar";

const BASE_URL = 'http://localhost:8000/';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("token");
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
    }, []);

    useEffect(() => {
        if (token) {
            axios
                .get(`${BASE_URL}community/posts/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.data.success) {
                        setPost(response.data.post);
                    }
                })
                .catch((error) => console.error("Error fetching post:", error))
                .finally(() => setLoading(false));
        }
    }, [id, token]);

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_comment/${id}/`,
                { content: comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                setComment("");
                window.location.reload();
                // setPost((prevState) => ({
                //     ...prevState,
                //     comments: [...prevState.comments, response.data.comment],
                // }));
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const handleReplySubmit = async (commentId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_reply/${commentId}/`,
                { content: reply[commentId] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                window.location.reload();
                // setReply((prev) => ({ ...prev, [commentId]: "" }));
                // setShowReplyInput(prev => ({ ...prev, [commentId]: false }));
                // setPost((prevState) => ({
                //     ...prevState,
                //     comments: prevState.comments.map((c) =>
                //         c.id === commentId
                //             ? { ...c, replies: [...c.replies, response.data.reply] }
                //             : c
                //     ),
                // }));
            }
        } catch (error) {
            console.error("Error creating reply:", error);
        }
    };

    const toggleReplyInput = (commentId) => {
        setShowReplyInput(prev => ({ ...prev, [commentId]: !prev[commentId] }));
        setReply(prev => ({ ...prev, [commentId]: "" }));
    };

    if (loading) return <p className="text-center mt-5 text-gray-500">Loading...</p>;
    if (!post) return <p className="text-center mt-5 text-gray-500">Post not found.</p>;

    return (
        <>
            <Navbar />
            <main className="flex-grow px-10 py-6 max-w-6xl mx-auto">
                <button className="text-blue-500 mb-4 hover:underline" onClick={() => navigate("/community")}>
                    ← Back to posts
                </button>

                <h1 className="text-3xl font-bold mb-2">{post.post.title}</h1>
                <span className="text-gray-500 text-sm">Created at: {new Date(post.post.created_at).toLocaleString()}</span>
                <br />
                <span className="inline-block bg-orange-200 text-orange-800 px-2 py-1 rounded mt-2">Post Detail</span>

                <hr className="my-6 border-gray-300" />

                <div className="mt-4 border-b border-gray-300 pb-4">
                    <h2 className="text-lg font-semibold">Post</h2>
                    <p className="mt-2">{post.post.content}</p>
                </div>

                {post.post.image && (
                    <div className="mt-4 border-b border-gray-300 pb-4">
                        <h2 className="text-lg font-semibold">Related Image</h2>
                        <img src={`${BASE_URL}${post.post.image}`} alt="Post" className="w-64 h-64 object-cover rounded-lg mt-2" />
                    </div>
                )}

                {post.post.user && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Author</h2>
                        <p className="text-gray-700">{post.post.user}</p>
                    </div>
                )}

                <hr className="my-6 border-gray-300" />

                {/* Post content remains unchanged */}

                <h2 className="text-xl font-semibold">Comments</h2>
                <p className="text-gray-500">Drop your suggestions or advice to start discussions.</p>

                {/* Comment Input */}
                <textarea
                    className="w-full p-3 border border-gray-300 rounded mt-4 focus:outline-none"
                    rows="3"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    onClick={handleCommentSubmit}
                    className="mt-3 px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                    Comment
                </button>

                {/* Comments Section */}
                <div className="mt-5">
                    {post.comments.length > 0 ? (
                        post.comments.map((c) => (
                            <div key={c.id} className="flex flex-col py-3 border-b">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${c.user}&background=%230D8ABC&color=white`}
                                            alt={c.user}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="ml-3">
                                            <p className="text-gray-800 font-medium">{c.user}</p>
                                            <p className="text-gray-600">{c.content}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleReplyInput(c.id)}
                                        className="flex items-center text-gray-500 hover:text-blue-500 ml-2"
                                    >
                                        <ArrowUturnLeftIcon className="w-5 h-5" />
                                        <span className="ml-1 text-sm">Reply</span>
                                    </button>
                                </div>

                                {/* Animated Reply Input */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showReplyInput[c.id] ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    }`}>
                                    <div className="mt-3 pl-12">
                                        <div className="border-l-2 border-gray-200 pl-4">
                                            <textarea
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                                                rows="2"
                                                placeholder="Write a reply..."
                                                value={reply[c.id] || ""}
                                                onChange={(e) => setReply(prev => ({ ...prev, [c.id]: e.target.value }))}
                                            />
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => handleReplySubmit(c.id)}
                                                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                >
                                                    Post
                                                </button>
                                                <button
                                                    onClick={() => toggleReplyInput(c.id)}
                                                    className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-100"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Replies List */}
                                {c.replies?.length > 0 && (
                                    <div className="mt-2 pl-12">
                                        <div className="border-l-2 border-gray-200 pl-4">
                                            {c.replies.map((reply) => (
                                                <div key={reply.id} className="py-2 flex items-center">
                                                    <img
                                                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${reply.user}&background=%230D8ABC&color=white`}
                                                        alt={reply.user}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                    <div className="ml-3">
                                                        <p className="text-sm text-gray-800">
                                                            <span className="font-medium">{reply.user}</span>: {reply.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 mt-3">No comments yet.</p>
                    )}
                </div>
            </main>
        </>
    );
};

export default PostDetail;