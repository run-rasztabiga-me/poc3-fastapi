# Aplikacja do Zarządzania Notatkami

Pełna aplikacja typu full-stack składająca się z trzech komponentów:
- **Frontend**: Aplikacja SPA w React z TypeScript
- **Backend**: API REST w FastAPI (Python)
- **Database**: PostgreSQL

## Architektura

Projekt wykorzystuje architekturę wielowarstwową z trzema kontenerami Docker:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend   │─────▶│  PostgreSQL │
│   (React)   │      │  (FastAPI)  │      │  (Database) │
│   Port 3000 │      │   Port 8000 │      │   Port 5432 │
└─────────────┘      └─────────────┘      └─────────────┘
```

## Struktura Projektu

```
.
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # Główny plik aplikacji FastAPI
│   │   ├── database.py       # Konfiguracja bazy danych
│   │   ├── models.py         # Modele SQLAlchemy
│   │   ├── schemas.py        # Schematy Pydantic
│   │   └── routers/
│   │       ├── __init__.py
│   │       └── notes.py      # Endpointy API dla notatek
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── NoteForm.tsx  # Formularz dodawania/edycji notatek
│   │   │   └── NotesList.tsx # Lista notatek
│   │   ├── App.tsx           # Główny komponent aplikacji
│   │   ├── App.css           # Style aplikacji
│   │   ├── index.tsx         # Punkt wejścia React
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── tsconfig.json
│
└── docker-compose.yml        # Orkiestracja wszystkich kontenerów

## Wymagania

- Docker (wersja 20.x lub nowsza)
- Docker Compose (wersja 2.x lub nowsza)

## Uruchomienie

### Uruchomienie wszystkich serwisów

```bash
docker-compose up --build
```

Aplikacja będzie dostępna pod adresami:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Dokumentacja API: http://localhost:8000/docs
- PostgreSQL: localhost:5432

### Uruchomienie w tle

```bash
docker-compose up -d --build
```

### Zatrzymanie aplikacji

```bash
docker-compose down
```

### Zatrzymanie z usunięciem wolumenów (baza danych)

```bash
docker-compose down -v
```

## Funkcjonalności

### Frontend (React + TypeScript)
- Responsywny interfejs użytkownika
- Wyświetlanie listy notatek
- Dodawanie nowych notatek
- Edycja istniejących notatek
- Usuwanie notatek
- Komunikacja z API poprzez fetch

### Backend (FastAPI)
- RESTful API
- CRUD operations dla notatek
- Automatyczna dokumentacja API (Swagger/OpenAPI)
- Walidacja danych z Pydantic
- Integracja z PostgreSQL poprzez SQLAlchemy
- Obsługa CORS dla komunikacji z frontendem

### Database (PostgreSQL)
- Przechowywanie danych notatek
- Automatyczne tworzenie tabel
- Persistent storage poprzez Docker volumes

## Endpointy API

### Notatki

- `GET /notes` - Pobierz wszystkie notatki
- `GET /notes/{id}` - Pobierz konkretną notatkę
- `POST /notes` - Utwórz nową notatkę
- `PUT /notes/{id}` - Zaktualizuj notatkę
- `DELETE /notes/{id}` - Usuń notatkę

### Przykład request body

```json
{
  "title": "Tytuł notatki",
  "content": "Treść notatki"
}
```

## Konfiguracja

### Zmienne środowiskowe

#### Backend
- `DATABASE_URL` - URL połączenia z bazą danych (domyślnie: `postgresql://user:password@db:5432/dbname`)

#### Frontend
- `REACT_APP_API_URL` - URL backendu API (domyślnie: `http://localhost:8000`)

### Modyfikacja portów

Możesz zmienić porty w pliku `docker-compose.yml`:

```yaml
services:
  frontend:
    ports:
      - "3000:80"  # zmień 3000 na inny port

  backend:
    ports:
      - "8000:8000"  # zmień 8000 na inny port

  db:
    ports:
      - "5432:5432"  # zmień 5432 na inny port
```

## Rozwój lokalny

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# lub
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Testowanie

### Testowanie API

Otwórz przeglądarkę i przejdź do:
- http://localhost:8000/docs - Swagger UI
- http://localhost:8000/redoc - ReDoc

### Testowanie frontendu

Otwórz przeglądarkę i przejdź do:
- http://localhost:3000

## Monitoring

### Sprawdzanie logów

```bash
# Wszystkie serwisy
docker-compose logs -f

# Konkretny serwis
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Sprawdzanie statusu kontenerów

```bash
docker-compose ps
```

## Troubleshooting

### Problem z połączeniem do bazy danych

Upewnij się, że kontener bazy danych jest w pełni uruchomiony:

```bash
docker-compose logs db
```

### Frontend nie może połączyć się z backendem

1. Sprawdź, czy backend działa: `curl http://localhost:8000`
2. Sprawdź konfigurację CORS w `backend/app/main.py`
3. Sprawdź zmienną `REACT_APP_API_URL` w konfiguracji frontendu

### Rebuild kontenerów

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## Technologie

- **Frontend**: React 18, TypeScript, CSS3
- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **Database**: PostgreSQL 15
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (dla frontendu)

## Licencja

Ten projekt jest przykładową aplikacją edukacyjną.
