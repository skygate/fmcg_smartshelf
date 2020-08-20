import sys
sys.path.append('/Users/skygate/Projects/shelf-analytics')

from backend.db.db import Box, History


class DatabaseService:
    def get_boxes(self):
        return list(Box.select())

    def get_box_by_id(self, box_id):
        return Box.select().where(Box.box_id == box_id)

    def get_box_current_state(self, box_id):
        return list(History.select().where(History.box_id == box_id).order_by(History.timestamp))[0].state

    def save_box_classification(self, timestamp, state, box):
        History(timestamp=timestamp, state=state, box=box).save()

    def get_history(self):
        return list(History.select().join(Box))

    def get_history_by_date(self, start_date, end_date):
        return list(History.select().where(History.timestamp.between(start_date, end_date)).order_by(History.timestamp))

    def get_history_by_id(self, box_id):
        return list(History.select().where(History.box_id == box_id).order_by(History.timestamp))
