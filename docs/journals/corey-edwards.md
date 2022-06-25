In the journals, every day that you work on the project, you must make an entry in your journal after you've finished that day. At a minimum, you will need to include the following information:

- The date of the entry
- A list of features/issues that you worked on and who you worked with, if applicable
- A reflection on any design conversations that you had
- At least one ah-ha! moment that you had during your coding, however small

## May 27, 2022
* App name and logos

We came up with our app name and designed some logos as options for our website 

* Docker and sql files

I was around to watch Shawn and Jeff masterfully help us get out dockerfiles up and running, during the creation of our table for the database as a group we decided we wanted some of our option for things such as gender, sexual orientation, religion, pronouns, and ethnicity we wanted to have dropdown functionality so i did the research cross referencing with other dating apps to fin what the best options are and have them logged for when we need to implement, and also as a team we were able to figure out an app name get some logos flying around undecided on final but we have some good options, and finished our requirements.txt 

## May 31, 2022

* SQL files

I was the official creator of the Profile Model inside of our API. We also refactored the database by splitting them into separate SQL files. Also we began the process of setting the profile endpoint in the API but this came with many issues so after tinkering for what felt like an eternity. This was eventually solved with the implementation of Optional from typing thankfully. We didn't get to finish setting the endpoint but we are left with good footing for tomorrow.


## June 1, 2022

* Nav Bar

So today was a very productive day and very stressful spent a lot of time refactoring and frankensteining the nav bar using css and bootstrap but i got it to where the logo takes you back to the home page, the nav bar color is color matched with the logo and the my profile is all the way on the right so good progress has been made i still need to fix the back end routes and clean up some things but we are on the right track

## June 2, 2022

* Back End processes

Today a large chunk of our day was spent regarding the processes and working in excalidraw and brainstorming ways that our matching process would work with the concepts of gender and sexuality and working out how we can do that and the creation of a new table and joining them with the profiles and connecting them with that they are vs what they are interested in seemed like the prevailing choice so we were able to do that together for our back end team to begin work on

* React

There wasnt much time left at the end of the day but i cleaned up some unneccesary files and changed some names around but we are working on getting it ready for when we can finally build individual pages 

## June 3, 2022
I spent time troubleshooting and planning back end functionality with the team

## June 6, 2022
Today we did our meeting with curtis and he showed us what he was able to help us do with the project which i know the entire team is incredibly grateful for i was able to move some functionality around to help better match our tables also cleaned up the login page and troubleshooted it when thing inevitably went wrong 


## June 7, 2022
Quite the busy day if i do say so myself So we did a bit of troubleshooting all day because it wouldnt be code if i didnt have to put out fires every ten seconds. Thanks to curtis we were able to get the data push for a specific profile onto the my profile by creating a new api route through the back end.with the i was able to css it into submission which truly is a huge load off of my shoulders cause now that means the template is also done for the explore page which is a great two birds for one stone.

## June 8, 2022
Alright so im gonna go over this one very briefly so i implemented the profile settings, account settings, and the like button. The functionality on the like button took much longer than expected so ill have to do the dislike tomorrow but at least for the explore page the buttons are nice and circular and color coordinated. 

## June 9, 2022

Okay so today was kinda hectic one we were out to work i immediately got to work on the dislike button and my achilles heel was that i didnt bind the button at the top of the page but once i did it was smooth sailing. Also i was able to fix it so when a user uploaded a photo it actually used their photo on their profile... most of the time haha. Ill have to go back through and make sure it works for everyone but its a good start. The the last thing i did today was i figured out the way i have to import data into my connections page so i can show a list of matches so tomorrow morning ill be able to hit the ground running with getting our connections page taken care of.

## June 10, 2022

so today we had some reformating to do so i was able to create the connections page because of the data i was incredibly lucky to have gotten yesterday and with the my team and i all together went and changed the way the hight is displayed along with the age and we got the review score implemented so it was an incredibly productive day for us. Once we did that we didnt have enough time before mandatory fun so we came up with a list of stuff that we want to get accomplished before deployment so now we have goals in mind and are ready to tackle them the next time we meet.

## June 13, 2022

okay so we didnt get ot do much today but with curtis's help we were able to to figure out how to set out image in the connections list as button so now when i get to ill have it act as a way to see the details page for the profile that we click it... it honestly confuses me as to how to create a page as a template for multiple profiles to use but ill do my research and figure it out


## June 14, 2022

today wasnt nearly as productive as i wanted it to be i was having so many issues doing my onclick handler trying to get my connections page take me to a user profile and even with jeff helping me trying to figure out how i can redirect to the page of the user we want and i never got to actually implement anything useful but i have several leads 

## June 15, 2022

today was an excellent today piggybacking off of the ground work jeff and i laid out yesterday so we got extraordinarily close to cracking it wide open and so thanks to some help from curtis we had to move a line of code somewhere else than it was change link to Link and use some "magic" to have a hook use our class so we can pull the match id so i can access it inside my class components and go to the correct page so that is a big win for the team. Now we need to implement some chat functionality for the connections page and add the review form for the connectionsdetail and we are getting closer and closer everyday towards breaking this thing wide open

## June 16, 2022

alright so today we ended up getting a pretty good amount done today which was super nice. Not only was i there to help guide andrew and yesenia through react issues but with the combined effort we got our messagelist page to show the message, first and last name, and photo of a person who has sent them a message which links to a detail view of their chat history so we need to add more messages and then bootstrap it into submission but we are off to a great start for our first real day of messages front end 

## June 21, 2022

okay so today i had to play a little catch up. My team being the absolutely beasts that they are worked this weekend and i got caught up to speed with the changes made and im very grateful to them. Today i created a button on the connections page so that way they can go directly to messaging that person and also with the help of shawn we were able to make it look pretty... as long as it is full screened haha but thats something that we will be able to work on making pretty later. I also restructed the explore page so that way it would be scaleable with the buttons also being scaleable and i did some research and wrote my firsts tests for the testing the profiles section of our database. Overall good day at the end of the day i was helping my team go over our issues with the date not wanted to be submitted for the profileform it was really beating us but hopefully with the help of jeff we will be able to crack it and finally figure out why it was being sent out in the incorrect format

## June 22, 2022

today wasnt easy... today after getting the base of my tests done i was able to with the help of my fellow students and the instructors i decided to do the test for getting all profiles list and it was a hard fought battle but in the end we won cross referencing it with the database and the expected data and the routers making all of my dummy data i was able to make a test to see if i could get a list of profiles. Since that took all day i had a brilliant idea to do one with a post request to see if i can dummy like a profile. This can of works haunts my dreams much like the question mark pings of the docker terminal forever taunting me... Anyways regardless of the tinkering it remains unfinished. I got so upset i eventually just stayed with my team and did my best to help with the finishing touches profile, account, and sign up forms and ironing out the functionality of those before deployment.

## June 24, 2022

today was interesting to we did all of our deployment stuff of the back of what we did yesterday making sure everything was ready to go we went through deployment steps with curtis and got it deployedd onto heroku but the functionality of our app was virtually noexistent so thankfully curits posted in the live channel about how the deployment variant wasnt going to be a part of the grade so then we made a branch of an older non update version before we changed stuff around for the deployemtn did some git branching and git merging and after a slight bit of altering my old code ended up saving the day 