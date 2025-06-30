# app/graphql/resolvers/users.py
import strawberry
from typing import List, Optional
from app.graphql.schemas.users import UsersInDB
from app.graphql.crud.users import get_users, get_user_by_id
from app.db import get_db
from strawberry.types import Info


@strawberry.type
class UsersQuery:
    @strawberry.field
    def all_users(self, info: Info) -> List[UsersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            users = get_users(db)
            result = []
            for user in users:
                user_dict = user.__dict__
                # Crear dict solo con campos del schema UsersInDB con conversión de tipos
                filtered_dict = {
                    'UserID': int(user_dict['UserID']),
                    'Nickname': str(user_dict['Nickname']) if user_dict.get('Nickname') else None,
                    'FullName': str(user_dict['FullName']) if user_dict.get('FullName') else None,
                    'IsActive': bool(user_dict['IsActive'])
                }
                result.append(UsersInDB(**filtered_dict))
            return result
        finally:
            db_gen.close()

    @strawberry.field
    def users_by_id(self, info: Info, id: int) -> Optional[UsersInDB]:
        db_gen = get_db()
        db = next(db_gen)
        try:
            user = get_user_by_id(db, id)
            if user:
                user_dict = user.__dict__
                # Crear dict solo con campos del schema UsersInDB con conversión de tipos
                filtered_dict = {
                    'UserID': int(user_dict['UserID']),
                    'Nickname': str(user_dict['Nickname']) if user_dict.get('Nickname') else None,
                    'FullName': str(user_dict['FullName']) if user_dict.get('FullName') else None,
                    'IsActive': bool(user_dict['IsActive'])
                }
                return UsersInDB(**filtered_dict)
            return None
        finally:
            db_gen.close()


usersQuery = UsersQuery()