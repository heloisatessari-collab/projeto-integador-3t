
/* =========================================================
   PROJETO INTEGRADOR CEP — LUZ EM ENERGIA
   JavaScript: interatividade, ciência, acessibilidade e robótica
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    iniciarMenu();
    iniciarAcessibilidade();
    iniciarVoltarAoTopo();
    iniciarRolagemSuave();
    iniciarSimuladores();
    iniciarQuiz();
    iniciarRobótica();
    iniciarAnoAtual();
    iniciarAnimacoes();
});

/* =========================================================
   1. MENU DE NAVEGAÇÃO PARA CELULAR
   ========================================================= */

function iniciarMenu() {
    const menuButton = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".main-nav");

    if (!menuButton || !menu) return;

    menuButton.addEventListener("click", () => {
        const aberto = menu.classList.toggle("active");

        menuButton.setAttribute("aria-expanded", String(aberto));
        menuButton.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", event => {
        if (
            !menu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            menu.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
}

/* =========================================================
   2. RECURSOS DE ACESSIBILIDADE
   ========================================================= */

function iniciarAcessibilidade() {
    const botoes = document.querySelectorAll(
        ".accessibility-controls button, [data-action]"
    );

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const acao =
                botao.dataset.action ||
                botao.getAttribute("aria-label")?.toLowerCase() ||
                "";

            if (
                acao.includes("aumentar") ||
                acao === "increase-font"
            ) {
                alterarFonte(1);
            } else if (
                acao.includes("diminuir") ||
                acao === "decrease-font"
            ) {
                alterarFonte(-1);
            } else if (
                acao.includes("contraste") ||
                acao === "high-contrast"
            ) {
                document.body.classList.toggle("high-contrast");
            } else if (
                acao.includes("dislexia") ||
                acao === "dyslexia-font"
            ) {
                document.body.classList.toggle("dyslexia-font");
            } else if (
                acao.includes("leitura") ||
                acao === "reading-mode"
            ) {
                document.body.classList.toggle("reading-mode");
            } else if (acao === "reset-accessibility") {
                document.body.classList.remove(
                    "high-contrast",
                    "dyslexia-font",
                    "reading-mode"
                );

                document.documentElement.style.setProperty(
                    "--font-scale",
                    "1"
                );
            }
        });
    });
}

let escalaFonte = 1;

function alterarFonte(direcao) {
    escalaFonte += direcao * 0.1;

    if (escalaFonte > 1.5) escalaFonte = 1.5;
    if (escalaFonte < 0.8) escalaFonte = 0.8;

    document.documentElement.style.setProperty(
        "--font-scale",
        escalaFonte.toFixed(1)
    );
}

/* =========================================================
   3. BOTÃO VOLTAR AO TOPO
   ========================================================= */

