from apps.utils import make_request

__author__ = 'aamish'


def branch_get(object_id):
    response = make_request('GET', "application/json", '/1/classes/Branch/%s' % object_id, '')
    return response
