/*
Store the currently selected settings using browser.storage.local.
*/
function storeSettings() {

  function getSince() {
    const since = document.querySelector("#since");
    return since.value;
  }

  function getTypes() {
    let dataTypes = [];
    const checkboxes = document.querySelectorAll(".data-types [type=checkbox]");
    for (let item of checkboxes) {
      if (item.checked) {
        dataTypes.push(item.getAttribute("data-type"));
      }
    }
    return dataTypes;
  }

  function getIcon() {
    
  }

  const since = getSince();
  const dataTypes = getTypes();
  browser.storage.local.set({
    since,
    dataTypes
  });
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateUI(restoredSettings) {
  const selectList = document.querySelector("#since");
  selectList.value = restoredSettings.since;

  const checkboxes = document.querySelectorAll(".data-types [type=checkbox]");
  for (let item of checkboxes) {
    if (restoredSettings.dataTypes.indexOf(item.getAttribute("data-type")) != -1) {
      item.checked = true;
    } else {
      item.checked = false;
    }
  }
}

function onError(e) {
  console.error(e);
}

/*
On opening the options page, fetch stored settings and update the UI with them.
*/
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

/*
On clicking the save button, save the currently selected settings.
*/

function notify() {
  browser.notifications.create({
    "type": "basic",
    "title": 'Preferences saved',
    "message": ""
  });
}
const saveButton = document.querySelector("#save-button");
saveButton.addEventListener("click", () => {
  storeSettings();
  notify();
});

const redTrash = document.getElementById("black-trash");
const blackTrash = document.getElementById("red-trash");
const greenTrash = document.getElementById("green-trash");
const blueTrash = document.getElementById("blue-trash");
const yellowTrash = document.getElementById("yellow-trash");

function setBlack() {
  browser.browserAction.setIcon({path: "../icons/black_trash.png"});
}
function setRed() {
  browser.browserAction.setIcon({path: "../icons/red_trash.png"});
}
function setGreen() {
  browser.browserAction.setIcon({path: "../icons/green_trash.png"});
}
function setBlue() {
  browser.browserAction.setIcon({path: "../icons/blue_trash.png"});
}
function setYellow() {
  browser.browserAction.setIcon({path: "../icons/yellow_trash.png"});
}

blackTrash.addEventListener("click", setBlack);
redTrash.addEventListener("click", setRed);
greenTrash.addEventListener("click", setGreen);
blueTrash.addEventListener("click", setBlue);
yellowTrash.addEventListener("click", setYellow);
