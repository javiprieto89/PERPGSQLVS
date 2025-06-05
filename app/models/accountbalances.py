# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from sqlalchemy.orm import relationship
from app.db import Base

class AccountBalances(Base):
    __tablename__ = 'AccountBalances'
    __table_args__ = (
        ForeignKeyConstraint(['client_id'], ['Clients.ClientID'], name='FK__AccountBa__Clien__3F115E1A'),
        ForeignKeyConstraint(['supplier_id'], ['Suppliers.SupplierID'], name='FK__AccountBa__Suppl__3E1D39E1'),
        PrimaryKeyConstraint('account_id', name='PK__AccountB__349DA5866875C1B5')
    )

    account_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    balance = Column(DECIMAL(10, 2), server_default=text('((0))'))
    supplier_id = Column(Integer)
    client_id = Column(Integer)

    client = relationship('Clients', back_populates='account_balances')
    supplier = relationship('Suppliers', back_populates='account_balances')


