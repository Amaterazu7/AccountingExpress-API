# Accounting Notebook API Considerations
The application is a backend on Express API REST with a frontend on React with Material template. 
For this project I used OPTIMISTIC locking to manage concurrent access and to ensure that the data has not changed externally within a transaction. Also, 
I used Version to enable this locking with de PostgreSQL DB. 

Please first step, clone or download this project.

### Running the APP 
* You can run the application installing the dependencies with NPM, and then launch the app:

`` cd AccountingExpress-API ``

* After that and Execute the Express:

`` npm install ``

`` npm start ``

* Then you need to run the UI:

`` cd dashboard-ui/ ``

`` npm install ``

`` npm start ``


### Running the APP with docker 
* You can install docker & docker-compose and run this commands in order to create a docker images. So, you can run the application on a docker containers with the docker-compose file:

`` docker-compose up ``

* If you don't want to see any log on you terminal you can run this:

`` docker-compose up -d ``


# Accounting Notebook API - Agile Engine Code Challenge:
We are looking to build a money accounting system. The application should be a web service. It should not do any real “transactional” work, just emulate the financial transactions logic (debit and credit).
We emulate debit and credit operations for a single user, so we always have just one financial account.
No security is required. So don't worry about authentication.
No real persistence is expected. Please don't invest time into DB integration.
Please avoid wasting time for complex project configuration. Use configuration from an existing project, if you have one, or use project skeleton generation tools for your technologies. Default configuration would be completely enough. 

## Must have:
1.  Service must store the account value of the single user.
2.  Service must be able to accept credit and debit financial transactions and update the account value correspondingly.
3.  Any transaction, which leads to negative amount within the system, should be refused. Please provide http response code, which you think suits best for this case.
4.  Application must store transactions history. Use in-memory storage. Pay attention that several transactions can be sent at the same time. The storage should be able to handle several transactions at the same time with concurrent access, where read transactions should not lock the storage and write transactions should lock both read and write operations.
5.  It is necessary to design REST API by your vision in the scope of this task. There are some API recommendations. Please use these recommendations as the minimal scope, to avoid wasting time for not-needed operations.
6.  In general, the service will be used programmatically via its RESTful API. For testing purposes Postman or any similar app can be used.
7.  It should be possible to launch project/projects by a single-line-command. Please provide README.md
8.  Target completion time is 3 hours. We would rather see what you were able to do in 3 hours than a full-blown application you’ve spent days implementing. Note that in addition to quality, time used is also factored into scoring the task.

## UX/UI Requirements:
1.  We need a simple UI application for this web service.
2.  Please don't spend time for making it beautiful. Use a standard CSS library, like Bootstrap with a theme (or any other).
3.  UI application should display the transactions history list only. No other operation is required.
4.  Transactions list should be done in accordion manner. By default the list shows short summary (type and amount) for each transaction. Full info for a transaction should be shown on user's click.
5.  It would be good to have some coloring for credit and debit transactions.

 
## Expected Deliverables:
1.  Source code.
1.  Binary versions of your applications that are ready to run. No build should be required.
1.  Readme.
