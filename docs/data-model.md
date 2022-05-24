# Data models

## Profile

| Name | Type | Unique | Optional |
|-|-|-|-|
| name | string | no | no |
| city | string | no | no |
| age | int | no | no |
| height | float | no | no |
| photo_url | string | no | yes |
| about | string | no | yes |
| job | string | no | yes |
| education | string | no | yes |
| gender | string | no | no |
| sexual_orientation | string | no | no |
| religion | string | no | yes |
| pronouns | string | no | no |
| ethnicity | string | no | no |
| Review | reference to Review entity | no | yes |

the `Profile` entity contains the data of a user that can contain a many reviews or none at all


## Meet up

| Name | Type | Unique | Optional |
|-|-|-|-|
| location_name | string | no | no | 
| profile one | reference to Profile entity | no | no | 
| profile two | reference to Profile entity | no | no | 
| city | string | no | no |
| state | string | no | no |
| date | date | no | no |
| time | time | no | no | 
| picture_url | string | no | yes |
| weather | string | no | yes | 

The `meet_up` entity contains the data about a location that a meet up can be held at between two profiles. 


## Review


| Name | Type | Unique | Optional |
|-|-|-|-|
| profile of reviewee | string | yes | no |
| star rating |integer | yes | no |
| description |string | yes || no |
| profile reviewer | string | yes | yes |
| date of review | date | yes | no |

the `Review` entity will contain data pertaining to the profile of a reviewer and a reviewee along with some adition information including a character field a date attirubute and a system of scoring them via a star system