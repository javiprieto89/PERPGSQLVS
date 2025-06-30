# branches.py
from sqlalchemy.orm import Session
from app.models.branches import Branches
from app.graphql.schemas.branches import BranchesCreate, BranchesUpdate


def get_branches(db: Session):
    return db.query(Branches).all()


def get_branches_by_id(db: Session, branchID: int):
    return db.query(Branches).filter(Branches.branchID == branchID).first()


def create_branches(db: Session, data: BranchesCreate):
    obj = Branches(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_branches(db: Session, branchID: int, data: BranchesUpdate):
    obj = get_branches_by_id(db, branchID)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_branches(db: Session, branchID: int):
    obj = get_branches_by_id(db, branchID)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
