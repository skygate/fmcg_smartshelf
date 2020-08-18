def get_history_box_response(history):
    response = []
    
    for box_history in history:
        box_history_config = {
            'boxId': box_history.box_id,
            'timestamp': box_history.timestamp,
            'state': box_history.state
        }
        response.append(box_history_config)
        
    return response
