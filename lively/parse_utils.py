__author__ = 'aamish'

import json, http.client
from lively import settings


def make_request(method, content_type, request_url, request_data):
    connection = http.client.HTTPSConnection('api.parse.com', 443)
    connection.connect()
    connection.request(
        method,
        request_url,
        request_data,
        {
            "X-Parse-Application-Id": settings.APPLICATION_ID,
            "X-Parse-REST-API-Key": settings.REST_API_KEY,
            "Content-Type": content_type
        }
    )

    str_response = connection.getresponse().readall().decode('utf-8')
    return json.loads(str_response)


def region_get(object_id):
    response = make_request('GET', "application/json", '/1/classes/Region/%s' % object_id, '')
    return response

def city_get(object_id):
    response = make_request('GET', "application/json", '/1/classes/City/%s' % object_id, '')
    return response

def branch_get(object_id):
    response = make_request('GET', "application/json", '/1/classes/Branch/%s' % object_id, '')
    return response

def user_get(object_id):
    response = make_request('GET', "application/json", '/1/classes/User/%s' % object_id, '')
    return response

def followup_option_get(object_id):
    response = make_request('GET', "application/json", '/1/classes/FollowupOption/%s' % object_id, '')
    return response

def feedback_get(object_id):
    response = make_request('GET', "application/json", '/1/classes/Feedback/%s' % object_id, '')
    return response