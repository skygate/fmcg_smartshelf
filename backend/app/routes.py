import os

import cv2
from PIL import Image
from flask import request, jsonify, Blueprint, send_from_directory

from config import FILE_KEY, UPLOAD_FOLDER
from scripts.models_runner import Runner

api = Blueprint("api", __name__)


@api.route("/healthchecker", methods=["GET"])
def healthchecker():
    return jsonify({"status": "I am alive!"}), 200


@api.route("/run", methods=["POST"])
def run():
    file = request.files.get(FILE_KEY)
    if not file:
        return jsonify({"status": "File can't be empty."}), 400

    try:
        image = Image.open(file)
    except IOError:
        return jsonify({"status": "File must be an image!"}), 400

    runner = Runner(image)
    object_type, state, image_with_bboxes, defects = runner.run()

    upload_path = os.path.join(UPLOAD_FOLDER, "upload.jpg")
    cv2.imwrite(upload_path, image_with_bboxes)

    return jsonify({"type": object_type, "state": state, "defects": defects})


@api.route("/get_detections", methods=["GET"])
def get_detections():
    return send_from_directory(UPLOAD_FOLDER, "upload.jpg")
