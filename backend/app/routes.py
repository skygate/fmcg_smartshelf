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
    if not file:
        return jsonify({"status": "File can't be empty."}), 400

    try:
        image = Image.open(file)
    except IOError:
        return jsonify({"status": "File must be an image!"}), 400

    runner = Runner(image)
    state, processed_image, defects = runner.run()

    upload_path = os.path.join(UPLOAD_FOLDER, file.filename)
    cv2.imwrite(upload_path, processed_image)

    return jsonify({"state": state, "defects": defects, "filename": file.filename})


@api.route("/get_detections", methods=["POST"])
def get_detections():
    filename = request.json.get(FILENAME_KEY)
    if not filename:
        return jsonify({"status": "File name can't be empty"})

    return send_from_directory(UPLOAD_FOLDER, filename)

