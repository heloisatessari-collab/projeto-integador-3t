
/* =========================================================
   PROJETO: EFEITO FOTOELÉTRICO E CONVERSÃO DA LUZ EM ELETRICIDADE
   JAVASCRIPT COMPLETO
   ========================================================= */


/* =========================
   1. MENU DE NAVEGAÇÃO
   ========================= */

const menuToggle = document.getElementById("menuToggle");
const navegacao = document.getElementById("navegacao");

if (menuToggle && navegacao) {

    menuToggle.addEventListener("click", () => {

        const aberto = navegacao.classList.toggle("aberto");

        menuToggle.setAttribute("aria-expanded", String(aberto));

        menuToggle.setAttribute(
            "aria-label",
            aberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
        );

        menuToggle.textContent = aberto ? "✕" : "☰";

    });

    // Fecha o menu quando um link é selecionado.

    navegacao.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navegacao.classList.remove("aberto");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu de navegação"
            );

            menuToggle.textContent = "☰";

        });

    });

}


/* =========================
   2. ACESSIBILIDADE
   ========================= */

// Aumentar e diminuir o tamanho da fonte.

const botaoAumentar = document.getElementById("aumentarFonte");
const botaoDiminuir = document.getElementById("diminuirFonte");
const botaoRestaurar = document.getElementById("restaurarAcessibilidade");

let tamanhoFonte = 16;

function atualizarFonte() {

    document.documentElement.style.fontSize = tamanhoFonte + "px";

}

if (botaoAumentar) {

    botaoAumentar.addEventListener("click", () => {

        if (tamanhoFonte < 24) {

            tamanhoFonte += 1;

            atualizarFonte();

        }

    });

}

if (botaoDiminuir) {

    botaoDiminuir.addEventListener("click", () => {

        if (tamanhoFonte > 12) {

            tamanhoFonte -= 1;

            atualizarFonte();

        }

    });

}


// Alto contraste.

const botaoContraste = document.getElementById("alternarContraste");

if (botaoContraste) {

    botaoContraste.addEventListener("click", () => {

        const ativado = document.body.classList.toggle("alto-contraste");

        botaoContraste.setAttribute(
            "aria-pressed",
            String(ativado)
        );

    });

}


// Leitura confortável.

const botaoLeitura = document.getElementById("alternarLeitura");

if (botaoLeitura) {

    botaoLeitura.addEventListener("click", () => {

        const ativado = document.body.classList.toggle("leitura-confortavel");

        botaoLeitura.setAttribute(
            "aria-pressed",
            String(ativado)
        );

    });

}


// Restaurar configurações de acessibilidade.

if (botaoRestaurar) {

    botaoRestaurar.addEventListener("click", () => {

        tamanhoFonte = 16;

        atualizarFonte();

        document.body.classList.remove("alto-contraste");

        document.body.classList.remove("leitura-confortavel");

        if (botaoContraste) {

            botaoContraste.setAttribute("aria-pressed", "false");

        }

        if (botaoLeitura) {

            botaoLeitura.setAttribute("aria-pressed", "false");

        }

    });

}


/* =========================
   3. BOTÃO VOLTAR AO TOPO
   ========================= */

const voltarTopo = document.getElementById("voltarTopo");

if (voltarTopo) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            voltarTopo.classList.add("visivel");

        } else {

            voltarTopo.classList.remove("visivel");

        }

    }, { passive: true });

    voltarTopo.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================
   4. CONSTANTES DA FÍSICA
   ========================= */

// Constante de Planck em joules por segundo.

const PLANCK = 6.62607015e-34;

// Velocidade da luz no vácuo em metros por segundo.

const VELOCIDADE_LUZ = 299792458;

// Conversão de elétron-volt para joule.

const ELETRON_VOLT = 1.602176634e-19;


/* =========================
   5. FORMATAÇÃO CIENTÍFICA
   ========================= */

function formatarCientifico(valor, casas = 2) {

    if (!Number.isFinite(valor)) {

        return "Valor inválido";

    }

    return valor.toExponential(casas).replace(".", ",");

}


/* =========================
   6. SIMULAÇÃO DA ENERGIA DO FÓTON
   ========================= */

const controleFrequencia = document.getElementById("frequencia");

const valorFrequencia = document.getElementById("valorFrequencia");

const energiaFoton = document.getElementById("energiaFoton");

const explicacaoFrequencia = document.getElementById("explicacaoFrequencia");


