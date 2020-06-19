import argparse
import os

from PIL import Image

from config import DATA_PATH
from scripts.models_runner import Runner


def main(args: argparse.Namespace) -> None:
    image_path = os.path.join(DATA_PATH, args.name)
    image = Image.open(image_path)

    runner = Runner(image)
    runner.run()


def set_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Air motor Prove of Concept")
    parser.add_argument("-n", "--name", required=True, help="Name of the image")
    args = parser.parse_args()
    return args


if __name__ == "__main__":
    main(set_args())
