function getFormValue(){
    let getForm = document.querySelector('#github-form');
    getForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetchData(e.target.search.value)
    })
}

function fetchData(username){
    fetch(`https://api.github.com/search/users?q=${username}`)
    .then(reponse => reponse.json())
    .then(data => profileLoader(data))

}
function profileLoader(dataUrl){
    console.log(dataUrl)
    removeContent(document.querySelector('#user-list'))
    for (let i = 0; i<4; i++){
        let imgElement = document.createElement('img')
        imgElement.src = dataUrl.items[i].avatar_url;
        let gitProfileLink = document.createElement('p')
        imgElement.style.height = "200px"
        imgElement.style.width = '200px'
        imgElement.id = 'profile_pic';
        gitProfileLink.textContent = "Git Hub Repo"
        gitProfileLink.addEventListener('click', () => {
            fetch(dataUrl.items[i].repos_url)
            .then(resp => resp.json())
            .then(data => renderRepo(data))
        })
        document.querySelector('#user-list').append(imgElement,gitProfileLink)
    }
}

function renderRepo(data){
    removeContent(document.querySelector('#repos-list'))
    console.log(data);
    data.forEach(element => {
        let repoName = document.createElement('li');
        repoName.textContent = element['full_name'];
        document.querySelector('#repos-list').append(repoName)
    })
}

function removeContent(parent){
    if (parent!=undefined){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }
}

getFormValue();