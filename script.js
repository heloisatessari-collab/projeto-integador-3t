
/* ============================================================
   PROJETO INTEGRADOR CEP
   LUZ EM ENERGIA
   JAVASCRIPT INTERATIVO
   Física Quântica • Tecnociência • Programação • Robótica
============================================================ */

"use strict";

/* ============================================================
   1. INICIALIZAÇÃO GERAL
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    iniciarCarregamento();
    iniciarMenu();
    iniciarNavegacao();
    iniciarEspectro();
    iniciarSimuladorOndas();
    iniciarSimuladorCorpoNegro();
    iniciarSimuladorFotoeletrico();
    iniciarSimuladorFoton();
    iniciarQuiz();
    iniciarRoboVirtual();
    iniciarVoltarAoTopo();
    iniciarAnoAtual();
    iniciarAnimacoes();
    iniciarEfeitosInterativos();

});


/* ============================================================
   2. FUNÇÕES MATEMÁTICAS E FORMATAÇÃO
============================================================ */

const CONSTANTES = {
    velocidadeLuz: 299792458,
    planck: 6.62607015e-34,
    cargaEletron: 1.602176634e-19,
    constanteWien: 2.897771955e-3
};

function formatarCientifico(numero, casas = 3) {

    if (!Number.isFinite(numero)) {
        return "Valor inválido";
    }

    if (numero === 0) return "0";

    return numero.toExponential(casas)
        .replace(".", ",")
        .replace("e+", " × 10^")
        .replace("e-", " × 10^−");
}

function formatarDecimal(numero, casas = 2) {

    return Number(numero).toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}

function limitar(valor, minimo, maximo) {

    return Math.min(Math.max(valor, minimo), maximo);

}

function obterElemento(seletor) {

    return document.querySelector(seletor);

}

function atualizarTexto(seletor, texto) {

    const elemento = obterElemento(seletor);

    if (elemento) {
        elemento.textContent = texto;
    }

}


/* ============================================================
   3. TELA DE CARREGAMENTO
============================================================ */

function iniciarCarregamento() {

    const loader = obterElemento("#loader");

    if (!loader) return;

    function esconderLoader() {

        loader.classList.add("hidden");

    }

    if (document.readyState === "complete") {

        esconderLoader();

    } else {

        window.addEventListener("load", esconderLoader, {
            once: true
        });

    }

}


/* ============================================================
   4. MENU RESPONSIVO
============================================================ */

function iniciarMenu() {

    const botao = obterElemento(".menu-toggle");
    const menu = obterElemento(".main-nav");

    if (!botao || !menu) return;

    botao.addEventListener("click", () => {

        const aberto = menu.classList.toggle("active");

        botao.setAttribute(
            "aria-expanded",
            String(aberto)
        );

        botao.textContent = aberto ? "✕" : "☰";

    });

    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

            botao.setAttribute("aria-expanded", "false");

            botao.textContent = "☰";

        });

    });

    document.addEventListener("click", event => {

        if (
            !menu.contains(event.target) &&
            !botao.contains(event.target)
        ) {

            menu.classList.remove("active");

            botao.setAttribute("aria-expanded", "false");

            botao.textContent = "☰";

        }

    });

}


/* ============================================================
   5. NAVEGAÇÃO SUAVE
============================================================ */

function iniciarNavegacao() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const destino = link.getAttribute("href");

            if (!destino || destino === "#") return;

            const secao = document.querySelector(destino);

            if (!secao) return;

            event.preventDefault();

            secao.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* ============================================================
   6. ESPECTRO ELETROMAGNÉTICO INTERATIVO
============================================================ */

