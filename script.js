let messages = []
let onlinepeoples = []
Status()

function Status(){
    const askName = prompt("Qual seu nome?")
    const nameObj = {
        name: askName
    }
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nameObj);

    requisicao.then(tratarSucesso);
    requisicao.catch(tratarError);
}

function tratarSucesso(){
    console.log("deu certo")
}

function tratarError(erro){
    console.log(erro)
}

function getData(){  
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages") 

    promise.then(messagesArrived)

}

getData()



function messagesArrived(answer){
    messages = answer.data


    renderMessages()
}

function renderMessages(){
    const ul = document.querySelector(".all-box-msg")
    ul.innerHTML = ''

    for(let i=0; i < messages.length; i++){
        ul.innerHTML = ul.innerHTML + `<li class="box-status">
        <p><span class="msg-time">(${messages[i].time})</span>  <strong class="msg-name">${messages[i].from}</strong>  <span class="msg-text"> ${messages[i].text}</span></p>
    </li>`
        // if(messages[i].type === "message"){
        //     const li = document.querySelectorAll(".box-status")
        //     li.classList.add("box-message")
        //     li.classList.remove("box-status")
        // }
    const lastChild = ul.lastChild
    lastChild.scrollIntoView();

    }
}