# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class Documents(Base):
    __tablename__ = 'Documents'
    __table_args__ = (
        ForeignKeyConstraint(['company_id'], ['CompanyData.company_id'], name='FK__Documents__Compa__06CD04F7'),
        PrimaryKeyConstraint('document_id', name='PK__Document__1ABEEF0F0D9D02EB'),
    )

    document_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    company_id = Column(Integer)
    name = Column(Unicode(100))
    document_path = Column(Unicode(200))
    upload_date = Column(DateTime)
    file_size = Column(Integer)
    document_type = Column(Unicode(50))
    is_active = Column(Boolean, server_default=text('((1))'))
    testing = Column(Boolean, server_default=text('((0))'))
    should_account = Column(Boolean)
    moves_stock = Column(Boolean)
    is_fiscal = Column(Boolean)
    is_electronic = Column(Boolean)
    is_manual = Column(Boolean)
    is_quotation = Column(Boolean)
    max_items = Column(Integer)

    # Relationships
    company_data = relationship('CompanyData', back_populates='documents')
    branches = relationship('Branches', back_populates='documents')
    document_types = relationship('DocumentTypes', back_populates='documents')