function iniciarEspectro() {

    const botoes = document.querySelectorAll("[data-spectrum]");
    const painel = obterElemento("#spectrumInfo");

    if (!botoes.length || !painel) return;

    const informacoes = {

        radio: {
            icone: "📻",
            titulo: "Ondas de rádio",
            descricao:
                "Possuem grandes comprimentos de onda e são utilizadas em transmissões de rádio, televisão e comunicação sem fio.",
            faixa:
                "Frequência aproximada: até centenas de GHz, conforme a classificação utilizada.",
            aplicacao:
                "Comunicação, radiodifusão e telecomunicações."
        },

        microwave: {
            icone: "📡",
            titulo: "Micro-ondas",
            descricao:
                "São utilizadas em sistemas de comunicação, radares e no aquecimento de alimentos.",
            faixa:
                "Faixa aproximada: 300 MHz a 300 GHz.",
            aplicacao:
                "Wi-Fi, radar, satélites e fornos de micro-ondas."
        },

        infrared: {
            icone: "🔥",
            titulo: "Infravermelho",
            descricao:
                "Está relacionado à radiação térmica emitida pelos corpos e pode ser detectado por sensores específicos.",
            faixa:
                "Comprimento de onda aproximado: 700 nm a 1 mm.",
            aplicacao:
                "Controles remotos, câmeras térmicas e sensores."
        },

        visible: {
            icone: "🌈",
            titulo: "Luz visível",
            descricao:
                "É a região do espectro eletromagnético que pode ser percebida pelo olho humano.",
            faixa:
                "Comprimento de onda aproximado: 380 nm a 750 nm.",
            aplicacao:
                "Visão humana, iluminação, fotografia e energia solar."
        },

        ultraviolet: {
            icone: "🟣",
            titulo: "Ultravioleta",
            descricao:
                "Possui frequência maior que a luz visível e pode provocar reações químicas e efeitos biológicos.",
            faixa:
                "Comprimento de onda aproximado: 10 nm a 400 nm.",
            aplicacao:
                "Esterilização especializada, análises e processos industriais."
        },

        xray: {
            icone: "🩻",
            titulo: "Raios X",
            descricao:
                "São radiações de alta energia que podem atravessar tecidos e ser utilizadas para formar imagens internas.",
            faixa:
                "Comprimento de onda aproximado: 0,01 nm a 10 nm.",
            aplicacao:
                "Radiografias, tomografias e inspeção de materiais."
        },

        gamma: {
            icone: "⚛️",
            titulo: "Raios gama",
            descricao:
                "Estão entre as radiações eletromagnéticas de maior energia e podem ser produzidos em processos nucleares e fenômenos astrofísicos.",
            faixa:
                "Comprimento de onda geralmente inferior a 0,01 nm.",
            aplicacao:
                "Radioterapia, pesquisa nuclear e astronomia."
        }

    };

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            const chave = botao.dataset.spectrum;

            const info = informacoes[chave];

            if (!info) return;

            botoes.forEach(item => {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            botao.classList.add("active");
            botao.setAttribute("aria-pressed", "true");

            painel.innerHTML = `
                <div class="spectrum-info-icon">
                    ${info.icone}
                </div>

                <div>
                    <h4>${info.titulo}</h4>

                    <p>${info.descricao}</p>

                    <p><strong>${info.faixa}</strong></p>

                    <p>Aplicações: ${info.aplicacao}</p>
                </div>
            `;

        });

    });

}


/* ============================================================
   7. SIMULADOR DE ONDAS ELETROMAGNÉTICAS
============================================================ */

/*
   Fórmula:

   c = λ × f

   f = c / λ

   c = velocidade da luz
   λ = comprimento de onda
   f = frequência
*/

function iniciarSimuladorOndas() {

    const controle = obterElemento("#wavelength");

    const valorOnda = obterElemento("#wavelengthValue");

    const valorFrequencia = obterElemento("#frequencyValue");

    const resultado = obterElemento("#waveResult");

    const ondaVisual = obterElemento("#miniWave");

    if (!controle) return;

    function calcular() {

        const lambda = Number(controle.value);

        if (lambda <= 0 || !Number.isFinite(lambda)) return;

        const frequencia =
            CONSTANTES.velocidadeLuz / lambda;

        const comprimentoNm = lambda * 1e9;

        if (valorOnda) {

            valorOnda.textContent =
                formatarDecimal(comprimentoNm, 2) + " nm";

        }

        if (valorFrequencia) {

            valorFrequencia.textContent =
                formatarCientifico(frequencia, 3) + " Hz";

        }

        if (resultado) {

            let regiao = "";

            if (comprimentoNm < 10) {

                regiao = "Região de raios X ou gama";

            } else if (comprimentoNm < 380) {

                regiao = "Região ultravioleta";

            } else if (comprimentoNm <= 750) {

                regiao = "Região de luz visível";

            } else if (comprimentoNm < 1e6) {

                regiao = "Região infravermelha";

            } else if (comprimentoNm < 1e9) {

                regiao = "Região de micro-ondas";

            } else {

                regiao = "Região de ondas de rádio";

            }

            resultado.innerHTML = `
                <strong>Frequência:</strong>
                ${formatarCientifico(frequencia)} Hz
                <br>

                <strong>Comprimento de onda:</strong>
                ${formatarCientifico(lambda)} m
                <br>

                <strong>Velocidade:</strong>
                299.792.458 m/s
                <br>

                <strong>Faixa aproximada:</strong>
                ${regiao}
            `;

        }

        if (ondaVisual) {

            const escala = limitar(
                comprimentoNm / 750,
                0.05,
                1
            );

            ondaVisual.style.backgroundSize =
                `${10 + escala * 50}px 100%`;

        }

    }

    controle.addEventListener("input", calcular);

    calcular();

}


