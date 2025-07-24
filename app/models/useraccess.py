# ========== UserAccess ===========
# app/models/useraccess.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:    
    from .branches import Branches
    from .companydata import CompanyData
    from .roles import Roles
    from .users import Users

from typing import List

from sqlalchemy import Column, Integer, PrimaryKeyConstraint, ForeignKeyConstraint
from sqlalchemy.orm import Mapped, relationship
#from .branches import Branches
#from .companydata import CompanyData
#from .roles import Roles
#from .users import Users
from app.db import Base


class UserAccess(Base):
    __tablename__ = 'UserAccess'
    __table_args__ = (
        ForeignKeyConstraint(
            ['CompanyID', 'BranchID'],
            ['Branches.CompanyID', 'Branches.BranchID'],
            name='FK_UserAccess_Branches'
        ),
        ForeignKeyConstraint(['CompanyID'], ['CompanyData.CompanyID'], name='FK_UserAccess_CompanyData'),
        ForeignKeyConstraint(['RoleID'], ['Roles.RoleID'], name='FK_UserAccess_Roles'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'], name='FK_UserAccess_Users'),
        PrimaryKeyConstraint('UserID', 'CompanyID', 'BranchID', 'RoleID', name='PK_UserAccess')
    )

    UserID = Column(Integer, primary_key=True)
    CompanyID = Column(Integer, primary_key=True)
    BranchID = Column(Integer, primary_key=True)
    RoleID = Column(Integer, primary_key=True)

    # Relaciones
    branches_: Mapped['Branches'] = relationship(
        'Branches',
        back_populates='userAccess',
        overlaps='userAccess'
    )
    companyData_: Mapped['CompanyData'] = relationship(
        'CompanyData',
        back_populates='userAccess',
        overlaps='branches_,userAccess'
    )
    roles_: Mapped['Roles'] = relationship('Roles', back_populates='user_access')
    users_: Mapped['Users'] = relationship('Users', back_populates='userAccess')