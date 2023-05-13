# Hello world!
import os
from flask import Flask, request, jsonify, make_response

app = Flask(__name__)
DEBUG = app.debug

#####################################################
# CORS section
#####################################################
@app.after_request
def after_request_func(response):
    if DEBUG:
        print("in after_request")
    origin = request.headers.get('Origin')
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Headers', 'x-csrf-token')
        response.headers.add('Access-Control-Allow-Methods',
                             'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)
    else:
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)

    return response


#####################################################
# end CORS section
#####################################################


@app.route('/')
def hello():
    return 'Welcome to Zipfinder Server Home page'
    

if __name__ == '__main__':
    app.run()