/* ============================================================
   8. SIMULADOR DE RADIAÇÃO DO CORPO NEGRO
============================================================ */

/*
   Lei de Wien:

   λmáx = b / T

   b = constante de Wien
   T = temperatura absoluta em kelvin
*/

function iniciarSimuladorCorpoNegro() {

    const controle = obterElemento("#temperature");

    const valor = obterElemento("#temperatureValue");

    const objeto = obterElemento("#temperatureObject");

    const resultado = obterElemento("#blackbodyResult");

    if (!controle) return;

    function calcularTemperatura() {

        const temperatura = Number(controle.value);

        if (temperatura <= 0) return;

        const lambda =
            CONSTANTES.constanteWien / temperatura;

        const nanometros = lambda * 1e9;

        if (valor) {

            valor.textContent =
                formatarDecimal(temperatura, 0) + " K";

        }

        let cor;
        let descricao;

        if (temperatura < 2500) {

            cor = "radial-gradient(circle, #fff2c7, #ff8c37, #8b241b)";
            descricao = "Radiação predominantemente infravermelha, com brilho avermelhado.";

        } else if (temperatura < 4000) {

            cor = "radial-gradient(circle, #fff4c5, #ffae49, #e34c25)";
            descricao = "A emissão visível apresenta tons quentes, amarelados e alaranjados.";

        } else if (temperatura < 6000) {

            cor = "radial-gradient(circle, #ffffff, #ffe5a1, #f7b54a)";
            descricao = "A emissão apresenta uma distribuição mais intensa na região visível.";

        } else {

            cor = "radial-gradient(circle, #ffffff, #c5ddff, #6497ff)";
            descricao = "A emissão máxima se desloca para comprimentos de onda menores.";

        }

        if (objeto) {

            objeto.style.background = cor;

            objeto.style.boxShadow =
                `0 0 ${20 + temperatura / 100}px rgba(255,170,65,.45)`;

        }

        if (resultado) {

            resultado.innerHTML = `
                <strong>Resultado da experiência</strong>

                <p>
                    Temperatura: ${formatarDecimal(temperatura, 0)} K
                </p>

                <p>
                    Comprimento de onda máximo:
                    ${formatarDecimal(nanometros, 2)} nm
                </p>

                <p>
                    ${descricao}
                </p>

                <p>
                    Pela Lei de Wien, quanto maior a temperatura,
                    menor será o comprimento de onda de máxima emissão.
                </p>
            `;

        }

    }

    controle.addEventListener("input", calcular);

    calcular();

}


/* ============================================================
   9. SIMULADOR DO EFEITO FOTOELÉTRICO
============================================================ */

/*
   Equação de Einstein:

   Ec = h × f - Φ

   E = h × f

   f0 = Φ / h

   Se h × f > Φ, ocorre emissão de elétrons.
*/

