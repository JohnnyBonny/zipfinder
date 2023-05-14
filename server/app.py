# Hello world!
import os
from flask import Flask, request, jsonify, make_response, session, render_template
from flask_caching import Cache
import requests
import random

app = Flask(__name__,template_folder= 'template')
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

    if type(zipcode) == type(None):
        return

    zipcode = zipcode['value']
    categories = []
    print(f"Zipcode type: {type(zipcode)} and value: {zipcode}", flush=True)
    print(f"URL: {URL}", flush=True)
    url = URL + '?location=' + zipcode + "&categories=food%2Crestaurants%20&sort_by=best_match&limit=20"

    response = requests.get(url, headers=headers)
    # print(f"Response: {response}")
    # print(f"Response.json (#1): {response.json()}")
    # print(f"Response.json (#2): {response.json()}")
    # if type(response) == None:
    #     return
    print("CCC")
    categories.append(response.json()["businesses"])

    # url = URL + '?location=' + zipcode + "&categories=active&sort_by=best_match&limit=20"

    # response = requests.get(url, headers=headers)
    # # if type(response) == None:
    # #     return
    # categories.append(response.json()["businesses"])

    # url = URL + '?location=' + zipcode + "&categories=arts&sort_by=best_match&limit=20"

    # response = requests.get(url, headers=headers)
    # # if type(response) == None:
    # #     return
    # categories.append(response.json()["businesses"])


    # url = URL + '?location=' + zipcode + "&categories=shopping&sort_by=best_match&limit=20"

    # response = requests.get(url, headers=headers)
    # # if type(response) == None:
    # #     return
    # categories.append(response.json()["businesses"])
    print("AAA")

    cache.set("categories", categories)

    #session["test"] = response.json()["businesses"][rand_business]

    print("BBB")

    return {'categories': categories} #sendjson() #response.json()["businesses"][rand_business]["name"]

@app.route('/testsession')
def testsession():
    return cache.get("categories")

@app.route('/addzipcode', methods=['GET', 'POST'])
def add_zipcode():
    if request.method == "POST":
        if request.is_json:
            print(f"Request is: {request}, type is {type(request)}", flush=True)
            print(f"Is it a json: {request.is_json}", flush=True)
            req = request.get_json("value")
            print(f"Req is: {req}", flush=True)
            print(f"Type of request: {type(req)}\n Request contents:{req}", flush=True)
            cache.set("zipcode", req)
        else:
            data = json.loads(request.data)
            req = data.get("value")
            print(f"Handled malformed json: {request}", flush=True)
            cache.set("zipcode", req)
        #return "Your zipcode is: " + cache.get("zipcode")
    print("--BENEATH POST--", flush=True)
    return storecache() or {}

@app.route('/testzipcode', methods=['GET', 'POST'])
def test_zipcode():
    if request.method == "POST":
        req = request.form.get("zip")
        cache.set("zipcode", req)
        return "Your zipcode is: " + cache.get("zipcode")

    return render_template("form.html")

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

"""
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
"""
@app.route('/sendjson')
def sendjson():
    output = {}
    output["RESULT"] = []

    try:
        for category in range(4):
            c = (cache.get("catgories"))
            if c == None:
                c = []
            else:
                c = c[category]
            rand_business = random.randrange(0, min(19, len(c)))
            p = c[rand_business]
            name = p["name"]
            address = p["location"]["display_address"]
            imageurl = p["image_url"]
            rating = p["rating"]
            url = p["url"]
            if 'price' in p:
                price = p['price']
            else:
                price = "N/A"

            output["MESSAGE"] = "Successful retrieval"

            output["RESULT"].append({"name": name, "address": address, "imageurl": imageurl, "rating": rating, "url": url, "price": price})
            status = 200
    except Exception as e:
        print(e)
        output["MESSAGE"] = f"Exception {e}"
        status = 500

    return jsonify(output), status

if __name__ == '__main__':
    app.run()