__author__ = 'aamish'

import asyncio
import websockets
from apps.redis_queue import RedisQueue
from lively import settings


@asyncio.coroutine
def ping(websocket, path):
    q = RedisQueue('test')
    while True:
        if websocket.open:
            if not q.empty():
                greeting = q.get()
                print("DATA RECIEVED: " + str(greeting))
                yield from websocket.send("Hello")
        else:
            return

start_server = websockets.serve(ping, settings.WEBSOCKET_ADDRESS, settings.WEBSOCKET_PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()