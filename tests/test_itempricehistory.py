import pytest
from datetime import datetime, timezone
from app.graphql.crud.itempricehistory import (
    create_itempricehistory,
    get_itempricehistory,
    update_itempricehistory,
    delete_itempricehistory,
)
from app.graphql.schemas.itempricehistory import (
    ItemPriceHistoriesCreate,
    ItemPriceHistoriesUpdate,
)


@pytest.mark.usefixtures("seeded_dependencies")
def test_create_get_update_delete_itempricehistory(db_session, seeded_dependencies):
    deps = seeded_dependencies
    data = ItemPriceHistoriesCreate(
        CompanyID=deps["CompanyID"],
        BranchID=deps["BranchID"],
        ItemID=deps["ItemID"],
        PriceListID=deps["PriceListID"],
        EffectiveDate=datetime.now(timezone.utc),
        Price=100.0,
        CurrencyID=deps["CurrencyID"],
        UserID=deps["UserID"],
    )
    obj = create_itempricehistory(db_session, data)
    assert obj.Price == 100.0

    assert any(o.PriceHistoryID == obj.PriceHistoryID for o in get_itempricehistory(db_session))

    update = ItemPriceHistoriesUpdate(PriceHistoryID=obj.PriceHistoryID, Price=200.0)
    updated = update_itempricehistory(db_session, obj.PriceHistoryID, update)
    assert updated.Price == 200.0

    deleted = delete_itempricehistory(db_session, obj.PriceHistoryID)
    assert deleted.PriceHistoryID == obj.PriceHistoryID
    assert all(o.PriceHistoryID != obj.PriceHistoryID for o in get_itempricehistory(db_session))