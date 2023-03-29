const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText; //in edit func
 const usernameTextFeield = document.getElementById('username');
let userArray = [];  //to store 
const recordsDisplay= document.getElementById('records');
let edit_id = null;
//to add one more data with existing data even after refreshing the page 
let objStr = localStorage.getItem('users');

if(objStr!=null){

    userArray =  JSON.parse(objStr); //to retrive the string to object form
}
  
DisplayInfo();

 addUserBtn.onclick=()=>{      //1st step refer 65 line
    const name = usernameTextFeield.value; //to enter our value
    if(edit_id!=null){ //edit
      userArray.splice(edit_id,1,{'name' : name});
      //to not get edited if we are entering new user we should reinitialize edit_id as null;
      edit_id=null;

    }
    else{  //insert
    userArray.push({'name' : name}); //just stores temporary

    }
    SaveInfo(userArray);
     usernameTextFeield.value = ''; //i dont know
    // DisplayInfo(); //to directly get display without doing refresh 
     //process for edit func
     addUserBtn.innerText = 'Add user';
 }
  
 function SaveInfo(userArray){  //to save permanently
     //localStorage function only accepts string so convert it
    let str = JSON.stringify(userArray); //use this func to convert
     localStorage.setItem('users',str);  //ok now by using this values will get stored but if we refresh and type a new value old will be erased 
     DisplayInfo();
 }

 function DisplayInfo(){
    let statement = '';
    userArray.forEach((user,i) => {  //back tick is used to interpolation
       statement += ` <tr>      
       <th scope="row">${i+1}</th>
       <td>${user.name}</td>
       <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white 
           fas fa-trash" onclick='DeleteInfo(${i})'></i></td>
     </tr>`;
     
    });
    recordsDisplay.innerHTML = statement; 

 }

 function EditInfo(id){
   edit_id = id;
   usernameTextFeield.value = userArray[id].name; //if we click on edit button,that name will be displayed on that box
   addUserBtn.innerText = 'save changes';
 }

 function DeleteInfo(id){
  
    userArray.splice(id,1);
    SaveInfo(userArray);
   

 }


 //initially this func looked like this before edit func
//  addUserBtn.onclick=()=>{      //1st step
//     const name = usernameTextFeield.value; //to enter our value
//     userArray.push({'name' : name}); //just stores temporary
//     SaveInfo(userArray);
//      usernameTextFeield.value = ''; //i dont know
//      DisplayInfo(); //to directly get display without doing refresh 
//      //process for edit func
//      addUserBtn.innerText = 'Add user';
//  }