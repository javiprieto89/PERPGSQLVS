# Auto-generado. Revisar imports si faltan.
from sqlalchemy import Boolean, DECIMAL, Date, DateTime, ForeignKeyConstraint, Identity, Index, Integer, LargeBinary, PrimaryKeyConstraint, String, Unicode, Uuid, text, Column
from app.db import Base

class Sysdiagrams(Base):
    __tablename__ = 'sysdiagrams'
    __table_args__ = (
        PrimaryKeyConstraint('diagram_id', name='PK__sysdiagr__C2B05B6105D049F8'),
        Index('UK_principal_name', 'principal_id', 'name', unique=True)
    )

    name = Column(Unicode(128))
    principal_id = Column(Integer)
    diagram_id = Column(Integer, Identity(start=1, increment=1), primary_key=True)
    version = Column(Integer)
    definition = Column(LargeBinary)


