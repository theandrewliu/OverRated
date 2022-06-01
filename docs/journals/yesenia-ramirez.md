In the journals, every day that you work on the project, you must make an entry in your journal after you've finished that day. At a minimum, you will need to include the following information:

- The date of the entry
- A list of features/issues that you worked on and who you worked with, if applicable
- A reflection on any design conversations that you had
- At least one ah-ha! moment that you had during your coding, however small


## May 27, 2022
* App name and logos

We came up with our app name and designed some logos as options for our website.

* Docker and sql files
 
I live shared on VSCode and we all completed our Dockerfiles, requirements.txt, and sql files to be able to create a table in our database. We had some guidance from Shawn and Jeff to get our sql file running. 

Today, I learned that I need to remove our database volume and recreate it when changing our database and to use single quotes instead of double quotes in our sql file. 


## May 28, 2022
* Sql files refactored 

We created a postgres directory in our data directory where we separated our sql file into separate files. We had some troubleshooting we needed to do with our database ownership. 

* Profile endpoints

We worked on a get request for a list of all our profiles. I coded the db.py and helped set up the directories. We had to troubleshoot as we were getting a 500 internal server error. We found that our page functionality was not working, so we edited that out for now and will work on that tomorrow. We also had to add Optional to our photo property in our model as that was causing an issue with the data since the photo was set to Null. I am doing research to see if using Union is better than using Optional. 

Today, I learned that adding Optional to a property in our model will allow us to have Null in our data. 
