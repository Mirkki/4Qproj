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


Type of data: User-submitted star ratings
Purpose: To collect and display overall user satisfaction metrics.
JSON Structure:
{
  "ratings": [
    {
      "id": text-string,
      "user": text-string,
      "value": number(1-5),
      "timestamp": date
    },
    {
      "id": text-string,
      "user": text-string,
      "value": number(1-5),
      "timestamp": date
    }
  ]
}


Type of data: User-submitted comments
Purpose: To allow users to share detailed feedback and engage with others.
JSON Structure:
{
  "comments": [
    {
      "id": text-string,
      "user": text-string,
      "text": text-string,
      "timestamp": date,
      "replies": [
        {
          "id": text-string,
          "user": text-string,
          "text": text-string,
          "timestamp": date
        }
    },
    {
      "id": text-string,,
      "user": text-string,,
      "text": text-string,
      "timestamp":date,
      "replies": []
    }
  ]
}