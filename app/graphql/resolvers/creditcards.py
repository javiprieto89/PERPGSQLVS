# app/graphql/resolvers/creditcards.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.creditcards import CreditCardsInDB
from app.graphql.crud.creditcards import get_creditcards, get_creditcard_by_id, get_creditcard_by_name
from app.db import get_db
from app.utils import list_to_schema, obj_to_schema
from strawberry.types import Info


@strawberry.type
class CreditcardsQuery:
    @strawberry.field
    def all_creditcards(self, info: Info) -> List[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            creditcards = get_creditcards(db)
            result = []
            for cc in creditcards:
                cc_dict = cc.__dict__
                data = {
                    'CreditCardID': int(cc_dict['CreditCardID']),
                    'CardGroupID': int(cc_dict['CreditCardGroupID']),
                    'CardName': str(cc_dict['CardName']),
                    'Surcharge': float(cc_dict['Surcharge']) if cc_dict.get('Surcharge') is not None else None,
                    'Installments': int(cc_dict['Installments']) if cc_dict.get('Installments') is not None else None,
                    'IsActive': bool(cc_dict['IsActive']) if cc_dict.get('IsActive') is not None else None
                }
                result.append(CreditCardsInDB(**data))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def creditcard_by_id(self, info: Info, id: int) -> Optional[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            cc = get_creditcard_by_id(db, id)
            if cc:
                cc_dict = cc.__dict__
                data = {
                    'CreditCardID': int(cc_dict['CreditCardID']),
                    'CardGroupID': int(cc_dict['CreditCardGroupID']),
                    'CardName': str(cc_dict['CardName']),
                    'Surcharge': float(cc_dict['Surcharge']) if cc_dict.get('Surcharge') is not None else None,
                    'Installments': int(cc_dict['Installments']) if cc_dict.get('Installments') is not None else None,
                    'IsActive': bool(cc_dict['IsActive']) if cc_dict.get('IsActive') is not None else None
                }
                return CreditCardsInDB(**data)
            return None
        finally:
            db_gen.close()

    @strawberry.field
    def creditcards_by_name(self, info: Info, name: str) -> List[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            creditcards = get_creditcard_by_name(db, name)
            result = []
            for cc in creditcards:
                cc_dict = cc.__dict__
                data = {
                    'CreditCardID': int(cc_dict['CreditCardID']),
                    'CardGroupID': int(cc_dict['CreditCardGroupID']),
                    'CardName': str(cc_dict['CardName']),
                    'Surcharge': float(cc_dict['Surcharge']) if cc_dict.get('Surcharge') is not None else None,
                    'Installments': int(cc_dict['Installments']) if cc_dict.get('Installments') is not None else None,
                    'IsActive': bool(cc_dict['IsActive']) if cc_dict.get('IsActive') is not None else None
                }
                result.append(CreditCardsInDB(**data))
            return result
        finally:
            db_gen.close()


creditcardsQuery = CreditcardsQuery()
