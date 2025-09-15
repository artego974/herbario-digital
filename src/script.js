document.addEventListener("DOMContentLoaded", () => {
  let plantasArray = [];
  let numeroId = 0;
  let numeroTotalPlantas = 0;
  const btnAdd = document.querySelector("#btn-add");
  let listaInformacoes = document.querySelector("#informacoes-recuperadas");
  let fotoPK = document.querySelector("#fotoPK");

  async function carregarPlantas() {
    const resposta = await fetch("http://localhost:3000/buscar");
    const plantas = await resposta.json();
    console.log(plantas);

    plantasArray = plantas;
    numeroTotalPlantas = plantas.length;

    botaoAvancar.disabled = false;
    botaoVoltar.disabled = false;

    mostrarPlanta();
  }

  function mostrarPlanta() {
    if (numeroId >= 0 && numeroId < numeroTotalPlantas) {
      const planta = plantasArray[numeroId];

      fotoPK.src = `${planta.imagem}`;

      listaInformacoes.innerHTML = `
                <h4>${planta.nome_popular} (${planta.nome_cientifico})</h4>
                <p><strong>Família:</strong> ${planta.familia_botanica}</p>
                <p><strong>Origem:</strong> ${planta.origem_distribuicao}</p>
                <p><strong>Usos medicinais:</strong> ${planta.usos_medicinais}</p>
                <p><strong>Princípios ativos:</strong> ${planta.principios_ativos}</p>
                <p><strong>Parte utilizada:</strong> ${planta.parte_utilizada}</p>
                <p><strong>Modo de preparo:</strong> ${planta.modo_preparo}</p>
                <p><strong>Contraindicações:</strong> ${planta.contraindicacoes}</p>
            `;
    }
  }

  function avancarPlanta() {
    if (numeroId < numeroTotalPlantas - 1) {
      numeroId++;
      mostrarPlanta();
    } else {
      console.log("Fim da lista de plantas - Avancar");
    }
  }

  const botaoAvancar = document.querySelector("#btnProximo");
  if (botaoAvancar) {
    botaoAvancar.addEventListener("click", avancarPlanta);
  }

  function VoltarPlanta() {
    if (numeroId > 0) {
      numeroId--;
      mostrarPlanta();
    } else {
      console.log("Fim da lista de plantas - Anterior");
    }
  }
  const botaoVoltar = document.querySelector("#btnVoltar");
  if (botaoVoltar) {
    botaoVoltar.addEventListener("click", VoltarPlanta);
  }

  if (botaoAvancar) botaoAvancar.disabled = true;
  if (botaoVoltar) botaoVoltar.disabled = true;

  carregarPlantas();


 btnAdd.addEventListener("click", async (e) => {
   e.preventDefault(); 

   const novaPlanta = {
     nome_popular: document.querySelector("#nome_popular").value,
     nome_cientifico: document.querySelector("#nome_cientifico").value,
     familia_botanica: document.querySelector("#familia_botanica").value,
     origem_distribuicao: document.querySelector("#origem_distribuicao").value,
     usos_medicinais: document.querySelector("#usos_medicinais").value,
     principios_ativos: document.querySelector("#principios_ativos").value,
     parte_utilizada: document.querySelector("#parte_utilizada").value,
     modo_preparo: document.querySelector("#modo_preparo").value,
     contraindicacoes: document.querySelector("#contraindicacoes").value,
     imagem: document.querySelector("#imagem").value,
   };

   try {
     const resposta = await fetch("http://localhost:3000/criar", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(novaPlanta),
     });

     const resultado = await resposta.json();
     console.log(resultado);

     if (resultado.success) {
       alert("Planta adicionada com sucesso!");
       document.querySelector("#formPlanta").reset();
     } else {
       alert("Erro ao adicionar planta: " + resultado.message);
     }
   } catch (err) {
     console.error("Erro ao enviar POST:", err);
     alert("Erro de conexão com servidor");
   }
 });
});
