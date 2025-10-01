# carmodels.py
from sqlalchemy.orm import Session, joinedload
from app.models.cars import Cars
from app.models.carmodels import CarModels
from app.models.carbrands import CarBrands
from app.graphql.schemas.carmodels import CarModelsCreate, CarModelsUpdate


def get_carmodels(db: Session):
    return db.query(CarModels).options(joinedload(CarModels.carBrand)).all()


def get_carmodels_by_id(db: Session, company_id: int, carbrand_id: int, carmodelid: int):
    return (
        db.query(CarModels)
        .options(joinedload(CarModels.carBrand))
        .filter(
            CarModels.CompanyID == company_id,
            CarModels.CarBrandID == carbrand_id,
            CarModels.CarModelID == carmodelid,
        )
        .first()
    )

def get_carmodels_by_brand(db: Session, company_id: int, carbrand_id: int):
    return (
        db.query(CarModels)
        .options(joinedload(CarModels.carBrand))
        .filter(CarModels.CompanyID == company_id, CarModels.CarBrandID == carbrand_id)
        .all()
    )


def create_carmodels(db: Session, data: CarModelsCreate):
    obj = CarModels(**vars(data))
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_carmodels(db: Session, company_id: int, carbrand_id: int, carmodelid: int, data: CarModelsUpdate):
    obj = get_carmodels_by_id(db, company_id, carbrand_id, carmodelid)
    if obj:
        for k, v in vars(data).items():
            if v is not None:
                setattr(obj, k, v)
        db.commit()
        db.refresh(obj)
    return obj


def delete_carmodels(db: Session, company_id: int, carbrand_id: int, carmodelid: int):
    obj = get_carmodels_by_id(db, company_id, carbrand_id, carmodelid)
    if obj:
        linked_cars = (
            db.query(Cars)
            .filter(Cars.CompanyID == company_id, Cars.CarModelID == carmodelid)
            .first()
            is not None
        )
        if linked_cars:
            raise ValueError(
                "Cannot delete car model because it is referenced by existing cars"
            )
        db.delete(obj)
        db.commit()
    return obj

