# ReactCoreTemplate
Example for .Net Core + React + Redux + Typescript + Server Rendering + Code Split  
Using creat-react-app (react-script) with react-app-rewired  
  
hope this can help someone who is seeking for .net core + react

## Getting Started
This project is using .net core 2.2, please ensure you have the right sdk.  
https://dotnet.microsoft.com/download/dotnet-core/2.2

Run the complie in ClientApp before you start the .net core webapp
```
npm run build:all
```

The proxy for api to .net core using https port 5001 

  
## Something about this example
The example uses redux middleware with react-router-redux (can be replaced by the ConnctedRouter in utils folder),
to trigger a redux store update each time when the location change matches the condition.  
  
By using this way, the ServerRendering app can also get the data from api before it calls to the render string.  