function iniciarSimuladorFotoeletrico() {

    const frequencia = obterElemento("#photoFrequency");

    const funcaoTrabalho = obterElemento("#workFunction");

    const valorFrequencia =
        obterElemento("#photoFrequencyValue");

    const valorTrabalho =
        obterElemento("#workFunctionValue");

    const resultado =
        obterElemento("#photoelectricResult");

    const status =
        obterElemento("#photoelectricStatus");

    if (!frequencia || !funcaoTrabalho) return;

    function calcularFotoeletrico() {

        const f = Number(frequencia.value);

        const phi = Number(funcaoTrabalho.value);

        if (
            f <= 0 ||
            phi < 0 ||
            !Number.isFinite(f) ||
            !Number.isFinite(phi)
        ) return;

        const energiaFoton =
            CONSTANTES.planck * f;

        const energiaCinetica =
            energiaFoton - phi;

        const frequenciaLimite =
            phi / CONSTANTES.planck;

        if (valorFrequencia) {

            valorFrequencia.textContent =
                formatarCientifico(f, 2) + " Hz";

        }

        if (valorTrabalho) {

            valorTrabalho.textContent =
                formatarCientifico(phi, 2) + " J";

        }

        const ocorreEmissao = energiaCinetica > 0;

        if (status) {

            status.textContent =
                ocorreEmissao ? "⚡ ELÉTRONS LIBERADOS!" :
                "⛔ SEM EMISSÃO";

            status.style.color =
                ocorreEmissao ? "#27e6a4" : "#ff8b8b";

        }

        if (resultado) {

            if (ocorreEmissao) {

                const energiaEV =
                    energiaCinetica / CONSTANTES.cargaEletron;

                resultado.innerHTML = `
                    <strong>O efeito fotoelétrico está acontecendo!</strong>

                    <p>
                        A energia dos fótons é suficiente para superar
                        a função trabalho do material.
                    </p>

                    <p>
                        <strong>Energia do fóton:</strong>
                        ${formatarCientifico(energiaFoton)} J
                    </p>

                    <p>
                        <strong>Energia cinética máxima:</strong>
                        ${formatarCientifico(energiaCinetica)} J
                    </p>

                    <p>
                        <strong>Energia cinética:</strong>
                        ${formatarDecimal(energiaEV, 4)} eV
                    </p>

                    <p>
                        <strong>Frequência limite:</strong>
                        ${formatarCientifico(frequenciaLimite)} Hz
                    </p>
                `;

            } else {

                resultado.innerHTML = `
                    <strong>Não ocorreu emissão de elétrons.</strong>

                    <p>
                        A energia dos fótons ainda não é suficiente
                        para superar a função trabalho.
                    </p>

                    <p>
                        <strong>Energia do fóton:</strong>
                        ${formatarCientifico(energiaFoton)} J
                    </p>

                    <p>
                        <strong>Função trabalho:</strong>
                        ${formatarCientifico(phi)} J
                    </p>

                    <p>
                        <strong>Frequência mínima necessária:</strong>
                        ${formatarCientifico(frequenciaLimite)} Hz
                    </p>

                    <p>
                        Experimente aumentar a frequência da luz.
                    </p>
                `;

            }

        }

    }

    frequencia.addEventListener("input", calcularFotoeletrico);

    funcaoTrabalho.addEventListener("input", calcularFotoeletrico);

    calcularFotoeletrico();

}


/* ============================================================
   10. SIMULADOR DE ENERGIA DO FÓTON
============================================================ */

/*
   E = h × f

   E = energia
   h = constante de Planck
   f = frequência
*/

function iniciarSimuladorFoton() {

    const controle = obterElemento("#photonFrequency");

    const valorFrequencia =
        obterElemento("#photonFrequencyValue");

    const valorEnergia =
        obterElemento("#photonEnergyValue");

    const resultado =
        obterElemento("#photonResult");

    if (!controle) return;

    function calcularFoton() {

        const frequencia = Number(controle.value);

        if (frequencia <= 0) return;

        const energia =
            CONSTANTES.planck * frequencia;

        const energiaEV =
            energia / CONSTANTES.cargaEletron;

        if (valorFrequencia) {

            valorFrequencia.textContent =
                formatarCientifico(frequencia, 2) + " Hz";

        }

        if (valorEnergia) {

            valorEnergia.textContent =
                formatarCientifico(energia, 3) + " J";

        }

        if (resultado) {

            let classificacao = "";

            if (frequencia < 3e11) {

                classificacao = "Baixa frequência";

            } else if (frequencia < 4e14) {

                classificacao = "Radiação de menor energia";

            } else if (frequencia < 7.5e14) {

                classificacao = "Faixa aproximada da luz visível";

            } else {

                classificacao = "Radiação de maior frequência";

            }

            resultado.innerHTML = `
                <strong>Energia do fóton:</strong>
                ${formatarCientifico(energia)} J

                <br><br>

                <strong>Em elétron-volts:</strong>
                ${formatarDecimal(energiaEV, 5)} eV

                <br><br>

                <strong>Classificação:</strong>
                ${classificacao}

                <br><br>

                Aumentar a frequência significa aumentar
                a energia transportada por cada fóton.
            `;

        }

    }

    controle.addEventListener("input", calcularFoton);

    calcularFoton();

}


