
const cadPaciente = document.getElementById("cadPaciente")
const modalCadPaciente = document.getElementById("modalCadPaciente")
const btnEnviarPac = document.getElementById("btnEnviarPac")
const listaPacientes = document.getElementById("listaPacientes")

// botao de cadastro de paciente
cadPaciente.addEventListener("click", () => {
    modalCadPaciente.showModal()
})
// botao de clique para envio de paciente
btnEnviarPac.addEventListener("click", (e) => {
    e.preventDefault()

    const nome = document.getElementById("name")
    const telefone = document.getElementById("telefone")
    const cpf = document.getElementById("cpf")
    const dataNasc = document.getElementById("dataNasc")
    const fotoPac = document.getElementById("fotoPac")

    const Paciente = {
        "name": nome.value,
        "identifier": cpf.value,
        "birthdate": dataNasc.value,
        "phone_number": telefone.value,
        "image": fotoPac.value
    }

    fetch("http://localhost:5566/pacients",  {
        method: 'POST',
            headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(Paciente)
    }).then((resp) => {
        resp.json().then(() => {
            console.log("certo")
            modalCadPaciente.close()
        })
    })
})

// lista de pacientes cadastrados
let lista = ''
fetch("http://localhost:5566/pacients").then((resposta) => {
    resposta.json().then((dados) => {
        dados.forEach((paciente) => {
            // console.log(paciente.name)
            lista += 
            `<div class="pacienteUnidade">
            <p>${paciente.name}</p>
            <p>${paciente.birthdate}</p>
            <p>${paciente.identifier}</p>
            <p>${paciente.phone_number}</p>
            <p>Não atendido</p>
            <button class="btnAtenderPaciente"><a href="paginaDeAtendimento.html"> => </a></button>
            </div>`

            listaPacientes.innerHTML = lista
        });
    })
})