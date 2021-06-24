# Electron Tryouts

Well, first link has nothing to do with Electron, but need to be mentioned:
Eyopener: <https://github.com/kamranahmedse/developer-roadmap> - HAVE A LOOK AT THAT!

## Alternatives

- <https://blog.logrocket.com/why-use-electron-alternative/>
- <https://github.com/sudhakar3697/electron-alternatives>
- <https://web.dev/progressive-web-apps/>
- <https://github.com/zserge/lorca> (GO)
- <https://github.com/wailsapp/wails> (GO)

## Electron Quickstart

> Link: <https://www.electronjs.org/docs/tutorial/quick-start>

In the sub-folder electron-quick-start the tutorial link (with packaging) has been tried out.

## Electron and PowerShell

> Link: <https://xainey.github.io/2017/powershell-electron-demo/> (2017)

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

- First problem: <https://stackoverflow.com/questions/55093700/electron-5-0-0-uncaught-referenceerror-require-is-not-defined>
  - solved by adding `contextIsolation: false` (optional:  `enableRemoteModule: true`)
- powershell command format is a bit depricated -> see <https://rannn505.gitbook.io/> (we use `addParameter` and `addArgument` now)
- as we dont use jquery we need to find an alternative how to react to button clicks - once again we relied on [fireship](https://fireship.io/lessons/electron-screen-recorder-project-tutorial/) for that:
  
  ```javascript
    const getDiskBtn = document.getElementById('getDisk');
    getDiskBtn.onclick = getDiskInfo;

    // TODO: consider async/await 
    function getDiskInfo() {
      const computer = document.getElementById('computerName').value || 'localhost';

      let script = new PSCommand(`& "${require('path').resolve(__dirname, 'ps_scripts/Get-Drives.ps1')}"`);
      ps.addCommand(script.addParameter({ComputerName: computer}));
      ps.invoke()
      .then(output => {
        console.log(output);
        console.log(JSON.parse(output));  // works only if we got json stuff!!!
        let out = document.getElementById('output');
        out.innerText = output; // or innerHTML
      })
      .catch(err => {
        console.log(err);
      });
    };  
  ```
