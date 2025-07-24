# app/graphql/resolvers/clients.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.clients import ClientsInDB
from app.graphql.crud.clients import (
    get_clients,
    get_clients_by_id,
    get_clients_by_company,
    get_clients_by_branch,
)
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class ClientsQuery:
    @strawberry.field
    def all_clients(self, info: Info) -> List[ClientsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            clients = get_clients(db)
            result = []
            for client in clients:
                client_dict = client.__dict__
                # Crear dict solo con campos del schema ClientsInDB con conversión de tipos
                filtered_dict = {
                    'ClientID': int(client_dict['ClientID']),
                    'DocTypeID': int(client_dict['DocTypeID']),  # Nota: DocTypeID en modelo
                    'DocNumber': str(client_dict['DocNumber']) if client_dict.get('DocNumber') else None,
                    'FirstName': str(client_dict['FirstName']),
                    'LastName': str(client_dict['LastName']) if client_dict.get('LastName') else None,
                    'Phone': str(client_dict['Phone']) if client_dict.get('Phone') else None,
                    'Email': str(client_dict['Email']) if client_dict.get('Email') else None,
                    'Address': str(client_dict['Address']) if client_dict.get('Address') else None,
                    'IsActive': bool(client_dict['IsActive']),
                    'CountryID': int(client_dict['CountryID']),
                    'ProvinceID': int(client_dict['ProvinceID']),
                    'City': str(client_dict['City']) if client_dict.get('City') else None,
                    'PostalCode': str(client_dict['PostalCode']) if client_dict.get('PostalCode') else None,
                    'PriceListID': int(client_dict['PriceListID']),
                    'VendorID': int(client_dict['VendorID']),
                    'CompanyID': client_dict.get('CompanyID'),
                    'BranchID': client_dict.get('BranchID'),
                }
                result.append(ClientsInDB(**filtered_dict))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def clients_by_id(self, info: Info, id: int) -> Optional[ClientsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            client = get_clients_by_id(db, id)
            if client:
                client_dict = client.__dict__
                # Crear dict solo con campos del schema ClientsInDB con conversión de tipos
                filtered_dict = {
                    'ClientID': int(client_dict['ClientID']),
                    'DocTypeID': int(client_dict['DocTypeID']),  # Nota: DocTypeID en modelo
                    'DocNumber': str(client_dict['DocNumber']) if client_dict.get('DocNumber') else None,
                    'FirstName': str(client_dict['FirstName']),
                    'LastName': str(client_dict['LastName']) if client_dict.get('LastName') else None,
                    'Phone': str(client_dict['Phone']) if client_dict.get('Phone') else None,
                    'Email': str(client_dict['Email']) if client_dict.get('Email') else None,
                    'Address': str(client_dict['Address']) if client_dict.get('Address') else None,
                    'IsActive': bool(client_dict['IsActive']),
                    'CountryID': int(client_dict['CountryID']),
                    'ProvinceID': int(client_dict['ProvinceID']),
                    'City': str(client_dict['City']) if client_dict.get('City') else None,
                    'PostalCode': str(client_dict['PostalCode']) if client_dict.get('PostalCode') else None,
                    'PriceListID': int(client_dict['PriceListID']),
                    'VendorID': int(client_dict['VendorID']),
                    'CompanyID': client_dict.get('CompanyID'),
                    'BranchID': client_dict.get('BranchID')
                }
                return ClientsInDB(**filtered_dict)
            return None
        finally:
            db_gen.close()

    @strawberry.field
    def clients_by_company(self, info: Info, companyID: int) -> List[ClientsInDB]:
        """Obtener clientes filtrados por CompanyID"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            clients = get_clients_by_company(db, companyID)
            result = []
            for client in clients:
                client_dict = client.__dict__
                filtered_dict = {
                    'ClientID': int(client_dict['ClientID']),
                    'DocTypeID': int(client_dict['DocTypeID']),
                    'DocNumber': str(client_dict['DocNumber']) if client_dict.get('DocNumber') else None,
                    'FirstName': str(client_dict['FirstName']),
                    'LastName': str(client_dict['LastName']) if client_dict.get('LastName') else None,
                    'Phone': str(client_dict['Phone']) if client_dict.get('Phone') else None,
                    'Email': str(client_dict['Email']) if client_dict.get('Email') else None,
                    'Address': str(client_dict['Address']) if client_dict.get('Address') else None,
                    'IsActive': bool(client_dict['IsActive']),
                    'CountryID': int(client_dict['CountryID']),
                    'ProvinceID': int(client_dict['ProvinceID']),
                    'City': str(client_dict['City']) if client_dict.get('City') else None,
                    'PostalCode': str(client_dict['PostalCode']) if client_dict.get('PostalCode') else None,
                    'PriceListID': int(client_dict['PriceListID']),
                    'VendorID': int(client_dict['VendorID']),
                    'CompanyID': client_dict.get('CompanyID'),
                    'BranchID': client_dict.get('BranchID'),
                }
                result.append(ClientsInDB(**filtered_dict))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def clients_by_branch(
        self, info: Info, companyID: int, branchID: int
    ) -> List[ClientsInDB]:
        """Obtener clientes filtrados por CompanyID y BranchID"""
        db_gen = get_db()
        db = next(db_gen)
        try:
            clients = get_clients_by_branch(db, companyID, branchID)
            result = []
            for client in clients:
                client_dict = client.__dict__
                filtered_dict = {
                    'ClientID': int(client_dict['ClientID']),
                    'DocTypeID': int(client_dict['DocTypeID']),
                    'DocNumber': str(client_dict['DocNumber']) if client_dict.get('DocNumber') else None,
                    'FirstName': str(client_dict['FirstName']),
                    'LastName': str(client_dict['LastName']) if client_dict.get('LastName') else None,
                    'Phone': str(client_dict['Phone']) if client_dict.get('Phone') else None,
                    'Email': str(client_dict['Email']) if client_dict.get('Email') else None,
                    'Address': str(client_dict['Address']) if client_dict.get('Address') else None,
                    'IsActive': bool(client_dict['IsActive']),
                    'CountryID': int(client_dict['CountryID']),
                    'ProvinceID': int(client_dict['ProvinceID']),
                    'City': str(client_dict['City']) if client_dict.get('City') else None,
                    'PostalCode': str(client_dict['PostalCode']) if client_dict.get('PostalCode') else None,
                    'PriceListID': int(client_dict['PriceListID']),
                    'VendorID': int(client_dict['VendorID']),
                    'CompanyID': client_dict.get('CompanyID'),
                    'BranchID': client_dict.get('BranchID'),
                }
                result.append(ClientsInDB(**filtered_dict))
            return result
        finally:
            db_gen.close()


clientsQuery = ClientsQuery()