# PERPGSQLVS

This repository contains a FastAPI application together with a small React frontend.

## Configuration

The backend reads its settings from environment variables. You can copy `.env.template` to `.env` and adjust the values. The most important variables are:

- `SQLALCHEMY_DATABASE_URL` – SQLAlchemy connection string for the database.
- `ENVIRONMENT` – set to `development`, `testing` or `production`.
- `DEBUG` – enables debug mode when `true`.
- `SECRET_KEY` – JWT secret key.

Any variable present in `.env.template` can be configured in the same way.

## Running locally

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the backend:
   ```bash
   uvicorn app.main:app --reload
   ```

See `Como iniciar.txt` for additional development tips.
