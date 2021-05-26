# Electron Tryouts

Well, first link has nothing to do with Electron, but need to be mentioned:
Eyopener: https://github.com/kamranahmedse/developer-roadmap - SO COOOOOOOL!

## Alternatives

https://blog.logrocket.com/why-use-electron-alternative/
https://github.com/sudhakar3697/electron-alternatives
https://web.dev/progressive-web-apps/
https://github.com/zserge/lorca (GO)
https://github.com/wailsapp/wails (GO)

## Electron Quickstart

> Link: https://www.electronjs.org/docs/tutorial/quick-start

In the sub-folder electron-quick-start the tutorial link (with packaging) has been tried out.

## Electron and PowerShell

> Link: https://xainey.github.io/2017/powershell-electron-demo/ (2017)

Next step: this tutorial.
### Changes

- **Importing Frontend Dependencies** -> jQuery: instead of jquery (completely omitted), we directly use node.js within the `render.js` file by adding the following line to `main.js` (taken from [this](https://fireship.io/lessons/electron-screen-recorder-project-tutorial/), which uses [bulma](https://bulma.io/) instead of bootstrap):
  
  ```javascript
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {        
      nodeIntegration: true /// <-- update this option
    }
  });
  ```

- First problem: https://stackoverflow.com/questions/55093700/electron-5-0-0-uncaught-referenceerror-require-is-not-defined
  - solved by adding `contextIsolation: false` (optional:  `enableRemoteModule: true`)
- powersehll command format is a bit depricated -> see https://rannn505.gitbook.io/ (we use `addParameter` and `addArgument` now)
