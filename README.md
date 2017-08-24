# PositiveNews - Think Positive, Be Positive, Read Positive

Web app that lets users leave comments on the latest positive news. Flexing Mongoose and Cheerio muscles to scrape news from https://www.positive.news/. 

![PositiveNews](http://i.imgur.com/zBd6P1k.gifv)

##  Technologies and Framework:
* Node.js and Express
* MongoDB
* Handlebars

1. Whenever a user visits your site, the app will scrape stories from a news outlet of your choice. The data should at least include a link to the story and a headline, but feel free to add more content to your database (photos, bylines, and so on).
2. Use Cheerio to grab the site content and Mongoose to save it to your MongoDB database.
All users can leave comments on the stories you collect. They should also be allowed to delete whatever comments they want removed. All stored comments should be visible to every user.
3. Uses Mongoose's model system to associate comments with particular articles.