function atualizarEnergiaFoton() {

    if (!controleFrequencia) return;

    const frequenciaEscala = Number(controleFrequencia.value);

    // A frequência é representada em unidades de 10¹⁴ Hz.

    const frequenciaReal = frequenciaEscala * 1e14;

    // Equação de Planck: E = h × f.

    const energia = PLANCK * frequenciaReal;

    if (valorFrequencia) {

        valorFrequencia.textContent =
            frequenciaEscala.toFixed(1).replace(".", ",") +
            " × 10¹⁴ Hz";

    }

    if (energiaFoton) {

        energiaFoton.textContent =
            formatarCientifico(energia) + " J";

    }

    if (explicacaoFrequencia) {

        if (frequenciaEscala < 3) {

            explicacaoFrequencia.textContent =
                "A frequência está relativamente baixa. A energia individual de cada fóton também é menor.";

        } else if (frequenciaEscala < 7) {

            explicacaoFrequencia.textContent =
                "A frequência aumentou e, consequentemente, cada fóton transporta mais energia.";

        } else {

            explicacaoFrequencia.textContent =
                "A frequência está elevada. Cada fóton possui uma quantidade maior de energia.";

        }

    }

}

if (controleFrequencia) {

    controleFrequencia.addEventListener(
        "input",
        atualizarEnergiaFoton
    );

    atualizarEnergiaFoton();

}


/* =========================
   7. SIMULAÇÃO DO EFEITO FOTOELÉTRICO
   ========================= */

const frequenciaFoto = document.getElementById("frequenciaFoto");

const valorFrequenciaFoto = document.getElementById("valorFrequenciaFoto");

const botaoTestarFoto = document.getElementById("testarFotoeletrico");

const resultadoFoto = document.getElementById("resultadoFotoeletrico");


// Para esta demonstração, adotamos um material hipotético
// com frequência de corte de 5 × 10¹⁴ Hz.
// Esse valor é didático, não representa todos os metais.

const FREQUENCIA_CORTE = 5e14;

function atualizarFrequenciaFoto() {

    if (!frequenciaFoto) return;

    const frequencia = Number(frequenciaFoto.value);

    if (valorFrequenciaFoto) {

        valorFrequenciaFoto.textContent =
            frequencia.toFixed(1).replace(".", ",") +
            " × 10¹⁴ Hz";

    }

}

if (frequenciaFoto) {

    frequenciaFoto.addEventListener(
        "input",
        atualizarFrequenciaFoto
    );

    atualizarFrequenciaFoto();

}


if (botaoTestarFoto) {

    botaoTestarFoto.addEventListener("click", () => {

        const frequencia =
            Number(frequenciaFoto.value) * 1e14;

        const energiaFotonJ = PLANCK * frequencia;

        const energiaCorteJ = PLANCK * FREQUENCIA_CORTE;

        const energiaCinetica = energiaFotonJ - energiaCorteJ;

        if (frequencia >= FREQUENCIA_CORTE) {

            const energiaEV = energiaCinetica / ELETRON_VOLT;

            resultadoFoto.innerHTML = `
                <strong>Emissão de elétrons!</strong>
                A frequência da luz superou a frequência de corte.
                A energia cinética máxima calculada é aproximadamente
                ${formatarCientifico(energiaCinetica)} J
                (${energiaEV.toFixed(3).replace(".", ",")} eV).
            `;

            resultadoFoto.style.borderLeftColor = "#24964c";

        } else {

            resultadoFoto.innerHTML = `
                <strong>Não ocorre emissão de elétrons.</strong>
                A frequência escolhida é inferior à frequência de corte
                do material utilizado nesta simulação.
                É necessário aumentar a frequência da luz.
            `;

            resultadoFoto.style.borderLeftColor = "#d58b26";

        }

    });

}


/* =========================
   8. SIMULAÇÃO DOS SENSORES LDR
   ========================= */

const luzEsquerda = document.getElementById("luzEsquerda");

const luzDireita = document.getElementById("luzDireita");

const valorLuzEsquerda = document.getElementById("valorLuzEsquerda");

const valorLuzDireita = document.getElementById("valorLuzDireita");

const direcaoSolar = document.getElementById("direcaoSolar");

const acaoSolar = document.getElementById("acaoSolar");


function atualizarSensores() {

    if (!luzEsquerda || !luzDireita) return;

    const esquerda = Number(luzEsquerda.value);

    const direita = Number(luzDireita.value);

    const diferenca = esquerda - direita;

    if (valorLuzEsquerda) {

        valorLuzEsquerda.textContent = esquerda;

    }

    if (valorLuzDireita) {

        valorLuzDireita.textContent = direita;

    }

    if (!direcaoSolar || !acaoSolar) return;

    if (Math.abs(diferenca) <= 35) {

        direcaoSolar.textContent = "Luminosidade semelhante";

        acaoSolar.textContent =
            "Os dois sensores recebem quantidades próximas de luz. O painel pode permanecer parado.";

    } else if (diferenca > 35) {

        direcaoSolar.textContent = "Maior luminosidade à esquerda";

        acaoSolar.textContent =
            "O sistema deve ajustar o painel em direção à esquerda.";

    } else {

        direcaoSolar.textContent = "Maior luminosidade à direita";

        acaoSolar.textContent =
            "O sistema deve ajustar o painel em direção à direita.";

    }

}

