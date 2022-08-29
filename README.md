# Test task for a Frontend intern to the Seller Experience team

Develop an interface for the [Hacker News](https://news.ycombinator.com/news) website, consisting of two pages.

## Product requirements
### Main page
- Shows the latest 100 news as a list sorted by date, most recent on top.
- Each news contains:
- title
- rating
 - author's nickname
 - publication date
 - By clicking on the news, you go to the news page
- The list of news should be automatically updated once a minute without user intervention
- The page should have a button to force the update of the news list
### News page
- Must contain:
  - link to news
  - news title
  - date
  - author
  - counter of the number of comments
  - list of comments in the form of a tree
- Root comments are loaded immediately upon entering the page, nested - by clicking on the root.
- The list of comments should be automatically updated once a minute without user intervention
- There should be a button on the page to force refresh the list of comments
- The page should have a button to return to the list of news

## Technical requirements

- Application developed using React and Redux
- Used [official Hacker News API](https://github.com/HackerNews/API). Hacker News API calls and data processing are made directly from the front-end (except if you do an optional task about Node.JS).
- Routing done using [React Router v5](https://github.com/ReactTraining/react-router/releases/tag/v5.0.0)
- Any UI framework of your choice (as an example [React Bootstrap](https://react-bootstrap.github.io/) or [Semantic UI](https://react.semantic-ui.com/)). You can even use bare CSS, the main thing is that it looks beautiful.
- `npm` package manager
- The application must be launched at `localhost:3000` with `npm start`
- After launching the application, all clicks on links do not reload the page
- The source code of the solution must be posted from your account on [Github](http://github.com/)

## Optional tasks
- Code coverage with unit tests
- Backend for hosting statics and API for encapsulating external requests in Node.JS
- Project build configuration in Docker image