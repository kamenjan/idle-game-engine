idle-game-engine 

Idle game engine built using React. 

React is a perfect fit for developing persistent browser and mobile based games that utilize fast paced updates to UI. Virtual DOM improves on rendering performance and Redux makes handling data state transparent and testable. 

tags: react, idle, incremental

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

My initial specifications included multiplayer functionality and dedicated server, which proved to be a serious backend endeavour. I've implemented custom server-client NTP that can be found in the 20190108_backend_based_client branch. Server is located in own repository at idle-game-engine-server. It is built on top of node and includes an elegant authentication layer and some nice postgres hooks - for further reference.

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

### 2. Implement Redux

State will be plentiful and often refactored. To make it manageable and scalable I'm using Redux from the get go. Redux is a powerful beast - it can really minimize code by avoiding convoluted state path from top component down the component tree and by reducing number of smart components. It can also be used to track and handle applications routing/navigation and make it easy to reason about application logic. It has a vibrant little ecosystem with a lot of ease of use extensions and plugins.

Essentials:
- [react-redux](https://github.com/reduxjs/react-redux/blob/master/docs/api.md)
    - Provider
- [redux](https://github.com/reduxjs/redux)
    - [connect](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connect) for seamless react integration via redux's state and dispatch to react's props functionality
        - [react-redux-connect-explained](https://www.sohamkamani.com/blog/2017/03/31/react-redux-connect-explained/)
    - [combineReducers](https://redux.js.org/api/combinereducers) self explanatory 
    - [applyMiddleware](https://redux.js.org/api/applymiddleware) this seems like a powerhouse, research redux middleware concept
    - redux-thunk and redux-promise for handling async data
- [react-router](https://github.com/reduxjs/react-redux/blob/master/docs/api.md)
    - Represent application router and routing as a part of redux state 
        - [react-router-redux](https://github.com/reactjs/react-router-redux) is deprecated. Functionality has been implemented in [react-router](https://github.com/ReactTraining/react-router) package. So we got that going on for us, which is nice. But is it also a part of react-router-dom?
        - [Redux docs](https://redux.js.org/advanced/usagewithreactrouter) on usage with React Router.
- [redux testing](https://redux.js.org/recipes/writingtests)
    - tools like **deepFreeze** & **expect**        
- redux dev tools
    - [redux-devtools](https://github.com/reduxjs/redux-devtools)
    - [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) browser extension
    - they both seem a bit outdated, research
    - [chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
    - [redux-promise-middleware-times](https://www.npmjs.com/package/redux-promise-middleware-times)

#### 3. Define application states (defines, runtime, save)
                
                
#### 6. Implementing initialization mechanics and game loop    

loading()
    get game defines // resources, generators, settings
    if (save)
        timeDelta = save.lastUpdated
        for.defines.resources
            ui.resource.CurrentValue = save.resources[tmp.resource.id].base                 
            for.defines.generators
                if (tmp.generator.productionRate.resourceId == tmp.resource.id)
                    productionRate = defines.generators[tmp.generator].productionRate * save[tmp.generator.id].count
                    difference = (now.fullSecond - save.lastUpdate.full_second) * productionRate
                    ui.resource.CurrentValue += difference
    - if (!save)
        save.resources = []                   
        for.defines.resources
            // also set id
            save.resources[tmp.resource].base = 0
            save.resources[tmp.resource].unlocked = tmp.resource.unlocked
        save.generators = []
        for.defines.generators
            // also set id
            save.generators[tmp.generator].count = 0
        save.capacitors = []     
        for.defines.capacitors
            // also set id
            save.capacitors[tmp.capacitor].count = 0                
        settings = []
        for.defines.settings
            save.settings.(tmp.setting.key) = tmp.setting.value 
        save.game.lastUpdate = Date.now()              
        - modifications to initial game defines for purposes of ui state (count, currentValue, ...)
        - save()
    - initialize gameLoop()     
    
gameLoop() // auto-correcting interval that happens every 100 ms
    - ui.currentValue: ui.currentValue + (productionRate/10)
    - if (save.lastUpdate > 15 000ms)  
        save()
        
save()
    - save.base: ui.currentValue // resources
    - save.count: ui.count // generators & capacitors
    - save.lastUpdate: date.now
        
#### 7. user interface

ui rough functions:
    - add X of Y resource //click
    - add X ( generator || capacitor )
    - upgrade / modify multiplier
     
