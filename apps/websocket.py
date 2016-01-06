__author__ = 'aamish'

import asyncio
import websockets
from apps.redis_queue import RedisQueue
from lively import settings
import random

@asyncio.coroutine
def ping(websocket, path):
    q = RedisQueue('feedback_queue')
    length = 0
    print("length:" + str(length))
    if websocket.open:
        print("Opened")

    while True:
        if websocket.open:
            if length < q.qsize():
                print("Seek")
                length = q.qsize()
                print("length:" + str(length))
                print("Ping Received")
                yield from websocket.send("Ping Received")
                yield from asyncio.sleep(random.random() * 3)
        else:
            return

start_server = websockets.serve(ping, settings.WEBSOCKET_ADDRESS, settings.WEBSOCKET_PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()