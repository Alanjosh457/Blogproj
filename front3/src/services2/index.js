// services2/auth.js

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';  // Your FastAPI server URL

// Register User

export const register = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/users/signup`, {  // Fix here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

  
  export const login= async (formData) => {
    try {
      const response = await fetch(`${API_URL}/users/signin`, {  // Fix here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  

  export const getPosts = async (token) => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // ✅ Include token
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };
  
  
  // Create a new post
  export const createPost = async (title, content, token) => {
    console.log('Token being sent:', token);  // Debug token

    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include JWT token if necessary
      },
      body: JSON.stringify({ title, content })
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Capture error message
      console.error('Server Error:', errorResponse);
      throw new Error(`Error creating post: ${errorResponse.message || response.status}`);
    }
    
    return await response.json();
};

  
  // Update an existing post
  export const updatePost = async (postId, title, content, token) => {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      throw new Error('Error updating post');
    }
    return await response.json();
  };
  
  // Delete a post
  export const deletePost = async (postId, token) => {
    console.log("Deleting post ID:", postId);
    console.log("Token being sent:", token);

    const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error deleting post:", errorMessage);
        throw new Error('Error deleting post');
    }

    return await response.json();
};



// ✅ Function to fetch all blog posts (public access)
export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts/all-posts`);
    if (!response.ok) throw new Error("Failed to fetch posts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};


export const getPostById = async (postId, token) => {
  try {
    const response = await fetch(`${API_URL}/posts/getpostid/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    return await response.json(); // Return the fetched post data
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};
