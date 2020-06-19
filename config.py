from pathlib import Path


_CURRENT_DIR = Path.cwd()

DATA_PATH = _CURRENT_DIR / "data"
MODELS_PATH = _CURRENT_DIR / "models"

CLASSIFIERS_PATH = MODELS_PATH / "classifiers"
_DETECTOR_PATH = MODELS_PATH / "detector"
DETECTOR_CFG = str(_DETECTOR_PATH / "model.cfg")
DETECTOR_WEIGHTS = str(_DETECTOR_PATH / "model.weights")

RESOLUTION = (224, 224)

MEAN = [0.5775588, 0.53423095, 0.5283534]
STD = [0.19382313, 0.215235, 0.21127158]

FILE_KEY = "file"
