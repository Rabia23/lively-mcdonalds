from rest_framework.authtoken.models import Token
from rest_framework.response import Response

__author__ = 'aamish'


def my_login_required(f):
    def wrap(request, *args, **kwargs):
        token = request.query_params.get('token', None)
        if token:
            auth = Token.objects.filter(key=token).first()
            if auth:
                return f(request, auth.user, *args, **kwargs)
            return Response({"message": "User not Authenticated"})
        return Response({"message": "Authentication is Required"})
    return wrap