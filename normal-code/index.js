const base_URL="https://v6.exchangerate-api.com/v6/fb122cb72688b7a9eb54dc17/pair/";

const selects=document.querySelectorAll(".dropdown select");

const btn=document.querySelector(".btn");


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


btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    const fromC=document.querySelector(".select1").value.toUpperCase();
const toC=document.querySelector(".select2").value.toUpperCase();

    let amount=document.querySelector("#amount input");
    let newUrl=`${base_URL}/${fromC}/${toC}`
 let  response=await fetch(newUrl);
 let data=await response.json();
 console.log(data);
 let rs=data.conversion_rate;
 console.log(rs);
 let msg=document.querySelector(".msg");
 msg.innerText=amount.value+" "+document.querySelector(".from select").value+" = "+rs*amount.value+" "+document.querySelector(".to select").value;

});
