# ![Logo-1](https://github.com/Choster-jpg/MovieBase/assets/63809252/c360f9cf-751d-4cc9-90be-3b941a1619c2) MovieBase 

Movie browse and review app based on web scraping

# About the project 

![image](https://github.com/Choster-jpg/MovieBase/assets/63809252/4ceb46dd-94a5-47d8-b699-90984ce8c1ab)
![image](https://github.com/Choster-jpg/MovieBase/assets/63809252/b5b4778f-655b-4803-8a05-0b43e6afd716)
![image](https://github.com/Choster-jpg/MovieBase/assets/63809252/94d7bda2-0dc2-411d-8a8e-94e9669d9699)
![image](https://github.com/Choster-jpg/MovieBase/assets/63809252/707878a5-7619-45bb-b35a-0df4e9778968)

The original idea of the project was to create a convenient social network for exchanging opinions about various films and animated pictures. 
However, the prospect of filling the database with millions of films manually did not seem so optimal. So it was decided to use existing sites
with all the necessary information and their advanced search engines.

Various web scraping tools were used to implement this idea, including **axios + cheerio** to retrieve and parse web pages, and **OMDb** - a RESTful
web service to obtain movie information, all content and images on the site are contributed and maintained by their users. 

Every time users interact with a movie, all information is automatically added to the database, making агкерук access much faster.

In addition, the app has a user-friendly interface, allowing you to find out what your friends think about your favorite movie in a couple of clicks,
as well as share your opinion.

# Built with

+ ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
+ ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
+ ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
+ ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
+ ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
+ ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
+ ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
+ ![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)

# Installation

### Client

```
$ cd ./Client
$ npm install
```

### Server

```
$ cd ./Server
$ npm install
```

# To run the app:

### For both Client and Server folders:
```
$ npm run dev
```
