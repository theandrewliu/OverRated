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


## May 31, 2022
* Sql files refactored 

We created a postgres directory in our data directory where we separated our sql file into separate files. We had some troubleshooting we needed to do with our database ownership. 

* Profile endpoints

We worked on a get request for a list of all our profiles. I coded the db.py and helped set up the directories. We had to troubleshoot as we were getting a 500 internal server error. We found that our page functionality was not working, so we edited that out for now and will work on that tomorrow. We also had to add Optional to our photo property in our model as that was causing an issue with the data since the photo was set to Null. I am doing research to see if using Union is better than using Optional. 

Today, I learned that adding Optional to a property in our model will allow us to have Null in our data. 


## June 1, 2022
* Profile API endpoints

Andrew and I worked on the backend. Andrew worked on db.py while I worked on the profiles.py in the routers directory. We completed our delete endpoint and two update endpoints (profile and account info). 

* Email 
I added an email property to our database. 

Today, I learned how important indexes are when returning our input as a dictionary. The indexes in our row_to_profile functions need to match the order we are returning the properties in the db.py update function. 

I also learned the role of our models and how the In vs Out models differ. Our In model needs to match the data we are inputting and the Out model needs to match the data that will be returned. And the Out models will include an id property.

Also, I learned a new way to debug when having a problem with our response model by commenting out our response model, row_to_profile return statement and except statement. This allows us to have a better idea where the problem is since we can return a single row and check if our indexes are in the correct order and we are returning the correct information. We can then uncomment out one thing at a time until our function is working perfectly. 

## June 2, 2022
* Interested table

Today was a day! We brainstormed how we were going to filter out profiles for a user. We had trouble thinking about how to create our sql table to have our user pick what gender they are interested in. 
Andrew and I created the interested table and data.

* Interested table and creating a profile

When a user creates their profile, they are able to choose their preferences of gender. We did this by joining the profiles table with the interested table in the insert table function. We also used List by importing it from typing into our base model. Andrew created a for loop inside the insert table function and I created the base models and adjusted the router functions. 

Today, I learned:

The steps executed in an API call using FastAPI: 
1. Our insert_profile function (db.py) arguments are from..
2. what is inputed into our create_profile function (routers>profiles.py) with the model ProfileCreateIn (models>profiles.py) specifying the data type.
(For creating a profile ProfileCreateIn used InterestedIn, which used typing import List[str], which creates a list of strings)


typing import List
- This is a class-based object and you can get access to dictionary attributes by using the dot.notation ("object.name" format)


cursor.fetchone() returns a tuple, but we turned it into a list so we could append to it in our for loop.


## June 3, 2022
* Interested table joined 
Today, Andrew and I implemented the interested table into the all of the profile api endpoints (detail, list, and update). 

In the update_profile function in db.py, we used a for loop and if statements to update our interested table. 

Today I learned that cursor.fetchall() returns a list with tuples inside. I am also understanding more how to debug FastAPI with print statements. 


## June 6, 2022
* User authorization 
Today, Curtis helped us implement user authorization into our front and back-end.

* Table drafts
Today, we drew out the liked, matched, and chat tables so we can begin creating the functions for them. 

Today, I learned about hashed_passwords! 

## June 7, 2022
* Swiped functions
Today, Andrew and I worked on the swiped functions, which runs when a user is liked or disliked. 

If the active_user (Betty) likes the target_user (Troy), then liked=True will be inserted into the liked table. Then we will select to see if the target_user (Troy) is in the liked table as an active user and see if Troy (now active_user) liked Betty (now target_user) back. If Troy liked Betty back, then we will insert them into the matched table and delete them from the liked table. If Troy does not like Betty back (liked=False) OR if Troy has not swiped on Betty, then Betty's like will stay in the liked table. 

If the active_user (Betty) disliked the target_user (Troy), then liked=False will be inserted into the table. 

* Matched list
Today, Andrew and I worked on the function to show a list of matches for the Connections page. Andrew worked on the db.py while I worked on profiles.py in routers/models. 

Today, I had more practice with SQL and debugging. I am getting a better understanding and feeling more comfortable with FastAPI and able to debug with a lot of print statements! 

## June 8, 2022
* Random filtered profile for the Connections page
Today, Andrew and I worked on the random profile function, which will show a random profile to the user that fits its preferences and the preferences of the targeted user match the current user. 
We began by pseudocoding our thoughts and then implemented each cursor.execute one by one.
We were not able to figure out how to do this while joining tables since we needed every table in our database. We needed to access the Matches, Liked, Profile, and Interested table to be able to filter for our connections page. 

We accomplished this by:
1. Creating an Exclusion list, which contains the ids of profiles that we do not want to see in our Connections page. 
    - our id
    - profiles we have matched with 
    - profiles we have already liked or disliked 

2. Creating a Possible Connections list, which contains the ids of profiles that we might possibly want to see in our Connections page. With each cursor execute, this list will get smaller and smaller as we continue to filter. 
    - We created a list of the current user's gender preferences 
    - We filtered the profile ids where the targeted user's gender had to be in the current user's gender preferences AND if they are not in the exclusion list 
    - We filtered the profile ids where the current user's gender had to be in the targeted user's gender preferences.

After all this filtering, it returned a list of profile ids, where the current user and targeted user could form a possible connection. 

3. We then returned a detail page of a profile that is in the list we created and it would be randomized. 

Today, I learned about how to use a list as the placeholder for %s in the WHERE clause. I'm not exactly sure how it works, since %s only takes in strings and I can't seem to find any documentation about it. But when we added any(%s), then it was able to accept the list to be entered as the %s. 

"It is a formatted string, where %s is a placeholder."