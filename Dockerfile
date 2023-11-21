FROM python:3.11

ENV LANGUAGE C.UTF-8
ENV LC_ALL C.UTF-8

ENV PYTHONHASHSEED 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y \
    bash-completion \
    curl \
    less \
    libpq-dev \
    vim \
    sudo \
    netcat-traditional \
    wkhtmltopdf

RUN pip install --upgrade pip
RUN pip install poetry
COPY ./pyproject.toml ./
COPY ./poetry.lock ./

# Install Poetry packages without a virtualenv in container
RUN poetry config virtualenvs.create false && \
    poetry install

COPY api /api
RUN mkdir -p /api/static
WORKDIR /api

CMD bin/boot.sh
