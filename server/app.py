# Hello world!
import os
from flask import Flask, request, jsonify, make_response, session, render_template
from flask_caching import Cache
import requests
import random

app = Flask(__name__, template_folder='../server/templates')
DEBUG = app.debug
app.config["SECRET_KEY"] = "verysecretkey"
app.config["CACHE_TYPE"] = "SimpleCache"

cache = Cache(app)
API_KEY = "Bearer sW9VtHDsn6h_dkjQtZLewCsb2v1Cg9dHCoSX2oJHJXeVYvIuxJbCbO0daDiFe40iQG8rckCFOR1e_SXWSAMsCIfagLOjm0btopnwLc60UGEv1ak3Wz3pl_IlFgxgZHYx"
URL = "https://api.yelp.com/v3/businesses/search"


headers = {
    "accept": "application/json",
    "Authorization": API_KEY
}



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


@app.route('/storecache', methods=['GET'])
def storecache():
    zipcode = cache.get("zipcode")

    categories = []
    url = URL + '?location=' + zipcode + "&categories=food%2Crestaurants%20&sort_by=best_match&limit=20"

    response = requests.get(url, headers=headers)
    categories.append(response.json()["businesses"])

    url = URL + '?location=' + zipcode + "&categories=active&sort_by=best_match&limit=20"

    response = requests.get(url, headers=headers)
    categories.append(response.json()["businesses"])

    url = URL + '?location=' + zipcode + "&categories=arts&sort_by=best_match&limit=20"

    response = requests.get(url, headers=headers)
    categories.append(response.json()["businesses"])


    url = URL + '?location=' + zipcode + "&categories=shopping&sort_by=best_match&limit=20"

    response = requests.get(url, headers=headers)
    categories.append(response.json()["businesses"])

    cache.set("categories", categories)

    #session["test"] = response.json()["businesses"][rand_business]

    return "Success!" #response.json()["businesses"][rand_business]["name"]

@app.route('/testsession')
def testsession():
    return cache.get("categories")

@app.route('/addzipcode', methods=['GET', 'POST'])
def add_zipcode():
    if request.method == "POST":
        req = request.form.get("zip")
        cache.set("zipcode", req)
        return "Your zipcode is: " + cache.get("zipcode")

    return render_template("templates/form.html")

@app.route('/getnames')
def getnames():
    #first index is the category
    #second is the place
    #third is the attributes of the place
    output = []


    for category in range(4):
        rand_business = random.randrange(0, 19)
        output.append(cache.get("categories")[category][rand_business]["name"])

    return output

@app.route('/getaddresses')
def getaddresses():
    #first index is the category
    #second is the place
    #third is the attributes of the place
    output = []

    for category in range(4):
        rand_business = random.randrange(0, 19)
        output.append(cache.get("categories")[category][rand_business]["location"]["display_address"])

    return output

@app.route('/getimageurl')
def getimageurl():
    #first index is the category
    #second is the place
    #third is the attributes of the place
    output = []

    for category in range(4):
        rand_business = random.randrange(0, 19)
        output.append(cache.get("categories")[category][rand_business]["image_url"])

    return output

@app.route('/getrating')
def getrating():
    #first index is the category
    #second is the place
    #third is the attributes of the place
    output = []

    for category in range(4):
        rand_business = random.randrange(0, 19)
        output.append(cache.get("categories")[category][rand_business]["rating"])

    return output

@app.route('/getprice')#test
def getprice():
    #first index is the category
    #second is the place
    #third is the attributes of the place
    output = []

    for category in range(4):
        rand_business = random.randrange(0, 19)
        p = (cache.get("categories")[category][rand_business])
        if 'price' in p:
            output.append(cache.get("categories")[category][rand_business]['price'])
        else:
            output.append("N/A")
        #k = p.keys()
        #print(k)
        #output.append(str(cache.get("categories")[category][rand_business]["price"]))

    return output

@app.route('/getisclosed')#works but returns unreliable data
def getisclosed():
    #first index is the category
    #second is the place
    #third is the attributes of the place
    output = []

    for category in range(4):
        rand_business = random.randrange(0, 19)
        output.append(cache.get("categories")[category][rand_business]["is_closed"])

    return output

@app.route('/geturl')
def geturl():
    #first index is the category
    #second is the place
    #third is the attributes of the place
    output = []

    for category in range(4):
        rand_business = random.randrange(0, 19)
        output.append(cache.get("categories")[category][rand_business]["url"])

    return output

if __name__ == '__main__':
    app.run()