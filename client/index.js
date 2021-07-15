const socket = io('http://localhost:8000')
var nam=""
nam = prompt('enter')

var username = document.getElementById('username')
username.innerText = nam
username.style.fontFamily= 'Arial Black';

function updateScroll(){
    var element = document.getElementById("side-bar");
    element.scrollTop = element.scrollHeight;
}

var append = (mess,wrapper,clas)=>{
    var div =   document.createElement('div')
    div.innerText = mess
    div.classList.add(clas)
    wrapper.appendChild(div)
}

socket.emit('new-user',nam)
socket.on('active-list',users=>{
    const active = document.getElementById('active')
    active.innerText=""
    for(const name in users) {
        append(users[name],active,'active-div');
    };
})

const side = document.getElementById('side-bar')
socket.on('side-newuser-join',user=>{
    append(`${user} Joined`,side,'side-join')
    updateScroll();
})

socket.on('side-user-left',user=>{
    append(`${user} Left`,side,'side-left')
    updateScroll();
})
append('You Joined',side,'side-join')

const btn = document.getElementById('btn')
const message = document.getElementById('message')
const contain = document.getElementById('contain-mgs')

const sendmessage = ()=>{
    if(message.value !="")
    {
        append(`You : ${message.value}`,contain,'right')
        socket.emit('new-message',{message :(message.value),naam : nam})
        message.value =""
    }
} 
btn.addEventListener('click',sendmessage)

message.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     sendmessage()
    }
});

socket.on('message',(user)=>{
    console.log("hiiii")
    append(`${user.naam} : ${user.message}`,contain,'left')
})







