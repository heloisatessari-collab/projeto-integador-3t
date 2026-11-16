
document.addEventListener("DOMContentLoaded", () => {

    const PLANCK = 6.62607015e-34;
    const LIGHT_SPEED = 299792458;
    const WIEN = 2.897771955e-3;

    const formatarCientifico = (valor, casas = 2) => {
        if (!Number.isFinite(valor)) return "—";
        return valor.toExponential(casas)
            .replace(".", ",")
            .replace("e+", " × 10^")
            .replace("e-", " × 10⁻")
            .replace(" × 10^", " × 10^");
    };

    const formatarNumero = (valor, casas = 2) =>
        valor.toLocaleString("pt-BR", {
            maximumFractionDigits: casas
        });

    /* MENU RESPONSIVO */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
            menuToggle.textContent =
                mainNav.classList.contains("active") ? "✕" : "☰";
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("active");
                menuToggle.textContent = "☰";
            });
        });
    }

    /* ANO DO RODAPÉ */

    document.querySelectorAll(".current-year").forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    /* BOTÃO VOLTAR AO TOPO */

    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (backToTop) {
            backToTop.classList.toggle("visible", window.scrollY > 450);
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ESPECTRO ELETROMAGNÉTICO */

    const spectrumData = {
        radio: {
            title: "Ondas de rádio",
            text: "Possuem comprimentos de onda relativamente grandes e são utilizadas em transmissões de rádio, televisão, comunicação e sistemas de transmissão de sinais."
        },
        micro: {
            title: "Micro-ondas",
            text: "São utilizadas em fornos de micro-ondas, radares, sistemas de comunicação e redes sem fio. Em um forno, a radiação transfere energia principalmente a materiais que absorvem essa frequência."
        },
        infra: {
            title: "Infravermelho",
            text: "Está relacionado à radiação térmica emitida por corpos. É utilizado em controles remotos, câmeras térmicas, sensores e equipamentos de medição de temperatura."
        },
        visible: {
            title: "Luz visível",
            text: "É a faixa do espectro que pode ser percebida pelo olho humano. Inclui as cores que vão aproximadamente do vermelho ao violeta."
        },
        uv: {
            title: "Ultravioleta",
            text: "Possui frequência maior que a luz violeta. Está presente na radiação solar e pode provocar reações fotoquímicas. Parte da radiação ultravioleta é absorvida pela atmosfera."
        },
        xray: {
            title: "Raios X",
            text: "São radiações de alta energia utilizadas em exames de imagem e em diversas aplicações científicas e industriais. Podem atravessar materiais de maneiras diferentes."
        },
        gamma: {
            title: "Raios gama",
            text: "São radiações eletromagnéticas de frequência muito elevada, associadas a processos nucleares e fenômenos astrofísicos. Possuem grande capacidade de penetração."
        }
    };

    const spectrumInfo = document.getElementById("spectrumInfo");

    document.querySelectorAll("[data-spectrum]").forEach(button => {
        button.addEventListener("click", () => {
            const item = spectrumData[button.dataset.spectrum];
            if (!item || !spectrumInfo) return;

            document.querySelectorAll("[data-spectrum]").forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            spectrumInfo.innerHTML = `
                <h4>${item.title}</h4>
                <p>${item.text}</p>
            `;
        });
    });

    /* SIMULADOR DE ONDAS */

    const wavelength = document.getElementById("wavelength");

    function atualizarOnda() {
        if (!wavelength) return;

        const nm = Number(wavelength.value);
        const metros = nm * 1e-9;
        const frequencia = LIGHT_SPEED / metros;

        document.getElementById("wavelengthValue").textContent =
            nm + " nm";

        document.getElementById("frequencyValue").textContent =
            frequencia.toExponential(2).replace(".", ",") + " Hz";

        let regiao = "Luz visível";

        if (nm < 400) regiao = "Próxima do ultravioleta";
        if (nm > 700) regiao = "Próxima do infravermelho";

        document.getElementById("waveResult").textContent = regiao;

        const wave = document.querySelector(".wave-line");

        if (wave) {
            const frequenciaVisual = 2 + (750 - nm) / 35;
            wave.style.backgroundSize =
                `${Math.max(12, frequenciaVisual * 5)}px 100%`;
        }
    }

    if (wavelength) {
        wavelength.addEventListener("input", atualizarOnda);
        atualizarOnda();
    }

    /* RADIAÇÃO DO CORPO NEGRO */

    const temperature = document.getElementById("temperature");

    function atualizarTemperatura() {
        if (!temperature) return;

        const t = Number(temperature.value);
        const pico = WIEN / t;
        const picoNm = pico * 1e9;

        document.getElementById("temperatureValue").textContent =
            t + " K";

        document.getElementById("temperatureResult").textContent =
            t + " K";

        document.getElementById("wienResult").textContent =
            picoNm >= 1000
                ? formatarNumero(picoNm / 1000) + " µm"
                : formatarNumero(picoNm) + " nm";

        const objeto = document.getElementById("temperatureObject");

        let cor;
        let descricao;

        if (t < 1500) {
            cor = "radial-gradient(circle, #fff2c1, #a94c32 55%, #421d25)";
            descricao = "A maior parte da emissão está no infravermelho. O objeto pode não apresentar brilho visível intenso.";
        } else if (t < 2500) {
            cor = "radial-gradient(circle, #fff1b5, #f07839 55%, #6d2430)";
            descricao = "O objeto pode apresentar brilho avermelhado, enquanto grande parte da radiação ainda está no infravermelho.";
        } else if (t < 4000) {
            cor = "radial-gradient(circle, #fff6d2, #ffb13d 55%, #8e2834)";
            descricao = "A emissão visível se torna mais significativa, com aparência amarelada ou alaranjada.";
        } else if (t < 5500) {
            cor = "radial-gradient(circle, #ffffff, #fff0bd 55%, #df8c4c)";
            descricao = "A emissão possui uma parcela importante na região visível, com aparência mais clara.";
        } else {
            cor = "radial-gradient(circle, #ffffff, #dcecff 55%, #7694d9)";
            descricao = "O pico de emissão se desloca para comprimentos de onda menores, em direção à região visível e ultravioleta.";
        }

        objeto.style.background = cor;
        objeto.style.boxShadow = `0 0 ${Math.min(t / 100, 60)}px rgba(255, 166, 80, .45)`;

        document.getElementById("blackbodyResult").textContent = descricao;
    }

    if (temperature) {
        temperature.addEventListener("input", atualizarTemperatura);
        atualizarTemperatura();
    }

    /* EFEITO FOTOELÉTRICO */

    const photoFrequency = document.getElementById("photoFrequency");
    const workFunction = document.getElementById("workFunction");

    function atualizarFotoeletrico() {
        if (!photoFrequency || !workFunction) return;

        const escalaFrequencia = Number(photoFrequency.value);
        const frequencia = escalaFrequencia * 1e12;
        const escalaTrabalho = Number(workFunction.value);
        const phi = escalaTrabalho * 1e-19;

        const energiaFoton = PLANCK * frequencia;
        const energiaCinetica = energiaFoton - phi;
        const frequenciaCorte = phi / PLANCK;

        document.getElementById("photoFrequencyValue").textContent =
            frequencia.toExponential(2).replace(".", ",") + " Hz";

        document.getElementById("workFunctionValue").textContent =
            phi.toExponential(2).replace(".", ",") + " J";

        const status = document.getElementById("photoelectricStatus");
        const resultado = document.getElementById("photoelectricResult");
        const eletrons = document.querySelectorAll(".electron");

        if (energiaCinetica > 0) {
            status.textContent = "Efeito fotoelétrico: emissão possível";
            status.className = "result-status success";

            resultado.textContent =
                `A energia do fóton é ${energiaFoton.toExponential(2)} J. ` +
                `Ela supera a função trabalho. A energia cinética máxima ` +
                `dos elétrons é aproximadamente ${energiaCinetica.toExponential(2)} J. ` +
                `A frequência de corte é ${frequenciaCorte.toExponential(2)} Hz.`;

            eletrons.forEach(el => {
                el.style.display = "block";
            });
        } else {
            status.textContent = "Frequência abaixo do limite";
            status.className = "result-status warning";

            resultado.textContent =
                `A energia do fóton é ${energiaFoton.toExponential(2)} J, ` +
                `menor que a função trabalho de ${phi.toExponential(2)} J. ` +
                `Nesse modelo, não ocorre emissão de fotoelétrons. ` +
                `A frequência de corte é ${frequenciaCorte.toExponential(2)} Hz.`;

            eletrons.forEach(el => {
                el.style.display = "none";
            });
        }
    }

    if (photoFrequency && workFunction) {
        photoFrequency.addEventListener("input", atualizarFotoeletrico);
        workFunction.addEventListener("input", atualizarFotoeletrico);
        atualizarFotoeletrico();
    }

    /* ENERGIA DO FÓTON */

    const photonFrequency = document.getElementById("photonFrequency");

    function atualizarFoton() {
        if (!photonFrequency) return;

        const escala = Number(photonFrequency.value);
        const frequencia = escala * 1e14;
        const energia = PLANCK * frequencia;

        document.getElementById("photonFrequencyValue").textContent =
            frequencia.toExponential(2).replace(".", ",") + " Hz";

        document.getElementById("photonEnergyValue").textContent =
            energia.toExponential(2).replace(".", ",") + " J";

        let regiao = "Luz visível";

        if (frequencia < 4e14) regiao = "Infravermelho ou região próxima";
        else if (frequencia < 7.5e14) regiao = "Luz visível";
        else if (frequencia < 3e16) regiao = "Ultravioleta";
        else if (frequencia < 3e19) regiao = "Raios X";
        else regiao = "Raios gama ou região próxima";

        document.getElementById("photonRegion").textContent = regiao;

        document.getElementById("photonResult").textContent =
            `Cada fóton possui energia aproximada de ${energia.toExponential(3)} joules. ` +
            `Aumentar a frequência aumenta a energia individual dos fótons.`;
    }

    if (photonFrequency) {
        photonFrequency.addEventListener("input", atualizarFoton);
        atualizarFoton();
    }

    /* COMPONENTES DO CIRCUITO */

    const componentesCircuito = {
        arduino: {
            titulo: "Arduino Uno",
            descricao: "É a unidade de controle do projeto. Recebe os valores analógicos dos sensores LDR, compara as leituras e determina o movimento necessário para orientar o painel.",
            conexoes: "LDR esquerdo em A0; LDR direito em A1; sinal do servo em D9; alimentação dos sensores em 5 V e GND."
        },
        ldr1: {
            titulo: "Sensor LDR esquerdo",
            descricao: "O LDR é um resistor dependente de luz. Sua resistência varia conforme a iluminação. Neste projeto, ele identifica a luminosidade do lado esquerdo do painel.",
            conexoes: "Um terminal no 5 V e outro no ponto de leitura A0. O ponto A0 também se conecta a um resistor de 10 kΩ ligado ao GND."
        },
        ldr2: {
            titulo: "Sensor LDR direito",
            descricao: "Este sensor mede a iluminação do lado direito. A comparação entre os dois sensores permite identificar a direção de maior luminosidade.",
            conexoes: "Um terminal no 5 V e outro no ponto de leitura A1. O ponto A1 também se conecta a um resistor de 10 kΩ ligado ao GND."
        },
        resistors: {
            titulo: "Resistores de 10 kΩ",
            descricao: "Os resistores formam divisores de tensão com os LDRs. Como a resistência do LDR varia com a luz, a tensão no ponto de leitura também muda.",
            conexoes: "Um resistor para cada LDR, conectado entre o ponto de leitura analógica e o GND."
        },
        servo: {
            titulo: "Servomotor",
            descricao: "O servomotor transforma o comando do Arduino em movimento mecânico. Ele gira o suporte do painel para ajustar sua orientação.",
            conexoes: "Sinal no pino D9; alimentação em fonte regulada compatível; GND da fonte conectado ao GND do Arduino."
        },
        panel: {
            titulo: "Painel fotovoltaico",
            descricao: "O painel contém células fotovoltaicas que convertem energia luminosa em energia elétrica. A orientação pode influenciar a quantidade de luz recebida.",
            conexoes: "Terminais positivo e negativo ligados a uma carga ou circuito regulador apropriado. Não conectar diretamente aos pinos do Arduino."
        },
        power: {
            titulo: "Alimentação",
            descricao: "Os sensores podem ser alimentados pelo 5 V do Arduino. O servomotor pode exigir uma fonte externa capaz de fornecer a corrente necessária.",
            conexoes: "Fonte regulada compatível com o servo e GND comum entre a fonte e o Arduino."
        },
        breadboard: {
            titulo: "Protoboard",
            descricao: "A protoboard permite montar circuitos sem solda. Facilita testes, alterações e correções durante a construção do protótipo.",
            conexoes: "Utilizada para organizar os dois divisores de tensão dos sensores LDR e as conexões de alimentação."
        }
    };

    const botoesComponentes = document.querySelectorAll(".circuit-component");

    botoesComponentes.forEach(botao => {
        botao.addEventListener("click", () => {
            const componente = componentesCircuito[botao.dataset.component];
            if (!componente) return;

            botoesComponentes.forEach(item => item.classList.remove("active"));
            botao.classList.add("active");

            document.getElementById("componentTitle").textContent =
                componente.titulo;

            document.getElementById("componentDescription").textContent =
                componente.descricao;

            document.getElementById("componentConnections").textContent =
                componente.conexoes;
        });
    });

    /* SIMULADOR DE LUMINOSIDADE E SERVO */

    const leftLight = document.getElementById("leftLight");
    const rightLight = document.getElementById("rightLight");

    function atualizarCircuito() {
        if (!leftLight || !rightLight) return;

        const esquerda = Number(leftLight.value);
        const direita = Number(rightLight.value);
        const diferenca = esquerda - direita;

        document.getElementById("leftLightValue").textContent = esquerda;
        document.getElementById("rightLightValue").textContent = direita;

        document.getElementById("leftSensorReading").textContent = esquerda + "%";
        document.getElementById("rightSensorReading").textContent = direita + "%";

        document.getElementById("leftMeter").style.width = esquerda + "%";
        document.getElementById("rightMeter").style.width = direita + "%";

        const painel = document.getElementById("simulatedPanel");
        const decisao = document.getElementById("servoDecision");
        const explicacao = document.getElementById("servoExplanation");
        const anguloTexto = document.getElementById("servoAngle");

        let angulo = 90;

        if (Math.abs(diferenca) <= 8) {
            decisao.textContent = "Painel alinhado com a luz";
            explicacao.textContent =
                "Os sensores recebem quantidades semelhantes de luz. O Arduino entende que não é necessário realizar um novo movimento.";
        } else if (diferenca > 8) {
            angulo = 90 - Math.min(diferenca * 0.6, 90);

            decisao.textContent = "Movimentando para a esquerda";
            explicacao.textContent =
                "O sensor esquerdo recebe mais luz. O Arduino identifica a diferença e envia um comando ao servomotor para orientar o painel para esse lado.";
        } else {
            angulo = 90 + Math.min(Math.abs(diferenca) * 0.6, 90);

            decisao.textContent = "Movimentando para a direita";
            explicacao.textContent =
                "O sensor direito recebe mais luz. O Arduino compara os valores e orienta o servomotor para movimentar o painel em direção à maior luminosidade.";
        }

        angulo = Math.max(0, Math.min(180, angulo));

        painel.style.transform =
            `rotate(${(angulo - 90) * 0.5}deg)`;

        anguloTexto.textContent = Math.round(angulo);
    }

    if (leftLight && rightLight) {
        leftLight.addEventListener("input", atualizarCircuito);
        rightLight.addEventListener("input", atualizarCircuito);

        document.getElementById("resetCircuit").addEventListener("click", () => {
            leftLight.value = 80;
            rightLight.value = 30;
            atualizarCircuito();
        });

        atualizarCircuito();
    }

    /* QUIZ */

    const perguntas = [
        {
            pergunta: "O que é o efeito fotoelétrico?",
            opcoes: [
                "A emissão de elétrons de um material quando recebe luz adequada",
                "A transformação de calor em som",
                "A reflexão total da luz",
                "A formação de ondas mecânicas"
            ],
            correta: 0,
            explicacao: "O efeito fotoelétrico ocorre quando fótons transferem energia a elétrons e podem permitir que eles escapem da superfície."
        },
        {
            pergunta: "Quem explicou o efeito fotoelétrico utilizando a ideia dos quanta de luz?",
            opcoes: [
                "Isaac Newton",
                "Albert Einstein",
                "Galileu Galilei",
                "James Watt"
            ],
            correta: 1,
            explicacao: "Einstein publicou sua explicação em 1905 e recebeu o Nobel de Física de 1921 principalmente por essa contribuição."
        },
        {
            pergunta: "O que determina a energia de um fóton?",
            opcoes: [
                "Somente sua cor percebida",
                "A massa do material iluminado",
                "Sua frequência",
                "A distância até a fonte de luz"
            ],
            correta: 2,
            explicacao: "A energia de um fóton é dada pela relação E = h × f."
        },
        {
            pergunta: "Qual é a constante presente na equação E = h × f?",
            opcoes: [
                "Constante gravitacional",
                "Constante de Planck",
                "Constante de Wien",
                "Constante elástica"
            ],
            correta: 1,
            explicacao: "A letra h representa a constante de Planck, aproximadamente 6,626 × 10⁻³⁴ J·s."
        },
        {
            pergunta: "O que acontece quando a frequência da luz está abaixo da frequência de corte?",
            opcoes: [
                "O material sempre emite mais elétrons",
                "A luz desaparece",
                "Ocorre emissão de raios X",
                "Os fótons não possuem energia suficiente para liberar elétrons"
            ],
            correta: 3,
            explicacao: "A energia individual dos fótons precisa alcançar ou superar a função trabalho do material."
        },
        {
            pergunta: "O que é o efeito fotovoltaico?",
            opcoes: [
                "A produção de tensão elétrica em um material pela incidência de luz",
                "A produção de som pela luz",
                "A reflexão da luz em espelhos",
                "A evaporação da água"
            ],
            correta: 0,
            explicacao: "No efeito fotovoltaico, a luz contribui para gerar e separar cargas elétricas em um dispositivo."
        },
        {
            pergunta: "Qual é a função dos sensores LDR no seguidor solar?",
            opcoes: [
                "Armazenar energia",
                "Medir a luminosidade",
                "Girar o painel diretamente",
                "Aumentar a tensão do painel"
            ],
            correta: 1,
            explicacao: "O LDR altera sua resistência de acordo com a iluminação e permite que o Arduino compare os níveis de luz."
        },
        {
            pergunta: "Qual componente controla o movimento do painel no protótipo?",
            opcoes: [
                "Resistor",
                "Protoboard",
                "Servomotor",
                "LDR"
            ],
            correta: 2,
            explicacao: "O servomotor transforma os comandos elétricos em movimento mecânico."
        },
        {
            pergunta: "O que acontece com a energia de um fóton quando sua frequência aumenta?",
            opcoes: [
                "Diminui",
                "Permanece sempre igual",
                "Aumenta",
                "Torna-se zero"
            ],
            correta: 2,
            explicacao: "Como E = h × f, a energia é diretamente proporcional à frequência."
        },
        {
            pergunta: "Qual é a diferença entre efeito fotoelétrico externo e efeito fotovoltaico?",
            opcoes: [
                "São exatamente o mesmo fenômeno",
                "No externo há emissão de elétrons; no fotovoltaico há geração de tensão e corrente no dispositivo",
                "O efeito fotovoltaico só acontece no escuro",
                "O efeito fotoelétrico só acontece na água"
            ],
            correta: 1,
            explicacao: "Os fenômenos são relacionados à interação entre luz e matéria, mas descrevem processos físicos diferentes."
        }
    ];

    let perguntaAtual = 0;
    let pontuacao = 0;
    let respondida = false;

    const quizQuestion = document.getElementById("quizQuestion");
    const quizOptions = document.getElementById("quizOptions");
    const quizFeedback = document.getElementById("quizFeedback");
    const nextQuestion = document.getElementById("nextQuestion");
    const progressBar = document.getElementById("progressBar");
    const quizProgress = document.getElementById("quizProgress");
    const quizScore = document.getElementById("quizScore");

    function carregarPergunta() {
        if (!quizQuestion || perguntaAtual >= perguntas.length) {
            mostrarResultado();
            return;
        }

        respondida = false;

        const atual = perguntas[perguntaAtual];

        quizQuestion.textContent = atual.pergunta;
        quizOptions.innerHTML = "";
        quizFeedback.textContent = "";

        quizProgress.textContent =
            `Questão ${perguntaAtual + 1} de ${perguntas.length}`;

        quizScore.textContent = `Pontuação: ${pontuacao}`;

        progressBar.style.width =
            `${(perguntaAtual / perguntas.length) * 100}%`;

        nextQuestion.disabled = true;
        nextQuestion.textContent =
            perguntaAtual === perguntas.length - 1
                ? "Ver resultado"
                : "Próxima questão";

        atual.opcoes.forEach((opcao, indice) => {
            const botao = document.createElement("button");
            botao.className = "quiz-option";
            botao.textContent = opcao;

            botao.addEventListener("click", () => {
                responder(indice);
            });

            quizOptions.appendChild(botao);
        });
    }

    function responder(indice) {
        if (respondida) return;
        respondida = true;

        const atual = perguntas[perguntaAtual];
        const botoes = quizOptions.querySelectorAll("button");

        botoes.forEach((botao, i) => {
            botao.disabled = true;

            if (i === atual.correta) {
                botao.classList.add("correct");
            }

            if (i === indice && i !== atual.correta) {
                botao.classList.add("incorrect");
            }
        });

        if (indice === atual.correta) {
            pontuacao++;
            quizFeedback.textContent =
                "Correto! " + atual.explicacao;
        } else {
            quizFeedback.textContent =
                "Não foi dessa vez. " + atual.explicacao;
        }

        quizScore.textContent = `Pontuação: ${pontuacao}`;
        progressBar.style.width =
            `${((perguntaAtual + 1) / perguntas.length) * 100}%`;

        nextQuestion.disabled = false;
    }

    function mostrarResultado() {
        quizProgress.textContent = "Quiz concluído";
        quizScore.textContent = `Pontuação: ${pontuacao}`;

        quizQuestion.textContent = "Parabéns por concluir o desafio!";

        quizOptions.innerHTML = `
            <div class="quiz-final-result">
                <p>Você acertou</p>
                <strong>${pontuacao} de ${perguntas.length}</strong>
                <p>${pontuacao >= 8
                    ? "Excelente! Você demonstrou ótimo entendimento dos conceitos."
                    : pontuacao >= 5
                    ? "Muito bem! Revise alguns conteúdos e tente novamente."
                    : "Continue estudando! Explore as seções e tente novamente."}</p>
            </div>
        `;

        quizFeedback.textContent = "";
        progressBar.style.width = "100%";
        nextQuestion.disabled = false;
        nextQuestion.textContent = "Refazer quiz";
    }

    if (nextQuestion) {
        carregarPergunta();

        nextQuestion.addEventListener("click", () => {
            if (perguntaAtual >= perguntas.length) {
                perguntaAtual = 0;
                pontuacao = 0;
                carregarPergunta();
                return;
            }

            if (!respondida) return;

            perguntaAtual++;
            carregarPergunta();
        });
    }

});
