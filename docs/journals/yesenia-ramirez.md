## **Yesenia's Daily Journals** 

---

## May 27, 2022
* App name and logos

    - We came up with our app name and designed some logos as options for our website.

* Docker and sql files
 
    - I live shared on VSCode and we all completed our Dockerfiles, requirements.txt, and sql files to be able to create a table in our database. We had some guidance from Shawn and Jeff to get our sql file running. 

* What did I learn: 
    - Today, I learned that I need to remove our database volume and recreate it when changing our database and to use single quotes instead of double quotes in our sql file. 

---

## May 31, 2022
* Sql files refactored 

    - We created a postgres directory in our data directory where we separated our sql file into separate files. We had some troubleshooting we needed to do with our database ownership. 

* Profile endpoints

    - We worked on a get request for a list of all our profiles. I coded the db.py and helped set up the directories. We had to troubleshoot as we were getting a 500 internal server error. We found that our page functionality was not working, so we edited that out for now and will work on that tomorrow. We also had to add Optional to our photo property in our model as that was causing an issue with the data since the photo was set to Null. I am doing research to see if using Union is better than using Optional. 

* What did I learn: 
    - Today, I learned that adding Optional to a property in our model will allow us to have Null in our data. 

---

## June 1, 2022
* Profile API endpoints

    - Andrew and I worked on the backend. Andrew worked on db.py while I worked on the profiles.py in the routers directory. We completed our delete endpoint and two update endpoints (profile and account info). 

* Email 
    - I added an email property to our database. 

* What did I learn: 
    - Today, I learned how important indexes are when returning our input as a dictionary. The indexes in our row_to_profile functions need to match the order we are returning the properties in the db.py update function. 

    - I also learned the role of our models and how the In vs Out models differ. Our In model needs to match the data we are inputting and the Out model needs to match the data that will be returned. And the Out models will include an id property.

    - Also, I learned a new way to debug when having a problem with our response model by commenting out our response model, row_to_profile return statement and except statement. This allows us to have a better idea where the problem is since we can return a single row and check if our indexes are in the correct order and we are returning the correct information. We can then uncomment out one thing at a time until our function is working perfectly. 

---

## June 2, 2022
* Interested table

    - Today was a day! We brainstormed how we were going to filter out profiles for a user. We had trouble thinking about how to create our sql table to have our user pick what gender they are interested in. 
    - Andrew and I created the interested table and data.

* Interested table and creating a profile

    - When a user creates their profile, they are able to choose their preferences of gender. We did this by joining the profiles table with the interested table in the insert table function. We also used List by importing it from typing into our base model. Andrew created a for loop inside the insert table function and I created the base models and adjusted the router functions. 


* What did I learn: 
    - The steps executed in an API call using FastAPI: 
        1. Our insert_profile function (db.py) arguments are from..
        2. what is inputed into our create_profile function (routers>profiles.py) with the model ProfileCreateIn (models>profiles.py) specifying the data type.
        - (For creating a profile ProfileCreateIn used InterestedIn, which used typing import List[str], which creates a list of strings)

    - typing import List
        - This is a class-based object and you can get access to dictionary attributes by using the dot.notation ("object.name" format)


    - cursor.fetchone() returns a tuple, but we turned it into a list so we could append to it in our for loop.

---

## June 3, 2022
* Interested table joined 
    - Today, Andrew and I implemented the interested table into the all of the profile api endpoints (detail, list, and update). 

    - In the update_profile function in db.py, we used a for loop and if statements to update our interested table. 

* What did I learn: 
    -   Today I learned that cursor.fetchall() returns a list with tuples inside. I am also understanding more how to debug FastAPI with print statements. 

---

## June 6, 2022
* User authorization 
    - Today, Curtis helped us implement user authorization into our front and back-end.

* Table drafts
    - Today, we drew out the liked, matched, and chat tables so we can begin creating the functions for them. 

* What did I learn: 
    - Today, I learned about hashed_passwords! 

---

## June 7, 2022
* Swiped functions
    - Today, Andrew and I worked on the swiped functions, which runs when a user is liked or disliked. 

    - If the active_user (Betty) likes the target_user (Troy), then liked=True will be inserted into the liked table. Then we will select to see if the target_user (Troy) is in the liked table as an active user and see if Troy (now active_user) liked Betty (now target_user) back. If Troy liked Betty back, then we will insert them into the matched table and delete them from the liked table. If Troy does not like Betty back (liked=False) OR if Troy has not swiped on Betty, then Betty's like will stay in the liked table. 

    - If the active_user (Betty) disliked the target_user (Troy), then liked=False will be inserted into the table. 

