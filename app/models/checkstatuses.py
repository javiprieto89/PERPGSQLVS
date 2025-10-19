
from typing import List
from sqlalchemy import Boolean, Integer, PrimaryKeyConstraint, String, Unicode, Index, Identity, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from .checks import Checks


class CheckStatuses(Base):
    __tablename__ = 'CheckStatuses'
    __table_args__ = (
        PrimaryKeyConstraint(
            'CheckStatusID', name='PK__CheckSta__6E92F03EC37487A8'),
        Index('UQ__CheckSta__6A7B44FC7A0F82CB', 'StatusCode', unique=True)
    )

    CheckStatusID: Mapped[int] = mapped_column(
        Integer, Identity(start=1, increment=1), primary_key=True)
    StatusCode: Mapped[str] = mapped_column(String(30, 'Modern_Spanish_CI_AS'))
    StatusName: Mapped[str] = mapped_column(
        Unicode(100, 'Modern_Spanish_CI_AS'))
    IsActive: Mapped[bool] = mapped_column(
        Boolean, server_default=text('((1))'))

    Checks: Mapped[List['Checks']] = relationship(
        'Checks', back_populates='CheckStatuses_')
