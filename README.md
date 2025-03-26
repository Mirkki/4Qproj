To enhance user interaction and feedback on the website, 
two key features will be added: a star-rating system and a comment section. 
These features will allow users to rate their experience (on a scale of 1-5)
and leave textual feedback, respectively. The data collected will be stored
persistently on the server using JSON format.

For the rating system, users will click on one of five stars to submit 
their rating. This data will be aggregated to display an average rating on 
the website, helping new visitors gauge overall user satisfaction. The comment
section will enable users to post comments, which will be displayed chronologically.
Both features will be integrated into a dedicated "Feedback" page, while the average
rating may also appear on the homepage or a summary section.

{
  "ratings": [
    {
      "id": "unique-id-1",
      "user": "anonymous-or-user-id",
      "value": 4,
      "timestamp": "2023-11-20T14:30:00Z"
    },
    {
      "id": "unique-id-2",
      "user": "anonymous-or-user-id",
      "value": 5,
      "timestamp": "2023-11-21T09:15:00Z"
    }
  ]
}