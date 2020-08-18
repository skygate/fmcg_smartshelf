from peewee import *

db = SqliteDatabase('shelf-analytics.db')

class BaseModel(Model):
    class Meta:
        database = db

class Box(BaseModel):
    x = IntegerField()
    y = IntegerField()
    width = IntegerField()
    height = IntegerField()
    product_name = CharField()

    class Meta:
        table_name = "boxes"

class History(BaseModel):
    box = ForeignKeyField(Box, backref="history")
    timestamp = DateTimeField()
    state = CharField()

    class Meta:
        table_name = "history"

db.connect()
db.create_tables([Box, History])
