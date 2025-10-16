FROM python:3.11-slim

WORKDIR /app

# Kopiowanie pliku z zależnościami
COPY requirements.txt .

# Instalacja zależności
RUN pip install --no-cache-dir -r requirements.txt

# Kopiowanie kodu aplikacji
COPY ./app ./app

# Ustawienie zmiennych środowiskowych
ENV PYTHONUNBUFFERED=1

# Eksponowanie portu
EXPOSE 8000

# Uruchomienie aplikacji
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
