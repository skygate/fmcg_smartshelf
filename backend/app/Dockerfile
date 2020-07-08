FROM python:3.8.1

WORKDIR /backend
RUN apt-get -y update

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
