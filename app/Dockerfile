FROM python:3.8.1

WORKDIR /api_service
RUN apt-get -y update

COPY requirements.txt .
COPY config.py .
COPY run_flask.py .
COPY ./app app
COPY ./models models
COPY ./scripts scripts
COPY ./uploads uploads

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
