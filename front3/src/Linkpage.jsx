import React, { useState, useEffect } from 'react';
import { getPosts, createPost, updatePost, deletePost } from './services2';
import styles from './linkpage.module.css';
import { useNavigate } from 'react-router-dom';
import penc from './images/pencil.png';
import tbin from './images/tbin.png';

const Linkpage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const postsPerPage = 3; // Restrict 3 per page

  useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (!token) {
      navigate('/login');
      return;
    }

    fetchPosts();
  }, [token, navigate]);


  const fetchPosts = async () => {
    console.log("Stored token:", localStorage.getItem("token"));

    if (!token) {
      console.error("No token found. User is not authenticated.");
      return;
    }
  
    try {
      const data = await getPosts(token); // ✅ Pass token
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  




  const handleCreatePost = async () => {
    try {
      const newPost = await createPost(title, content, token);
      setPosts([...posts, newPost]);
      setTitle('');
      setContent('');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdatePost = async () => {
    try {
      const updatedPost = await updatePost(editingPost.id, title, content, token);
      setPosts(posts.map(post => (post.id === editingPost.id ? updatedPost : post)));
      setTitle('');
      setContent('');
      setEditingPost(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId, token);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blog Posts</h1>
      
      <button onClick={() => setShowModal(true)} className={styles.createButton}>
        + Create Blog
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{editingPost ? 'Edit Post' : 'Create Post'}</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title"
              className={styles.input}
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Post Content"
              className={styles.textarea}
            ></textarea>
            <div className={styles.modalButtons}>
              <button
                onClick={editingPost ? handleUpdatePost : handleCreatePost}
                className={styles.button}
              >
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
              <button onClick={() => { setShowModal(false); setEditingPost(null); }} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Previews */}
      <div className={styles.postsContainer}>
        <h3 className={styles.postsTitle}>Your Blogs</h3>
        {currentPosts.length > 0 ? (
          <ul className={styles.postList}>
            {currentPosts.map(post => (
              <li key={post.id} className={styles.postItem} >
                <div className={styles.postPreview} onClick={() => navigate(`/blog/${post.id}`)}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postSnippet}>{post.content.substring(0, 100)}...</p>
                  <p className={styles.postAuthor}>Author: {post.author.username}</p>
                  <p className={styles.postDate}>Created: {new Date(post.created_at + "Z").toLocaleString()}</p>
                  <p className={styles.postDate}>Updated: {new Date(post.updated_at + "Z").toLocaleString()}</p>
                  Click to view full blog </div>
                <div className={styles.buttonContainer}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setEditingPost(post);
                      setTitle(post.title);
                      setContent(post.content);
                      setShowModal(true);
                    }}
                    className={styles.editButton}
                  >
                    <img src={penc} className={styles.pencil}/>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(post.id);
                    }}
                    className={styles.deleteButton}
                  >
                    <img src={tbin} className={styles.delbin}/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noPosts}>No posts available</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            &lt;
          </button>
          <span className={styles.pageNumber}> {currentPage}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

export default Linkpage;
