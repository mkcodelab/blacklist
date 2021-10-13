const listEl = document.querySelector('.list');
const loadBtn = document.querySelector('#load');

let readyList;

// change to url of json file on server
const path = 'files.json';
// const path = 'http://mkcodelab.pl/blacklist/files.json';

const list = fetch(path, {
  method: 'GET',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json()).then(json => readyList = json);
  
const print = function( obj, maxLevel, level )
{
    // if ( typeof level == "undefined" ) level = 0;
    // if ( typeof maxlevel == "undefined" ) maxLevel = 0;

    let str = '';

    for ( let prop in obj )
    {
        switch(typeof obj[prop])
        {
          case 'string':
          case 'number':
          case 'boolean':
            
          // name property
          
            if (prop =='name') {
              str += `<div class="filename">${obj[prop]}</div>`;
            }
          
            
           
            break;

          case 'object':    // when its nested, this is where we become recursive
          default:
            
              if (obj[prop].hasOwnProperty('children')) {
                str += `<div class="folder-marker">
                          <button class="collapse-btn">+</button>
                          ${obj[prop].name}
                        </div>`;
              }
             
              // if (!obj[prop].name.includes('.')) {
              //   console.log('folder')
              // }

              str += `
              <div class="subfolder">
                ${print(obj[prop], maxLevel, level + 1 )}
              </div>`;
            
            break;
        }
    }
    
    return str;
};

// this is soooo messed up...

function collapseChild(elem) {

  const subfolder = elem.target.parentNode.nextSibling.nextSibling;
  const children = subfolder.childNodes;


  if (subfolder.classList.contains('collapsed')) {
    subfolder.classList.remove('collapsed');


  } else {
    subfolder.classList.add('collapsed');

  }

  children.forEach(child => {
    if (child.nodeType == 1) {
      child.classList.remove('collapsed');
      let childrenOfChild = child.childNodes;
      childrenOfChild.forEach(child => {
        if (child.nodeType == 1) child.classList.remove('collapsed');
      })
    }
  })

  //  switching the symbol on the button
  if (elem.target.parentElement.nextSibling.nextSibling.classList.contains('collapsed')) {
    elem.target.innerHTML = '+';
  } else {
    elem.target.innerHTML = '-';
  }
 
}

// adding event listener to all collapse buttons
function addCollapse() {
  const collapseBtns = document.querySelectorAll('.collapse-btn');
  collapseBtns.forEach(btn => btn.addEventListener('click', (btn)=> {
    collapseChild(btn)
  }));
}

// load button trigger
loadBtn.addEventListener('click', () => {
    listEl.innerHTML += `${print(readyList)}`
    loadBtn.style.display = 'none';
    addCollapse();

    // make all subfolders display none
    let subfolders = document.querySelectorAll('.subfolder');
    subfolders.forEach( e => e.classList.toggle('collapsed'));
    // first folder visible
    document.querySelector('.subfolder').classList.remove('collapsed')
  }
);
