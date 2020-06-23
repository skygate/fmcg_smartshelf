import csv
import os

import cv2
from PIL import Image
from flask import request, jsonify, Blueprint, send_from_directory

from config import FILE_KEY, UPLOAD_FOLDER, UPLOAD_FILE_NAME_PATH, FILENAME_KEY
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

    upload_path = os.path.join(UPLOAD_FOLDER, file.filename)
    cv2.imwrite(upload_path, image_with_bboxes)

    return jsonify({"type": object_type, "state": state, "defects": defects, "filename": file.filename})


@api.route("/get_detections", methods=["GET", "POST"])
def get_detections():
    filename = request.form.get(FILENAME_KEY)
    if not filename:
        return jsonify({"status": "File name can't be empty"})

    return send_from_directory(UPLOAD_FOLDER, filename)
