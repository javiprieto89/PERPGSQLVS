# app/models/sysfiscaldoctypes.py
from __future__ import annotations
from typing import TYPE_CHECKING, List

from sqlalchemy import Integer, Unicode, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, relationship, mapped_column

from app.db import Base

if TYPE_CHECKING:
    from .documents import Documents

class SysFiscalDocTypes(Base):
    __tablename__ = 'sysFiscalDocTypes'
    __table_args__ = (
        PrimaryKeyConstraint('DocumentTypeID', name='PK_sysFiscalDocTypes'),
    )

    DocumentTypeID: Mapped[int] = mapped_column(Integer, primary_key=True)
    Name: Mapped[str] = mapped_column(Unicode(100, 'Modern_Spanish_CI_AS'))

    documents: Mapped[List['Documents']] = relationship(
        'Documents',
        back_populates='fiscalDocType',
        viewonly=True,
    )