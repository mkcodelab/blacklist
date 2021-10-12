const listEl = document.querySelector('.list');
const loadBtn = document.querySelector('#load');

let readyList;

// change to url of json file on server
// const path = 'files.json';
const path = 'http://mkcodelab.pl/blacklist/files.json';

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
    if ( typeof level == "undefined" ) level = 0;
    if ( typeof maxlevel == "undefined" ) maxLevel = 0;

    let str = '';
    let levelStr = '<br>'; 

    // if ( maxLevel != 0 && level >= maxLevel )
    // {
    //     str += `<div class="break-line"></div>`; // breaking the line
    //     return str;
    // }

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
                <button class="collapse">-</button>
                Folder: ${obj[prop].path}
                </div>`;
              }
              // if (!obj[prop].name.includes('.')) {
              //   console.log('folder')
              // }

              str += `
              <div class="subfolder ">
                ${print(obj[prop], maxLevel, level + 1 )} 
              </div>`;
            
            break;
        }
    }
    
    return str;
};


function collapseChild(elem) {
  // console.log(elem.target.parentNode.parentNode);
  elem.target.parentElement.nextSibling.nextSibling.classList.toggle('collapsed')

  if (elem.target.parentElement.nextSibling.nextSibling.classList.contains('collapsed')) {
    elem.target.innerHTML = '+';
  } else {
    elem.target.innerHTML = '-';
  }
  // console.log(elem.target.parentElement.nextSibling.nextSibling)
}

function addCollapse() {
  const collapseBtns = document.querySelectorAll('.collapse');
  collapseBtns.forEach(btn => btn.addEventListener('click', (btn)=> {
    collapseChild(btn)
  }));
}

loadBtn.addEventListener('click', () => {
    listEl.innerHTML += `${print(readyList)}`
    loadBtn.style.display = 'none';
    addCollapse();
  }
);
//orginal version of the print function
// var print = function( o, maxLevel, level )
// {
//     if ( typeof level == "undefined" )
//     {
//         level = 0;
//     }
//     if ( typeof maxlevel == "undefined" )
//     {
//         maxLevel = 0;
//     }

//     var str = '';
//     // Remove this if you don't want the pre tag, but make sure to remove
//     // the close pre tag on the bottom as well
//     if ( level == 0 )
//     {
//         str = '<pre>';   // can also be <pre>
//     }

//     var levelStr = '<br>';
//     for ( var x = 0; x < level; x++ )
//     {
//         levelStr += '    ';   // all those spaces only work with <pre>
//     }

//     if ( maxLevel != 0 && level >= maxLevel )
//     {
//         str += levelStr + '...<br>';
//         return str;
//     }

//     for ( var p in o )
//     {
//         switch(typeof o[p])
//         {
//           case 'string':
//           case 'number':    // .tostring() gets automatically applied
//           case 'boolean':   // ditto
//             str += levelStr + p + ': ' + o[p] + ' <br>';
//             break;

//           case 'object':    // this is where we become recursive
//           default:
//             str += levelStr + p + ': [ <br>' + print( o[p], maxLevel, level + 1 ) + levelStr + ']</br>';
//             break;
//         }
//     }

//     // Remove this if you don't want the pre tag, but make sure to remove
//     // the open pre tag on the top as well
//     if ( level == 0 )
//     {
//         str += '</pre>';   // also can be </pre>
//     }
//     return str;
// };
