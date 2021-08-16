
# Web Scrapping

Web scrapping for news or blog site using CSS selector to get the content fields


## Tech Stack

***Tools***: Visual Code Editor, Nx Monorepo


### *Admin Dashboard*

***Client:*** Angular, Ng-Zorro  
***Server:*** Node, NestJs, GraphQL, Postgres, TypeORM, Playwright, Axios, Cheerio, Bull, Redis

### *Public Portal*

***Client:*** React, TailwindCSS  
***Server:*** Node, NestJs, Postgres, TypeORM  


## Screenshots
![Admin Dashboard Screenshot](https://raw.githubusercontent.com/madipta/web-scraping/master/screenshot/ws-admin-dashboard-min.png)  

![Web Search Screenshot](https://raw.githubusercontent.com/madipta/web-scraping/master/screenshot/ws-search-min.png)

  
## Run Locally

The easy way to run this application locally you need docker & docker-compose installed,  
to install docker go to https://docs.docker.com/engine/install/  
to install docker-compose go to https://docs.docker.com/compose/install/  

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
  npx nx run-many --target=serve --projects=admin,public,api-admin,api-public --parallel --maxParallel=4
```

Admin dashboard run on http://localhost:4000

Public web run on http://localhost:5000

For the first time login, any user name and password it will saved to database, use simple user name and password such as user: "admin", password: "password" to make easier to remember

