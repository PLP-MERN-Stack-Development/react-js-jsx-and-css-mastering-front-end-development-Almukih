import React, { useState, useEffect } from 'react';
import Card from './Card';

/**
 * Simple posts list with search and infinite scroll
 * Uses JSONPlaceholder (https://jsonplaceholder.typicode.com/posts)
 */
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(10);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Infinite scroll listener
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setVisible((v) => v + 5);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = posts.filter((p) =>
    (p.title + p.body).toLowerCase().includes(query.toLowerCase())
  );

  const shown = filtered.slice(0, visible);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />

      <Card>
        <h2 className="text-lg font-semibold mb-2">Posts</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 text-sm">Error: {error}</p>}
        <ul className="space-y-3 transition-all">
          {shown.map((post) => (
            <li key={post.id} className="border-b pb-2 hover:scale-[1.01] transition-transform">
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{post.body}</p>
            </li>
          ))}
        </ul>
        {!loading && shown.length < filtered.length && (
          <p className="text-center text-sm text-gray-500 mt-3">Scroll down to load more...</p>
        )}
      </Card>
    </div>
  );
};

export default Posts;