* Matched list
    - Today, Andrew and I worked on the function to show a list of matches for the Connections page. Andrew worked on the db.py while I worked on profiles.py in routers/models. 

* What did I learn: 
    - Today, I had more practice with SQL and debugging. I am getting a better understanding and feeling more comfortable with FastAPI and able to debug with a lot of print statements! 

---

## June 8, 2022
* Random filtered profile for the Connections page
    - Today, Andrew and I worked on the random profile function, which will show a random profile to the user that fits its preferences and the preferences of the targeted user match the current user. 
    - We began by pseudocoding our thoughts and then implemented each cursor.execute one by one.
    - We were not able to figure out how to do this while joining tables since we needed every table in our database. We needed to access the Matches, Liked, Profile, and Interested table to be able to filter for our connections page. 

* We accomplished this by:
    1. Creating an Exclusion list, which contains the ids of profiles that we do not want to see in our Connections page. 
        - our id
        - profiles we have matched with 
        - profiles we have already liked or disliked 

    2. Creating a Possible Connections list, which contains the ids of profiles that we might possibly want to see in our Connections page. With each cursor execute, this list will get smaller and smaller as we continue to filter. 
        - We created a list of the current user's gender preferences 
        - We filtered the profile ids where the targeted user's gender had to be in the current user's gender preferences AND if they are not in the exclusion list 
        - We filtered the profile ids where the current user's gender had to be in the targeted user's gender preferences.
        - After all this filtering, it returned a list of profile ids, where the current user and targeted user could form a possible connection. 

    3. We then returned a detail page of a profile that is in the list we created and it would be randomized. 

* What did I learn: 
    - Today, I learned about how to use a list as the placeholder for %s in the WHERE clause. I'm not exactly sure how it works, since %s only takes in strings and I can't seem to find any documentation about it. But when we added any(%s), then it was able to accept the list to be entered as the %s. 

    - "It is a formatted string, where %s is a placeholder."

---

## June 9, 2022
* Random filtered profile fixed
    - Today, Andrew and I realized that the function we worked on yesterday was no longer working. Our exclusion list was not filtering out of our potential connections list. We realized that the id != ANY(%s) we used yesterday was no longer working. So we debugged with the help of Chris, Mitch and Jeff and figured out that we had to use NOT id = ANY(%s) instead. 

* Rating functions
    - Andrew and I worked on the creating a rating and getting the average of someone's ratings. 

* What did I learn: 
    - Today, I learned that what you google is important in the results that you get. I was quickly able to find a solution to our problem when I googled the correct search terms. Also, Andrew taught me how to get the average in sql. 

---

## June 10, 2022
* Rating implemented into random filtered profile
    - Today, Andrew and I included our rating feature into our profile detail and connections page. This will show the profile's average rating. 

* Front end help
    - Andrew and I helped with the front end today. Jeremy was working on our websockets for the chat and he wanted to mess with it more before we were able to start on the back end. 
    - I added the rating average to the connections page and started working on a bug in our update profile for when someone chooses their gender preferences.  

* What did I learn: 
    - Today, I learned how to create a function outside of the React component so it can exported and be implemented in different components. Thanks to Curtis. I also saw how Curtis guided us on how to have the profile details fetched before our chat started connecting. 

---

## June 13, 2022
* Websockets back end
    - Today, we were not able to accomplish much in the two hours. We are having bugs and issues trying to think of how to use websockets. But it is a work in progress. Hopefully better luck tomorrow.

* Null photo
    - I added a gray person outline photo when a person does not have a photo uploaded so the broken link will not show to the front end. This will be on the connections page, explore and profile page. 

---

## June 14, 2022
* Message list and create 
    - Today, Andrew and I created the get function to get a list of the top 3 most recent messages for the user and a post function to have a user send a message. Given the time we have left to work on the project and our knowledge of websockets being so small, we have decided to go use FastAPI to implement our messaging feature. 

* What did I learn: 
    - Today I learned how to ORDER BY id DESC in PostgreSQL and was reminded that I needed to include my messages router into main.py! I had forgotten about that. 

---

## June 15, 2022
* List view for messages for a specific conversation
    - Today, Andrew and I worked on getting the last function we needed for our messages to be complete. We made a list view for a specific conversation. 

* Nav bar
    - I changed the nav bar where a user had to be signed in in order to see certain nav bar links. 

* Ratings average shown as stars
    - Andrew started working on showing the stars for the rating and I finished it. Teamwork!!

* What did I learn: 
    - Today, I had more practice with making a function and exporting in React to another file. 

---

