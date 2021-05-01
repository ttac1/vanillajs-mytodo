const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
let idNumbers =1;

//1//
function deleteToDo(event){
   const btn = event.target;
   const li = btn.parentNode;
   toDoList.removeChild(li);
   const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !==parseInt(li.id) ;
   });
   //toDo의 id는 숫자인데, li의 id는 string이기때문에 parseInt 로 숫자로 변환시킨다.
   toDos = cleanToDos;
   saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers;
    idNumbers += 1;
    
    delBtn.innerHTML = "✘";  
    //2//
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id= newId;
    toDoList.appendChild(li);

    const toDoObj ={
        text:text,
        id:newId  
    };
    toDos.push(toDoObj);
    saveToDos();
    

}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue); 
    toDoInput.value ="";  
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos =JSON.parse (loadedToDos);
        parsedToDos.forEach(function(toDo){
        paintToDo(toDo.text);   
        });
        
       }
        
    }

   

function init(){
   loadToDos();
   toDoForm.addEventListener("submit",handleSubmit);
  }
  init();


//---@전체적인 흐름 정리
//큰 틀에서 init 함수 내의 loadToDos 함수와 handlesubmit 함수가 실행됩니다.

//! loadToDos함수는 아래와 같은 일을 합니다.

//1.로컬 스토리지에 저장 된 todolist를 가져옴.
//2.저장 된 투두리스트가 null이 아니라면 todolist를 브라우저에 출력하기 위해 paint함수를 실행함
//이 때 forEach 함수를 통해 리스트의 각 값을 인자로 받아 paint함수를 실행해하게 되는데
//우린 로컬스토리지에 todolist를 string형태로 저장했기 때문에 forEach 함수를
//사용 할 수 없음. 따라서 로컬 스토리지를 리스트 형태로 바꿔주는 작업을 함
//(JSON.parse함수의 역할).

//3.각 값을 인자로 받아 paint함수가 돌아가면 브라우저에 우리가 입력한 todolist가 출력됨.

//! handlesubmit 함수는 아래와 같은 일을 합니다.

//1.toDoForm 요소가 submit 이벤트를 감지하면 handlesubmit 함수가 실행됨.
//2.handlesubmit 함수는 텍스트창에 입력된 값을 받은 뒤 그것을 paint함수의 인자로 넘겨줌 paint함수가 실행되면 브라우저에 입력한 toDolist가 나타남

//추가로 paint함수에 대한 설명
//paintToDo는 아래와 같은 구조입니다.
//1. 우리가 입력할 text를 담게 될 li엘리먼트를 꾸밈(버튼, span, id값 등이 들어감, toDoList.appendchild("li"))이전까지 해당
//2. text값을 받아 최종적으로 완성된 li엘리먼트를 ul엘리먼트에 집어넣음(실질적으로 브라우저에 출력되게 하는 부분, toDoList.appendchild("li")에 해당)
//3. 입력받은 text값을 리스트 형태로 저장.(appendchild("li")부터 toDos.push 부분에 해당)
//4. 리스트에 저장된 값을 로컬스토리지에 저장.(saveToDos함수의 역할, 이 때 리스트에 저장된 값은 새로고침을 하면 사라지는 값이기 때문에 로컬 스토리지에
//저장한 값들간의 중복이 생기지 않습니다. 강의에서 toDos가 비어있다고 강조한 이유가 이것)

//1번과 2번, 3번과 4번을 묶어서 생각하는 게 이해가 편합니다.

