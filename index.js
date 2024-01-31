const base_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const selects=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");


const updateFlag=(element)=>{
    console.log(element);
    let currcode=element.value;
    console.log(currcode);
    let countcode=countryList[currcode];
    let newlink="https://flagsapi.com/"+countcode+"/flat/64.png";
    let img=element.parentElement.querySelector("img");
    img.src=newlink;
}


//this for loop is a self working thing here i didn't need to do anything for this loop to run
for(let select of selects){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        select.append(newOption);
        if(select.name==="from"&&code==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to"&&code==="INR"){
            newOption.selected="selected";
        }
    }
    //this add event listener only initiates when i do something on the page
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const fromC=document.querySelector(".from select").value.toLowerCase();

const toC=document.querySelector(".to select").value.toLowerCase();

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("#amount input");
    let newUrl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"+fromC+"/"+toC+".json";
    //another way for the same code
    // let newUrl=`${base_URL}/${fromC}/${toC}.json`
 let  response=await fetch(newUrl);
 let data=await response.json();
 let rs=data[toC];
 let msg=document.querySelector(".msg");
 msg.innerText=amount.value+" "+document.querySelector(".from select").value+" = "+rs+" "+document.querySelector(".to select").value;

});
