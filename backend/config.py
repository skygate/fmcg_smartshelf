from pathlib import Path


_CURRENT_DIR = Path.cwd()

DATA_PATH = _CURRENT_DIR / "data"
MODELS_PATH = _CURRENT_DIR / "models"
UPLOAD_FOLDER = _CURRENT_DIR / "uploads"

CLASSIFIERS_PATH = MODELS_PATH / "classifiers"
_DETECTOR_PATH = MODELS_PATH / "detector"
DETECTOR_CFG = str(_DETECTOR_PATH / "model.cfg")
DETECTOR_WEIGHTS = str(_DETECTOR_PATH / "model.weights")

RESOLUTION = (224, 224)

MEAN = [0.51610893, 0.46652943, 0.43950137]
STD = [0.2442449, 0.2526803, 0.2545385]

CRITICALITY_RATIO = 15000

FILE_KEY = "file"
FILENAME_KEY = "filename"
