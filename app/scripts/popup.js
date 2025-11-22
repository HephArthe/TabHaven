const save = document.getElementById("save");
const workspacesDiv = document.getElementById("workspaces")

chrome.runtime.sendMessage({action: "get"}, (response) => {
    const names = Object.keys(response.workspaces || {});
    document.querySelectorAll(".workspace-item").forEach(el => el.remove());
    names.forEach((name) => {
        const div = document.createElement("div");
        const p = document.createElement("p")
        const button = document.createElement("button")
        div.className = "workspace-item";
        p.className = "name"
        button.className = "close"
        p.textContent = name;
        button.textContent = 'X'
        button.onclick = function(e) {
            e.stopPropagation();
            chrome.runtime.sendMessage({action : "delete", name}, (resp) => {
                console.log(resp.workspaces || {})
                button.parentElement.remove()
            })
        }
        div.onclick= function() {
                console.log("cliquei")
                chrome.runtime.sendMessage({action : "select", name})
            }
        div.append(p);
        div.append(button)
        workspacesDiv.appendChild(div);
    })
})

save.onclick = function() {
    chrome.runtime.sendMessage({action: "save"}, (response) => {
    const names = Object.keys(response.workspaces || {});
    document.querySelectorAll(".workspace-item").forEach(el => el.remove());
    names.forEach((name) => {
        const div = document.createElement("div");
        const p = document.createElement("p")
        const button = document.createElement("button")
        div.className = "workspace-item";
        p.className = "name"
        button.className = "close"
        p.textContent = name;
        button.textContent = 'X'
        button.onclick = function(e) {
            e.stopPropagation();
            chrome.runtime.sendMessage({action : "delete", name}, (resp) => {
                console.log(resp.workspaces || {})
                button.parentElement.remove()
            })
        }
        div.onclick = function() {
                console.log("cliquei")
                chrome.runtime.sendMessage({action : "select", name})
            }
        div.append(p);
        div.append(button)
        workspacesDiv.appendChild(div);
        })
    })
}
