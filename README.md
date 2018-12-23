Example client for persistent based/idle browser game.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Roadmap

### 1. Server-client time synchronization and time tracking [DONE]

I have written a higher order component `withServerSyncedTicker.js` that utilizes network syncing algorithm similar to [SNTP](https://en.wikipedia.org/wiki/Network_Time_Protocol#SNTP). A helpful discussion on [gamedev.stackexchange](https://gamedev.stackexchange.com/a/93662). Crude implementation is available as an [npm package](https://www.npmjs.com/package/timesync).

TODO: split in three component (by functionality)
 1. sync component
    - gets current game tick, current server time and client clock offset
 2. clock component
    - when offset changes it calculates server time
    - sets accurate interval that updates current time
 3. tick component
    - how do I solve it?
      1. ( (serverTime.now - firstTickTime) / tick.length)
        hard to make changes on the fly to tick length
      2. ask server for current ticker and do the calculations
      
      
TODO: solve timeout and interval updates to state (using thunk)
https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559

### 2. Write solid database integration with migrations and scripts  



### 3. Implement authentication layer

redux/react/auth nice guide:
http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#store-js

folder structure:
https://medium.com/front-end-weekly/the-three-pigs-how-to-structure-react-redux-application-67f5e3c68392



### 4. Use redux for handling application state

State will be plentiful and often refactored. To make it manageable and scalable
I will use redux in the earliest stage.
