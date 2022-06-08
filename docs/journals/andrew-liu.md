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