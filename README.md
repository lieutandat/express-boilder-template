

[![Express Logo](https://github.com/lieutandat/express-boilder-template/workflows/Node.js%20CI/badge.svg)]()
[![codecov](https://codecov.io/gh/lieutandat/express-boilder-template/branch/master/graph/badge.svg)](https://codecov.io/gh/lieutandat/express-boilder-template)
# Ready to use Node.js microservice


## Features
- **Framework**: Express
- **Authentication**: 
- **Database**: MySql (Sequelize)
- **Code**: ESLint, Prettier, Husky
- **Debuging**: Debug, VS Code configurations
- **Logging**: Winston
- **Testing**: Jest, SuperTest, AutoCannon
- **Other**: DotEnv
- API versioning
- Request Validation

## Generate private/public key
```shell
    ssh-keygen -t rsa -b 2048 -q -N "12345" -m PEM -f private.key
    ssh-keygen -y -f ./private.key > ./public.key
```
## Getting Started
```shell
# Create environment variables in .env
    PORT=4000
    LOG_LEVEL="error, info"
    DEBUG=*
    SQL_HOST="127.0.0.1"
    SQL_HOST_READ="127.0.0.1"
    SQL_HOST_WRITE="127.0.0.1"
    SQL_PORT="3306"
    SQL_DB="<db-name>"
    SQL_USER="<user>"
    SQL_PASS="<password>"
    SQL_DIALECT=mysql
    SQL_POOL_LIMIT=100

# Install all dependencies
npm install

# Run on port 4000
npm start
```


## Environment variables

Name | Value
------------ | -------------
PORT|4000
LOG_LEVEL|info
DEBUG|*
SQL_HOST|127.0.0.1
SQL_HOST_READ|127.0.0.1
SQL_HOST_WRITE|127.0.0.1
SQL_PORT|5432
SQL_DB|test
SQL_USER|postgres
SQL_PASS|
SQL_DIALECT|postgres
SQL_POOL_LIMIT|100


## Running SQL database migrations
by default umzug[https://github.com/sequelize/umzug] will automatic run migration when start server
```shell
npx sequelize db:migrate
```

## Structure

```
.
├── config                  
│   └── index.js                                    # App configuration files
├── controllers  
│   ├── base-controller.js                          # Base Request managers
│   ├── user.controller.js                          # Request managers
│   └── ...                                         # Other Request managers
├── core 
│   ├── errors                                      # Define Error Code
│   │   ├── index.js                                # 
│   │   └── langs                                   # Error code per lang
│   │       ├── index.js 
│   │       ├── en.js 
│   │       └── vn.js 
│   └── utils                                       # Utils
│       ├── hash-password.utils.js                  # Generate Hash/Salt
│       └── ...                                     # Other Utils
├── database                                        # Data access stuff
│   ├── index.js                                    # Config migration, export db model
│   ├── sequelize-connector.js                      # Setup db connect
│   ├── migrations                                  # Migrations
│   │   ├── [yyyyMMdddhhmmss]-[name].migration.js   # update table script
│   │   ├── [yyyyMMdddhhmmss]-[name].seed.js        # update data table script
│   │   └── ...                                     # other update script
│   └── models                                      # Models
│       ├── index.js                                # Combine model, Config associate
│       ├── user.js                                 # Model
│       └── ...                                     # Other Models
├── logs                                            # log
│   ├── application-yyy-MM-dd-hh-mm.log             
│   └── ...                                         
├── repositories                                    # Repositories
│   ├── user.respository.js                        
│   └── ...                                         
├── routes                                          # Define routes and middlewares here   
│   ├── index.js                                  
│   ├── middlewares                                 # Middleware  
│   │   ├── authorize.js                            
│   │   ├── logger-winston.js                                  
│   │   └── ...                                   
│   └── routers                                     # Routes implementation  
│   │   ├── user.router.js                                   
│   │   └── ...                                   
├── services                                        # Services implementation   
│   ├── user.service.js                                  
│   └── ...
├── tests                                           # Testing
├── .env                                            # Environment variables
├── app.js                                          # App starting point
├── package.json
├── private.key                                     # Sign tokens
├── public.key                                      # Validate tokens
└── README.md         
```

## Git push to existing remote
```
git remote add origin https://github.com/lieutandat/test.git
git push -u origin master

```
