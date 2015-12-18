from apps.utils import make_request

__author__ = 'aamish'

def region_get(object_id):
    response = make_request('GET', "application/json", '/1/classes/Region/%s' % object_id, '')
    return response