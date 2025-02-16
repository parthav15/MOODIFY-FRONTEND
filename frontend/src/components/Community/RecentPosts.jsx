import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:8000";
const API_URL = `${BASE_URL}/community/posts/`;

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
        .get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.success) {
            setPosts(response.data.posts);
          }
        })
        .catch((error) => console.error("Error fetching posts:", error))
        .finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <section className="bg-gray-50 min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
          <Link to="/community/new-post">
            <button className="px-4 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600">
              New Post
            </button>
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
          />
          <span className="absolute right-4 top-3 text-gray-500">🔍</span>
        </div>

        {/* Posts List */}
        {loading ? (
          <p className="text-gray-500 text-center">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts found.</p>
        ) : (
          posts.map((post) => (
            <Link key={post.id} to={`/community/posts/${post.id}`}>
              <div className="bg-white p-6 rounded-lg shadow mb-4 flex">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-700 mt-3">
                    {post.content.length > 200 ? (
                      <span>
                        {post.content.slice(0, 200)}...
                        <Link to={`/community/posts/${post.id}`}>
                          <span className="text-blue-500 hover:underline">Read more</span>
                        </Link>
                      </span>
                    ) : (
                      post.content
                    )}
                  </p>

                  {/* Author & Date */}
                  <div className="mt-4 text-sm text-gray-500">
                    <p><strong>Author:</strong> {post.user}</p>
                    <p><strong>Created:</strong> {new Date(post.created_at).toLocaleString()}</p>
                  </div>
                </div>
                {/* Image */}
                {post.image && (
                  <img
                    src={`${BASE_URL}${post.image}`}
                    alt="Post Image"
                    className="w-56 h-56 object-cover rounded-lg ml-4"
                  />
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}