if (luzEsquerda) {

    luzEsquerda.addEventListener(
        "input",
        atualizarSensores
    );

}

if (luzDireita) {

    luzDireita.addEventListener(
        "input",
        atualizarSensores
    );

}

atualizarSensores();


/* =========================
   9. QUIZ INTERATIVO
   ========================= */

const botaoCorrigir = document.getElementById("corrigirQuiz");

const resultadoQuiz = document.getElementById("resultadoQuiz");

const respostasCorretas = {

    q1: "a",
    q2: "b",
    q3: "a",
    q4: "b",
    q5: "a",
    q6: "a",
    q7: "a",
    q8: "a",
    q9: "a",
    q10: "a"

};


if (botaoCorrigir) {

    botaoCorrigir.addEventListener("click", () => {

        let acertos = 0;

        let respondidas = 0;

        const totalQuestoes = Object.keys(respostasCorretas).length;

        const perguntas = document.querySelectorAll(".pergunta-quiz");

        // Remove as marcações anteriores.

        perguntas.forEach(pergunta => {

            pergunta.querySelectorAll("label").forEach(label => {

                label.style.border = "";

                label.style.background = "";

            });

        });


        // Verifica cada resposta.

        for (const [questao, respostaCorreta] of
            Object.entries(respostasCorretas)) {

            const selecionada = document.querySelector(
                `input[name="${questao}"]:checked`
            );

            const pergunta = document.querySelector(
                `input[name="${questao}"]`
            )?.closest(".pergunta-quiz");

            if (selecionada) {

                respondidas++;

                if (selecionada.value === respostaCorreta) {

                    acertos++;

                }

            }

            // Destaca a alternativa correta.

            if (pergunta) {

                const opcoes = pergunta.querySelectorAll("label");

                opcoes.forEach(label => {

                    const input = label.querySelector("input");

                    if (input.value === respostaCorreta) {

                        label.style.border = "2px solid #24964c";

                        label.style.background = "#e2f8e9";

                    } else if (
                        selecionada &&
                        input.checked
                    ) {

                        label.style.border = "2px solid #c63c3c";

                        label.style.background = "#fff0f0";

                    }

                });

            }

        }


        const percentual = Math.round(
            (acertos / totalQuestoes) * 100
        );

        resultadoQuiz.className = "";

        if (respondidas < totalQuestoes) {

            resultadoQuiz.classList.add("resultado-negativo");

            resultadoQuiz.innerHTML = `
                <strong>Você respondeu ${respondidas} de ${totalQuestoes} questões.</strong>
                <br>
                Acertos até agora: ${acertos}.
                <br>
                Complete todas as perguntas para finalizar o quiz.
            `;

        } else if (acertos >= 8) {

            resultadoQuiz.classList.add("resultado-positivo");

            resultadoQuiz.innerHTML = `
                <strong>Excelente resultado!</strong>
                <br>
                Você acertou ${acertos} de ${totalQuestoes} questões.
                <br>
                Aproveitamento: ${percentual}%.
                <br>
                Você demonstrou ótimo conhecimento sobre o tema!
            `;

        } else if (acertos >= 5) {

            resultadoQuiz.classList.add("resultado-positivo");

            resultadoQuiz.innerHTML = `
                <strong>Bom trabalho!</strong>
                <br>
                Você acertou ${acertos} de ${totalQuestoes} questões.
                <br>
                Aproveitamento: ${percentual}%.
                <br>
                Revise alguns conceitos para melhorar ainda mais.
            `;

        } else {

            resultadoQuiz.classList.add("resultado-negativo");

            resultadoQuiz.innerHTML = `
                <strong>Continue estudando!</strong>
                <br>
                Você acertou ${acertos} de ${totalQuestoes} questões.
                <br>
                Aproveitamento: ${percentual}%.
                <br>
                Revise o conteúdo e tente novamente.
            `;

        }

    });

}


/* =========================
   10. NAVEGAÇÃO POR TECLADO
   ========================= */

// O HTML utiliza links, botões, campos e controles nativos,
// que já permitem navegação pelo teclado.
// Este trecho oferece uma ajuda adicional ao fechar o menu
// com a tecla Escape.

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape" && navegacao && menuToggle) {

        navegacao.classList.remove("aberto");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu de navegação"
        );

        menuToggle.textContent = "☰";

        menuToggle.focus();

    }

});


/* =========================
   11. VERIFICAÇÃO INICIAL
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "Projeto Física Quântica carregado com sucesso!"
    );

    console.log(
        "Simulações de fótons, efeito fotoelétrico e sensores LDR disponíveis."
    );

});