/* ============================================================
   11. QUIZ INTERATIVO
============================================================ */

const perguntasQuiz = [

    {
        pergunta:
            "O que são ondas eletromagnéticas?",

        alternativas: [
            "Ondas que precisam de água.",
            "Oscilações dos campos elétrico e magnético.",
            "Ondas que só existem no espaço.",
            "Vibrações que precisam de ar."
        ],

        correta: 1,

        explicacao:
            "As ondas eletromagnéticas são formadas por campos elétricos e magnéticos oscilantes e podem se propagar no vácuo."
    },

    {
        pergunta:
            "Qual é a velocidade aproximada da luz no vácuo?",

        alternativas: [
            "300 km/s",
            "3.000 km/s",
            "300.000 km/s",
            "30.000 km/s"
        ],

        correta: 2,

        explicacao:
            "A velocidade da luz no vácuo é aproximadamente 300 mil quilômetros por segundo."
    },

    {
        pergunta:
            "O que explica a Lei de Wien?",

        alternativas: [
            "A relação entre temperatura e comprimento de onda máximo.",
            "A velocidade de um robô.",
            "A massa de um elétron.",
            "A intensidade do som."
        ],

        correta: 0,

        explicacao:
            "A Lei de Wien mostra que o comprimento de onda de máxima emissão diminui quando a temperatura aumenta."
    },

    {
        pergunta:
            "O que é o efeito fotoelétrico?",

        alternativas: [
            "A transformação de luz em som.",
            "A emissão de elétrons por um material ao receber luz adequada.",
            "A reflexão da luz em um espelho.",
            "O aquecimento de um metal pela água."
        ],

        correta: 1,

        explicacao:
            "O efeito fotoelétrico acontece quando fótons transferem energia suficiente para retirar elétrons de um material."
    },

    {
        pergunta:
            "Qual cientista explicou o efeito fotoelétrico utilizando a ideia de fótons?",

        alternativas: [
            "Isaac Newton",
            "Galileu Galilei",
            "Albert Einstein",
            "Charles Darwin"
        ],

        correta: 2,

        explicacao:
            "Albert Einstein explicou o efeito fotoelétrico em 1905 utilizando a hipótese dos quanta de luz."
    },

    {
        pergunta:
            "Qual componente pode funcionar como o cérebro do robô?",

        alternativas: [
            "Roda",
            "Arduino",
            "Lâmpada",
            "Parafuso"
        ],

        correta: 1,

        explicacao:
            "O Arduino recebe os dados dos sensores, processa as informações e envia comandos aos atuadores."
    },

    {
        pergunta:
            "Qual é a relação entre frequência e comprimento de onda no vácuo?",

        alternativas: [
            "Quanto maior a frequência, maior o comprimento de onda.",
            "Não existe relação.",
            "Quanto maior a frequência, menor o comprimento de onda.",
            "Os valores são sempre iguais."
        ],

        correta: 2,

        explicacao:
            "Como a velocidade da luz é constante no vácuo, frequência e comprimento de onda são inversamente proporcionais."
    },

    {
        pergunta:
            "Qual tecnologia utiliza o efeito fotovoltaico para gerar eletricidade?",

        alternativas: [
            "Painéis solares fotovoltaicos",
            "Alto-falantes",
            "Motores a combustão",
            "Termômetros comuns"
        ],

        correta: 0,

        explicacao:
            "As células fotovoltaicas convertem a energia luminosa em energia elétrica."
    }

];


