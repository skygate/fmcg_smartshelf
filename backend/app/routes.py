import os

import cv2

from peewee import *

import sys
sys.path.append('/Users/skygate/Projects/shelf-analytics')

from backend.db.db import History

from PIL import Image
from flask import request, jsonify, Blueprint, send_from_directory

from config import FILE_KEY, UPLOAD_FOLDER, FILENAME_KEY
from scripts.models_runner import Runner

from backend.services.database_service import DatabaseService

api = Blueprint("api", __name__)


@api.route("/healthchecker", methods=["GET"])
def healthchecker():
    return jsonify({"status": "I am alive!"}), 200


@api.route("/run", methods=["POST"])
def run():
    file = request.files.get(FILE_KEY)
    timestamp = request.form["timestamp"]
    
    db_service = DatabaseService()
    boxes = db_service.get_boxes()

    if not file:
        return jsonify({"status": "File can't be empty."}), 400

    try:        
        image = Image.open(file)
    except IOError:
        return jsonify({"status": "File must be an image!"}), 400
    
    runner = Runner(image, boxes)
    result = runner.run()
    
    to_send = []
    
    for (box, classification_result) in result:
        db_service.save_box_classification(timestamp, classification_result, box)

        frame_config = {
            "boxId": box.id,
            "x": box.x,
            "y": box.y,
            "width": box.width,
            "height": box.height,
            "result": classification_result,
            "productName": box.product_name
        }
        
        to_send.append(frame_config)


    return jsonify({"results": to_send})

@api.route("/history", methods=["GET"])
def get_history_of_all_boxes():
    print('request: ', request)

@api.route("/history/:box_id", methods=["POST"])
def get_box_history():
    print('request: ', request)
    
# @api.route("/get_detections", methods=["POST"])
# def get_detections():
#     filename = request.json.get(FILENAME_KEY)
#     if not filename:
#         return jsonify({"status": "File name can't be empty"})

#     return send_from_directory(UPLOAD_FOLDER, filename)
