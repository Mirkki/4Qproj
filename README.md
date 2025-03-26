To make the user interaction and feedback on the website better,
two features will be added; a five star-rating system and a comment section.
These features will allow users to rate their experience (on a scale of 1-5) along
with a textual feedback, respectively. The data collected will be stored
on the server using JSON format.

For the rating system, users will click on one of five stars to submit
their rating. This data will be used to display an average rating on
the website, helping new visitors to view overall user satisfaction. The comment
section will enable users to post comments, which will be displayed according to who
the date they left the comment. Both features will be displayed into a dedicated
"Feedback" page, while the average rating may also appear on the homepage.

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



NOTE: click on "edit markdown" to view README.md better