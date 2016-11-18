from aiohttp.web import Application
from aiohttp_json_rpc import JsonRpc
import asyncio

@asyncio.coroutine
def ping(request):
    return 'pong'


if __name__ == '__main__':
    loop = asyncio.get_event_loop()

    myrpc = JsonRpc()
    myrpc.add_methods(
        ('', ping),
    )

    app = Application(loop=loop)
    app.router.add_route('*', '/', myrpc)

    handler = app.make_handler()

    server = loop.run_until_complete(
        loop.create_server(handler, '0.0.0.0', 8080))

    loop.run_forever()