let listCurrent = []; //{text:"", done: false}
let entryField = document.getElementById("entryField");
getLocalList();
render();


function clickEntry(){
  let entry = entryField.value;
  entryField.value = "";
  appendOurList(entry);
  render();
  return entry;
}

function appendOurList(input){
  let app = {text:"", done: false};
  app.text = input;
  listCurrent.push(app);
}

function changeStatus(indexValue){
  listCurrent[+indexValue].done = !listCurrent[+indexValue].done;
  render();
}

function deleteElement(indexValue){
  listCurrent.splice(indexValue,1);
  render();
}

function setLocalList(){
  // let myStorage = localStorage;
  let str = JSON.stringify(listCurrent);
  localStorage.setItem("list",str);
}

function getLocalList(){
  // listCurrent = []; no need until function is reused
  let str = localStorage.getItem("list");
  if (str) {
    listCurrent = JSON.parse(str);
  }
}

function render() {
  let ul = document.getElementById("nwl");
  ul.innerHTML = "";
  listCurrent.forEach( (li, index) => {
    if (li.text.includes(entryField.value))
      {
        let el = document.createElement("li");
        el.appendChild(document.createTextNode(li.text));
        if (li.done) {
          el.setAttribute("class", "already_done");
        }

        const addLiButton = (name, index, functionName) => {
          let buttonDone = document.createElement('button');
          buttonDone.innerHTML = name;
          buttonDone.setAttribute('onclick', functionName + '(' + index + ');');
          buttonDone.setAttribute('id', 'button' + name + '-' + index);
          if ( name === 'Done') {
            buttonDone.setAttribute('class', 'btn btn-success ' + 'done')
          }
          else {
            buttonDone.setAttribute('class', 'btn btn-danger ' + 'delete')
          }
          el.appendChild(buttonDone);
        }

        addLiButton("Done",index.toString(),'changeStatus');
        addLiButton("Delete",index.toString(),'deleteElement');

        ul.appendChild(el);
      }
  });

  setLocalList();
}

function getHttpList(){
  let newQuery = new XMLHttpRequest();
  newQuery.open("GET", 'http://jsonplaceholder.typicode.com/posts', false);
  newQuery.send( null );

  let result = JSON.parse(newQuery.response);

  result.forEach( el => appendOurList(el.title));
  render();
}
