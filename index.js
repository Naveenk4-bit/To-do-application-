// console.log("hello world nanbaa")/
const state = {
    tasklist:[]
}
//DOM
const taskContents = document.querySelector(".task_contents");
const taskModel = document.querySelector(".task_model_body")

// console.log(taskcontents);
// console.log(taskmodel);

const htmlTaskContents = ({id, title, discription, type, url}) =>
`
 <div class="col-md-6 col-mt-3 col-lg-4" id=${id} key=${id}>
    <div class=" card shadow-sm task_card">
        <div class="card-header d-flex justify-content-end task_card_header">
            <button type="button" class="btn btn-outline-primary mr-2" name=${id}>
                <i class="fas fa-pencil-alt" name=${id}></i>
            </button>
            <button type="button" class="btn btn-outline-danger mr-2" name=${id}>
                <i class="fas fa-trash-alt" name=${id}></i>
            </button>
        </div>
<div class="card-body">
    ${
        url && 
        `<img src=${url} alt="card img" class="card-img-top md-3 rounded-lg"/> `
    }
    <h4 class="card-titile">${title}</h4>
    <p class="trim-3-lines text-muted">${discription}</p>
    <div class="tags text-white d-flex flex-wrap">
        <span class="badge text-bg-primary m-1">${type}</span>
    </div>
</div>
    <div class="card-footer>
      <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showtask">
          Open Task
      </button>
    </div>

 </div>
 </div>
 </div>
`
const htmlModalContent = ({id, title, description, url}) => {
      const date = new Date(parseInt(id));
      return `
        <div id=${id}>
        ${
            url && `<img src=${url} alt="card image cap" class="img-fluid mb-3" />`
        }
        <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
        <h2 class="my-3">${title}</h2>
        <p class="lead">${description}</p>
        </div>
      `
    
}

const updateLocalStorage = () => {
    localStorage.setItem('task', JSON.stringify({
        tasks: state.taskList
    }))
}

const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

    if(localStorageCopy) state.taskList = localStorageCopy.tasks
    
    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate))
    })
}

const handleSubmit = () =>{
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById('imageurl').value,
        title: document.getElementById('tasktitle').value,
        description: document.getElementById('taskdiscription').value,
        type: document.getElementById('tag').value,
    };

    if(input.title == "" || input.description == "" || input.type == ""){
        return alert("Please fill out the necessary fields!") }
}

    taskContents.insertAdjacentHTML("beforeend",htmlTaskContents({...input, id}))
    state.tasklist.push({...input, id});
    updateLocalStorage();
