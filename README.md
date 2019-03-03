# ReactCoreTemplate
Example for .Net Core + React + Redux + Typescript + Server Rendering + Code Split + Scss  
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

## Rewire Overrides
[react-app-rewired](https://github.com/timarney/react-app-rewired]) for override react-script default config.  
currently used for:
- apply typescript alias
- override config to generate server bundle
  
## SCSS Typing
css-module typing is a marjor problem for using typescript, so I used a helper library to do it.  
[typed-scss-modules](https://github.com/skovy/typed-scss-modules) for generate scss.d.ts files to use for css module.   
generate typing files use:
```
npm run scss
```
watch scss file changes auto-generate use:
```
npm run scss:watch
```
  
## Server Side Rendering
because this project used .net core to follow that we need to create a separated bundle for server, which current react-script does not support, so I did some hack
  
build in server mode when pass ``--server`` in ``react-app-rewire build``, the bundle will be built in server mode.  
  
postbuild scripts to move the files from ``build`` to ``dist`` to avoid file clean up by second run of react-script.  

``server.tsx`` uses ``aspnet-prerendering`` as interface wrapper for .net core use
  
## Redux Creator
[redux-creator](https://github.com/JiarongGu/banbrick-redux-creator) is a library I created for redux code-spliting, and also used for ssr. It will gives a simpler use for redux, also ``processLocationTasks`` and ``getEffectTasks`` to ensure the data is completely loaded when rendering server html.
