from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings



engine = create_engine(settings.DATABASE_URL, echo=True, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()



# Base.metadata.create_all(bind=engine)


# DB dependency

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
        db.commit()     
    except:
        db.rollback()  
        raise
    finally:
        db.close()
