# ========== UserPermissions ===========
# app/models/userpermissions.py
from __future__ import annotations
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .branches import Branches
    from .company import Company
    from .roles import Roles
    from .users import Users

from typing import List

from sqlalchemy import Integer, PrimaryKeyConstraint, ForeignKeyConstraint
from sqlalchemy.orm import Mapped, relationship, mapped_column
from app.db import Base

class UserPermissions(Base):
    __tablename__ = 'UserPermissions'
    __table_args__ = (
        ForeignKeyConstraint(
            ['BranchID'], ['Branches.BranchID'], name='FK_UserPermissions_Branches'),
        ForeignKeyConstraint(
            ['CompanyID'], ['Company.CompanyID'], name='FK_UserPermissions_Company'),
        ForeignKeyConstraint(['RoleID'], ['Roles.RoleID'],
                             name='FK_UserPermissions_Roles'),
        ForeignKeyConstraint(['UserID'], ['Users.UserID'],
                             name='FK_UserPermissions_Users'),
        PrimaryKeyConstraint('UserID', 'CompanyID',
                             'BranchID', 'RoleID', name='PK_UserPermissions')
    )

    UserID: Mapped[int] = mapped_column(Integer, primary_key=True)
    CompanyID: Mapped[int] = mapped_column(Integer, primary_key=True)
    BranchID: Mapped[int] = mapped_column(Integer, primary_key=True)
    RoleID: Mapped[int] = mapped_column(Integer, primary_key=True)

    # Relaciones
    branches_: Mapped['Branches'] = relationship(
        'Branches',
        back_populates='userPermissions',
        overlaps='userPermissions'
    )
    company_: Mapped['Company'] = relationship(
        'Company',
        back_populates='userPermissions',
        overlaps='branches_,userPermissions',
        viewonly=True
    )
    roles_: Mapped['Roles'] = relationship(
        'Roles',
        back_populates='userPermissions')
    users_: Mapped['Users'] = relationship(
        'Users',
        back_populates='userPermissions',
        overlaps='userPermissions'
    )
