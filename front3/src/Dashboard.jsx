import React, { useEffect, useState } from 'react';
import { getAllPosts } from './services2';
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3; // ✅ Display 3 posts per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchAllPosts();
  }, []);

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Blog Posts</h1>

      <div className={styles.postsContainer}>
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.id} className={styles.postCard} onClick={() => navigate(`/blog/${post.id}`)}>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postSnippet}>{post.content.substring(0, 100)}...</p>
              <p className={styles.postAuthor}>Author: {post.author.username}</p>
              <p className={styles.postDate}>Created at: {new Date(post.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className={styles.noPosts}>No posts available</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            &lt;
          </button>
          <span className={styles.pageNumber}>{currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
