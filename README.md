# ReactCoreTemplate
Example for .net core, React + Redux + Typescript + Server Rendering, hope this can help someone who is seeking for .net core + react

## Getting Started
This project is using .net core 2.2, please ensure you have the right sdk.  
https://dotnet.microsoft.com/download/dotnet-core/2.2

Run the complie in ClientApp before you start the .net core webapp
```
npm run build:all
```

The port for .net core is using 5000  
The port for ClientApp dev is 3000  
The proxy for api from 3000 to 5000  
  
  
## Something about this example
The example uses redux middleware with react-router-redux (can be replaced by the ConnctedRouter in utils folder),
to trigger a redux store update each time when the location change matches the condition.  
  
By using this way, the ServerRendering app can also get the data from api before it calls to the render string.  
  
  

## Something about the utils
The utils in the ClientApp is something I made just for convenience, which does something similar to redux-action,
and some other redux related helpers.

Added something call 'redux registry', to register redux events on the fly
