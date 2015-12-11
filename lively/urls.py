from django.conf.urls import include, url, patterns
from django.contrib import admin
from app import urls as app_urls
from feedback import urls as feedback_urls
from api import urls as api_urls
from lively import settings

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include(app_urls)),
    url(r'^', include(feedback_urls)),
    url(r'^api/', include(api_urls)),
    url(r'^docs/', include('rest_framework_swagger.urls')),
]

if not settings.DEBUG:
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )