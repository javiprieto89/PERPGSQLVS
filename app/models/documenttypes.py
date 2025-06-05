# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class DocumentTypes(Base):
    __tablename__ = 'DocumentTypes'
    __table_args__ = (
        PrimaryKeyConstraint('document_type_id', name='PK__Document__DBA390C10019FEFA'),
    )

    document_type_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    name = Column(Unicode(50))

    documents = relationship('Documents', back_populates='document_type')
    orders = relationship('Orders', back_populates='document_type')
