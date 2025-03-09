from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load .env file from the project root directory
load_dotenv()  

# Get the DATABASE_URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")

# Ensure DATABASE_URL is loaded correctly
if not DATABASE_URL:
    raise ValueError("❌ DATABASE_URL is not set. Check your .env file!")

# Database Engine & Session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
