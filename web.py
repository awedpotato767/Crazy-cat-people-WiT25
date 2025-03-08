from flask import Flask, request, render_template, session, jsonify
import json
from scripts import graph_generator
import os
import numpy as np

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/getgraphdata')
def getgraphs():
    #generate graphs

    #return json.dumps(graph stuff)

    return 'success'

@app.route('/createsessionlog')
def createsessionlog():
    creation_day = np.datetime64('now','D')
    session = 1
    while (os.path.isfile(f'session logs/{creation_day} session {session}')):
        session += 1

    with open(f'session logs/{creation_day} session {session}', "w+") as logfile:
        logfile.write(f'[{np.datetime64("now")}] session started\n')

if __name__ == '__main__':
    app.run(debug = True)
