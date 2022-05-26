# APIs

## Create a new profile
* **Method**: `POST`
* **Path**: /api/profile

Input:
```json
{
    "name": string,
    "city": string,
    "age": int,
    "height": float,
    "photo_url": string,
    "about": string,
    "job": string,
    "education": string,
    "gender": string,
    "sexual_orientation": string,
    "religion": string,
    "pronouns": string,
    "ethnicity": string, 
}
```
Output:
```json
{
    "id": int,
    "name": string,
    "city": string,
    "age": int,
    "height": float,
    "photo_url": string,
    "about": string,
    "job": string,
    "education": string,
    "gender": string,
    "sexual_orientation": string,
    "religion": string,
    "pronouns": string,
    "ethnicity": string, 
}
```

Creating a new profile uses user input to specify their details. It returns all the information along with the new database id.





## Update a profile
* **Method**: `PUT`
* **Path**: /api/profile/<int:pk>/

Input:
```json
{
    "name": string,
    "city": string,
    "age": int,
    "height": float,
    "photo_url": string,
    "about": string,
    "job": string,
    "education": string,
    "gender": string,
    "sexual_orientation": string,
    "religion": string,
    "pronouns": string,
    "ethnicity": string, 
}
```
Output:
```json
{
    "id": int,
    "name": string,
    "city": string,
    "age": int,
    "height": float,
    "photo_url": string,
    "about": string,
    "job": string,
    "education": string,
    "gender": string,
    "sexual_orientation": string,
    "religion": string,
    "pronouns": string,
    "ethnicity": string, 
}
```

Updating a new profile uses user input to specify their details. It returns all the information along with the new database id.





## List of profiles
* **Method**: `GET`
* **Path**: /api/profiles

Output:
```json
{
    "id": int,
    "name": string,
    "city": string,
    "age": int,
    "height": float,
    "photo_url": string,
    "about": string,
    "job": string,
    "education": string,
    "gender": string,
    "sexual_orientation": string,
    "religion": string,
    "pronouns": string,
    "ethnicity": string, 
}
```
List of profiles

## Create a date/meet up
* **Method**: `POST`
* **Path**: /api/date

Input: 
```json
{
    "location_name": string,
    "profile_one": string,
    "profile_two": string,
    "city": string,
    "state": string,
    "date": date,
    "time": time,
}
```

Output: 
```json
{
    "id": int,
    "location_name": string,
    "profile_one": string,
    "profile_two": string,
    "city": string,
    "state": string,
    "date": date,
    "time": time,
    "picture_url": string,
    "weather": string
}
```

Creating a new meet up uses the incoming city and state data to query an image API to get a URL for an image for the location. This action also uses the incoming date, time and location to get an URL for the weather data for the location. It will save the data to the database and returns all the data with the new database id. 


## List of dates/meet up locations
* **Method**: `GET`
* **Path**: /api/date


Output: 
```json
{
    "id": int,
    "location_name": string,
    "profile_one": string,
    "profile_two": string,
    "city": string,
    "state": string,
    "date": date,
    "time": time,
    "picture_url": string,
    "weather": string
}
```

A list of meet ups. 

## Update a date/meet up
* **Method**: `PUT`
* **Path**: /api/date/<int:pk>/

Input: 
```json
{
    "location_name": string,
    "profile_one": string,
    "profile_two": string,
    "city": string,
    "state": string,
    "date": date,
    "time": time,
}
```

Output: 
```json
{
    "id": int,
    "location_name": string,
    "profile_one": string,
    "profile_two": string,
    "city": string,
    "state": string,
    "date": date,
    "time": time,
    "picture_url": string,
    "weather": string
}
```

Updating a meet up uses the incoming city and state data to query an image API to get a URL for an image for the location. This action also uses the incoming date, time and location to get an URL for the weather data for the location. It will save the data to the database and returns all the data with the new database id. 


## Delete a date/meet up
* **Method**: `DELETE`
* **Path**: /api/date/<int:pk>/

Deletes a date/meet up.

## Create a review
**Method**: 'POST'
**Path**: /api/review/

Input:
```json
{
    "person_reviewed": str,
    "star_rating": int ,
    "name_of_reviewer": str,
    "date_reviewed": date,
    "description": str
}
```
Output:
```json
{
    "id": int,
    "person_reviewed": str,
    "star_rating": int ,
    "name_of_reviewer": str,
    "date_reviewed": date,
    "description": str
}
```

A review can be created once a certain time limit has been met that we feel will have allowed users to get to know each other and then once a review can be created one can leave a review that will be put onto the profile of the user indicating their general feelings and how their interactions went 


## List of reviews 
**Method**: 'GET'
**Path**: /api/reviews/<int:pk>/

Output:
```json
{
    "id": int,
    "person_reviewed": str,
    "star_rating": int ,
    "name_of_reviewer": str,
    "date_reviewed": date,
    "description": str
}
```

A list of reviews for a specific profile

## Delete a review
**Method**: 'DELETE'
**Path**: /api/review/<int:pk>/

Deletes a review

## Update a review
**Method**: 'PUT'
**Path**: /api/review/<int:pk>/

Input:
```json
{
    "person_reviewed": str,
    "star_rating": int ,
    "name_of_reviewer": str,
    "date_reviewed": date,
    "description": str
}
```
Output:
```json
{
    "id": int,
    "person_reviewed": str,
    "star_rating": int ,
    "name_of_reviewer": str,
    "date_reviewed": date,
    "description": str
}
```
Updates a review.


## Create a user
**Method**: 'POST'
**Path**: /api/user/

Input:
```json
{
    "email": str,
    "username": str,
    "date_of_birth": int ,
    "password": str,
}
```
Output:
```json
{
    "email": str,
    "username": str,
    "date_of_birth": int ,
    "password": str,
}
```

Creating a new user uses the input to specify their details. It returns all the information along with the new database id.

## Update a user
**Method**: 'PUT'
**Path**: /api/user/<int:pk>

Input:
```json
{
    "email": str,
    "username": str,
    "date_of_birth": int ,
    "password": str,
}
```
Output:
```json
{
    "email": str,
    "username": str,
    "date_of_birth": int ,
    "password": str,
}
```

Updates an existing user.

## Delete a user
**Method**: 'DELETE'

Deletes an existing user.