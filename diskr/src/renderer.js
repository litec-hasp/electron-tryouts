// This file is required by the index.html file and will be executed in the renderer process for that window.

const Shell = require('node-powershell');
const { PSCommand } =  require('node-powershell');

const ps = new Shell({
  executionPolicy: 'Bypass',
  noProfile: true
});

//#region DiskBtn
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
//#endregion DiskBtn

//#region tryouts:
//ps.addCommand('echo node-powershell');
//ps.addCommand("\"Roads? Where we're going, we don't need roads.\"");
//ps.addCommand("Get-Process -Name electron")
//ps.addCommand("./Test-Power", [ { GigaWatts: 21.0 } ])  // depricated!!!

//let cmd = new PSCommand('Write-Host').addArgument('node-powershell').addParameter({name: 'foregroundcolor', value: 'red'});//.addParameter({name: 'nonewline', value: null});
//ps.addCommand(cmd);

let script = new PSCommand(`& "${require('path').resolve(__dirname, 'ps_scripts/Test-Power.ps1')}"`);
ps.addCommand(script.addParameter({GigaWatts: 21.0}));

ps.invoke()
.then(output => {
  console.log(output);
})
.catch(err => {
  console.log(err);
});

//#endregion tryouts
