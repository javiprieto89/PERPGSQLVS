# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class Suppliers(Base):
    __tablename__ = 'Suppliers'
    __table_args__ = (
        ForeignKeyConstraint(['country_id'], ['Countries.countryID'], name='FK__Suppliers__Count__440B1D61'),
        ForeignKeyConstraint(['doc_type_id'], ['DocTypes.docTypeID'], name='FK_Suppliers_DocTypes'),
        ForeignKeyConstraint(['province_id'], ['Provinces.provinceID'], name='FK__Suppliers__Provi__44FF419A'),
        PrimaryKeyConstraint('supplier_id', name='PK__Supplier__4BE6669487E21347')
    )

    supplier_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    doc_type_id = Column(Integer)
    first_name = Column(Unicode(100))
    is_active = Column(Boolean, server_default=text('((1))'))
    country_id = Column(Integer)
    province_id = Column(Integer)
    doc_number = Column(Unicode(50))
    last_name = Column(Unicode(100))
    phone = Column(Unicode(20))
    email = Column(Unicode(100))
    address = Column(Unicode(200))
    city = Column(Unicode(100))
    postal_code = Column(Unicode(20))

    country = relationship('Countries', back_populates='suppliers')
    doc_type = relationship('DocTypes', back_populates='suppliers')
    province = relationship('Provinces', back_populates='suppliers')
    account_balances = relationship('AccountBalances', back_populates='supplier')
    items = relationship('Items', back_populates='supplier')
    itemstock = relationship('Itemstock', back_populates='supplier')
    order_history = relationship('OrderHistory', back_populates='supplier')
    transactions = relationship('Transactions', back_populates='supplier')


