import sys
sys.path.append('/Users/skygate/Projects/shelf-analytics')

from backend.db.db import Box


def populate_database():
    boxes = [
        (884, 613, 64, 132), (944, 613, 55, 132), (999, 613, 56, 132), (1053, 613, 61, 132),
        (890, 749, 64, 130), (946, 749, 59, 130), (1002, 749, 59, 130), (1056, 749, 59, 130),
        (894, 880, 66, 172), (949, 880, 66, 172), (1008, 880, 63, 172), (1064, 880, 50, 172),
    ]
    
    prod_names = [
        "Mleko Wypasione 3,2%", "Mleko UHT 3,2%", "Mleko UHT 3,2%", "Mleko UHT 3,2%",
        "Mleko Wypasione 3,2%", "Mleko Wypasione 3,2%", "Mleko UHT 1,5%", "Mleko UHT 1,5%",
        "Woda mineralna Ciechini", "Woda mineralna Ciechini", "Woda mineralna Ciechini", "Wódka"
    ]

    for idx, box in enumerate(boxes):
        Box(x = box[0], y = box[1], width = box[2], height = box[3], product_name = prod_names[idx]).save()


populate_database()
