## Introduction
A React web application called Jammming. It leveraged my knowledge of React components, state, and requests with the Spotify API to build a webpage that allows users to search the Spotify library, create a custom playlist, and then save it to their Spotify account.

Additionally this web app is deployed with Vercel at https://jammming-xi.vercel.app/


### Features
Spotify Login — the first time a user searches for a song, album, or artist, Spotify will ask them to log in or set up a new account. 

Search by Song, Album, or Artist — a user can type the name of a song, artist, or album into the search bar and click the SEARCH button. The app will request song data about the user's input from the Spotify library.

Populate Results List — Jammming displays the list of returned tracks from the user's query.

Add Song to a Custom Playlist — users can add a track to their playlist by selecting a + sign on the right side of the track's display container.

Remove Song from Custom Playlist — users can remove a track from their playlist by selecting a - sign on the right side of the track's display container.

Change Playlist Title — users can change the title of their custom playlist.

Save Playlist to Account — users can save their custom playlist by clicking a button called SAVE TO SPOTIFY.

### Resources
Because there was a focus on building the React infrastructure, Codecadamy provided links to the HTML/CSS and visual assets used for Jammming. However, they did not break the HTML and CSS into their components, and it was requirement of the project to create my own file paths and component structure.

### Conclusion
I enjoyed this challenging project. As my first deployed web app, there was a steep learning curve and much problem solving required along the way:

What components does the application need? How will the application handle state? What methods does the application need? How does the application hook up to the Spotify API? How does the application save a playlist to a user's profile?

Overall a sucessful first foray into React.
