In the journals, every day that you work on the project, you must make an entry in your journal after you've finished that day. At a minimum, you will need to include the following information:

- The date of the entry
- A list of features/issues that you worked on and who you worked with, if applicable
- A reflection on any design conversations that you had
- At least one ah-ha! moment that you had during your coding, however small

## May 27, 2022
Today, we created our sql server to get ready for fastAPI endpoints.

## May 31, 2022
Today I added react capabilities in preparation to be able to create the front-end portion of the app, we refactored the database to be more organized by splitting them into separate sql files. Also got the list all profile endpoint to post 200 but had to edit out the page functionality for it to work. Will revisit that tomorrow to try and implement it.

## June 01, 2022
Got the rest of the Profile API's to work. Had to comment out the validation response for the PUT because it was throwing errors despite the edits going through. 

## June 02, 2022
Today, we added a interested table that tracks a user's gender preference in a partner. The interested table is linked to the profile table through the profile id. Also updated the post profile code to add user preference when creating an account. 

We did this by creating a for loop after creating profile so we can have the profile id. Then in the for loop for every selection of gender preference, we would insert that into the interested table. We would return the profile with the appended preferences back to the router for the API response.

We ended up using the typing import List suggested by Chris to create a list of strings that capture user preference. TIL that when using that variable, it's a class object so anything you want to call in has to be "object.name" format.

## June 06, 2022
Curtis helped with our accounts implementation so that the active user_id is applied to sql queries. Implemented it with our list all profiles view so user cannot see themselves when making that http request. Goal is to get that implemented to the other post requests and then create functions to manipulate the match tables.

## June 07, 2022
Today we finally implemented the like/dislike functionality on the backend. When a user selects like, it will set the like to TRUE and check if the person they like also likes them back. If they do, it will insert into the match table the both of them and then delete them from the liked table.

The dislike does the same except only add FALSE to the like. it does not check

## June 08, 2022
Today, we created a random profile function that's similar to profile detail view but also includes the logic to filter based on if the profile is not in a match, in a liked table, and both users are within each other preferences. 

## June 09, 2022
Today, we fixed an error in the random profile function so now it works 100% and returns what is expected. Also started on the ratings. Can now post a rating and created a function that returns the average rating that can be implemented to the views that we have already. May need to create the chat function depending on the outcome of chat hook.

# June 10, 2022
Today, we added the rest of the ratings for the match list display as well as on on profile detail view. We still need to figure out where a user can rate another user.

# June 13, 2022
Started working on combining the websocket chat function that Jeremy worked on together with our database so that we can store the messages being sent. I didn't get an opportunity to test it out yet but I'll be able to debug it more tomorrow.

# June 14, 2022
Today we decided to scrap the websocket for the chat function and instead go a safer route that we were more familiar with. Given the time crunch we decided this was the best path moving forward. With that decided, we were able to use the Post request that we created yesterday as well as create the get response for a list of chats. On the SQL side, we got not only a list but also the user's profile image and first and last name along with the chat information. The chat's displayed only the most recent message and that was done by sorting the list of ID's by descending order and only showing one.

# June 15, 2022
Today created detail view of chats so a user will be able to see all the messages sent and received between them and an individual. Also began work on the frontend. Today, given the limited amount of time, I started working on the connection list ratings so that instead of displaying a float, it will instead show icons based on the average rating. Any number between two whole numbers, if above .5 will be displayed as a half filled heart. It's not fully implemented at the time of writing this journal but I hope to accomplish it by the end of tomorrow.