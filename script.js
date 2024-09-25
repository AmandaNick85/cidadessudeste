// API do IBGE para obter estados e cidades
const estadosAPI = "https://servicodados.ibge.gov.br/api/v1/localidades/regioes/{macrorregiao}/estados";
const cidadesAPI = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios";

// Mapeamento de cidades para URLs das prefeituras(adicione mais conforme necessário)
const prefeituras = {
    "São Paulo": "https://www.capital.sp.gov.br/",
    "Guarulhos" : "https://www.guarulhos.sp.gov.br/" ,
    "Campinas" : "https://www.campinas.sp.gov.br/" ,
    "São Bernardo do Campo" : "https://www.saobernardo.sp.gov.br/prefeitura" ,
    "Campos do Jordão" : "https://www.camposdojordao.sp.gov.br/" , //Cidade que amo passear
    "Osasco" : "https://osasco.sp.gov.br/" ,
    "Santos" : "https://www.santos.sp.gov.br/" ,
    "Rio de Janeiro": "http://www.rio.rj.gov.br/",
    "Aperibé" : "https://www.aperibe.rj.gov.br/" ,
    "Maricá" : "https://www.marica.rj.gov.br/" ,
    "Valença" : "https://valenca.rj.gov.br/" ,
    "Niterói" : "https://niteroi.rj.gov.br/" ,
    "Itaboraí" : "https://site.ib.itaborai.rj.gov.br/" ,
    "Macaé" : "https://www.macae.rj.gov.br/" ,
    "Campos dos Goytacazes" : "https://www.campos.rj.gov.br/" , 
    "Italva" : "https://italva.rj.gov.br/home" ,
    "Volta Redonda" : "https://www.voltaredonda.rj.gov.br/" ,
    "Abaeté" : "https://abaete.mg.gov.br/" ,
    "Belo Horizonte": "https://prefeitura.pbh.gov.br/",
    "Uberlândia" : "https://www.uberlandia.mg.gov.br/" , 
    "Contagem" : "https://portal.contagem.mg.gov.br/" ,
    "Juiz de Fora" : "https://www.pjf.mg.gov.br/" , //tenho pavor... quando pequena minha mãe me ameaçava de colocar no colégio interno lá
    "Montes Claros" : "https://portal.montesclaros.mg.gov.br/" ,
    "Cariacica" : "https://www.cariacica.es.gov.br/" ,
    "Cachoeiro de Itapemerim" : "https://www.cachoeiro.es.gov.br/" ,
    "Linhares" : "https://linhares.es.gov.br/" ,
    "Guarapari" : "https://www.guarapari.es.gov.br/" ,
    "Vitória" : "https://m.vitoria.es.gov.br/" ,
    "Vila Velha" : "https://www.vilavelha.es.gov.br/" ,
    "São Mateus" : "https://www.saomateus.es.gov.br/" ,
//Cansei... ja ta bom pra começar
};

// código da macrorregião 3 que é a região Sudeste pra identificar no site no IBGE onde puxa a API
const macrorregiao = 3;

async function carregarEstados() {
    try {
        const response = await fetch(estadosAPI.replace("{macrorregiao}", macrorregiao));
        const estados = await response.json();

        const botoesEstados = document.getElementById('botoes-estados');

        estados.forEach(estado => {
            const button = document.createElement('button');
            button.classList.add('estado-btn');
            button.textContent = estado.nome; // Nome do estado (ex: São Paulo)
            button.value = estado.sigla; // Sigla do estado (ex: SP)
            button.addEventListener('click', () => carregarCidades(estado.sigla));
            botoesEstados.appendChild(button);
        });
    } catch (error) {
        console.error("Erro ao carregar os estados:", error);
    }
}

// Função para carregar cidades com base no estado clicado
async function carregarCidades(estadoUF) {
    const botoesCidades = document.getElementById('botoes-cidades');
    botoesCidades.innerHTML = '<p>Carregando cidades...</p>';

    try {
        const response = await fetch(cidadesAPI.replace("{UF}", estadoUF));
        const cidades = await response.json();

        botoesCidades.innerHTML = ''; // Limpa a lista antes de inserir as cidades

        if (cidades.length > 0) {
            cidades.forEach(cidade => {
                const button = document.createElement('button');
                button.classList.add('cidade-btn');
                button.textContent = cidade.nome;

                // Verifica se a cidade tem um site de prefeitura mapeado
                if (prefeituras[cidade.nome]) {
                    button.addEventListener('click', () => {
                        window.open(prefeituras[cidade.nome], "_blank");
                    });
                } else {
                    button.disabled = true; // Se não houver site da prefeitura, o botão fica desativado
                    button.textContent += " (Sem site)";
                }

                botoesCidades.appendChild(button);
            });
        } else {
            botoesCidades.innerHTML = '<p>Nenhuma cidade encontrada.</p>';
        }
    } catch (error) {
        console.error("Erro ao carregar as cidades:", error);
        botoesCidades.innerHTML = '<p>Erro ao carregar cidades.</p>';
    }
}

// Carregar os estados ao abrir a página
window.addEventListener('DOMContentLoaded', carregarEstados);