## June 16, 2022
* Front end message detail 
    - Today, worked on the front end, which was a nice break from the back end. I am in charge of doing the page for the conversation with a specific person. I was in the zone and about to do some if statements in my render to get the correct name to show next to the person who sent it, but I lost power. Sad.

* What did I learn: 
    - I had practice today fetching from multiple API endpoints today! I was able to keep it all in the componentDidMount instead of having 3 different functions.
    - I learned about using a grabber function to grab our target_id from the params and use that in component. 

---

## June 17, 2022
* Front end message list debugging
    - I helped Corey debug his message list as his photo link was not redirecting to the target user. It was redirecting to the last person who sent the message, which was not always the target user. We had to clean up his code and we eventually got it at the end by adding an if statement! 3 lines of code! 

* Front end message detail
    - I was able to get the right photo and name to pop up with the message that was sent with some if conditions. 
    - **<u>CHAT BOX DESIGN</u>**: I am super excited about this! I did some research and found how to design a chat box for my messages using bootstrap. I was able to figure out how to do the for loop inside the right div and needed to add some more if conditions to have the message designed the way it needed to be depending on who sent the message. I still need to do touch ups for the sizing and also get the form to work, but I am so happy with what I have right now! 

* What did I learn:
    - Today, I learned more about bootstrap since I had a lot of practice with my chat box. Also, where to place my if statements in react! 

---

## June 20, 2022
* Chat box form 
    - I was able to figure out how do a POST request for our chat! I had to add fix the date and time, add the recipient and the credentials for it to submit properly. 
    - I had problems with it refreshing after it was submitted and Andrew came and helped me with that and also getting the date and time to show up correctly on the chat. 
    - We are not able to get it to refresh when another user sends a message, but this will be a stretch goal. 

* Message list display
    - Andrew and I formatted the message list with bootstrap so it can be displayed nicely. 

* Rating form 
    - Andrew and I started working on the connections detail page to get the rating form to work. We want to implement the rating to be done with hearts so we were having trouble with that. We decided to come to a stopping point since it was getting late and will work on this tomorrow. 

* What did I learn: 
    - Today, I learned how to refresh the page without having to do a reload window function. When the post was successfully submitted, we fetched the data again so it would update. 

---

## June 21, 2022
* Rate button
    - This morning I had to add to the backend to show a list of user's ratings so I could implement when to show the rate button. 
    - On the front end, I had to do some if statements so if a user has already rated a profile, then the rate button would disappear and would show a thank you message. 

* Profile form
    - Today, Andrew and I worked on fixing the height and interested inputs when a user updates their profile. We had to mess around with the interested to get it to show up the way it was expecting it in the backend. We had to make it into a list, then a dictionary and then our form was working! 

* Messaging timer for fetching  
    - Curtis helped us add a timer to fetch our messages so it can update when the other user sends a message. We added the timer to our componentDidMount and getMessages function. 

* Upload photos
    - Andrew and I started looking into how to upload photos. Curtis gave us a tip to use Amazon S3 and we started implementing the code but were having issues. We will tackle this tomorrow. 

* What did I learn: 
    - Today I learned how to set a timer to fetch data for us.
    - Also I had practice with manipulating how data is sent in the fetch request. 

---

## June 22, 2022
* Photo upload
    - Today, Curtis helped us figure out how to implement the back end of uploading photos. Once we figured out Amazon S3, then Andrew and I were able to use our FastAPI skills to do the rest. 
    - Front end: we had so much trouble with this. Mitch helped us to make the data into FormData and that is how we were able to upload our photo from the front. The image data we needed was the name and file data so we also had to change the value in the JSX to file instead of text. 

* Sign-up form
    - We added a redirect to the login page after someone creates an account. This took us a while to figure out as we needed to have redirect in the state and set it to false. Once the handleSubmit went through and the response was okay then we set the redirect to true. In the render, we then navigated to the login page if redirect was true. 

* Login form
    - We fixed a bug where when the show password button was being clicked on, it was reading as it being the submit button for the form. We fixed this by changing the type of the button to "button" instead of "submit". 
 
* Account form 
    - We noticed a bug where the user was not able to change their username as it was changing their token and logging them out, so we made it unavailable for a user to change their username. 
    - We also added placeholders in the input boxes to show their previous data since all the fields are required. Except for the password. 

* What did I learn: 
    - Today, I learned about redirecting in a class component. We could not use a hook, so we found a way around that. Now I know how to do it! 
    - Today was a lot of debugging, which is nice practice but also extremely exhausting. But I feel good that our project is now fully functional. 

---

## June 23, 2022