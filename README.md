
# Web Scrapping

Web scrapping for news or blog site.


## Tech Stack

***Tools***: Visual Code Editor, Nx Monorepo


### *Admin Dashboard*

***Client:*** Angular, Ng-Zorro  
***Server:*** Node, NestJs, GraphQL, Postgres, TypeORM, Playwright, Axios, Cheerio, Bull, Redis

### *Public Portal*

***Client:*** React, TailwindCSS  
***Server:*** Node, NestJs, Postgres, TypeORM


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

  
## Run Locally

The easy way to run this application locally you need docker installed, if not goto 
https://docs.docker.com/engine/install/

Clone the project

```bash
  git clone https://github.com/madipta/web-scraping.git
```

Go to the project directory

```bash
  cd web-scraping
```

Install dependencies using npm or yarn or else

```bash
  npm install or yarn
```

Start web, postgres and redis server using docker-compose

```bash
  docker-compose up
```

Start web application and API service
```bash
  nx run-many --target=serve --projects=admin,public,api-admin,api-public --parallel --maxParallel=4
```

Admin dashboard run on http://localhost:4000

Public web run on http://localhost:5000

For the first time login, any user name and password it will saved to database, use simple user name and password such as user: "admin", password: "password" to make easier to remember

