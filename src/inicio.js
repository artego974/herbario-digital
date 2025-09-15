document.addEventListener("DOMContentLoaded", () => {
    let listaInformacoes = document.querySelector("#lista-herbario");

    async function carregarPlantas() {
        const resposta = await fetch('http://localhost:3000/buscar');
        const plantas = await resposta.json();

        plantasArray = plantas;
        numeroTotalPlantas = plantas.length;

        mostrarTodasPlantas();
    }

    function mostrarTodasPlantas() {
        plantasArray.forEach(planta => {
            const li = document.createElement("li");
            li.classList.add("planta-card");
            li.innerHTML = `
                <h4>${planta.nome_popular} (${planta.nome_cientifico})</h4>
                <img class="foto_planta" src="${planta.imagem}" alt="">
                <p><strong>Família:</strong> ${planta.familia_botanica}</p>
                <p><strong>Origem:</strong> ${planta.origem_distribuicao}</p>
                <p><strong>Usos medicinais:</strong> ${planta.usos_medicinais}</p>
                <p><strong>Princípios ativos:</strong> ${planta.principios_ativos}</p>
                <p><strong>Parte utilizada:</strong> ${planta.parte_utilizada}</p>
                <p><strong>Modo de preparo:</strong> ${planta.modo_preparo}</p>
                <p><strong>Contraindicações:</strong> ${planta.contraindicacoes}</p>
            `;
            listaInformacoes.appendChild(li);
        });
    }

    carregarPlantas();
});
