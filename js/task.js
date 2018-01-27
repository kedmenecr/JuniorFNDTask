function Popout() {

    
    //init of filterred users and global variable,s
    var filteredUsers;
    
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    
    var popup, 
        pop_title,
        pophead, 
        pop_list_view,  
        selectedComp,
        selectedImg,
        selectedRepos,
        selectedGist,
        backBtn,
        hideBtn;


    function generateHTML() {
        var HTML = '<div class="pop-wrap">' +
            '<div class="pop-head">' +
                 '<span data-default-title="Github Users" class="pop-title">Github users</span>' +
                    '<i class="fa fa-window-close pop-btn-hide" aria-hidden="true"></i>' +
                    '</div >' +
                    '<div class="popup-views-wrapper">' +
                    '<div class="loading-wrap">' +
                    '<div class="sk-three-bounce">'+
                    '<div class="sk-child sk-bounce1"></div>'+
                    '<div class="sk-child sk-bounce2"></div>'+
                    '<div class="sk-child sk-bounce3"></div>'+
                    '</div>'+
                    '</div>' +
                    '<div class="popup-views">' +
                    '<div class="popup-view list-view">' +
                    '<ul class="pop-list">' +
                    '</ul>' +
                    '</div>' +
                    '<div class="popup-view details-view">' +
                    '<img class="gh-img" alt="github image" />' +
                    '<div class="popup-description">' +
                    '<span>Company</span>' +
                    '<span class="pop-comp-f"></span>' +
                    '</div>' +
                    '<div class="popup-description-bottom">' +
                    '<div class="popup-description">' +
                    '<span>Repos</span>' +
                    '<span class="popup-number pop-rep-f"></span>' +
                    '</div>' +
                    '<div class="popup-description">' +
                    '<span>Gists</span>' +
                    '<span class="popup-number pop-gist-f"></span>' +
                    '</div>' +
                    '</div>' +
                    '<i class="icon-arrow-right pop-back" aria-hidden="true"></i>' +
                   '</div>' +
                 '</div>' +
             '</div>' +
            '</div >';
        return HTML;
    }

    function getAll() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/users');
        xhr.onload = function () {
                var usersObject = JSON.parse(xhr.response);
                filteredUsers = filterUsers(usersObject, localStorage.getItem("wasSelectedID"));
                renderUserList(filteredUsers);
                addListListeners();
            }
            xhr.send();
        };
    
        
    function getSingle(username) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/users/' + username);
        xhr.onload = function () {
                var response = JSON.parse(xhr.response);
                var user = new User(response.id, response.login, response.company, response.avatar_url, response.public_repos, response.public_gists);
                updateSelected(user);
                setTimeout(function () {
                    popup.classList.remove('loading');
                    popup.classList.add('details-full');
                    document.querySelector('[data-user-id="' + user.id + '"]').style.display = 'none';
                }, 350);
            }
            xhr.send();   
        };

    
    

    function initHTML() {

        appendHtml(document.body, generateHTML());


        
        //general
        popup = document.querySelector('.pop-wrap');
        pop_title = document.querySelector('.pop-title');
        pophead = document.querySelector('.pop-head');
        pop_list_view = document.querySelector('.pop-list');

        //
        selectedComp = document.querySelector('.pop-comp-f');
        selectedImg = document.querySelector('.gh-img');
        selectedGist = document.querySelector('.pop-gist-f');
        selectedRepos = document.querySelector('.pop-rep-f');
        hideBtn = document.querySelector('.pop-btn-hide');
        backBtn = document.querySelector('.pop-back');

        backBtn.addEventListener('click', function () {
            popup.classList.remove('details-full');
            pop_title.innerHTML = pop_title.getAttribute('data-default-title');
        });

        hideBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            popup.classList.add('hidden');
        });

        pophead.addEventListener('click', function () {
            if (popup.classList.contains('hidden')) {
                popup.classList.remove('hidden');
            }
        });
    }

    //init a user
    function User(id, login_name, company, avatar_url, repos, gists) {
        this.id = id;
        this.login_name = login_name;
        this.company = company || ' Null ';
        this.avatar_url = avatar_url;
        this.repos = repos;
        this.gists = gists;
    }

    //render list
    function renderUserList(usersList) {
        for (var i = 0; i < usersList.length; i++) {
            var thisUser = usersList[i];
            var listItem = '<li class="pop-list-item" data-user-login="' + thisUser.login + '" data-user-id=' + '"' + thisUser.id + '"' + '><span class="item-number">' + thisUser.id + '.</span>' + ' ' + thisUser.login + '</li>';
            appendHtml(pop_list_view, listItem);
        }
    }


    function addListListeners() {
        var listItems = document.querySelectorAll('.pop-list-item');
        for (var i = 0; i < listItems.length; i++) {
            var thisItem = listItems[i];
            let thisUserLogin = thisItem.getAttribute('data-user-login');
            var thisListener = function () {
                openSelected(thisUserLogin);
            };
            thisItem.addEventListener('click', thisListener, true);
        }
    }

    function openSelected(userLogin) {
        popup.classList.add('loading');
        getSingle(userLogin);
    }

    function updateSelected(user) {
        pop_title.innerHTML = user.login_name;
        selectedComp.innerHTML = user.company;
        selectedImg.setAttribute('src', user.avatar_url);
        selectedGist.innerHTML = user.gists;
        selectedRepos.innerHTML = user.repos;
        updateStorage(user.id);
        filteredUsers = filterUsers(filteredUsers, localStorage.getItem("wasSelectedID"));


    }

    
    function filterUsers(responseObject, wasSelected) {
        var wasSelectedList = JSON.parse("[" + wasSelected + "]");
        var newUser = responseObject.filter(function (obj) {
            return this.indexOf(obj.id) < 0;
        }, wasSelectedList);
        return newUser;
    }

    function updateStorage(wasSelected) {
        var storageListString = localStorage.getItem("wasSelectedID");
        var storageList = JSON.parse("[" + storageListString + "]");
        if (storageListString) {
            storageList.push(wasSelected);
        } else {
            storageList = [wasSelected];
        }
        localStorage.setItem("wasSelectedID", storageList);
    }
    (function init() {
        initHTML();
        getAll();
    })();

}

function appendHtml(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
}

$(document).ready(Popout)