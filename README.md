# Music App

A music app used build using the React and Django.which display the following features:

* Login/singup for user to use the app.
* 4 different songs field according to user mood.
* Play, pause, and navigate through music track.
* Creat Playlist.
* Add / Delete songs to Playlist.
* Logout from the session .

## Technologies Used

- **Frontend**: React.js
- **Backend**: Django Rest Framework
- **Database**: SQLite


## Setup and Installation

### Fronted Setup

Navigate to the `front-end` directory and follow the steps:

1. Install Dependencies
   ```sh
   npm i
2. run front-end test server
   ```sh
   npm start
### Backend Setup

Navigate to the `back-end` directory and follow the steps:

1. Create a virtual environment and activate it
2. Install Dependencies
   ```sh
   pip install -r requirements.txt
3. run back-end test server
   ```sh
   python manage.py runserver
### Update Database with Model Changes in Django

1. Run the makemigrations command
   ```sh
   python manage.py makemigrations
2. Execute the migrate command
   ```sh
   python manage.py migrate
