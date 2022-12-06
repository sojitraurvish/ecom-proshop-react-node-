 npm install == yarn
 npm install package --save == yarn add package
 npm install package --save-dev == yarn add package --dev
 npm uninstall package --save == yarn remove package
 npm update --save == yarn upgrade
 npm install package -g == yarn global add package


npm init
npm init -y // for default configration

npm install <pkg>
npm install --save-dev <pkg>
npm i <pkg>

npm install -D <pkg>
npm install -dev <pkg>
npm i -D <pkg>
npm install -dev <pkg>

npm install -G <pkg>
npm install --global <pkg>
npm i -G <pkg>
npm install --global <pkg>

install=i
uninstall=uni 


what is create-react-app?
//create-react-app is tool that build a brand new react project with necessary files and settings.

what is npx?
npx is a tool that gets included with npm version five point two and greater

//Before npx with npm we use to install any dependency globally or locally on computer
-> npm i -g create-react-app <name of app> 
-> npx create-react-app <name of app>
// But with npx it install package execute it same time and immediately delete it from disk

//EX:...with npm
    npm i cowsay
    cowsay hello

with nox 
    npx cowsay hello


npm i -g cowsay
npm list -g cowsay
npm list // This command is used to see where that 

Adding sass using npm: npm install node-sass --save.
Adding sass using yarn: yarn add node-sass.


NOTE - whenever props,state changes react will rerender entire functional component
//functional component hooks in react
useState -> whenever state changes i will rerender entire functional component
useEffect -> very first when functional component run react execute code inside useEffect hock And it also take array as second argument and whenever the value of every single element in array changes react will rerender entire functional component 
useEffect -> and whatever function we create and return from useEffect hook that will call or return when application get close   

useContext -> whenever content changes or when we set new value for context it will rerender all the component that uses use context to get value 

Note -> React is smart enough while rerendering dom first it check that any modification in component or just update in text so it will just modify text rather than rerendering hole component

import { useNavigate } from "react-router-dom";//cart-dropdown.component
// useNavigate hook is used to create navigation link kind 

useParams //hook to gat date from url parameters //category.component

styled-component //css js library see file navigation,button,cartdropdown,cartIcon,directoryItem,form-input
one more is emotion style

the difference between Context and redux(global state management) will always wrap the entire app with 

redux (global store)
redux -> allows us to interact with reducers that produce the root reducer which produce the store
yarn add react-redux -> which gives us all react binding so that we can dispatch and pull this store values of redux
yarn add redux-logger -> this is little tool that help us to understand how actions are firing and what's happening with state 

// Redux Persist
// Now another bandit we get from redux is actually the ability to persist inside localstorage and it's technically doable as well inside of context but you have to write your own code to do so
// whereas inside of redux there is a very popular library called redux persist what is essentially allows us to do, really persist, is persist any of our local state into local storage on the web browser,meaning that every browser has access to this little slice of memory 
// we can actually commit any state changes that the user has to that local storage so that when they come back to their session they cna actually re hydrate this with their previous STATES , which means the application , if done correctly , the  state of the application is reflected by redux so that technically we can actually persist their cart throughout their journey let's say they leave and they come back or they refresh if we refresh right now , what we notice is that our cart goes back to zero , but we can actually persist this using redux persist
// SUMUP -> when we refresh page so our cart value gone so we to persist that values into localstorage through library called 

redux-thunk or saga or observeble do same work
redux-thunk -> is one flavor of asynchronous side effects inside redux *diagram see middleware folder img no 211 and 212 
what this mean is that we allow our application to fire action, and then those actions now do not flow through the redux diagram in asynchronous manner 
instead, now we get redux binding which means we can read form the store or we can dispatch new action within the actual middleware section of thin redux flow 
Redux-Thunk is itself a middleware it receive an action that are function

see screen shot 213
redux-saga -> is indeed a middleware but typically, with most middleware actions hit middleware before they hit the reducer
but saga is different the actions will actually hit the reducers first before moving on to the saga so in this case, it flows after the reducers have updated

if observeble than you choice redux args js or observeble


@stripe/stripe-js this is javascript library that lets you payment 
@stripe/react-stripe-js this library gives us the react element and react bindings so that we can interact with the stripe library inside of the react environment ub a significantly easier way


@type/redux-logger

typed-redux-saga // is library that infer type for genrator function of saga
--dev babel-plugin-macros //help for micro for babel

yarn add @types/styled-components

yarn add @apollo/client  // this package helps you to call garphql api
yarn add graphql


yarn add redux react-redux redux-thunk redux-devtools-extenstion