from flask import Flask, request, render_template, session, jsonify
import json

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template()

@app.route('/getgraphdata')
def getgraphs():
    dir = request.get_data()
    dir = json.loads(dir)

    #generate graphs

    #return json.dumps(graph stuff)

if __name__ == '__main__':
    app.run(debug = True)