function iniciarQuiz() {

    const perguntaElemento =
        obterElemento("#quizQuestion");

    const opcoesElemento =
        obterElemento("#quizOptions");

    const feedback =
        obterElemento("#quizFeedback");

    const progresso =
        obterElemento("#progressBar");

    const botaoProxima =
        obterElemento("#nextQuestion");

    const pontuacaoElemento =
        obterElemento("#quizScore");

    if (!perguntaElemento || !opcoesElemento) return;

    let indiceAtual = 0;

    let pontuacao = 0;

    let respondeu = false;

    let finalizado = false;


    function mostrarPergunta() {

        respondeu = false;

        finalizado = false;

        const questao = perguntasQuiz[indiceAtual];

        perguntaElemento.textContent =
            `${indiceAtual + 1}. ${questao.pergunta}`;

        opcoesElemento.innerHTML = "";

        if (feedback) {

            feedback.textContent = "";

            feedback.className = "";

        }

        if (botaoProxima) {

            botaoProxima.disabled = true;

            botaoProxima.textContent = "Próxima pergunta";

        }

        questao.alternativas.forEach((alternativa, indice) => {

            const botao = document.createElement("button");

            botao.type = "button";

            botao.className = "quiz-option";

            botao.textContent = alternativa;

            botao.setAttribute("aria-pressed", "false");

            botao.addEventListener("click", () => {

                responderPergunta(indice, botao);

            });

            opcoesElemento.appendChild(botao);

        });

        atualizarProgresso();

    }


    function responderPergunta(indice, botaoSelecionado) {

        if (respondeu) return;

        respondeu = true;

        const questao = perguntasQuiz[indiceAtual];

        const botoes =
            opcoesElemento.querySelectorAll(".quiz-option");

        const acertou = indice === questao.correta;

        if (acertou) {

            pontuacao++;

            botaoSelecionado.classList.add("correct");

        } else {

            botaoSelecionado.classList.add("incorrect");

            botoes[questao.correta].classList.add("correct");

        }

        botoes.forEach(botao => {

            botao.disabled = true;

        });

        if (feedback) {

            feedback.textContent =
                (acertou ? "✓ Muito bem! " : "✕ Resposta incorreta. ") +
                questao.explicacao;

            feedback.className =
                acertou ? "correct" : "incorrect";

        }

        if (pontuacaoElemento) {

            pontuacaoElemento.textContent =
                `Pontuação: ${pontuacao}`;

        }

        if (botaoProxima) {

            botaoProxima.disabled = false;

            botaoProxima.textContent =
                indiceAtual === perguntasQuiz.length - 1
                    ? "Ver resultado final"
                    : "Próxima pergunta";

        }

    }


    function atualizarProgresso() {

        if (!progresso) return;

        const percentual =
            ((indiceAtual + 1) / perguntasQuiz.length) * 100;

        progresso.style.width = percentual + "%";

    }


    function mostrarResultadoFinal() {

        finalizado = true;

        perguntaElemento.textContent =
            "🏆 Desafio concluído!";

        opcoesElemento.innerHTML = "";

        const percentual =
            (pontuacao / perguntasQuiz.length) * 100;

        let mensagem;

        if (pontuacao === perguntasQuiz.length) {

            mensagem = "PERFEITO! Você é um verdadeiro cientista!";

        } else if (percentual >= 75) {

            mensagem = "EXCELENTE! Você domina muito bem o conteúdo!";

        } else if (percentual >= 50) {

            mensagem = "MUITO BOM! Você está aprendendo bastante!";

        } else {

            mensagem = "CONTINUE EXPLORANDO! A ciência é feita de descobertas!";

        }

        if (feedback) {

            feedback.className = "quiz-final-result";

            feedback.innerHTML = `
                <h3>${mensagem}</h3>

                <p>
                    Você acertou
                    <strong>${pontuacao}</strong>
                    de
                    <strong>${perguntasQuiz.length}</strong>
                    perguntas.
                </p>

                <p>
                    Aproveite para revisar as experiências
                    e tentar novamente!
                </p>
            `;

        }

        if (botaoProxima) {

            botaoProxima.disabled = false;

            botaoProxima.textContent = "⟳ Refazer quiz";

        }

        if (progresso) {

            progresso.style.width = "100%";

        }

    }


    if (botaoProxima) {

        botaoProxima.addEventListener("click", () => {

            if (finalizado) {

                indiceAtual = 0;

                pontuacao = 0;

                if (pontuacaoElemento) {

                    pontuacaoElemento.textContent =
                        "Pontuação: 0";

                }

                mostrarPergunta();

                return;

            }

            if (!respondeu) return;

            if (indiceAtual < perguntasQuiz.length - 1) {

                indiceAtual++;

                mostrarPergunta();

            } else {

                mostrarResultadoFinal();

            }

        });

    }

    mostrarPergunta();

}


/* ============================================================
   12. ROBÔ VIRTUAL
============================================================ */

