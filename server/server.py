#!/usr/bin/python
import sys,json

# Function names and pointers inside
rpcBase = {}

# One declared function
def getStatus(data):
    del(data["params"])
    d = {"ip":"localhost", "wifi": 3, "battery":4}
    data["result"] = d
    data["error"] = None
    return data

# universal send to server function
def sendToServer(data):
    # convert to json
    print json.dumps(d)
    # export it now to stout otherwise nothing happens
    sys.stdout.flush()

# declare function that RPC will call
rpcBase["getStatus"] = getStatus


while True:
    # Blocking function, waiting for new data from client
    line = sys.stdin.readline()
    # convert from json to python dict
    d = json.loads(line)

    func = d["method"]
    resp = None

    # check if we have that function name in data base
    if (func in rpcBase):
        del(d["method"])
        # execute funtuon
        resp = rpcBase[func](d)

    # If there is an answer, then send it
    if not(resp is None):
        sendToServer(resp)