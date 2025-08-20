# app/graphql/resolvers/orders.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.orders import OrdersInDB
from app.graphql.schemas.companydata import CompanyDataInDB
from app.graphql.schemas.branches import BranchesInDB
from app.graphql.schemas.saleconditions import SaleConditionsInDB
from app.graphql.schemas.sys.documenttypes import SysDocumentTypesInDB
from app.graphql.schemas.warehouses import WarehousesInDB
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.schemas.discounts import DiscountsInDB
from app.graphql.schemas.pricelists import PriceListsInDB
from app.graphql.schemas.sys.orderstatus import SysOrderStatusInDB
from app.graphql.schemas.cars import CarsInDB
from app.graphql.schemas.servicetype import ServiceTypeInDB
from app.graphql.schemas.orderdetails import OrderDetailsInDB
from app.graphql.crud.orders import get_orders, get_orders_by_id
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class OrdersQuery:
    @strawberry.field
    def all_orders(self, info: Info) -> List[OrdersInDB]:
        from app.graphql.crud.companydata import get_companydata_by_id
        from app.graphql.crud.branches import get_branches_by_id
        from app.graphql.crud.saleconditions import get_saleconditions_by_id
        from app.graphql.crud.sysdocumenttypes import get_sysdocumenttypes_by_id
        from app.graphql.crud.warehouses import get_warehouses_by_id
        from app.graphql.crud.clients import get_clients_by_id
        from app.graphql.crud.discounts import get_discounts_by_id
        from app.graphql.crud.pricelists import get_pricelists_by_id
        from app.graphql.crud.sysorderstatus import get_sysorderstatus_by_id
        from app.graphql.crud.servicetype import get_servicetype_by_id
        from app.graphql.crud.cars import get_cars_by_id
        from app.graphql.crud.orderdetails import get_orderdetails
        from app.graphql.crud.vendors import get_vendors_by_id
        from app.graphql.schemas.vendors import VendorsInDB
        db_gen = get_db()
        db = next(db_gen)
        try:
            orders = get_orders(db)
            result = []
            for o in orders:
                if not hasattr(o, '__table__') or not hasattr(o, '__dict__'):
                    continue
                data = vars(o).copy()
                company_id = data.get('CompanyID')
                branch_id = data.get('BranchID')
                salecondition_id = data.get('SaleConditionID')
                document_id = data.get('DocumentID')
                warehouse_id = data.get('WarehouseID')
                client_id = data.get('ClientID')
                discount_id = data.get('DiscountID')
                pricelist_id = data.get('PriceListID')
                orderstatus_id = data.get('OrderStatusID')
                servicetype_id = data.get('ServiceTypeID')
                car_id = data.get('CarID')
                vendor_id = data.get('VendorID')

                data['CompanyData'] = obj_to_schema(CompanyDataInDB, get_companydata_by_id(
                    db, int(company_id))) if company_id is not None else None
                data['BranchData'] = obj_to_schema(BranchesInDB, get_branches_by_id(db, int(
                    company_id), int(branch_id))) if company_id is not None and branch_id is not None else None
                data['SaleConditionData'] = obj_to_schema(SaleConditionsInDB, get_saleconditions_by_id(
                    db, int(salecondition_id))) if salecondition_id is not None else None
                data['DocumentData'] = obj_to_schema(SysDocumentTypesInDB, get_sysdocumenttypes_by_id(
                    db, int(document_id))) if document_id is not None else None
                data['WarehouseData'] = obj_to_schema(WarehousesInDB, get_warehouses_by_id(
                    db, int(warehouse_id))) if warehouse_id is not None else None
                data['ClientData'] = obj_to_schema(ClientsInDB, get_clients_by_id(
                    db, int(client_id))) if client_id is not None else None
                data['DiscountData'] = obj_to_schema(DiscountsInDB, get_discounts_by_id(
                    db, int(discount_id))) if discount_id is not None else None
                data['PriceListData'] = obj_to_schema(PriceListsInDB, get_pricelists_by_id(
                    db, int(pricelist_id))) if pricelist_id is not None else None
                data['OrderStatusData'] = obj_to_schema(SysOrderStatusInDB, get_sysorderstatus_by_id(
                    db, int(orderstatus_id))) if orderstatus_id is not None else None
                data['ServiceTypeData'] = obj_to_schema(ServiceTypeInDB, get_servicetype_by_id(
                    db, int(servicetype_id))) if servicetype_id is not None else None
                data['CarData'] = obj_to_schema(CarsInDB, get_cars_by_id(
                    db, int(car_id))) if car_id is not None else None
                data['VendorData'] = obj_to_schema(VendorsInDB, get_vendors_by_id(
                    db, int(vendor_id))) if vendor_id is not None else None
                # Detalles anidados
                order_id = data.get('OrderID', None)
                details = [d for d in get_orderdetails(db) if hasattr(
                    d, 'OrderID') and order_id is not None and getattr(d, 'OrderID', None) == order_id]
                data['OrderDetails'] = [obj_to_schema(
                    OrderDetailsInDB, d) for d in details] if details else None
                result.append(OrdersInDB(**data))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def orders_by_id(self, info: Info, id: int) -> Optional[OrdersInDB]:
        from app.graphql.crud.companydata import get_companydata_by_id
        from app.graphql.crud.branches import get_branches_by_id
        from app.graphql.crud.saleconditions import get_saleconditions_by_id
        from app.graphql.crud.sysdocumenttypes import get_sysdocumenttypes_by_id
        from app.graphql.crud.warehouses import get_warehouses_by_id
        from app.graphql.crud.clients import get_clients_by_id
        from app.graphql.crud.discounts import get_discounts_by_id
        from app.graphql.crud.pricelists import get_pricelists_by_id
        from app.graphql.crud.sysorderstatus import get_sysorderstatus_by_id
        from app.graphql.crud.servicetype import get_servicetype_by_id
        from app.graphql.crud.cars import get_cars_by_id
        from app.graphql.crud.orderdetails import get_orderdetails
        db_gen = get_db()
        db = next(db_gen)
        try:
            o = get_orders_by_id(db, id)
            if not o:
                return None
            data = vars(o).copy()
            # Detalles anidados
            details = [d for d in get_orderdetails(db) if getattr(d, 'OrderID', None) == id]
            data['OrderDetails'] = [obj_to_schema(OrderDetailsInDB, d) for d in details] if details else None
            return OrdersInDB(**data)
        finally:
            db_gen.close()


ordersQuery = OrdersQuery()
