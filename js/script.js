const API = "https://patio-digital-backend.onrender.com";


// ===============================
// CONSULTA (index.html)
// ===============================
async function consultarVeiculo(){

const placa = document.getElementById("placa").value;
const cpf = document.getElementById("cpf").value;

if(cpf == '' || placa == "") {
    window.alert("Campo solicitado não digitado")
} else {

try{

const resposta = await fetch(`${API}/veiculos/consulta?placa=${placa}&cpf=${cpf}`);

const veiculo = await resposta.json();

localStorage.setItem("veiculo", JSON.stringify(veiculo));

window.location.href = "consulta.html";

}catch(error){

alert("Veículo não encontrado");

}
}
}

// ===============================
// MOSTRAR RESULTADO (consulta.html)
// ===============================
function carregarConsulta(){

const veiculo = JSON.parse(localStorage.getItem("veiculo"));

if(!veiculo) return;

document.getElementById("placa").value = veiculo.placa;
document.getElementById("modelo").value = veiculo.modelo;
document.getElementById("cpf").value = veiculo.cpf; // 

document.getElementById("dataRetencao").value = veiculo.dataRetencao;
document.getElementById("status").value = veiculo.status;

document.getElementById("taxaGuincho").value = veiculo.taxaGuincho;
document.getElementById("diaria").value = veiculo.diaria; // 

document.getElementById("diasPatio").value = veiculo.diasNoPatio; // 

document.getElementById("valorTotal").value = veiculo.valorTotal;

}


// ===============================
// IR PARA HISTÓRICO
// ===============================
function irHistorico(){

window.location.href = "historico.html";

}


// ===============================
// HISTÓRICO (historico.html)
// ===============================
function carregarHistorico(){

const tabela = document.getElementById("historicoTabela");

if(!tabela) return;

const veiculo = JSON.parse(localStorage.getItem("veiculo"));

if(!veiculo || !veiculo.historico) return;

tabela.innerHTML = "";

veiculo.historico.forEach(evento => {

tabela.innerHTML += `
<tr>
<td>${formatarData(evento.dataHora)}</td>
<td>${evento.descricao}</td>
<td>Sistema</td>
</tr>
`;

});

}

function formatarData(data){
return new Date(data).toLocaleString("pt-BR");
}

// ===============================
// CADASTRAR VEÍCULO (cadastro.html)
// ===============================
async function cadastrarVeiculo(){

const veiculo = {

placa: document.getElementById("placa").value,
modelo: document.getElementById("modelo").value,
cpfProprietario: document.getElementById("cpf").value,
dataRetencao: document.getElementById("dataRetencao").value,
taxaGuincho: document.getElementById("taxaGuincho").value,
valorDiaria: document.getElementById("valorDiaria").value

};

await fetch(`${API}/veiculos`,{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(veiculo)

});

alert("Veículo cadastrado com sucesso!");

}


// ===============================
// LIBERAR VEÍCULO (liberar.html)
// ===============================
async function liberarVeiculo(){

    try{

        const placa = document.getElementById("placa").value;

        const resposta = await fetch(`${API}/veiculos/${placa}/liberar`, {
            method: "POST"
        });

        if(!resposta.ok){
            const erro = await resposta.text();
            throw new Error(erro);
        }

        const mensagem = await resposta.text();

        alert(`✅ ${mensagem}`);

        window.location.href = "dashboard.html";

    }catch(e){

        alert(`❌ ${e.message}`);
        console.log(e);

    }
}



// ===============================
// DASHBOARD (dashboard.html)
// ===============================
async function carregarDashboard(){

try{

const resposta = await fetch(`${API}/veiculos/dashboard`); // ajuste se precisar
const dados = await resposta.json();

console.log(dados); //  IMPORTANTE PRA DEBUG

document.querySelector("#veiculosPatio p").innerText = dados.veiculosPatio;

document.querySelector("#veiculosLiberados p").innerText = dados.veiculosLiberadosHoje;

document.querySelector("#valorArrecadado p").innerText =
dados.valorArrecadado.toLocaleString("pt-BR", {
style: "currency",
currency: "BRL"
});

document.querySelector("#totalApreensoes p").innerText = dados.totalApreensoes;

}catch(e){

console.log("Erro no dashboard:", e);

}

}

async function login() {
    const user = document.getElementById("user").value;
    const senha = document.getElementById("senha").value;

    if(user != "prf" || senha != "1234" ){
        alert("ACESSO NEGADO");
    } else{
        window.location.href = "cadastro.html";
    }
}

async function loginL() {
    const user = document.getElementById("user").value;
    const senha = document.getElementById("senha").value;

    if(user != "prf" || senha != "1234" ){
        alert("ACESSO NEGADO");
    } else{
        window.location.href = "liberar.html";
    }
}