const taskForm = document.querySelector(".js-taskForm"),
      taskInput = taskForm.querySelector("input"),
      pendingList = document.querySelector(".list-pending"),
      finishedList = document.querySelector(".list-finished")


const PENDING_LS = "pendings",
      FINISHED_LS = "finisheds";

let pendings = [];
let finisheds = [];

function filterFn(task) {
    return task.id === 1;
  }

function deletePending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    
    const cleanTasks = pendings.filter(function(task){
     return task.id !== parseInt(li.id);
    });

    pendings = cleanTasks;
    saveTasks();    
 }
 
 function deleteFinished(event){
     const btn= event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanTasks = finisheds.filter(function(task){
     return task.id !==parseInt(li.id) ;
    });
    finisheds = cleanTasks;
    saveTasks();     
 }

 function saveTasks() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
    localStorage.setItem(FINISHED_LS, JSON.stringify(finisheds));
}

function moveToFinished(event){
    const btn= event.target;
    const li = btn.parentNode;
    const text = li.children[2].innerText;
    paintFinished(text);
    pendingList.removeChild(li);
    const cleanTasks = pendings.filter(function (task) {
        return task.id !== parseInt(li.id);
      });
      pendings = cleanTasks;
      saveTasks();
    }

function moveToPending(event){
    const btn = event.target;
  const li = btn.parentNode;
  const text = li.children[2].innerText;
  paintPending(text);
  finishedList.removeChild(li);
  const cleanTasks =finisheds.filter(function (task) {
    return task.id !== parseInt(li.id);
  });
  finisheds =cleanTasks;
  saveTasks();  
   }

function paintPending(text){
  const li  = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn= document.createElement("button");
  const span= document.createElement("span");
  const newId = pendings.length + 1;
  
  delBtn.innerHTML = "✘";
  delBtn.addEventListener("click",deletePending);
  checkBtn.innerHTML = "✔︎";
  checkBtn.addEventListener("click",moveToFinished);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  span.innerText =text;
  li.appendChild(span);
  li.id = newId;
  pendingList.appendChild(li);

  const pendingObj ={
    text : text,
    id : newId
};
pendings.push(pendingObj);
saveTasks();
}

 function paintFinished(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const returnBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = finisheds.length + 1;
   

    delBtn.innerHTML = "✘";
    delBtn.addEventListener("click",deleteFinished);
    returnBtn.innerHTML = "⤺";
    returnBtn.addEventListener("click",moveToPending);
    li.appendChild(delBtn);
    li.appendChild(returnBtn);
    span.innerText =text;
    li.appendChild(span);
    li.id = newId;
    finishedList.appendChild(li);

    const finishedObj = {
      text : text,
      id : newId 
  };
  finisheds.push(finishedObj);
  saveTasks(); 
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = taskInput.value;
    paintPending(currentValue); 
    taskInput.value ="";  
    
}

function loadTasks() {
    const loadedPendings = localStorage.getItem(PENDING_LS);
    const loadedFinished = localStorage.getItem(FINISHED_LS);

    if (loadedPendings !== null){
        const parsedPendings =JSON.parse (loadedPendings);
        parsedPendings.forEach(function(pending){
        paintPending(pending.text);   
        });   
       }
    if (loadedFinished !== null) {
        const parsedFinisheds = JSON.parse(loadedFinished);
        parsedFinisheds.forEach(function (finished) {
          paintFinished(finished.text);
        });
      }
    }

function init(){
    loadTasks();
    taskForm.addEventListener("submit",handleSubmit);
    
   }
   init();