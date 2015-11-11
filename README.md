- MC LiveFeed API & Admin Panel
Contains REST APIs for the MC LiveFeed Analytics Panel and Django admin for the backend support.

- Requirements
Python 3.4.3

- Setup
Install requirements (pip install -r requirements.txt)
Migrate Database (python manage.py migrate)

- Extras
Change APPLICATION_ID & REST_API_KEY in the settings file as per your PARSE.com project keys. This project will sync up with your database present at Parse.
Don't forget to give WebHook links to your Parse application.