function iniciarVoltarAoTopo() {
    const botao = document.querySelector(".back-to-top");

    if (!botao) return;

    window.addEventListener("scroll", () => {
        botao.classList.toggle("visible", window.scrollY > 350);
    });

    botao.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* =========================================================
   4. ROLAGEM SUAVE DOS LINKS
   ========================================================= */

function iniciarRolagemSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const destino = link.getAttribute("href");

            if (!destino || destino === "#") return;

            const elemento = document.querySelector(destino);

            if (elemento) {
                event.preventDefault();

                elemento.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}

/* =========================================================
   5. SIMULADORES CIENTÍFICOS
   ========================================================= */

function iniciarSimuladores() {
    iniciarSimuladorOndas();
    iniciarSimuladorCorpoNegro();
    iniciarSimuladorFotoeletrico();
    iniciarSimuladorEnergia();
}

/* ---------------------------------------------------------
   SIMULADOR 1 — ONDAS ELETROMAGNÉTICAS

   Fórmula: c = λ × f

   c = velocidade da luz
   λ = comprimento de onda
   f = frequência
   --------------------------------------------------------- */

function iniciarSimuladorOndas() {
    const comprimento = document.querySelector(
        "#wavelength, [data-input='wavelength']"
    );

    const frequencia = document.querySelector(
        "#frequency, [data-output='frequency']"
    );

    const resultado = document.querySelector(
        "#waveResult, [data-result='wave']"
    );

    const calcular = document.querySelector(
        "#calculateWave, [data-calculate='wave']"
    );

    if (!comprimento || !resultado) return;

    function calcularOnda() {
        const lambda = Number(comprimento.value);

        if (lambda <= 0 || !Number.isFinite(lambda)) {
            resultado.textContent =
                "Informe um comprimento de onda válido.";
            return;
        }

        const c = 299792458;
        const f = c / lambda;

        if (frequencia) {
            frequencia.textContent = formatarNumero(f) + " Hz";
        }

        resultado.innerHTML =
            `<strong>Frequência:</strong> ${formatarNumero(f)} Hz<br>` +
            `<strong>Comprimento de onda:</strong> ${formatarNumero(lambda)} m<br>` +
            `<strong>Velocidade:</strong> 299.792.458 m/s`;
    }

    comprimento.addEventListener("input", calcularOnda);

    if (calcular) {
        calcular.addEventListener("click", calcularOnda);
    }

    calcularOnda();
}

/* ---------------------------------------------------------
   SIMULADOR 2 — RADIAÇÃO DO CORPO NEGRO

   Lei de Wien:
   λmáx = b / T

   b = 2,898 × 10⁻³ m.K
   T = temperatura em kelvin
   --------------------------------------------------------- */

function iniciarSimuladorCorpoNegro() {
    const temperatura = document.querySelector(
        "#temperature, [data-input='temperature']"
    );

    const resultado = document.querySelector(
        "#blackbodyResult, [data-result='blackbody']"
    );

    const calcular = document.querySelector(
        "#calculateTemperature, [data-calculate='blackbody']"
    );

    if (!temperatura || !resultado) return;

    function calcularCorpoNegro() {
        const T = Number(temperatura.value);

        if (T <= 0 || !Number.isFinite(T)) {
            resultado.textContent =
                "A temperatura deve ser maior que zero kelvin.";
            return;
        }

        const constanteWien = 2.898e-3;
        const comprimentoMaximo = constanteWien / T;
        const nanometros = comprimentoMaximo * 1e9;

        let faixa = "";

        if (nanometros < 380) {
            faixa = "Ultravioleta ou faixa de maior energia";
        } else if (nanometros <= 750) {
            faixa = "Luz visível";
        } else {
            faixa = "Infravermelho";
        }

        resultado.innerHTML =
            `<strong>Temperatura:</strong> ${formatarNumero(T)} K<br>` +
            `<strong>Comprimento de onda máximo:</strong> ` +
            `${formatarNumero(nanometros)} nm<br>` +
            `<strong>Região aproximada:</strong> ${faixa}`;
    }

    temperatura.addEventListener("input", calcularCorpoNegro);

    if (calcular) {
        calcular.addEventListener("click", calcularCorpoNegro);
    }

    calcularCorpoNegro();
}

/* ---------------------------------------------------------
   SIMULADOR 3 — EFEITO FOTOELÉTRICO

   Equação de Einstein:
   Ec = h × f - Φ

   h = constante de Planck
   f = frequência da luz
   Φ = função trabalho do material
   --------------------------------------------------------- */

function iniciarSimuladorFotoeletrico() {
    const frequencia = document.querySelector(
        "#photoFrequency, [data-input='photo-frequency']"
    );

    const funcaoTrabalho = document.querySelector(
        "#workFunction, [data-input='work-function']"
    );

    const resultado = document.querySelector(
        "#photoelectricResult, [data-result='photoelectric']"
    );

    const calcular = document.querySelector(
        "#calculatePhotoelectric, [data-calculate='photoelectric']"
    );

    if (!frequencia || !funcaoTrabalho || !resultado) return;

    function calcularEfeito() {
        const f = Number(frequencia.value);
        const phi = Number(funcaoTrabalho.value);

        if (
            f <= 0 ||
            phi < 0 ||
            !Number.isFinite(f) ||
            !Number.isFinite(phi)
        ) {
            resultado.textContent =
                "Informe valores válidos para a frequência e a função trabalho.";
            return;
        }

        const h = 6.62607015e-34;
        const cargaEletron = 1.602176634e-19;

        const energiaFoton = h * f;
        const energiaCinetica = energiaFoton - phi;
        const frequenciaLimite = phi / h;

        if (energiaCinetica > 0) {
            const energiaEV = energiaCinetica / cargaEletron;

            resultado.innerHTML =
                `<strong>Resultado:</strong> Ocorre emissão de elétrons.<br>` +
                `<strong>Energia do fóton:</strong> ` +
                `${formatarNumero(energiaFoton)} J<br>` +
                `<strong>Energia cinética máxima:</strong> ` +
                `${formatarNumero(energiaEV)} eV<br>` +
                `<strong>Frequência limite:</strong> ` +
                `${formatarNumero(frequenciaLimite)} Hz`;
        } else {
            resultado.innerHTML =
                `<strong>Resultado:</strong> Não ocorre emissão de elétrons.<br>` +
                `A energia do fóton é insuficiente para superar a função trabalho.<br>` +
                `<strong>Frequência limite:</strong> ` +
                `${formatarNumero(frequenciaLimite)} Hz`;
        }
    }

    frequencia.addEventListener("input", calcularEfeito);
    funcaoTrabalho.addEventListener("input", calcularEfeito);

    if (calcular) {
        calcular.addEventListener("click", calcularEfeito);
    }

    calcularEfeito();
}

/* ---------------------------------------------------------
   SIMULADOR 4 — ENERGIA DE UM FÓTON

   E = h × f

   Também pode ser calculada por:
   E = h × c / λ
   --------------------------------------------------------- */

function iniciarSimuladorEnergia() {
    const frequencia = document.querySelector(
        "#photonFrequency, [data-input='photon-frequency']"
    );

    const resultado = document.querySelector(
        "#photonResult, [data-result='photon']"
    );

    const calcular = document.querySelector(
        "#calculatePhoton, [data-calculate='photon']"
    );

    if (!frequencia || !resultado) return;

    function calcularEnergia() {
        const f = Number(frequencia.value);

        if (f <= 0 || !Number.isFinite(f)) {
            resultado.textContent =
                "Informe uma frequência válida.";
            return;
        }

        const h = 6.62607015e-34;
        const e = h * f;
        const ev = e / 1.602176634e-19;

        resultado.innerHTML =
            `<strong>Energia do fóton:</strong> ${formatarNumero(e)} J<br>` +
            `<strong>Energia em elétron-volts:</strong> ` +
            `${formatarNumero(ev)} eV`;
    }

    frequencia.addEventListener("input", calcularEnergia);

    if (calcular) {
        calcular.addEventListener("click", calcularEnergia);
    }

    calcularEnergia();
}

/* =========================================================
   6. QUIZ INTERATIVO
   ========================================================= */

const perguntasQuiz = [
    {
        pergunta: "O que são ondas eletromagnéticas?",
        alternativas: [
            "Ondas que precisam de água para se propagar.",
            "Oscilações dos campos elétrico e magnético.",
            "Ondas que só existem no espaço.",
            "Vibrações que precisam de ar."
        ],
        correta: 1,
        explicacao:
            "As ondas eletromagnéticas são formadas por campos elétricos e magnéticos oscilantes e podem se propagar no vácuo."
    },
    {
        pergunta: "Qual é a velocidade aproximada da luz no vácuo?",
        alternativas: [
            "300 km/s",
            "3.000 km/s",
            "300.000 km/s",
            "30.000 km/s"
        ],
        correta: 2,
        explicacao:
            "A luz se propaga no vácuo a aproximadamente 300.000 quilômetros por segundo."
    },
    {
        pergunta: "O que explica a Lei de Wien?",
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
        pergunta: "O que é o efeito fotoelétrico?",
        alternativas: [
            "A transformação de luz em som.",
            "A emissão de elétrons por um material ao receber luz adequada.",
            "A reflexão da luz em um espelho.",
            "O aquecimento de um metal pela água."
        ],
        correta: 1,
        explicacao:
            "O efeito fotoelétrico acontece quando a luz transfere energia suficiente para retirar elétrons de um material."
    },
    {
        pergunta: "Qual cientista explicou o efeito fotoelétrico utilizando a ideia de fótons?",
        alternativas: [
            "Isaac Newton",
            "Galileu Galilei",
            "Albert Einstein",
            "Charles Darwin"
        ],
        correta: 2,
        explicacao:
            "Albert Einstein explicou o efeito fotoelétrico considerando que a luz é formada por pacotes de energia chamados fótons."
    },
    {
        pergunta: "Qual componente pode funcionar como o cérebro de um robô?",
        alternativas: [
            "Roda",
            "Arduino",
            "Lâmpada",
            "Parafuso"
        ],
        correta: 1,
        explicacao:
            "Uma placa Arduino pode receber informações dos sensores, processá-las e controlar os atuadores."
    },
    {
        pergunta: "Qual é a relação entre frequência e comprimento de onda no vácuo?",
        alternativas: [
            "Quanto maior a frequência, maior o comprimento de onda.",
            "Não existe relação entre eles.",
            "Quanto maior a frequência, menor o comprimento de onda.",
            "Os dois valores são sempre iguais."
        ],
        correta: 2,
        explicacao:
            "Como a velocidade da luz no vácuo é constante, frequência e comprimento de onda são inversamente proporcionais."
    },
    {
        pergunta: "Qual tecnologia utiliza o efeito fotoelétrico para gerar eletricidade?",
        alternativas: [
            "Painéis solares fotovoltaicos",
            "Alto-falantes",
            "Motores a combustão",
            "Termômetros comuns"
        ],
        correta: 0,
        explicacao:
            "As células fotovoltaicas convertem a energia da luz em energia elétrica por meio de processos físicos relacionados ao efeito fotovoltaico."
    }
];

function iniciarQuiz() {
    const perguntaElemento = document.querySelector("#quizQuestion");
    const opcoesElemento = document.querySelector("#quizOptions");
    const feedback = document.querySelector("#quizFeedback");
    const progresso = document.querySelector("#progressBar");
    const botaoProxima = document.querySelector("#nextQuestion");
    const pontuacaoElemento = document.querySelector("#quizScore");

    if (!perguntaElemento || !opcoesElemento) return;

    let perguntaAtual = 0;
    let pontuacao = 0;
    let respondeu = false;

    function mostrarPergunta() {
        respondeu = false;

        const pergunta = perguntasQuiz[perguntaAtual];

        perguntaElemento.textContent =
            `${perguntaAtual + 1}. ${pergunta.pergunta}`;

        opcoesElemento.innerHTML = "";

        if (feedback) {
            feedback.textContent = "";
            feedback.className = "";
        }

        if (botaoProxima) {
            botaoProxima.disabled = true;
            botaoProxima.textContent =
                perguntaAtual === perguntasQuiz.length - 1
                    ? "Ver resultado"
                    : "Próxima pergunta";
        }

        pergunta.alternativas.forEach((alternativa, indice) => {
            const botao = document.createElement("button");

            botao.type = "button";
            botao.className = "quiz-option";
            botao.textContent = alternativa;

            botao.addEventListener("click", () => {
                responder(indice, botao);
            });

            opcoesElemento.appendChild(botao);
        });

        atualizarProgresso();
    }

    function responder(indice, botaoSelecionado) {
        if (respondeu) return;

        respondeu = true;

        const pergunta = perguntasQuiz[perguntaAtual];
        const botoes = opcoesElemento.querySelectorAll("button");
        const acertou = indice === pergunta.correta;

        if (acertou) {
            pontuacao++;
            botaoSelecionado.classList.add("correct");
        } else {
            botaoSelecionado.classList.add("incorrect");
            botoes[pergunta.correta]?.classList.add("correct");
        }

        botoes.forEach(botao => {
            botao.disabled = true;
        });

        if (feedback) {
            feedback.textContent =
                (acertou ? "Muito bem! " : "Não foi dessa vez. ") +
                pergunta.explicacao;

            feedback.className = acertou ? "correct" : "incorrect";
        }

        if (botaoProxima) {
            botaoProxima.disabled = false;
        }

        if (pontuacaoElemento) {
            pontuacaoElemento.textContent =
                `Pontuação: ${pontuacao}`;
        }
    }

    function atualizarProgresso() {
        if (!progresso) return;

        const percentual =
            ((perguntaAtual + 1) / perguntasQuiz.length) * 100;

        progresso.style.width = `${percentual}%`;
        progresso.setAttribute("aria-valuenow", String(percentual));
    }

    function mostrarResultadoFinal() {
        perguntaElemento.textContent = "Quiz concluído!";
        opcoesElemento.innerHTML = "";

        const percentual =
            (pontuacao / perguntasQuiz.length) * 100;

        let mensagem = "";

        if (percentual === 100) {
            mensagem = "Excelente! Você acertou todas as questões!";
        } else if (percentual >= 70) {
            mensagem = "Muito bem! Você demonstrou ótimo conhecimento.";
        } else if (percentual >= 50) {
            mensagem = "Bom trabalho! Continue estudando para avançar.";
        } else {
            mensagem = "Continue aprendendo! Revise os conteúdos e tente novamente.";
        }

        if (feedback) {
            feedback.textContent =
                `${mensagem} Você acertou ${pontuacao} de ` +
                `${perguntasQuiz.length} questões.`;
            feedback.className = "quiz-final-result";
        }

        if (botaoProxima) {
            botaoProxima.textContent = "Refazer quiz";
            botaoProxima.disabled = false;
        }

        if (progresso) {
            progresso.style.width = "100%";
        }
    }

    if (botaoProxima) {
        botaoProxima.addEventListener("click", () => {
            if (perguntaAtual < perguntasQuiz.length - 1) {
                perguntaAtual++;
                mostrarPergunta();
            } else if (perguntaAtual === perguntasQuiz.length - 1) {
                perguntaAtual++;
                mostrarResultadoFinal();
            } else {
                perguntaAtual = 0;
                pontuacao = 0;

                if (pontuacaoElemento) {
                    pontuacaoElemento.textContent = "Pontuação: 0";
                }

                mostrarPergunta();
            }
        });
    }

    mostrarPergunta();
}

/* =========================================================
   7. ROBÓTICA — SIMULAÇÃO DE MOVIMENTO
   ========================================================= */

function iniciarRobótica() {
    const robo = document.querySelector(
        "#robot, .robot-character"
    );

    const botoes = document.querySelectorAll(
        "[data-robot-action]"
    );

    const mensagem = document.querySelector(
        "#robotMessage, [data-robot-message]"
    );

    if (!robo || botoes.length === 0) return;

    let posicaoX = 0;
    let posicaoY = 0;
    let rotacao = 0;

    function atualizarRobo() {
        robo.style.transform =
            `translate(${posicaoX}px, ${posicaoY}px) rotate(${rotacao}deg)`;
    }

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const acao = botao.dataset.robotAction;

            switch (acao) {
                case "forward":
                    posicaoY -= 20;
                    break;

                case "backward":
                    posicaoY += 20;
                    break;

                case "left":
                    posicaoX -= 20;
                    break;

                case "right":
                    posicaoX += 20;
                    break;

                case "rotate-left":
                    rotacao -= 30;
                    break;

                case "rotate-right":
                    rotacao += 30;
                    break;

                case "stop":
                    if (mensagem) {
                        mensagem.textContent = "Robô parado.";
                    }
                    return;

                case "reset":
                    posicaoX = 0;
                    posicaoY = 0;
                    rotacao = 0;
                    break;

                default:
                    return;
            }

            atualizarRobo();

            if (mensagem) {
                mensagem.textContent =
                    "Comando executado: " + nomeAcaoRobo(acao);
            }
        });
    });
}

