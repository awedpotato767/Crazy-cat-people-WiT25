from types import NoneType
from flask import Flask, request, render_template, session, jsonify, send_from_directory
import json
from scripts import graph_generator
import os
import numpy as np
from PIL import Image

html_path = os.getcwd() + '/templates'

app = Flask(__name__, template_folder=html_path)
app.secret_key = 'kldklsdjsssdgfgh'

@app.route('/')
def front_page():
    return render_template("index.html")

@app.route('/generategraphs', methods=['POST', 'GET'])
def generategraphs():
    study_stats = graph_generator.get_composite_stats()
    if not isinstance(study_stats,NoneType):
        graph_generator.render_stats(study_stats)
        print("generation complete")
        return 'success'
    else:
        print("OnO there is no data to chew on.")
    return 'success'

@app.route('/addlog', methods=['POST'])
def addlog():
    log = request.get_data()
    log = json.loads(log)

    creation_day = np.datetime64('now','D')
    session = 1
    #get to the first unused session
    while (os.path.isfile(f'session logs/{creation_day} session {session}')):
        session += 1

    session -= 1

    with open(f'session logs/{creation_day} session {session}', "a") as logfile:
        logfile.write(f'[{np.datetime64("now")}] {log}\n')

    return 'success'

@app.route('/newlog', methods=['POST'])
def newlog():
    app.logger.info("new log made")
    log = request.get_data()
    log = json.loads(log)

    creation_day = np.datetime64('now','D')
    session = 1
    #get to the first unused session
    while (os.path.isfile(f'session logs/{creation_day} session {session}')):
        session += 1


    with open(f'session logs/{creation_day} session {session}', "w+") as logfile:
        logfile.write(f'[{np.datetime64("now")}] {log}\n')

    return 'success'

if __name__ == '__main__':
    app.run(debug=True)
