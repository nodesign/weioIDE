#!/usr/bin/python
import os, json, sys

def addNode(path):
    n = {}
    n['label'] = os.path.basename(path)
    n['children'] = []

    files = listdirFiltered(path)

    for f in files:
        if os.path.isfile(os.path.join(path, f)):
            n['children'].append(f)
        elif os.path.isdir(os.path.join(path, f)):
            n['children'].append(addNode(os.path.join(path, f)))

    return n

def listdirFiltered(path):
    dirs = os.listdir(path)
    for f in dirs:
        if ( not (f == "www") and not f.startswith('.') and not f.endswith('.pyc') and not f.startswith('__init__') ):
            yield f

def getFileTree(path) :
    """Scans user folder and all folders inside that folder in search for files.
    Exports HTML string that can be directly used inside editor
    """
    # Chop the trailing slash to use os.path.basename()
    if (path[-1] == "/"):
        path = path[:-1]

    # get tree in a form of dictionary
    td = addNode(path)
    # jqtree demands list of dictionaries as a format
    t = []
    t.append(td)

    #print(json.dumps(t, indent=4, sort_keys=True))
    return t

if __name__ == "__main__":
#    print sys.argv
    if (len(sys.argv)<2):
        print 'EXAMPLE : getTree "./inputRootFolder" "./outputFile.json"'
        print 'output file is optional if not provided prints to stdout'
    else :
        s = getFileTree(sys.argv[1])
        out = json.dumps(s, indent=4, sort_keys=True)
        print out 
        if (len(sys.argv)>1):
            f = open(sys.argv[2], "w")
            f.write(out)
            print "Written to ", sys.argv[2]

