import os

import cv2
from PIL import Image
from flask import request, jsonify, Blueprint, send_from_directory

from config import FILE_KEY, UPLOAD_FOLDER, FILENAME_KEY
from scripts.models_runner import Runner

api = Blueprint("api", __name__)


@api.route("/healthchecker", methods=["GET"])
def healthchecker():
    return jsonify({"status": "I am alive!"}), 200


@api.route("/run", methods=["POST"])
def run():
    file = request.files.get(FILE_KEY)
    # boxes = request.json["boxes"]
    boxes = [
            (884, 613, 948, 745), (944, 613, 999, 745), (999, 613, 1055, 745), (1053, 613, 1114, 745),
            (890, 749, 954, 879), (946, 749, 1005, 879), (1002, 749, 1061, 879), (1056, 749, 1114, 879),
            (894, 880, 960, 1052), (949, 880, 1015, 1052), (1008, 880, 1071, 1052), (1064, 880, 1114, 1052),
        ]

    if not file:
        return jsonify({"status": "File can't be empty."}), 400

    try:        
        image = Image.open(file)
    except IOError:
        return jsonify({"status": "File must be an image!"}), 400
    
    runner = Runner(image, boxes)
    result = runner.run()

    return jsonify({"results": result})


# @api.route("/get_detections", methods=["POST"])
# def get_detections():
#     filename = request.json.get(FILENAME_KEY)
#     if not filename:
#         return jsonify({"status": "File name can't be empty"})

#     return send_from_directory(UPLOAD_FOLDER, filename)
