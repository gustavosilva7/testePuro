
const cadPaciente = document.getElementById("cadPaciente")
const modalCadPaciente = document.getElementById("modalCadPaciente")
const btnEnviarPac = document.getElementById("btnEnviarPac")
const listaPacientes = document.getElementById("listaPacientes")

// botao de cadastro de paciente
cadPaciente.addEventListener("click", () => {
    modalCadPaciente.showModal()
})

const nome = document.getElementById("name")
const telefone = document.getElementById("telefone")
const cpf = document.getElementById("cpf")
const dataNasc = document.getElementById("dataNasc")
const fotoPac = document.getElementById("fotoPac")


telefone.addEventListener('keypress', () => {
    let telefoneLength = telefone.value.length

    if (telefoneLength === 0) {
        telefone.value += '('
    }
    else if (telefoneLength === 3) {
        telefone.value += ') 9'
    }
    else if (telefoneLength === 10) {
        telefone.value += '-'
    }
    
})

cpf.addEventListener('keypress', () => {
    let cpfLength = cpf.value.length

    if (cpfLength == 3 || cpfLength == 7) {
        cpf.value += '.'
    } else if (cpfLength === 11) {
        cpf.value += '-'
    }
})

// botao de clique para envio de paciente
btnEnviarPac.addEventListener("click", (e) => {
    e.preventDefault()

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

            const formatarCpfDoPaciente = () => {
                const cpfDoPaciente = paciente.identifier

                cpfDoPaciente[3].length += "."
                
                return cpfDoPaciente
            }

            const cpfFormatado = formatarCpfDoPaciente();
            
            lista += 
            `<div class="pacienteUnidade">
            <p>${paciente.name}</p>
            <p>${paciente.birthdate}</p>
            <p>${cpfFormatado}</p>            
            <p>${paciente.phone_number}</p>
            <p>Não atendido</p>
            <button class="btnAtenderPaciente"><a> => </a></button>
            </div>`

            listaPacientes.innerHTML = lista

            const AtenderPacintes = document.querySelectorAll(".btnAtenderPaciente")

            AtenderPacintes.forEach((atenderPaciente, index) => {
                atenderPaciente.addEventListener("click", () => {
                    console.log(dados[index].id)
                });
            })
        });
    })
})