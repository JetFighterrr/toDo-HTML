let list = [];
render();

function clickEntry(){
  let entry = document.getElementById("entryField").value;
  document.getElementById("entryField").value = "";
  appendOurList(entry);
  render();
  return entry;
}

function appendOurList(input){
  let app = {text:"", done: false};
  app.text = input;
  list.push(app);
}

function changeStatus( indexValue ){
  list[+indexValue].done = true;
  console.log(1111);
}

function render() {
  let ul = document.getElementById("nwl");
  ul.innerHTML = "";
  list.forEach( (li, index) => {
    let el = document.createElement("li");
    el.appendChild(document.createTextNode(li.text));
    console.log(li.done);
    if (li.done){
      el.setAttribute("class","already_done");
    }

    let button = document.createElement("button");
    button.innerHTML = "Done";
    button.setAttribute('onclick','changeStatus(' + index.toString() + ');');
    el.appendChild(button);
    el.setAttribute("id","element-" + index.toString());

    ul.appendChild(el);
  });
}
