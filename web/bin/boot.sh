#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py collectstatic --no-input
python manage.py migrate

start_gunicorn() {
    # Generate the reload-extra-file options dynamically
    extra_files=$(find /web -name "*.html" -printf "--reload-extra-file %p ")

    # Start Gunicorn
    echo "Starting Gunicorn..."
    gunicorn base_app.wsgi:application --bind 0.0.0.0:8001 --reload --reload-engine=poll $extra_files
}

# Start Gunicorn
start_gunicorn

