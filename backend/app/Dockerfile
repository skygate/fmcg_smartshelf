FROM python:3.8.1

WORKDIR /backend
RUN apt-get -y update
RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN python3 scripts/populate_database.py

ADD https://docs.google.com/uc?export=download&id=11PKdmBnz50ymcBMDT6LZyEQWjDfi8ZHr models/classifiers/classifier.pth

CMD ["python3", "run_flask.py"]