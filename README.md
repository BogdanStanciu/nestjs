# NestJS Template

## Build

Once the repository has been downloaded locally, navigate to the directory from the command line and run:

`make build`

Once the build is complete, you can start the backend using the command::

`make start`

From the .env default configurations, the backend runs on local port 3000, which in turn is exposed by docker-compose under the same port

To stop the backend just run the comand:

`make stop`

## API

Load the file **nestjs.postman_collection.json** in Postman.

The APIs are protected by authentication via JWT. The application automatically instantiates 2 users (admin and employee) with the following credentials

admin

> username: admin.admin
>
> password: 1234

employee

> username: james.bond
>
> password: 1234

In order to use the APIs, you first need to get a token using the `/auth/login` endpoint login with the desired user account. This return a token that must be included in the next APIs as a **Bearer Token**
