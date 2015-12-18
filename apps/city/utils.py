from apps.utils import make_request

__author__ = 'aamish'


def city_get(object_id):
    response = make_request('GET', "application/json", '/1/classes/City/%s' % object_id, '')
    return response
