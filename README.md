# PERPGSQLVS

PERPGSQLVS is a small full‑stack project composed of a Starlette‑based back‑end and a React front‑end. The API exposes GraphQL and REST endpoints while the front‑end uses Vite and Tailwind CSS.

## Configuration

Copy `.env.template` to `.env` and adjust the variables for your environment. At minimum set `SQLALCHEMY_DATABASE_URL`, `ENVIRONMENT`, `DEBUG` and `SECRET_KEY`.

## Setup

### Back‑end

```bash
# create and activate a virtual environment
python -m venv perpenv
perpenv\scripts\activate  # on Windows
# or source perpenv/bin/activate on Linux/macOS

# install Python dependencies
pip install -r requirements.txt

# start the API
uvicorn app.main:app --reload
```

### Front‑end

```bash
cd frontend
npm install

# watch Tailwind and generate CSS
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch

# start the development server
npm run dev
```

### ESLint

Run `npm run lint` from the repository root or inside `frontend/` to lint the JavaScript/React code.

## Deployment

The `deploy.py` script automates a simple deployment workflow. Execute:

```bash
python deploy.py
```

or start a production server directly with:

```bash
python deploy.py start
```

This checks prerequisites, installs dependencies, optionally backs up the current deployment and runs the API under Uvicorn.