function iniciarRoboVirtual() {

    const robo = obterElemento("#robot");

    const mensagem = obterElemento("#robotMessage");

    const botoes = document.querySelectorAll(
        "[data-robot-action]"
    );

    if (!robo || !botoes.length) return;

    let posicaoX = 0;

    let posicaoY = 0;

    let rotacao = 0;

    let escala = 1;

    const limite = 100;

    function atualizarRobo() {

        robo.style.transform = `
            translate(calc(-50% + ${posicaoX}px),
            calc(-50% + ${posicaoY}px))
            rotate(${rotacao}deg)
            scale(${escala})
        `;

    }

    function informar(texto) {

        if (mensagem) {

            mensagem.textContent = texto;

        }

    }

    function executarComando(acao) {

        switch (acao) {

            case "forward":

                posicaoY -= 20;

                informar("Robô avançando!");

                break;

            case "backward":

                posicaoY += 20;

                informar("Robô recuando!");

                break;

            case "left":

                posicaoX -= 20;

                informar("Robô se deslocando para a esquerda!");

                break;

            case "right":

                posicaoX += 20;

                informar("Robô se deslocando para a direita!");

                break;

            case "rotate-left":

                rotacao -= 30;

                informar("Robô girando para a esquerda!");

                break;

            case "rotate-right":

                rotacao += 30;

                informar("Robô girando para a direita!");

                break;

            case "stop":

                informar("■ Robô parado!");

                return;

            case "reset":

                posicaoX = 0;

                posicaoY = 0;

                rotacao = 0;

                escala = 1;

                informar("Robô voltou à posição inicial!");

                break;

            default:

                return;

        }

        posicaoX = limitar(posicaoX, -limite, limite);

        posicaoY = limitar(posicaoY, -limite, limite);

        atualizarRobo();

    }

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            executarComando(botao.dataset.robotAction);

        });

    });

    atualizarRobo();

}


/* ============================================================
   13. EFEITO DE MOVIMENTO DO SOL NO SIMULADOR
============================================================ */

function iniciarEfeitosInterativos() {

    const sol = obterElemento("#gameSun");

    if (!sol) return;

    let posicao = 0;

    sol.addEventListener("click", () => {

        posicao = (posicao + 1) % 3;

        const posicoes = [
            "15%",
            "50%",
            "85%"
        ];

        sol.style.right = posicoes[posicao];

        sol.style.transition = "right .5s ease";

    });

}


/* ============================================================
   14. BOTÃO VOLTAR AO TOPO
============================================================ */

function iniciarVoltarAoTopo() {

    const botao = obterElemento(".back-to-top");

    if (!botao) return;

    function verificarRolagem() {

        if (window.scrollY > 400) {

            botao.classList.add("visible");

        } else {

            botao.classList.remove("visible");

        }

    }

    window.addEventListener("scroll", verificarRolagem);

    botao.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    verificarRolagem();

}


/* ============================================================
   15. ANO AUTOMÁTICO
============================================================ */

function iniciarAnoAtual() {

    document.querySelectorAll(".current-year").forEach(elemento => {

        elemento.textContent = new Date().getFullYear();

    });

}


/* ============================================================
   16. ANIMAÇÕES DE APRESENTAÇÃO
============================================================ */

function iniciarAnimacoes() {

    const elementos = document.querySelectorAll(
        ".interactive-card, " +
        ".application-card, " +
        ".component-card, " +
        ".curiosity-card, " +
        ".process-step, " +
        ".expected-grid > div"
    );

    if (!("IntersectionObserver" in window)) return;

    const observador = new IntersectionObserver(

        (entradas, observer) => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    entrada.target.style.opacity = "1";

                    entrada.target.style.transform = "translateY(0)";

                    observer.unobserve(entrada.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    elementos.forEach(elemento => {

        elemento.style.opacity = "0";

        elemento.style.transform = "translateY(25px)";

        elemento.style.transition =
            "opacity .7s ease, transform .7s ease";

        observador.observe(elemento);

    });

}


/* ============================================================
   17. MENSAGEM NO CONSOLE
============================================================ */

console.log(
    "%c☀ LUZ EM ENERGIA",
    "color:#18d8d0;font-size:25px;font-weight:bold;"
);

console.log(
    "%cProjeto Integrador CEP - Física, Tecnociência e Robótica",
    "color:#f5bd4a;font-size:13px;"
);

console.log(
    "Sistema interativo inicializado com sucesso."
);
