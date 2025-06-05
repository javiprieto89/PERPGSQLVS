# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Column, Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text
from sqlalchemy.orm import relationship
from app.db import Base

class UserAccess(Base):
    __tablename__ = 'UserAccess'
    __table_args__ = (
        ForeignKeyConstraint(['BranchID'], ['Branches.BranchID'], name='FK_UserAccess_Branches'),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK_UserAccess_CompanyData'),
        ForeignKeyConstraint(['RoleID'], ['Roles.RoleID'], name='FK_UserAccess_Roles'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK_UserAccess_Users'),
        PrimaryKeyConstraint('UserID', 'CompanyID', 'BranchID', 'RoleID', name='PK_UserAccess')
    )

    userID = Column(Integer, primary_key=True)
    companyID = Column(Integer, primary_key=True)
    branchID = Column(Integer, primary_key=True)
    roleID = Column(Integer, primary_key=True)

    branches_ = relationship('Branches', back_populates='UserAccess')
    companyData_ = relationship('CompanyData', back_populates='UserAccess')
    roles_ = relationship('Roles', back_populates='UserAccess')
    users_ = relationship('Users', back_populates='UserAccess')


