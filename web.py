from flask import Flask, request, render_template, session, jsonify
import json
from scripts import graph_generator
import os
import numpy as np
import pathlib

html_path = os.getcwd() + '/templates'

app = Flask(__name__, template_folder=html_path)
app.secret_key = 'kldklsdjsssdgfgh'

@app.route('/')
def front_page():
    return render_template("index.html")

@app.route('/getgraphdata')
def getgraphs():
    #generate graphs

    #return json.dumps(graph stuff)

    return 'success'

@app.route('/addlog', methods=['POST', 'GET'])
def addlog():
    log = request.get_data()
    log = json.loads(log)

    creation_day = np.datetime64('now','D')
    session = 1
    #get to the first unused session
    while (os.path.isfile(f'session logs/{creation_day} session {session}')):
        session += 1

    if log != 'session started':
        session -= 1
    app.logger.info(session, log)

    with open(f'session logs/{creation_day} session {session}', "a+") as logfile:
        logfile.write(f'[{np.datetime64("now")}] {log}\n')

    return 'success'

if __name__ == '__main__':
    app.run(debug=True)
