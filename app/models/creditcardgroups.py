# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class CreditCardGroups(Base):
    __tablename__ = 'credit_card_groups'
    __table_args__ = (
        PrimaryKeyConstraint('card_group_id', name='PK_CreditCardGroups'),
    )

    card_group_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    group_name = Column(Unicode(100))

    credit_cards = relationship('CreditCards', back_populates='credit_card_group')
