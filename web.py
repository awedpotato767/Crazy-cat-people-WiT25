from flask import Flask, request, render_template, session, jsonify
import json
from scripts import graph_generator

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/getgraphdata')
def getgraphs():
    #generate graphs

    #return json.dumps(graph stuff)

    return 'success'

if __name__ == '__main__':
    app.run(debug = True)
