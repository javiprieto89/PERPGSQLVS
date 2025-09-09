# app/graphql/resolvers/creditcards.py
from poplib import CR
import strawberry
from typing import List, Optional
from app.graphql.schemas.creditcards import CreditCardsInDB
from app.graphql.schemas.creditcardgroups import CreditCardGroupsInDB
from app.models.creditcardgroups import CreditCardGroups
from app.models.creditcards import CreditCards
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
            creditcards = db.query(CreditCards).join(
                CreditCardGroups,
                CreditCards.CreditCardGroupID == CreditCardGroups.CreditCardGroupID
               ).all()
            result = []
            for cc in creditcards:
                cc_data = obj_to_schema(CreditCardsInDB, cc)
                # If the credit card has a group, include it in the schema
                if cc.creditCardGroups_:
                    group_data = obj_to_schema(CreditCardGroupsInDB, cc.creditCardGroups_)
                    setattr(cc_data, 'GroupData', group_data)
                else:
                    setattr(cc_data, 'GroupData', None)
                
                result.append(cc_data)
            return result            
        finally:
            db_gen.close()

    @strawberry.field
    def creditcard_by_id(self, info: Info, id: int) -> Optional[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            cc = db.query(CreditCards).join(
                CreditCardGroups,
                CreditCards.CreditCardGroupID == CreditCardGroups.CreditCardGroupID
            ).filter(CreditCards.CreditCardID == id).first()

            if cc:
                cc_data = obj_to_schema(CreditCardsInDB, cc)
                if cc.creditCardGroups_:
                    group_data = obj_to_schema(CreditCardGroupsInDB, cc.creditCardGroups_)
                    setattr(cc_data, 'GroupData', group_data)
                else:
                    setattr(cc_data, 'GroupData', None)
                return cc_data
            return None
        finally:
            db_gen.close()

    @strawberry.field
    def creditcards_by_name(self, info: Info, name: str) -> List[CreditCardsInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            creditcards = db.query(CreditCards).join(
                CreditCardGroups,
                CreditCards.CreditCardGroupID == CreditCardGroups.CreditCardGroupID
            ).filter(CreditCards.CardName.ilike(f'%{name}%')).all()

            result = []
            for cc in creditcards:
                cc_data = obj_to_schema(CreditCardsInDB, cc)
                if cc.creditCardGroups_:
                    group_data = obj_to_schema(CreditCardGroupsInDB, cc.creditCardGroups_)
                    setattr(cc_data, 'GroupData', group_data)
                else:
                    setattr(cc_data, 'GroupData', None)

                result.append(cc_data)
            return result
        finally:
            db_gen.close()


creditcardsQuery = CreditcardsQuery()