function nomeAcaoRobo(acao) {
    const nomes = {
        "forward": "avançar",
        "backward": "recuar",
        "left": "mover para a esquerda",
        "right": "mover para a direita",
        "rotate-left": "girar para a esquerda",
        "rotate-right": "girar para a direita",
        "reset": "voltar à posição inicial"
    };

    return nomes[acao] || "movimento";
}

/* =========================================================
   8. ANO AUTOMÁTICO NO RODAPÉ
   ========================================================= */

function iniciarAnoAtual() {
    document.querySelectorAll(".current-year").forEach(elemento => {
        elemento.textContent = new Date().getFullYear();
    });
}

/* =========================================================
   9. ANIMAÇÕES AO ROLAR A PÁGINA
   ========================================================= */

function iniciarAnimacoes() {
    const elementos = document.querySelectorAll(
        ".reveal, .fade-in, .simulator-card"
    );

    if (!("IntersectionObserver" in window)) {
        elementos.forEach(elemento => {
            elemento.classList.add("active");
        });
        return;
    }

    const observador = new IntersectionObserver(
        entradas => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("active");
                    observador.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    elementos.forEach(elemento => {
        observador.observe(elemento);
    });
}

/* =========================================================
   10. FUNÇÃO AUXILIAR PARA FORMATAR NÚMEROS
   ========================================================= */

function formatarNumero(numero) {
    return Number(numero).toLocaleString("pt-BR", {
        maximumFractionDigits: 6,
        notation: "scientific"
    });
}
