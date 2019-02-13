# ReactCoreTemplate
Example for .net core, React + Redux + Typescript + Server Rendering

## Getting Started
Run the complie in ClientApp before you start
```
npm run build:all
```

## Something about this example
The example uses redux middleware with react-router-redux (can be replaced by the ConnctedRouter in utils folder),
to trigger a redux store update each time when the location change matches the condition.

By using this way, the ServerRendering app can also get the data from api before it calls to the render string.


## Something about the utils
The utils in the ClientApp is something I made just for convenience, which does something similar to redux-action,
and some other redux related helpers
