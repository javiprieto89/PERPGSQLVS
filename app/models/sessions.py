from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    Computed,
    DateTime,
    ForeignKey,
    Identity,
    Integer,
    PrimaryKeyConstraint,
    UniqueConstraint,
    Unicode,
    text,
)
from sqlalchemy.dialects.mssql import VARBINARY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .users import Users


class Sessions(Base):
    __tablename__ = "Sessions"
    __table_args__ = (
        PrimaryKeyConstraint("SessionID", name="PK_Sessions"),
        UniqueConstraint("RefreshHash", name="UQ_Sessions_RefreshHash"),
        CheckConstraint("ExpiresAt > CreatedAt", name="CK_Sessions_Expires_Future"),
    )

    SessionID: Mapped[int] = mapped_column(
        BigInteger, Identity(start=1, increment=1), primary_key=True
    )
    UserID: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("Users.UserID", name="FK_Sessions_Users__UserID"),
        nullable=False,
    )

    Token: Mapped[str] = mapped_column(Unicode(2048, "Modern_Spanish_CI_AS"), nullable=False)
    RefreshHash: Mapped[bytes] = mapped_column(
        VARBINARY(32),
        Computed("CONVERT(VARBINARY(32), HASHBYTES('SHA2_256', Token))", persisted=True),
        nullable=False,
    )
    Algorithm: Mapped[Optional[str]] = mapped_column(
        Unicode(12, "Modern_Spanish_CI_AS"), nullable=True
    )

    CreatedAt: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=text("SYSUTCDATETIME()"),
        nullable=False,
    )
    LastSeenAt: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    ExpiresAt: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    IsRevoked: Mapped[bool] = mapped_column(
        Boolean, server_default=text("((0))"), nullable=False
    )
    RevokedAt: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    RevokedByUserID: Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey("Users.UserID", name="FK_Sessions_Users__RevokedByUserID")
    )
    RevokeReason: Mapped[Optional[str]] = mapped_column(
        Unicode(200, "Modern_Spanish_CI_AS")
    )

    UserAgent: Mapped[Optional[str]] = mapped_column(
        Unicode(512, "Modern_Spanish_CI_AS")
    )
    ClientIP: Mapped[Optional[str]] = mapped_column(
        Unicode(45, "Modern_Spanish_CI_AS")
    )
    ClientHost: Mapped[Optional[str]] = mapped_column(
        Unicode(255, "Modern_Spanish_CI_AS")
    )
    RequestHost: Mapped[Optional[str]] = mapped_column(
        Unicode(255, "Modern_Spanish_CI_AS")
    )
    UserAgentHash: Mapped[bytes] = mapped_column(
        VARBINARY(32),
        Computed(
            "CONVERT(VARBINARY(32), HASHBYTES('SHA2_256', ISNULL(UserAgent, N'')))",
            persisted=True,
        ),
        nullable=False,
    )

    user: Mapped["Users"] = relationship(
        "Users",
        foreign_keys=[UserID],
        back_populates="sessions",
    )
    revoked_by: Mapped[Optional["Users"]] = relationship(
        "Users",
        foreign_keys=[RevokedByUserID],
    )
