# Teamwork
[![Maintainability](https://api.codeclimate.com/v1/badges/f231d346e1db5943d727/maintainability)](https://codeclimate.com/github/Sevenpros/Teamwork/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/Sevenpros/Teamwork/badge.svg)](https://coveralls.io/github/Sevenpros/Teamwork)
[![Build Status](https://travis-ci.org/Sevenpros/Teamwork.svg?branch=develop)](https://travis-ci.org/Sevenpros/Teamwork)
**Teamwork** is application that helps employees within an organization or company to collaborate each other in most efficient way. 
![Screen (01)](https://github.com/Sevenpros/Teamwork/blob/develop/ui/images/landpage.JPG)


# What Teamwork does
**Teamwork** project was delopped with the purpose of make employees collaboration easy within a certain organization or company. 
with Teamwork employee should be able perform the following tasks:
*  **Create an account**
employee would be able to create a new account in order to access the app 
and starting writing and/or share his/her articles.
* **Login to created account**
after successfully creatiing account, employee would be able to login whenever he/she wants, into the app
using the the credintials used while signing up.
* **Write and/or share article**
employees should be to write and/or share articles with colleagues
* **Edit article**
employees can edit their articles in case they want yo
* **Delete Article** 
employee can delete their articles in case of need
* **Comment on article**
employee can comment on any article of interest post by colleagues

* **Flag article or comment**
employees can flag a comment or article as inappropriate
## User Interface 
To Navigate to the user interface just click ![Here](https://sevenpros.github.io/Teamwork/ui/html/)

## API Endpoints
This application have API endpoints Hosted on **heroku** ![Teamwork](teamwork-seth.herokuapp.com) which can be used to perform different tasks mentioned above.
* **Sign up API**
*POST/* teamwork-seth.herokuapp.com/api/v1/auth/signup is used to Create new account
* **Sign in API**
*POST/* teamwork-seth.herokuapp.com/api/v1/auth/signin is used to login into the app
* **Write Article API**
*POST/* teamwork-seth.herokuapp.com/api/v1/articles is used to Write new Article
* **View All Articles API**
*GET/* teamwork-seth.herokuapp.com/api/v1/feeds is used to View All articles
* **View Specific Article API**
*GET/* teamwork-seth.herokuapp.com/api/v1/articles/:id is view specific article
* **Edit Article API**
*PATCH/* teamwork-seth.herokuapp.com/api/v1/articles/:id is used to edit an article
* **Delete article API**
*DELETE/* teamwork-seth.herokuapp.com/api/v1/articles/:id is used to delete article
* **Comment an article API**
*POST/* teamwork-seth.herokuapp.com/api/v1/articles/:id/comments is used to Comment on article
* [API DOCUMENT](https://documenter.getpostman.com/view/8977299/SVtR1VBW)

# HOW TO INSTALL
If you want to use this application localy on your pc you will need to follow bellow instructions
* you have to clone this project from github (make sure you have git installed)
by going on github website click on **Clone**
* inside your command line interface(whaterver cli you're using ) wtire _git clone 'Ctrl + v'_ 
* Install node verision 10.6.0 (it will come along with the npm)
* you have to install all depedencies using this command: _npm install_
* enjoy your app!!!
