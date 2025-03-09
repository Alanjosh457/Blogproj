from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import Post, User
from schemas import PostCreate, PostResponse
from database import get_db
from dependencies import get_current_user
from typing import List


router = APIRouter()

@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
def create_post(post_data: PostCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Create a new post with the current user's ID
    new_post = Post(title=post_data.title, content=post_data.content, author_id=current_user.id)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post




@router.get("/all-posts", response_model=List[PostResponse])
def get_all_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    posts = db.query(Post).offset(skip).limit(limit).all()
    return posts

@router.get("/", response_model=list[PostResponse])
def get_posts(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user),  # Get the logged-in user
    skip: int = 0, 
    limit: int = 10
):
    posts = db.query(Post).filter(Post.author_id == current_user.id).offset(skip).limit(limit).all()
    return posts


@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")
    db.delete(post)
    db.commit()
    return {"message": "Post deleted"}

@router.put("/{post_id}", response_model=PostResponse)
def update_post(post_id: int, post_data: PostCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check if the current user is the author of the post
    if post.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")
    
    # Update the post with the new data
    post.title = post_data.title
    post.content = post_data.content
    db.commit()
    db.refresh(post)
    
    return post


@router.get("/getpostid/{post_id}", response_model=PostResponse)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

