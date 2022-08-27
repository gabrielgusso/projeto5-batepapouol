let messages = []
let onlinepeoples = []
let askName = ""
Status()

//ENTRAR NA SALA
function Status(){
    askName = prompt("Qual seu nome?")
    // askName = "r3hgfgbeg"
    const nameObj = {
        name: askName
    }
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nameObj);

    requisicao.then(tratarSucesso);
    requisicao.catch(tratarError);
}

function tratarSucesso(){
    console.log("Nome do participante recebido")
    setInterval(EnviarRequisicao, 5000)
}

function tratarError(erro){ 
    const erroNum = erro.response.status
    if(erroNum === 404){
        console.log("Erro no servidor ao salvar nome")
        alert("Por favor insira seu nome novamente")
        Status()
    } else if(erroNum === 400 || erroNum === 409 || erroNum === 422){
        alert("Ja existe alguem com esse nome, por favor insira outro nome")
        Status()
    }
}
//MANTER CONEXAO
function EnviarRequisicao(){
    const nameObj = {
        name: askName
    }
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nameObj)
    requisicao.then(tratarSucessoStatus);
    requisicao.catch(tratarErrorStatus);
}

function tratarSucessoStatus(){
    console.log(`Status recebido / Participante ${askName} ativo`)
}

function tratarErrorStatus(erro){
    console.log("Status erro recebido")
    console.log(erro)
}
//BUSCAR MENSAGENS
function getData(){  
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages") 

    promise.then(messagesArrived)

}
getData()
setInterval(getData, 2000)



function messagesArrived(answer){
    messages = answer.data
    console.log("RENDERIZANDO MSGs")

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

//ENVIAR MENSAGEM
function sendMessage(){
    const message = document.querySelector('.textArea')
    console.log(message.value)
    const newMessage = {
        from: askName,
        to: 'Todos',
        text: message.value,
        type: "message", // ou "private_message" para o bônus
    }
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', newMessage);

    requisicao.then(tratarSucessoEnviar);
    requisicao.catch(tratarErrorEnviar);
    message.value = ''
    message.innerHTML = ''
}

function tratarSucessoEnviar(){
    getData()
}

function tratarErrorEnviar(){

}