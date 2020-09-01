from scripts.models_runner import Runner
from config import FILE_KEY, UPLOAD_FOLDER, FILENAME_KEY
from flask import request, jsonify, Blueprint, send_from_directory
from PIL import Image

import os

import cv2

from peewee import *

import calendar
import time

import sys
sys.path.append('../..')

from backend.db.db import History
from backend.services.database_service import DatabaseService
from backend.scripts.get_history_box_response import get_history_box_response

api = Blueprint('api', __name__)


@api.route('/healthchecker', methods=['GET'])
def healthchecker():
    return jsonify({'status': 'I am alive!'}), 200


@api.route('/run', methods=['POST'])
def run():
    file = request.files.get(FILE_KEY)
    timestamp = request.form['timestamp']

    db_service = DatabaseService()
    boxes = db_service.get_boxes()

    if not file:
        return jsonify({'status': 'File can\'t be empty.'}), 400

    try:
        image = Image.open(file)
    except IOError:
        return jsonify({'status': 'File must be an image!'}), 400

    runner = Runner(image, boxes)
    result = runner.run()

    response = []

    for (box, classification_result) in result:
        db_service.save_box_classification(
            timestamp, classification_result, box)

        frame_config = {
            'boxId': box.id,
            'x': box.x,
            'y': box.y,
            'width': box.width,
            'height': box.height,
            'result': classification_result,
            'productName': box.product_name
        }

        response.append(frame_config)

    return jsonify({'results': response})


@api.route('/history', methods=['GET'])
def get_history_of_all_boxes():
    start_date = request.args.get('startDate')
    end_date = request.args.get('endDate')
    timestamp_now_ms = calendar.timegm(time.gmtime()) * 1000
    db_service = DatabaseService()

    if (start_date and end_date):
        history = db_service.get_history_by_date(start_date, end_date)
    elif (not start_date and end_date):
        history = db_service.get_history_by_date(0, end_date)
    elif (start_date):
        history = db_service.get_history_by_date(start_date, timestamp_now_ms)
    else:
        history = db_service.get_history()

    response = get_history_box_response(history)

    return jsonify({'results': response})


@api.route('/history/<int:box_id>', methods=['GET'])
def get_box_history(box_id):
    db_service = DatabaseService()
    box_history = db_service.get_history_by_id(box_id)
    response = get_history_box_response(box_history)

    return jsonify({'results': response})


@api.route('/state/current/<int:box_id>', methods=['GET'])
def get_box_current_state(box_id):
    db_service = DatabaseService()
    box_current_state = db_service.get_box_current_state(box_id)
    return jsonify({'boxCurrentState': box_current_state})
