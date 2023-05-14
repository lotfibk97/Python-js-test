# User Management System

This is a User Management System built with Django and Bootstrap. It allows you to manage users, search for users, and view their details.

## Features

- User listing with pagination
- Search users by first name, last name, email, or department
- Sorting users by different columns
- View user details in a lightbox
- Responsive design with Bootstrap

## Requirements

- Python 3.x
- Django 3.x
- Bootstrap 4.x

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lotfibk97/Python-js-test.git
   ```
2. Navigate to the project directory

    ```bash
    cd technicaltest
    ```
3. Create a virtual environment (optional but recommended):
    ```bash
    python -m venv env
    source env/bin/activate
    ```
4. Install the dependencies

    ```bash
    pip install -r requirements.txt
    ```
5. Make sure you have postgresql installed and configured
6. Go to settings.py in the project and update the following variables according to your postgres config
    ```
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'DB_NAME',
            'USER': 'YOUR_USERNAME',
            'PASSWORD': 'YOUR_PASSWORD',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
    ```
7. Run database migrations:

    ```bash
    python manage.py migrate
    ```
8. If you do not have any data in your postgres you can run the following command to generate some data:
    ```bash
    python manage.py insert_initial_data
    ```
9. Start the development server:

    ```bash
    python manage.py runserver
    ```
10. Access the application in your web browser at http://localhost:8000.

## Usage


- To view the list of users, navigate to the homepage.
- Use the search box to search for users by their first name, last name, email, or department.
- Click on the column headers to sort the user list.
- Click on the "View" button next to a user to see their details in a lightbox.


