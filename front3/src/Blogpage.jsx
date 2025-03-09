import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from './services2'; // Ensure this function is in your API services
import styles from './blogpage.module.css';

const BlogPage = () => {
  const { postId } = useParams(); // Get post ID from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(postId);
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Post not found');
      }
    };

    fetchPost();
  }, [postId]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!post) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.blogContainer}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.author}>By: {post.author.username}</p>
      <p className={styles.date}>Created: {new Date(post.created_at + "Z").toLocaleString()}</p>
      <p className={styles.date}>Updated: {new Date(post.updated_at + "Z").toLocaleString()}</p>
      <div className={styles.content}>{post.content}</div>
    </div>
  );
};

export default BlogPage;
