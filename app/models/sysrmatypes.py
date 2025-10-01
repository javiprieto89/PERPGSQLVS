from sqlalchemy.orm import Mapped, mapped_column
# ========== sysRmaTypes ==========
# app/models/sysrmatypes.py
from sqlalchemy import Integer, Unicode, PrimaryKeyConstraint
from app.db import Base

class SysRmaTypes(Base):
    __tablename__ = "sysRmaTypes"
    __table_args__ = (
        PrimaryKeyConstraint("RmaTypeID", name="PK_sysRmaTypes"),
    )

    RmaTypeID: Mapped[int] = mapped_column(Integer, nullable=False)
    RmaTypeName: Mapped[str] = mapped_column(Unicode(50, "Modern_Spanish_CI_AS"), nullable=False)
