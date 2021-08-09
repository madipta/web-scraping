
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

Start postgres, redis and/or adminer(optional) server using docker-compose

```bash
  docker-compose up
```

Start admin dashboard on http://localhost:4000
```bash
  npx nx serve api-admin
```
```bash
  npx nx serve admin --port=4000
```

Start search application on port http://localhost:5000
```bash
  npx nx serve api-public
```
```bash
  npx nx serve public --port=5000
```

  