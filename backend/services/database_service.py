import sys
sys.path.append('/Users/skygate/Projects/shelf-analytics')

from backend.db.db import Box, History

class DatabaseService:
    def get_boxes(self):
        return list(Box.select())
    
    def save_box_classification(self, timestamp, state, box):
        History(timestamp = timestamp, state = state, box = box).save()
        
    def get_history(self):
        return list(History.select())
    
    def get_history_by_id(self, box_id):
        return list(History.select().where(History.box_id == box_id))
        