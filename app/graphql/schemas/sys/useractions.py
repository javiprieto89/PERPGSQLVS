# app/graphql/schemas/sys/useractions.py
import strawberry


@strawberry.type
class SysUserActionsInDB:
    """Catálogo inmutable de acciones disponibles para usuarios."""
    UserActionID: int
    ActionName: str
