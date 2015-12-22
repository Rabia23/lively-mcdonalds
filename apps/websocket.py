__author__ = 'aamish'

import asyncio
import websockets
from apps.redis_queue import RedisQueue


@asyncio.coroutine
def time(websocket, path):
    q = RedisQueue('test')
    while True:
        if not websocket.open:
            return
        if not q.empty():
            greeting = q.get()
            print("DATA RECIEVED ========================" + str(greeting))
            yield from websocket.send("Hello")

start_server = websockets.serve(time, '172.16.11.113', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()