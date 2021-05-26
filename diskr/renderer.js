// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

console.log("Page is loaded!"); 

const Shell = require('node-powershell');
const { PSCommand } =  require('node-powershell');
 
const ps = new Shell({
  executionPolicy: 'Bypass',
  noProfile: true
});



// some simple tryouts:
//ps.addCommand('echo node-powershell');
//ps.addCommand("\"Roads? Where we're going, we don't need roads.\"");
//ps.addCommand("Get-Process -Name electron")
//ps.addCommand("./Test-Power", [ { GigaWatts: 21.0 } ])  // depricated!!!

//let cmd = new PSCommand('Write-Host').addArgument('node-powershell').addParameter({name: 'foregroundcolor', value: 'red'});//.addParameter({name: 'nonewline', value: null});
//ps.addCommand(cmd);

let script = new PSCommand(`& "${require('path').resolve(__dirname, 'Test-Power.ps1')}"`);
ps.addCommand(script.addParameter({GigaWatts: 21.0}));

// Pull the Trigger
ps.invoke()
.then(output => {
  console.log(output);
  console.log(JSON.parse(output));  // works only if we got json stuff
})
.catch(err => {
  console.log(err);
});
