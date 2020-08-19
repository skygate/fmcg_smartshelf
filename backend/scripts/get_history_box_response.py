import sys
sys.path.append('/Users/skygate/Projects/shelf-analytics')

from backend.db.db import Box


def get_history_box_response(history):
    response = []
    
    for box_history in history:
        box_history_config = {
            'boxId': box_history.box_id,
            'productName': box_history.box.product_name,
            'timestamp': box_history.timestamp,
            'state': box_history.state,
        }
        response.append(box_history_config)
        
    return response
