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