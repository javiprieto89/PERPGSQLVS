# branches.py
from sqlalchemy.orm import Session, joinedload
from app.models.branches import Branches
from app.graphql.schemas.branches import BranchesCreate, BranchesUpdate


def get_branches(db: Session):
    return db.query(Branches).options(joinedload(Branches.companyData_)).all()


def get_branches_by_id(db: Session, companyID: int, branchID: int):
    return (
        db.query(Branches)
        .options(joinedload(Branches.companyData_))
        .filter(
            Branches.CompanyID == companyID,
            Branches.BranchID == branchID,
        )
        .first()
    )


def get_branches_by_company(db: Session, company_id: int):
    """Retrieve branches filtered by CompanyID"""
    return (
        db.query(Branches)
        .options(joinedload(Branches.companyData_))
        .filter(Branches.CompanyID == company_id)
        .all()
    )


def create_branches(db: Session, data: BranchesCreate):
    obj = Branches(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_branches(db: Session, companyID: int, branchID: int, data: BranchesUpdate):
    obj = get_branches_by_id(db, companyID, branchID)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_branches(db: Session, companyID: int, branchID: int):
    obj = get_branches_by_id(db, companyID, branchID)
    if obj:
        db.delete(obj)
        db.commit()
    return obj

