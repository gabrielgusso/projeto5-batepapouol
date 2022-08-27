let messages = []
let onlinepeoples = []
let askName = ""
Status()

//ENTRAR NA SALA
function Status() {
    askName = prompt("Qual seu nome?")
    const nameObj = {
        name: askName
    }
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nameObj);

    requisicao.then(tratarSucesso);
    requisicao.catch(tratarError);
}

function tratarSucesso() {
    // console.log("Nome do participante recebido")
    setInterval(EnviarRequisicao, 5000)
}

function tratarError(erro) {
    const erroNum = erro.response.status
    if (erroNum === 404) {
        console.log("Erro no servidor ao salvar nome")
        alert("Por favor insira seu nome novamente")
        Status()
    } else if (erroNum === 400 || erroNum === 409 || erroNum === 422) {
        alert("Ja existe alguem com esse nome, por favor insira outro nome")
        Status()
    }
}
//MANTER CONEXAO
function EnviarRequisicao() {
    const nameObj = {
        name: askName
    }
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nameObj)
    requisicao.then(tratarSucessoStatus);
    requisicao.catch(tratarErrorStatus);
}

function tratarSucessoStatus() {
    // console.log(`Status recebido / Participante ${askName} ativo`)
}

function tratarErrorStatus() {
    console.log("Status erro recebido")
    window.location.reload()
}
//BUSCAR MENSAGENS
function getData() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")

    promise.then(messagesArrived)

}
getData()
setInterval(getData, 3000)



function messagesArrived(answer) {
    messages = answer.data
    // console.log("RENDERIZANDO MSGs")

    renderMessages()
}

function renderMessages() {
    const ul = document.querySelector(".all-box-msg")
    ul.innerHTML = ''
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].type === "message") {
            ul.innerHTML = ul.innerHTML + `<li class="box-message">
            <p><span class="msg-time">(${messages[i].time})</span> <strong class="msg-name">${messages[i].from}</strong> <span class="msg-text">para</span> <strong class="msg-name">${messages[i].to}:</strong> <span class="msg-text"> ${messages[i].text}</span></p>
        </li>`
        } else if (messages[i].type === "private_message") { 
            if(messages[i].to === askName){
                ul.innerHTML = ul.innerHTML + `<li class="box-message">
                <p><span class="msg-time">(${messages[i].time})</span> <strong class="msg-name">${messages[i].from}</strong> <span class="msg-text">para</span> <strong class="msg-name">${messages[i].to}:</strong> <span class="msg-text"> ${messages[i].text}</span></p>
            </li>`
            }
        } else {
            ul.innerHTML = ul.innerHTML + `<li class="box-status">
        <p><span class="msg-time">(${messages[i].time})</span>  <strong class="msg-name">${messages[i].from}</strong>  <span class="msg-text"> ${messages[i].text}</span></p>
    </li>`}


    }
    const lastChild = ul.lastChild
    lastChild.scrollIntoView();
}

//ENVIAR MENSAGEM
function sendMessage() {
    const message = document.querySelector('.textArea')

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

function tratarSucessoEnviar() {
    getData()
}

function tratarErrorEnviar() {
    console.log("Mensagem nao enviada")
    window.location.reload()
}

// setInterval(mudarCorLi, 5000)

// function mudarCorLi() {
//     for(let i=0; i < messages.length; i++){
//         if(messages[i].type === "message"){
//             const li = document.querySelector(".box-status")
//             li.classList.add("box-message")
//             li.classList.remove("box-status")
//             console.log("okokko")
//         }
//     }
// }