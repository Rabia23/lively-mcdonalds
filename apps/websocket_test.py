__author__ = 'aamish'

import asyncio
import websockets
import datetime
import random
from lively import settings


@asyncio.coroutine
def ping(websocket, path):
    while True:
        if websocket.open:
            now = datetime.datetime.utcnow().isoformat() + 'Z'
            yield from websocket.send(now)
            yield from asyncio.sleep(random.random() * 3)
        else:
            return

start_server = websockets.serve(ping, settings.WEBSOCKET_ADDRESS, settings.WEBSOCKET_PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()