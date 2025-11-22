chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

var names = []
var i = 0;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "save") {
    chrome.tabs.query({ currentWindow: true}, (tabs) => {
      const tabsUrls = tabs.map(tab => tab.url);
      chrome.storage.local.get("workspaces", (data) => {
        var workspaces = data.workspaces || {}
        workspaces[message.name] = tabsUrls
        names.push(message.name)
        chrome.storage.local.set({workspaces}, () => {
        })
        sendResponse({workspaces})
      })
    })
    return true;
  }
  if(message.action === "delete"){
    const name = message.name;
    chrome.storage.local.get("workspaces", (data) => {
      const workspaces = data.workspaces || {}
      names = names.filter(n => n !== name);
      delete workspaces[name]
      chrome.storage.local.set({workspaces}, () => {
      })
      sendResponse({workspaces});
    })
    return true;
  }
  if(message.action === "select"){
    const name = message.name
    chrome.tabs.create({url: "about:blank"}, (newTab) =>{
      chrome.tabs.query({currentWindow: true}, (tabs) => {
        const tabIds = tabs.filter(tab => tab.id !== newTab.id).map(tab => tab.id)
        chrome.tabs.remove(tabIds);
      })
    
      chrome.storage.local.get("workspaces", (data) => {
        const workspaces = data.workspaces || {}
        console.log(workspaces[name])
        workspaces[name].forEach((url) => {
          chrome.tabs.create({url});
        })
        chrome.tabs.remove(newTab.id);
      })
    })
  }
  if(message.action === "get"){
    chrome.storage.local.get("workspaces", (data) => {
        var workspaces = data.workspaces || {}
        sendResponse({workspaces})
    })
    return true;
  }
});
