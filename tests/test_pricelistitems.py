import pytest
from sqlalchemy import text
from app.graphql.crud.pricelistitems import create_pricelistitem, get_pricelistitems, update_pricelistitem, delete_pricelistitem
from app.graphql.schemas.pricelistitems import PriceListItemsCreate, PriceListItemsUpdate


def test_create_get_update_delete_pricelistitems(db_session):
    # Crear con todos los campos obligatorios y FKs válidas
    from datetime import datetime
    # Crear un PriceList y un Item nuevos dejando que SQL Server asigne el IDENTITY
    result_pl = db_session.execute(text(
        "INSERT INTO PriceLists (Name, Description, IsActive, CreatedDate) OUTPUT INSERTED.PriceListID VALUES ('Lista Test', 'desc', 1, '2025-08-16')"))
    new_pricelist_id = result_pl.scalar()
    result_item = db_session.execute(text(
        "INSERT INTO Items (CompanyID, BranchID, BrandID, Code, Description, ItemCategoryID, ItemSubcategoryID, SupplierID, ControlStock, ReplenishmentStock, IsOffer, OEM, LastModified, WarehouseID, IsActive) OUTPUT INSERTED.ItemID VALUES (1, 1, 1, 'CODEX', 'DESCX', 1, 1, 1, 0, 0, 0, NULL, '2025-08-16', 1, 1)"))
    new_item_id = result_item.scalar()
    db_session.commit()
    data = PriceListItemsCreate(PriceListID=new_pricelist_id, ItemID=new_item_id,
                                Price=100.0, EffectiveDate=datetime(2025, 8, 16, 0, 0, 0))
    obj = create_pricelistitem(db_session, data)
    assert obj is not None
    assert int(getattr(obj, 'PriceListID', 0)) == new_pricelist_id and int(getattr(
        obj, 'ItemID', 0)) == new_item_id and float(getattr(obj, 'Price', 0)) == 100.0
    # Obtener
    all_objs = get_pricelistitems(db_session)
    assert any((int(getattr(o, 'PriceListID', 0)) == new_pricelist_id and int(
        getattr(o, 'ItemID', 0)) == new_item_id) for o in all_objs)
    # Actualizar
    update = PriceListItemsUpdate(Price=200.0)
    updated = update_pricelistitem(
        db_session, new_pricelist_id, new_item_id, update)
    assert updated is not None
    assert float(getattr(updated, 'Price', 0)) == 200.0
    # Eliminar
    deleted = delete_pricelistitem(db_session, new_pricelist_id, new_item_id)
    assert deleted is not None
    assert int(getattr(deleted, 'PriceListID', 0)) == new_pricelist_id and int(
        getattr(deleted, 'ItemID', 0)) == new_item_id
    assert all(not (int(getattr(o, 'PriceListID', 0)) == new_pricelist_id and int(
        getattr(o, 'ItemID', 0)) == new_item_id) for o in get_pricelistitems(db_session))
