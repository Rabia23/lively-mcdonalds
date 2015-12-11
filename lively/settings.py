"""
Django settings for lively project.

Generated by 'django-admin startproject' using Django 1.8.5.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'f#qiorpa9id!n$v#1*(ne16j9%hpa3zqo)u#)jtu=jqge#t%g!'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
ALLOWED_HOSTS = ['*']
#
# DEBUG = True
# ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'app',
    'feedback',
    'api',
    'corsheaders',
    'rest_framework_swagger',
)

REST_FRAMEWORK = {
    # 'DEFAULT_RENDERER_CLASSES': (
    #     'rest_framework_jsonp.renderers.JSONPRenderer',
    # ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    )
}

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',

)

ROOT_URLCONF = 'lively.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'lively.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases
# #
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql_psycopg2",
#         "NAME": "analytics_app",
#         "USER": "aamish",
#         "PASSWORD": "arbisoft",
#         "HOST": "localhost",
#         "PORT": "",
#     }
# }

# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'en-us'

# TIME_ZONE = 'UTC'
TIME_ZONE = 'Asia/Karachi'

USE_I18N = True

USE_L10N = True

USE_TZ = True

CORS_ORIGIN_WHITELIST = (
    'staginglivefeed.arbisoft.com',
    'livefeed.arbisoft.com',
    'localhost:3000',
)
CORS_ORIGIN_ALLOW_ALL = True


# SWAGGER_SETTINGS = {
#     'exclude_namespaces': [],
#     'api_version': '0.1',
#     'api_path': '/',
#     'enabled_methods': [
#         'get',
#         'post',
#         'put',
#         'patch',
#         'delete'
#     ],
#     'api_key': '',
#     'is_authenticated': False,
#     'is_superuser': False,
#     'permission_denied_handler': None,
#     'resource_access_handler': None,
#     'base_path':'172.16.11.113:8000/docs',
#     'info': {
#         'title': 'Swagger LiveFeed',
#     },
#     'doc_expansion': 'none',
# }

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_ROOT = "%s%s" % (BASE_DIR, "/static/")
STATIC_URL = '/static/'
STATICFILES_DIRS = (os.path.join(os.path.dirname(__file__), 'static'),)

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'templates'),
)

EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'mclivefeed@gmail.com'
EMAIL_HOST_PASSWORD = 'Arbisoft123'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = 'LiveFeed Support <no-reply@livefeed.com>'

#------------------------- Parse Constants --------------------------
APPLICATION_ID = "FMn5KgyYiLRjLxvi1zIh3KQNV6OpOxhZu0CswXCa"
REST_API_KEY = "fIGO4Y5KdvgKM8dsspYQrfO5raxdfmbaDdodeQOb"
MASTER_KEY = "dp1YtF7VkUvRYAhmCtc52hlb5jmjpBZAVFSuYexo"
#MFS - Staging Keys

try:
    from local_settings import *
except ImportError:
    pass