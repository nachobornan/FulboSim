// Base de datos de equipos por defecto para poblar los formularios
const DEFAULT_TEAMS = [
  { name: "Real Madrid", level: "good", color: "#ffffff" },
  { name: "Manchester City", level: "good", color: "#38bdf8" },
  { name: "Bayern Múnich", level: "good", color: "#ef4444" },
  { name: "Paris Saint-Germain", level: "good", color: "#1e3a8a" },
  { name: "F.C. Barcelona", level: "normal", color: "#9333ea" },
  { name: "Liverpool F.C.", level: "normal", color: "#dc2626" },
  { name: "Boca Juniors", level: "normal", color: "#eab308" },
  { name: "River Plate", level: "normal", color: "#f87171" },
  { name: "A.C. Milan", level: "normal", color: "#b91c1c" },
  { name: "Inter de Milán", level: "normal", color: "#2563eb" },
  { name: "Arsenal F.C.", level: "normal", color: "#f43f5e" },
  { name: "Juventus F.C.", level: "normal", color: "#6b7280" },
  { name: "Sacachispas F.C.", level: "bad", color: "#ec4899" },
  { name: "Deportivo Mandarina", level: "bad", color: "#f97316" },
  { name: "Villa Alfalfa F.C.", level: "bad", color: "#10b981" },
  { name: "Atlético Colador", level: "bad", color: "#a8a29e" },
  { name: "Poderoso Limón", level: "bad", color: "#eab308" },
  { name: "Troncos del Bosque", level: "bad", color: "#854d0e" },
  { name: "Unión Carpincho", level: "bad", color: "#a1a1aa" },
  { name: "Chacarita Jrs", level: "bad", color: "#ea580c" },
  { name: "Yung Boys", level: "bad", color: "#ca8a04" },
  { name: "Parnaso F.C.", level: "bad", color: "#4f46e5" },
  { name: "Atlético Tortuga", level: "bad", color: "#16a34a" },
  { name: "Estrella Fugaz", level: "bad", color: "#06b6d4" },
  { name: "Huracán de Alambre", level: "bad", color: "#7c2d12" },
  { name: "Defensores de Viento", level: "bad", color: "#65a30d" },
  { name: "Sportivo Cemento", level: "bad", color: "#4b5563" },
  { name: "Club del Queso", level: "bad", color: "#f59e0b" },
  { name: "Los Picapiedras", level: "bad", color: "#78350f" },
  { name: "Real Colapso", level: "bad", color: "#be185d" },
  { name: "Deportivo Madera", level: "bad", color: "#b45309" },
  { name: "Atlético Banqueta", level: "bad", color: "#0d9488" }
];

// Matriz de diferencias mínimas necesarias para anotar un gol
// [Atacante][Defensor]
const GOL_MATRIX = {
  good: { good: 5, normal: 5, bad: 4 },
  normal: { good: 6, normal: 5, bad: 4 },
  bad: { good: 6, normal: 5, bad: 5 }
};

const MATCH_COMMENTARIES = {
  draw: [
    "El partido se torna lento y friccionado en la zona media.",
    "Lucha intensa por el balón en el centro de la cancha, sin dominador claro.",
    "El mediocampo es un embudo; ambos equipos dividen constantemente el esférico.",
    "Juego trabado por reiteradas infracciones tácticas en la mitad del terreno.",
    "Se lucha centímetro a centímetro. Pelota dividida y pierna fuerte en el círculo central.",
    "No pueden mantener el balón; se lo van regalando uno a otro.",
    "No pueden encontrar el pase entre líneas; imposible pisar el área rival.",
    "Partido planchado, faltan ideas para abrir el juego.",
    "Poco fútbol y muchas patadas. Se nota la tensión.",
    "Se impacienta la gente porque no pueden pasar mitad de cancha."
  ],
  very_far: [
    "Un despeje defectuoso que cruza todo el lateral sin destino.",
    "Un remate lejano y sumamente desviado que va a parar a la tribuna.",
    "Pase en profundidad demasiado largo que se pierde por la línea de fondo.",
    "El partido se torna chato y predecible; no logran romper las líneas.",
    "Intento de centro que sale defectuoso y termina en el techo del arco.",
    "La defensa se para firme y corta el ataque sin hacer ningún esfuerzo.",
    "Remató cómodo pero la mandó a las estrellas.",
    "Centro a la nada misma; la pelota queda dormida en el área.",
    "La defensa responde cómoda ante los intentos inofensivos del rival.",
    "Se acercan al área y pierden la pelota; así va a ser difícil.",
    "Prueba de lejos sin fuerzas ante la falta de ideas."
  ],
  medium_far: [
    "Disparo de media distancia que el portero controla en dos tiempos.",
    "Centro al área que el defensor central despeja con un sólido cabezazo.",
    "El delantero ensaya una volea incómoda que sale suave a las manos del arquero.",
    "Cruce defensivo oportuno para mandar el balón al tiro de esquina.",
    "Remate cruzado desde el borde del área que se va ancho del poste izquierdo.",
    "El arquero sale con decisión y corta con los puños un envío aéreo peligroso.",
    "El arquero se anticipa y se queda con la pelota.",
    "Faltó comba; el tiro pasa cerca pero recto al lado del palo.",
    "Le quedó muy incómoda pero sacó un remate que sirve como advertencia.",
    "Cabecea solo pero le faltó dirección.",
    "Buen tiro pero el arquero estaba parado en el lugar correcto.",
    "Se quedó sin ángulo para la definición; bien contenido por la defensa."
  ],
  casi_gol: [
    "¡UYYYY! ¡El bombazo pega en el palo y la pelota recorre toda la línea de gol!",
    "¡Espectacular volada del arquero para desviar al córner un remate con destino de gol!",
    "¡Increíble! El delantero define perfecto ante la salida del arquero y el defensa la saca de la línea.",
    "¡Se salvó de milagro! El remate cruzado roza la base del poste y se va afuera.",
    "¡Al travesaño! Un cabezazo fulminante que hace temblar el arco.",
    "¡El travesaño salva al arquero que voló justo!",
    "¡Abajo y esquinado. El arquero llega a sacarla con las uñas!",
    "Tenía que empujarla pero le quiso romper el arco. ¡Increíble!",
    "Tras un grosero error de la defensa se salvan de casualidad.",
    "¡GOOOOL... uhhh! Se movió la red y lo gritó todo el mundo, pero no fue."
  ],
  gol_justo: [
    "¡GOL! Definición sutil por bajo, abriendo el pie ante la salida rápida del arquero.",
    "¡GOL! El delantero se desmarca de forma impecable y remata cruzado para romper la paridad.",
    "¡GOL! Tras una serie de rebotes en el área chica, el atacante la empuja al fondo de la red.",
    "¡GOL! Remate potente y esquinado que entra tras rozar la base del vertical.",
    "¡GOL! Sorprende a la defensa dormida tras un tiro de esquina ejecutado con rapidez.",
    "¡GOL! Error defensivo que el delantero supo aprovechar.",
    "¡GOL! Cabezazo y gol. Qué simple que es el fútbol.",
    "¡GOL! Aprovecha el rebote del arquero y adentro.",
    "¡GOL! La pica ante la salida del arquero.",
    "¡GOL! Tiro libre que se mete por una barrera mal armada."
  ],
  golazo: [
    "¡GOLAZO! ¡Qué locura de gol! Clava la pelota en el ángulo de volea.",
    "¡GOLAZO! Deja desparramado al arquero con un regate fantástico y define a puerta vacía.",
    "¡GOLAZO! Un contragolpe meteórico de área a área que termina con una vaselina magistral.",
    "¡GOLAZO! Remate de media distancia con tres dedos que agarra una comba espectacular.",
    "¡GOLAZO! Elude a dos defensores en velocidad y la cuelga del ángulo más difícil del arco.",
    "¡GOLAZO! De afuera del área para inflar la red.",
    "¡GOLAZO! Tiene ojos en la nuca; un gol de crack.",
    "¡GOLAZO! Travesaño y adentro; cabezazo dificilísimo.",
    "¡GOLAZO! A pura gambeta adentro del área.",
    "¡GOLAZO! La para de pecho y volea. A estos tipos no les podés dar esos regalos."
  ]
};

const PENALTY_COMMENTARIES = {
  goal: [
    "Fusiló al centro del arco con potencia ineludible.",
    "Acomodó la pelota suavemente junto a la base del poste.",
    "Engañó por completo al arquero, que voló hacia el otro poste.",
    "Remate cruzado y a media altura, inalcanzable para el portero.",
    "Le pegó con tres dedos y la clavó cerca del ángulo.",
    "Disparo seco y rasante que entra pegado a la red lateral."
  ],
  miss: [
    "¡Espectacular volada del arquero sobre su derecha para desviar el balón!",
    "¡Atajada magnífica abajo! El arquero adivinó la intención y contuvo con dos manos.",
    "¡Desviado! Quiso ajustar tanto el remate que la pelota se fue ancha.",
    "¡El remate pega en el poste y sale despedido lejos del arco!",
    "¡Al travesaño! El bombazo sacudió el arco y se fue a la tribuna.",
    "¡Arquero! Deja el pie plantado y bloquea el disparo directo al medio."
  ]
};

// --- ESTADOS DE LA APLICACIÓN ---
let activeView = "view-menu";

// Estado de Partido Único
let singleMatchState = {
  local: null,
  visitor: null,
  localScore: 0,
  visitorScore: 0,
  numbers: [],
  currentStep: 0,
  log: [],
  intervalId: null,
  isPlaying: false
};

// Estado de la Liga
let ligaState = {
  teams: [],
  fixture: [],
  currentRound: 0,
  currentMatchIndex: 0,
  doubleRound: true,
  isFinished: false
};

// Estado de la Copa
let copaState = {
  teams: [],
  groups: {}, // { A: [teams], B: [teams], ... }
  groupTables: {}, // { A: [tableRows], ... }
  groupFixture: [], // Fechas de grupos
  knockoutBracket: {
    octavos: [],
    cuartos: [],
    semifinal: [],
    final: []
  },
  currentPhase: "groups", // "groups", "octavos", "cuartos", "semifinal", "final", "finished"
  currentRound: 0, // Ronda dentro de grupos
  currentMatchIndex: 0,
  groupFormat: "single", // "single", "double"
  knockoutFormat: "double", // "single", "double"
  isFinished: false
};

// Estado de Tanda de Penales
let penaltyState = {
  local: null,
  visitor: null,
  localScore: 0,
  visitorScore: 0,
  localKicks: [], // Array de booleanos (gol o fallo)
  visitorKicks: [],
  currentKick: 0, // 0 a 9 (alternados: 0, 2, 4 local; 1, 3, 5 visitante) o muerte súbita
  teamTurn: "local", // "local" o "visitor"
  isFinished: false,
  callbackOnFinish: null
};

// Contexto de Simulación (Amistoso vs Torneo)
let matchContext = {
  mode: "friendly", // "friendly" o "tournament"
  tournamentType: null, // "liga", "copa_groups", "copa_knockout"
  matchData: null // Datos del partido correspondiente
};

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupSingleMatch();
  setupLiga();
  setupCopa();
  setupImportListeners();
});

// Navegación fluida
function switchView(viewId) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add("active");
    activeView = viewId;
  }
}

function setupNavigation() {
  const homeBtn = document.getElementById("nav-home");
  const singleBtn = document.getElementById("nav-single");
  const ligaBtn = document.getElementById("nav-liga");
  const copaBtn = document.getElementById("nav-copa");
  const rulesBtn = document.getElementById("nav-rules");
  const logoBtn = document.getElementById("btn-logo-home");

  homeBtn.addEventListener("click", () => switchView("view-menu"));
  logoBtn.addEventListener("click", () => switchView("view-menu"));
  
  singleBtn.addEventListener("click", () => {
    switchView("view-single-setup");
  });
  
  ligaBtn.addEventListener("click", () => {
    renderLigaSetup();
    switchView("view-liga-setup");
  });
  
  copaBtn.addEventListener("click", () => {
    renderCopaSetup();
    switchView("view-copa-setup");
  });

  rulesBtn.addEventListener("click", () => switchView("view-rules"));

  // Eventos de botones del Menú Principal
  document.getElementById("menu-btn-single").addEventListener("click", () => switchView("view-single-setup"));
  document.getElementById("menu-btn-liga").addEventListener("click", () => {
    renderLigaSetup();
    switchView("view-liga-setup");
  });
  document.getElementById("menu-btn-copa").addEventListener("click", () => {
    renderCopaSetup();
    switchView("view-copa-setup");
  });
  document.getElementById("menu-btn-rules").addEventListener("click", () => switchView("view-rules"));
}

function setupImportListeners() {
  const btnLigaImport = document.getElementById("btn-liga-import-trigger");
  const inputLigaFile = document.getElementById("input-liga-file");
  const btnCopaImport = document.getElementById("btn-copa-import-trigger");
  const inputCopaFile = document.getElementById("input-copa-file");

  if (btnLigaImport && inputLigaFile) {
    btnLigaImport.addEventListener("click", () => inputLigaFile.click());
    inputLigaFile.addEventListener("change", () => handleTeamImport(inputLigaFile, "liga"));
  }

  if (btnCopaImport && inputCopaFile) {
    btnCopaImport.addEventListener("click", () => inputCopaFile.click());
    inputCopaFile.addEventListener("change", () => handleTeamImport(inputCopaFile, "copa"));
  }
}

function handleTeamImport(fileInput, containerType) {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const lines = text.split(/\r?\n/);
    const importedTeams = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const parts = trimmed.includes(",") ? trimmed.split(",") : trimmed.split(";");
      const name = parts[0].trim();
      let level = "normal";
      
      if (parts[1]) {
        const l = parts[1].trim().toLowerCase();
        if (l === "b" || l === "bueno" || l === "good") level = "good";
        else if (l === "n" || l === "normal") level = "normal";
        else if (l === "m" || l === "malo" || l === "bad") level = "bad";
      }
      
      importedTeams.push({ name, level });
    });

    if (importedTeams.length === 0) {
      alert("No se encontraron equipos válidos en el archivo.");
      return;
    }

    populateImportedTeams(importedTeams, containerType);
  };
  reader.readAsText(file);
  fileInput.value = "";
}

function populateImportedTeams(importedTeams, containerType) {
  const listId = containerType === "liga" ? "liga-teams-setup-list" : "copa-teams-setup-list";
  const container = document.getElementById(listId);
  if (!container) return;

  const rows = container.querySelectorAll(".team-setup-row");
  const count = Math.min(rows.length, importedTeams.length);

  for (let i = 0; i < count; i++) {
    const row = rows[i];
    const nameInput = row.querySelector(".team-setup-name");
    const levelSelect = row.querySelector(".team-setup-level");
    
    if (nameInput && levelSelect) {
      nameInput.value = importedTeams[i].name;
      levelSelect.value = importedTeams[i].level;
    }
  }

  alert(`Se importaron ${count} equipos con éxito.`);
}


// ==========================================
//   MOTOR DE SIMULACIÓN - ALGORITMO 0 a 9
// ==========================================

// Genera un número entero aleatorio entre 0 y 9
function rollNumber() {
  return Math.floor(Math.random() * 10);
}

/**
 * Simula una jugada (par de números) dada
 * @param {number} localNum Tiro del local (0-9)
 * @param {number} visitorNum Tiro del visitante (0-9)
 * @param {string} localLevel Nivel local ('good', 'normal', 'bad')
 * @param {string} visitorLevel Nivel visitante ('good', 'normal', 'bad')
 * @returns {object} { localGoal: boolean, visitorGoal: boolean, diff: number, desc: string }
 */
function getRandomComment(category) {
  const list = MATCH_COMMENTARIES[category];
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Simula una jugada (par de números) dada
 * @param {number} localNum Tiro del local (0-9)
 * @param {number} visitorNum Tiro del visitante (0-9)
 * @param {string} localLevel Nivel local ('good', 'normal', 'bad')
 * @param {string} visitorLevel Nivel visitante ('good', 'normal', 'bad')
 * @returns {object} { localGoal: boolean, visitorGoal: boolean, diff: number, desc: string }
 */
function processPlay(localNum, visitorNum, localLevel, visitorLevel) {
  let localGoal = false;
  let visitorGoal = false;
  let diff = localNum - visitorNum;
  let desc = "";

  if (diff > 0) {
    // Ataca el Local
    const threshold = GOL_MATRIX[localLevel][visitorLevel];
    const dist = diff - threshold;
    if (diff >= threshold) {
      localGoal = true;
      desc = getRandomComment(dist === 0 ? "gol_justo" : "golazo");
    } else {
      if (dist === -1) desc = getRandomComment("casi_gol");
      else if (dist >= -3) desc = getRandomComment("medium_far");
      else desc = getRandomComment("very_far");
    }
  } else if (diff < 0) {
    // Ataca el Visitante
    const absDiff = Math.abs(diff);
    const threshold = GOL_MATRIX[visitorLevel][localLevel];
    const dist = absDiff - threshold;
    if (absDiff >= threshold) {
      visitorGoal = true;
      desc = getRandomComment(dist === 0 ? "gol_justo" : "golazo");
    } else {
      if (dist === -1) desc = getRandomComment("casi_gol");
      else if (dist >= -3) desc = getRandomComment("medium_far");
      else desc = getRandomComment("very_far");
    }
  } else {
    desc = getRandomComment("draw");
  }

  return { localGoal, visitorGoal, diff, desc };
}

/**
 * Simulación instantánea de un partido completo
 */
function simulateMatchData(local, visitor) {
  const numbers = Array.from({ length: 20 }, rollNumber);
  let localScore = 0;
  let visitorScore = 0;
  const log = [];
  const halfTimeLogIndex = 5; // después de la instancia 5

  for (let i = 0; i < 10; i++) {
    const minute = (i + 1) * 9 - Math.floor(Math.random() * 4); // minutos lógicos: 9', 18', etc.
    const lNum = numbers[i * 2];
    const vNum = numbers[i * 2 + 1];
    
    const lLevel = local.currentLevel || local.level;
    const vLevel = visitor.currentLevel || visitor.level;
    const play = processPlay(lNum, vNum, lLevel, vLevel);
    
    if (play.localGoal) localScore++;
    if (play.visitorGoal) visitorScore++;

    log.push({
      minute: `${minute}'`,
      type: play.localGoal || play.visitorGoal ? "goal" : "normal",
      desc: play.localGoal 
        ? `⚽ ¡GOL de ${local.name}! ${play.desc}` 
        : play.visitorGoal 
          ? `⚽ ¡GOL de ${visitor.name}! ${play.desc}`
          : play.desc,
      nums: `${lNum}-${vNum}`,
      isGoal: play.localGoal || play.visitorGoal
    });

    if (i === 4) {
      log.push({
        minute: "ET",
        type: "halftime",
        desc: `⌛ Entretiempo: ${local.name} ${localScore} - ${visitorScore} ${visitor.name}`,
        nums: ""
      });
    }
  }

  log.push({
    minute: "90'",
    type: "fulltime",
    desc: `🏁 Final del Partido: ${local.name} ${localScore} - ${visitorScore} ${visitor.name}`,
    nums: ""
  });

  return {
    localScore,
    visitorScore,
    numbers,
    log
  };
}


// ==========================================
//      MÓDULO: PARTIDO INDIVIDUAL
// ==========================================

function setupSingleMatch() {
  const startBtn = document.getElementById("btn-start-single");
  const stepBtn = document.getElementById("btn-sim-step");
  const fastBtn = document.getElementById("btn-sim-fast");
  const resetBtn = document.getElementById("btn-reset-single");

  startBtn.addEventListener("click", () => {
    const lName = document.getElementById("single-local-name").value.trim() || "Local";
    const lLevel = document.getElementById("single-local-level").value;
    const vName = document.getElementById("single-visitor-name").value.trim() || "Visitante";
    const vLevel = document.getElementById("single-visitor-level").value;

    singleMatchState.local = { name: lName, level: lLevel };
    singleMatchState.visitor = { name: vName, level: vLevel };
    
    resetSingleSimulationUI();
    switchView("view-single-sim");
  });

  stepBtn.addEventListener("click", simulateSingleStep);
  fastBtn.addEventListener("click", simulateSingleFast);
  resetBtn.addEventListener("click", () => {
    stopSingleInterval();
    if (matchContext.mode === "tournament") {
      if (singleMatchState.currentStep < 10) {
        simulateSingleFast();
      }
      applyTournamentMatchResult();
    } else {
      switchView("view-single-setup");
    }
  });
}

function stopSingleInterval() {
  if (singleMatchState.intervalId) {
    clearInterval(singleMatchState.intervalId);
    singleMatchState.intervalId = null;
  }
  singleMatchState.isPlaying = false;
}

function resetSingleSimulationUI() {
  stopSingleInterval();
  singleMatchState.localScore = 0;
  singleMatchState.visitorScore = 0;
  singleMatchState.currentStep = 0;
  singleMatchState.log = [];
  
  // Generar los 20 números
  singleMatchState.numbers = Array.from({ length: 20 }, rollNumber);

  document.getElementById("board-local-name").innerText = singleMatchState.local.name;
  document.getElementById("board-visitor-name").innerText = singleMatchState.visitor.name;
  
  const localLvl = singleMatchState.local.currentLevel || singleMatchState.local.level;
  const localTag = document.getElementById("board-local-level");
  let localTrendStr = "";
  if (singleMatchState.local.trend === "up") localTrendStr = " ▲";
  else if (singleMatchState.local.trend === "down") localTrendStr = " ▼";
  
  localTag.innerText = `Nivel: ${localLvl.toUpperCase()}${localTrendStr}`;
  localTag.className = `team-level-tag ${localLvl}`;
  
  const visitorLvl = singleMatchState.visitor.currentLevel || singleMatchState.visitor.level;
  const visitorTag = document.getElementById("board-visitor-level");
  let visitorTrendStr = "";
  if (singleMatchState.visitor.trend === "up") visitorTrendStr = " ▲";
  else if (singleMatchState.visitor.trend === "down") visitorTrendStr = " ▼";
  
  visitorTag.innerText = `Nivel: ${visitorLvl.toUpperCase()}${visitorTrendStr}`;
  visitorTag.className = `team-level-tag ${visitorLvl}`;

  document.getElementById("board-local-score").innerText = "0";
  document.getElementById("board-visitor-score").innerText = "0";
  document.getElementById("board-time-display").innerText = "0'";
  document.getElementById("scoreboard-status-lbl").innerText = "PREPARADOS";

  document.getElementById("die-local").innerText = "-";
  document.getElementById("die-visitor").innerText = "-";
  document.getElementById("dice-result-lbl").innerText = "";
  
  // Resetear posesión visual
  document.getElementById("possession-local-lbl").innerText = "50";
  document.getElementById("possession-visitor-lbl").innerText = "50";
  document.getElementById("possession-local-bar").style.width = "50%";

  document.getElementById("single-match-log").innerHTML = `
    <div style="color: var(--text-muted); text-align: center; padding: 2rem;">
      El partido está listo para comenzar. Presiona "Simular Jugada" o "Simulación Rápida".
    </div>
  `;

  document.getElementById("btn-sim-step").disabled = false;
  document.getElementById("btn-sim-fast").disabled = false;
}

function simulateSingleStep() {
  if (singleMatchState.currentStep >= 10) return;
  
  const stepBtn = document.getElementById("btn-sim-step");
  const fastBtn = document.getElementById("btn-sim-fast");
  stepBtn.disabled = true;
  fastBtn.disabled = true;

  const dieL = document.getElementById("die-local");
  const dieV = document.getElementById("die-visitor");
  
  // Animación de girar dados
  dieL.classList.add("rolling");
  dieV.classList.add("rolling");
  
  let rollCount = 0;
  const animInterval = setInterval(() => {
    dieL.innerText = rollNumber();
    dieV.innerText = rollNumber();
    rollCount++;
    if (rollCount > 6) {
      clearInterval(animInterval);
      dieL.classList.remove("rolling");
      dieV.classList.remove("rolling");
      executePlayStep();
    }
  }, 80);
}

function executePlayStep() {
  const i = singleMatchState.currentStep;
  const lNum = singleMatchState.numbers[i * 2];
  const vNum = singleMatchState.numbers[i * 2 + 1];
  
  document.getElementById("die-local").innerText = lNum;
  document.getElementById("die-visitor").innerText = vNum;
  
  const lLevel = singleMatchState.local.currentLevel || singleMatchState.local.level;
  const vLevel = singleMatchState.visitor.currentLevel || singleMatchState.visitor.level;
  const play = processPlay(lNum, vNum, lLevel, vLevel);
  
  if (play.localGoal) {
    singleMatchState.localScore++;
    document.getElementById("board-local-score").innerText = singleMatchState.localScore;
    document.getElementById("dice-result-lbl").innerText = `¡Gol de ${singleMatchState.local.name}!`;
    document.getElementById("dice-result-lbl").style.color = "var(--color-primary)";
  } else if (play.visitorGoal) {
    singleMatchState.visitorScore++;
    document.getElementById("board-visitor-score").innerText = singleMatchState.visitorScore;
    document.getElementById("dice-result-lbl").innerText = `¡Gol de ${singleMatchState.visitor.name}!`;
    document.getElementById("dice-result-lbl").style.color = "var(--color-info)";
  } else {
    document.getElementById("dice-result-lbl").innerText = "Sin peligro";
    document.getElementById("dice-result-lbl").style.color = "var(--text-muted)";
  }

  // Calcular posesión de pelota acumulada
  let sumL = 0;
  let sumV = 0;
  for (let step = 0; step <= i; step++) {
    sumL += singleMatchState.numbers[step * 2];
    sumV += singleMatchState.numbers[step * 2 + 1];
  }
  let posL = 50;
  let posV = 50;
  if (sumL + sumV > 0) {
    posL = Math.round((sumL / (sumL + sumV)) * 100);
    posV = 100 - posL;
  }
  document.getElementById("possession-local-lbl").innerText = posL;
  document.getElementById("possession-visitor-lbl").innerText = posV;
  document.getElementById("possession-local-bar").style.width = `${posL}%`;

  const minute = (i + 1) * 9 - Math.floor(Math.random() * 4);
  document.getElementById("board-time-display").innerText = `${minute}'`;
  document.getElementById("scoreboard-status-lbl").innerText = i < 5 ? "1ER TIEMPO" : "2DO TIEMPO";

  // Registro en la bitácora
  const logContainer = document.getElementById("single-match-log");
  if (i === 0) logContainer.innerHTML = ""; // Limpiar mensaje inicial

  const logEntry = document.createElement("div");
  logEntry.className = `log-entry ${play.localGoal || play.visitorGoal ? "goal" : ""}`;
  
  const desc = play.localGoal 
    ? `⚽ ¡GOL de ${singleMatchState.local.name}! ${play.desc}` 
    : play.visitorGoal 
      ? `⚽ ¡GOL de ${singleMatchState.visitor.name}! ${play.desc}`
      : play.desc;

  logEntry.innerHTML = `
    <span class="log-time">${minute}'</span>
    <span class="log-desc">${desc}</span>
    <span class="log-nums ${play.localGoal || play.visitorGoal ? "goal-numbers" : ""}">${lNum}-${vNum}</span>
  `;
  logContainer.appendChild(logEntry);
  logContainer.scrollTop = logContainer.scrollHeight;

  // Guardar en el log de estado del partido
  singleMatchState.log.push({
    minute: `${minute}'`,
    type: play.localGoal || play.visitorGoal ? "goal" : "normal",
    desc: desc,
    nums: `${lNum}-${vNum}`,
    isGoal: play.localGoal || play.visitorGoal
  });

  singleMatchState.currentStep++;

  // Entretiempo
  if (singleMatchState.currentStep === 5) {
    const etEntry = document.createElement("div");
    etEntry.className = "log-entry halftime";
    etEntry.innerHTML = `<span class="log-desc">⌛ Entretiempo: ${singleMatchState.local.name} ${singleMatchState.localScore} - ${singleMatchState.visitorScore} ${singleMatchState.visitor.name}</span>`;
    logContainer.appendChild(etEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
    document.getElementById("board-time-display").innerText = "ET";

    singleMatchState.log.push({
      minute: "ET",
      type: "halftime",
      desc: `⌛ Entretiempo: ${singleMatchState.local.name} ${singleMatchState.localScore} - ${singleMatchState.visitorScore} ${singleMatchState.visitor.name}`,
      nums: ""
    });
  }

  // Final del Partido
  if (singleMatchState.currentStep >= 10) {
    const finEntry = document.createElement("div");
    finEntry.className = "log-entry fulltime";
    finEntry.innerHTML = `<span class="log-desc">🏁 Final del Partido: ${singleMatchState.local.name} ${singleMatchState.localScore} - ${singleMatchState.visitorScore} ${singleMatchState.visitor.name}</span>`;
    logContainer.appendChild(finEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
    
    document.getElementById("board-time-display").innerText = "90'";
    document.getElementById("scoreboard-status-lbl").innerText = "PARTIDO CONCLUIDO";
    document.getElementById("btn-sim-step").disabled = true;
    document.getElementById("btn-sim-fast").disabled = true;

    singleMatchState.log.push({
      minute: "90'",
      type: "fulltime",
      desc: `🏁 Final del Partido: ${singleMatchState.local.name} ${singleMatchState.localScore} - ${singleMatchState.visitorScore} ${singleMatchState.visitor.name}`,
      nums: ""
    });
  } else {
    document.getElementById("btn-sim-step").disabled = false;
    document.getElementById("btn-sim-fast").disabled = false;
  }
}

function simulateSingleFast() {
  const logContainer = document.getElementById("single-match-log");
  logContainer.innerHTML = "";

  document.getElementById("btn-sim-step").disabled = true;
  document.getElementById("btn-sim-fast").disabled = true;

  // Ejecutar bucle
  while (singleMatchState.currentStep < 10) {
    const i = singleMatchState.currentStep;
    const lNum = singleMatchState.numbers[i * 2];
    const vNum = singleMatchState.numbers[i * 2 + 1];
    
    const lLevel = singleMatchState.local.currentLevel || singleMatchState.local.level;
    const vLevel = singleMatchState.visitor.currentLevel || singleMatchState.visitor.level;
    const play = processPlay(lNum, vNum, lLevel, vLevel);
    
    if (play.localGoal) singleMatchState.localScore++;
    if (play.visitorGoal) singleMatchState.visitorScore++;

    const minute = (i + 1) * 9 - Math.floor(Math.random() * 4);
    
    const logEntry = document.createElement("div");
    logEntry.className = `log-entry ${play.localGoal || play.visitorGoal ? "goal" : ""}`;
    
    const desc = play.localGoal 
      ? `⚽ ¡GOL de ${singleMatchState.local.name}! ${play.desc}` 
      : play.visitorGoal 
        ? `⚽ ¡GOL de ${singleMatchState.visitor.name}! ${play.desc}`
        : play.desc;

    logEntry.innerHTML = `
      <span class="log-time">${minute}'</span>
      <span class="log-desc">${desc}</span>
      <span class="log-nums ${play.localGoal || play.visitorGoal ? "goal-numbers" : ""}">${lNum}-${vNum}</span>
    `;
    logContainer.appendChild(logEntry);

    // Guardar en el log de estado del partido
    singleMatchState.log.push({
      minute: `${minute}'`,
      type: play.localGoal || play.visitorGoal ? "goal" : "normal",
      desc: desc,
      nums: `${lNum}-${vNum}`,
      isGoal: play.localGoal || play.visitorGoal
    });

    singleMatchState.currentStep++;

    if (singleMatchState.currentStep === 5) {
      const etEntry = document.createElement("div");
      etEntry.className = "log-entry halftime";
      etEntry.innerHTML = `<span class="log-desc">⌛ Entretiempo: ${singleMatchState.local.name} ${singleMatchState.localScore} - ${singleMatchState.visitorScore} ${singleMatchState.visitor.name}</span>`;
      logContainer.appendChild(etEntry);

      singleMatchState.log.push({
        minute: "ET",
        type: "halftime",
        desc: `⌛ Entretiempo: ${singleMatchState.local.name} ${singleMatchState.localScore} - ${singleMatchState.visitorScore} ${singleMatchState.visitor.name}`,
        nums: ""
      });
    }
  }

  // Calcular posesión de pelota total al final de la simulación rápida
  let sumL = 0;
  let sumV = 0;
  for (let step = 0; step < 10; step++) {
    sumL += singleMatchState.numbers[step * 2];
    sumV += singleMatchState.numbers[step * 2 + 1];
  }
  let posL = 50;
  let posV = 50;
  if (sumL + sumV > 0) {
    posL = Math.round((sumL / (sumL + sumV)) * 100);
    posV = 100 - posL;
  }
  document.getElementById("possession-local-lbl").innerText = posL;
  document.getElementById("possession-visitor-lbl").innerText = posV;
  document.getElementById("possession-local-bar").style.width = `${posL}%`;

  // Actualizar marcadores finales
  document.getElementById("board-local-score").innerText = singleMatchState.localScore;
  document.getElementById("board-visitor-score").innerText = singleMatchState.visitorScore;
  document.getElementById("board-time-display").innerText = "90'";
  document.getElementById("scoreboard-status-lbl").innerText = "PARTIDO CONCLUIDO";

  document.getElementById("die-local").innerText = singleMatchState.numbers[18];
  document.getElementById("die-visitor").innerText = singleMatchState.numbers[19];
  document.getElementById("dice-result-lbl").innerText = "Simulación finalizada.";
  document.getElementById("dice-result-lbl").style.color = "var(--color-accent)";

  const finEntry = document.createElement("div");
  finEntry.className = "log-entry fulltime";
  finEntry.innerHTML = `<span class="log-desc">🏁 Final del Partido: ${singleMatchState.local.name} ${singleMatchState.localScore} - ${singleMatchState.visitorScore} ${singleMatchState.visitor.name}</span>`;
  logContainer.appendChild(finEntry);
  logContainer.scrollTop = logContainer.scrollHeight;

  singleMatchState.log.push({
    minute: "90'",
    type: "fulltime",
    desc: `🏁 Final del Partido: ${singleMatchState.local.name} ${singleMatchState.localScore} - ${singleMatchState.visitorScore} ${singleMatchState.visitor.name}`,
    nums: ""
  });
}

function applyTournamentMatchResult() {
  const type = matchContext.tournamentType;

  if (type === "liga") {
    const match = matchContext.matchData;
    match.homeScore = singleMatchState.localScore;
    match.awayScore = singleMatchState.visitorScore;
    match.played = true;
    match.details = {
      localScore: singleMatchState.localScore,
      visitorScore: singleMatchState.visitorScore,
      numbers: singleMatchState.numbers,
      log: [...singleMatchState.log]
    };

    updateTeamStats(match.home, singleMatchState.localScore, singleMatchState.visitorScore);
    updateTeamStats(match.away, singleMatchState.visitorScore, singleMatchState.localScore);

    ligaState.currentMatchIndex++;
    if (ligaState.currentMatchIndex >= ligaState.fixture[ligaState.currentRound].length) {
      ligaState.currentMatchIndex = 0;
      ligaState.currentRound++;
      
      if (ligaState.currentRound >= ligaState.fixture.length) {
        ligaState.isFinished = true;
      }
    }

    renderLigaTable();
    renderLigaRound(displayedLigaRound);
    updateLigaProgressDisplay();

    matchContext.mode = "friendly";
    matchContext.tournamentType = null;
    matchContext.matchData = null;
    
    document.getElementById("btn-reset-single").innerText = "Reiniciar / Cambiar Equipos";
    switchView("view-liga-sim");

  } else if (type === "copa_groups") {
    const match = matchContext.matchData;
    match.homeScore = singleMatchState.localScore;
    match.awayScore = singleMatchState.visitorScore;
    match.played = true;
    match.details = {
      localScore: singleMatchState.localScore,
      visitorScore: singleMatchState.visitorScore,
      numbers: singleMatchState.numbers,
      log: [...singleMatchState.log]
    };

    const table = copaState.groupTables[match.group];
    const rowHome = table.find(r => r.team.id === match.home.id);
    const rowAway = table.find(r => r.team.id === match.away.id);

    updateCopaRowStats(rowHome, singleMatchState.localScore, singleMatchState.visitorScore);
    updateCopaRowStats(rowAway, singleMatchState.visitorScore, singleMatchState.localScore);

    copaState.currentMatchIndex++;
    if (copaState.currentMatchIndex >= copaState.groupFixture[copaState.currentRound].length) {
      copaState.currentMatchIndex = 0;
      copaState.currentRound++;

      if (copaState.currentRound >= copaState.groupFixture.length) {
        generateKnockoutPhases();
      } else {
        displayedCopaGroupRound = copaState.currentRound;
      }
    }

    renderCopaGroups();
    renderCopaGroupRound(displayedCopaGroupRound);
    updateCopaProgressDisplay();

    matchContext.mode = "friendly";
    matchContext.tournamentType = null;
    matchContext.matchData = null;
    
    document.getElementById("btn-reset-single").innerText = "Reiniciar / Cambiar Equipos";
    switchView("view-copa-sim");

  } else if (type === "copa_knockout") {
    const { pair, matchToPlay } = matchContext.matchData;
    matchToPlay.homeScore = singleMatchState.localScore;
    matchToPlay.awayScore = singleMatchState.visitorScore;
    matchToPlay.played = true;
    matchToPlay.details = {
      localScore: singleMatchState.localScore,
      visitorScore: singleMatchState.visitorScore,
      numbers: singleMatchState.numbers,
      log: [...singleMatchState.log]
    };

    const doubleLeg = copaState.knockoutFormat === "double";

    if (!doubleLeg) {
      evaluateSingleLegWinner(pair);
    } else {
      if (matchToPlay === pair.match1) {
        renderKnockoutBracket();
      } else {
        evaluateDoubleLegWinner(pair);
      }
    }

    matchContext.mode = "friendly";
    matchContext.tournamentType = null;
    matchContext.matchData = null;
    
    document.getElementById("btn-reset-single").innerText = "Reiniciar / Cambiar Equipos";
    switchView("view-copa-sim");
    switchCopaTab("knockout");
  }
}

function playLigaMatchInteractive() {
  const round = ligaState.currentRound;
  const matchIdx = ligaState.currentMatchIndex;
  const match = ligaState.fixture[round][matchIdx];

  matchContext = {
    mode: "tournament",
    tournamentType: "liga",
    matchData: match
  };

  singleMatchState.local = match.home;
  singleMatchState.visitor = match.away;

  resetSingleSimulationUI();
  document.getElementById("btn-reset-single").innerText = "Volver al Torneo (Aplicar)";
  switchView("view-single-sim");
}

function playCopaGroupMatchInteractive() {
  const round = copaState.currentRound;
  const matchIdx = copaState.currentMatchIndex;
  const match = copaState.groupFixture[round][matchIdx];

  matchContext = {
    mode: "tournament",
    tournamentType: "copa_groups",
    matchData: match
  };

  singleMatchState.local = match.home;
  singleMatchState.visitor = match.away;

  resetSingleSimulationUI();
  document.getElementById("btn-reset-single").innerText = "Volver al Torneo (Aplicar)";
  switchView("view-single-sim");
}

function playCopaKnockoutMatchInteractive() {
  const phase = copaState.currentPhase;
  const bracket = copaState.knockoutBracket[phase];
  const idx = copaState.currentMatchIndex;
  const pair = bracket[idx];

  let matchToPlay = null;
  if (!pair.match1.played) {
    matchToPlay = pair.match1;
  } else if (copaState.knockoutFormat === "double" && !pair.match2.played) {
    matchToPlay = pair.match2;
  }

  if (!matchToPlay) return;

  matchContext = {
    mode: "tournament",
    tournamentType: "copa_knockout",
    matchData: { pair, matchToPlay }
  };

  singleMatchState.local = matchToPlay.home;
  singleMatchState.visitor = matchToPlay.away;

  resetSingleSimulationUI();
  document.getElementById("btn-reset-single").innerText = "Volver al Torneo (Aplicar)";
  switchView("view-single-sim");
}

window.playLigaMatchInteractive = playLigaMatchInteractive;
window.playCopaGroupMatchInteractive = playCopaGroupMatchInteractive;
window.playCopaKnockoutMatchInteractive = playCopaKnockoutMatchInteractive;

// ==========================================


// ==========================================
//        ALGORITMO DE FIXTURE (BERGER)
// ==========================================

/**
 * Genera el fixture de todos contra todos
 * @param {Array} teams Array de objetos de equipo
 * @param {boolean} doubleRound Si incluye ida y vuelta
 * @returns {Array} Array de fechas, cada una con un array de partidos
 */
function generateFixture(teams, doubleRound) {
  let list = [...teams];
  const n = list.length;
  
  // Si es impar, se debe agregar un equipo 'BYE' / Descanso, pero controlamos que sea par en la UI
  const totalRounds = n - 1;
  const matchesPerRound = n / 2;
  const rounds = [];

  for (let round = 0; round < totalRounds; round++) {
    const roundMatches = [];
    for (let match = 0; match < matchesPerRound; match++) {
      const homeIdx = match;
      const awayIdx = n - 1 - match;
      
      const home = list[homeIdx];
      const away = list[awayIdx];
      
      // Balancear localía
      if (round % 2 === 0) {
        roundMatches.push({ home, away, homeScore: null, awayScore: null, played: false, details: null });
      } else {
        roundMatches.push({ home: away, away: home, homeScore: null, awayScore: null, played: false, details: null });
      }
    }
    rounds.push(roundMatches);
    
    // Rotar lista manteniendo el primero fijo (Algoritmo Berger)
    list = [list[0], list[n - 1], ...list.slice(1, n - 1)];
  }

  // Si es ida y vuelta, duplicamos las rondas invirtiendo las localías
  if (doubleRound) {
    const secondLegRounds = [];
    for (let r = 0; r < totalRounds; r++) {
      const secondLegMatches = rounds[r].map(m => ({
        home: m.away,
        away: m.home,
        homeScore: null,
        awayScore: null,
        played: false,
        details: null
      }));
      secondLegRounds.push(secondLegMatches);
    }
    return [...rounds, ...secondLegRounds];
  }

  return rounds;
}


// ==========================================
//            MÓDULO: LIGA
// ==========================================

function saveLigaPartida() {
  const dataStr = JSON.stringify(ligaState);
  downloadFile("partida_liga.json", dataStr);
}

function loadLigaPartida(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.teams || !data.fixture || typeof data.currentRound === "undefined") {
        alert("El archivo no corresponde a una partida de liga válida.");
        return;
      }
      
      // Reconectar referencias físicas a los equipos del array teams
      data.fixture.forEach(round => {
        round.forEach(match => {
          match.home = data.teams.find(t => t.id === match.home.id);
          match.away = data.teams.find(t => t.id === match.away.id);
        });
      });

      ligaState = data;
      document.getElementById("liga-title-display").innerText = `Liga de ${ligaState.teams.length} Equipos (${ligaState.doubleRound ? 'Ida y Vuelta' : 'Solo Ida'})`;
      updateLigaProgressDisplay();
      renderLigaTable();
      renderLigaRound(ligaState.currentRound);
      alert("Partida de Liga cargada con éxito.");
      switchView("view-liga-sim");
    } catch (err) {
      alert("Error al procesar el archivo de partida: " + err.message);
    }
  };
  reader.readAsText(file);
}

function setupLiga() {
  const countSelect = document.getElementById("liga-teams-count");
  const randLevelsBtn = document.getElementById("btn-liga-randomize-levels");
  const startBtn = document.getElementById("btn-start-liga");

  countSelect.addEventListener("change", () => renderLigaSetup());
  randLevelsBtn.addEventListener("click", randomizeLigaLevels);
  startBtn.addEventListener("click", startLigaTorneo);

  // Controles de simulación de Liga
  document.getElementById("btn-liga-sim-match").addEventListener("click", simulateNextLigaMatch);
  document.getElementById("btn-liga-sim-round").addEventListener("click", simulateNextLigaRound);
  document.getElementById("btn-liga-sim-all").addEventListener("click", simulateAllLiga);
  document.getElementById("btn-liga-reset").addEventListener("click", () => switchView("view-menu"));
  document.getElementById("btn-liga-prev-round").addEventListener("click", () => navigateLigaRound(-1));
  document.getElementById("btn-liga-next-round").addEventListener("click", () => navigateLigaRound(1));
  document.getElementById("btn-liga-export").addEventListener("click", exportLigaReport);

  // Guardado y carga
  const saveBtn = document.getElementById("btn-liga-save");
  if (saveBtn) saveBtn.addEventListener("click", saveLigaPartida);

  const loadTrigger = document.getElementById("btn-liga-load-trigger");
  const savefileInput = document.getElementById("input-liga-savefile");
  if (loadTrigger && savefileInput) {
    loadTrigger.addEventListener("click", () => savefileInput.click());
    savefileInput.addEventListener("change", (e) => loadLigaPartida(e.target.files[0]));
  }
}

// Renderiza los inputs para configurar equipos de liga
function renderLigaSetup() {
  const count = parseInt(document.getElementById("liga-teams-count").value);
  const container = document.getElementById("liga-teams-setup-list");
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const defaultTeam = DEFAULT_TEAMS[i % DEFAULT_TEAMS.length];
    const row = document.createElement("div");
    row.className = "team-setup-row form-group";
    row.innerHTML = `
      <input type="text" class="form-control team-setup-name" value="${defaultTeam.name} ${i >= DEFAULT_TEAMS.length ? Math.floor(i / DEFAULT_TEAMS.length) + 1 : ''}" placeholder="Nombre del Equipo">
      <select class="form-control team-setup-level">
        <option value="good" ${defaultTeam.level === 'good' ? 'selected' : ''}>Bueno (B)</option>
        <option value="normal" ${defaultTeam.level === 'normal' ? 'selected' : ''}>Normal (N)</option>
        <option value="bad" ${defaultTeam.level === 'bad' ? 'selected' : ''}>Malo (M)</option>
      </select>
      <input type="color" class="form-control team-setup-color" value="${defaultTeam.color}" style="padding: 4px; height: 38px;">
    `;
    container.appendChild(row);
  }
}

function randomizeLigaLevels() {
  const levels = ["good", "normal", "bad"];
  document.querySelectorAll("#liga-teams-setup-list .team-setup-level").forEach(select => {
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    select.value = randomLevel;
  });
}

function startLigaTorneo() {
  const nameInputs = document.querySelectorAll("#liga-teams-setup-list .team-setup-name");
  const levelSelects = document.querySelectorAll("#liga-teams-setup-list .team-setup-level");
  const colorInputs = document.querySelectorAll("#liga-teams-setup-list .team-setup-color");
  
  const teams = [];
  const nameSet = new Set();

  for (let i = 0; i < nameInputs.length; i++) {
    let name = nameInputs[i].value.trim();
    if (!name) name = `Equipo ${i + 1}`;
    
    // Evitar nombres repetidos agregando un identificador
    let uniqueName = name;
    let suffix = 1;
    while (nameSet.has(uniqueName)) {
      uniqueName = `${name} (${suffix})`;
      suffix++;
    }
    nameSet.add(uniqueName);

    teams.push({
      id: i,
      name: uniqueName,
      level: levelSelects[i].value,
      currentLevel: levelSelects[i].value,
      trend: null,
      color: colorInputs[i].value,
      // Estadísticas
      pts: 0, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0
    });
  }

  const doubleRound = document.getElementById("liga-type").value === "double";
  
  ligaState.teams = teams;
  ligaState.doubleRound = doubleRound;
  ligaState.fixture = generateFixture(teams, doubleRound);
  ligaState.currentRound = 0;
  ligaState.currentMatchIndex = 0;
  ligaState.isFinished = false;

  document.getElementById("liga-title-display").innerText = `Liga de ${teams.length} Equipos (${doubleRound ? 'Ida y Vuelta' : 'Solo Ida'})`;
  document.getElementById("btn-liga-export").disabled = true;

  updateLigaProgressDisplay();
  renderLigaTable();
  renderLigaRound(0);
  switchView("view-liga-sim");
}

function updateLigaProgressDisplay() {
  const current = ligaState.isFinished ? ligaState.fixture.length : ligaState.currentRound + 1;
  const total = ligaState.fixture.length;
  document.getElementById("liga-progress-display").innerText = `Fecha ${current} de ${total}`;

  // Habilitar/Deshabilitar botones de simulación
  document.getElementById("btn-liga-sim-match").disabled = ligaState.isFinished;
  document.getElementById("btn-liga-sim-round").disabled = ligaState.isFinished;
  document.getElementById("btn-liga-sim-all").disabled = ligaState.isFinished;
  
  if (ligaState.isFinished) {
    document.getElementById("btn-liga-export").disabled = false;
  }
}

function recalculateLigaLevels(roundIdx) {
  ligaState.teams.forEach(team => {
    team.currentLevel = team.level;
    team.trend = null;

    if (roundIdx >= 3) {
      let ptsInLast3 = 0;
      
      for (let r = roundIdx - 3; r <= roundIdx - 1; r++) {
        const roundMatches = ligaState.fixture[r];
        const match = roundMatches.find(m => m.home.id === team.id || m.away.id === team.id);
        
        if (match && match.played) {
          const isHome = match.home.id === team.id;
          const hScore = match.homeScore;
          const aScore = match.awayScore;
          
          if (hScore > aScore) {
            ptsInLast3 += isHome ? 3 : 0;
          } else if (aScore > hScore) {
            ptsInLast3 += isHome ? 0 : 3;
          } else {
            ptsInLast3 += 1;
          }
        }
      }

      if (ptsInLast3 <= 1) {
        team.trend = "down";
        if (team.level === "good") team.currentLevel = "normal";
        else if (team.level === "normal") team.currentLevel = "bad";
      } else if (ptsInLast3 >= 7) {
        team.trend = "up";
        if (team.level === "bad") team.currentLevel = "normal";
        else if (team.level === "normal") team.currentLevel = "good";
      }
    }
  });
}

// Renderiza la tabla de posiciones clasificada por criterios de desempate
function renderLigaTable() {
  // Recalcular niveles antes de renderizar la tabla
  recalculateLigaLevels(ligaState.currentRound);

  const tableBody = document.getElementById("liga-table-body");
  tableBody.innerHTML = "";

  // Ordenar equipos: 1. Puntos, 2. Dif. Goles, 3. Goles Favor, 4. Nombre
  const sortedTeams = [...ligaState.teams].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.name.localeCompare(b.name);
  });

  sortedTeams.forEach((t, index) => {
    const row = document.createElement("tr");
    
    // Resaltar al primero (campeón virtual)
    let posText = index + 1;
    if (index === 0 && ligaState.isFinished) posText = `🏆 1`;

    let trendIndicator = "";
    if (t.trend === "up") {
      trendIndicator = `<span style="color: var(--color-primary); font-weight: bold; margin-left: 4px;" title="En Alza (últimos 3 partidos con ≥7 pts)">▲</span>`;
    } else if (t.trend === "down") {
      trendIndicator = `<span style="color: var(--color-danger); font-weight: bold; margin-left: 4px;" title="En Baja (últimos 3 partidos con ≤1 pt)">▼</span>`;
    }

    row.innerHTML = `
      <td class="txt-bold txt-center">${posText}</td>
      <td>
        <div class="col-team-name">
          <span class="team-color-indicator" style="color: ${t.color}; background-color: ${t.color}"></span>
          <span>${t.name}</span>
          ${trendIndicator}
        </div>
      </td>
      <td class="txt-center"><span class="badge ${t.currentLevel === 'good' ? 'badge-accent' : t.currentLevel === 'normal' ? 'badge-primary' : ''}">${t.currentLevel[0].toUpperCase()}</span></td>
      <td class="txt-center txt-bold">${t.pts}</td>
      <td class="txt-center">${t.pj}</td>
      <td class="txt-center">${t.pg}</td>
      <td class="txt-center">${t.pe}</td>
      <td class="txt-center">${t.pp}</td>
      <td class="txt-center">${t.gf}</td>
      <td class="txt-center">${t.gc}</td>
      <td class="txt-center">${t.dg >= 0 ? '+' + t.dg : t.dg}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Renderiza los partidos de una fecha en específico del visualizador
let displayedLigaRound = 0;

function renderLigaRound(roundIdx) {
  if (roundIdx < 0 || roundIdx >= ligaState.fixture.length) return;
  displayedLigaRound = roundIdx;

  // Recalcular rachas para la fecha visualizada
  recalculateLigaLevels(roundIdx);

  document.getElementById("liga-round-title").innerText = `Fecha ${roundIdx + 1}`;
  
  const matchesContainer = document.getElementById("liga-matches-container");
  matchesContainer.innerHTML = "";

  const matches = ligaState.fixture[roundIdx];
  matches.forEach((m, matchIdx) => {
    const card = document.createElement("div");
    card.className = "match-row";
    
    let scoreDisplay = "vs";
    let pillClass = "pending";
    let buttonHtml = "";
    
    if (m.played) {
      scoreDisplay = `${m.homeScore} - ${m.awayScore}`;
      pillClass = "";
    } else if (roundIdx === ligaState.currentRound && matchIdx === ligaState.currentMatchIndex && !ligaState.isFinished) {
      scoreDisplay = "LIVE";
      pillClass = "live";
      buttonHtml = `<button class="btn btn-outline" style="padding: 2px 8px; font-size: 0.7rem; margin-top: 4px;" onclick="playLigaMatchInteractive()">📺 Ver en Vivo</button>`;
    }

    let homeTrend = "";
    if (m.home.trend === "up") homeTrend = `<span style="color: var(--color-primary); margin-left: 2px;">▲</span>`;
    else if (m.home.trend === "down") homeTrend = `<span style="color: var(--color-danger); margin-left: 2px;">▼</span>`;

    let awayTrend = "";
    if (m.away.trend === "up") awayTrend = `<span style="color: var(--color-primary); margin-right: 2px;">▲</span>`;
    else if (m.away.trend === "down") awayTrend = `<span style="color: var(--color-danger); margin-right: 2px;">▼</span>`;

    card.innerHTML = `
      <div class="match-team home">
        <span class="team-color-indicator" style="color: ${m.home.color}; background-color: ${m.home.color}"></span>
        <span>${m.home.name}</span>
        ${homeTrend}
        <span style="font-size: 0.7rem; color: var(--text-muted);">(${m.home.currentLevel[0].toUpperCase()})</span>
      </div>
      <div class="d-flex" style="flex-direction: column; align-items: center;">
        <span class="match-score-pill ${pillClass}">${scoreDisplay}</span>
        ${buttonHtml}
      </div>
      <div class="match-team away">
        <span style="font-size: 0.7rem; color: var(--text-muted);">(${m.away.currentLevel[0].toUpperCase()})</span>
        ${awayTrend}
        <span>${m.away.name}</span>
        <span class="team-color-indicator" style="color: ${m.away.color}; background-color: ${m.away.color}"></span>
      </div>
    `;
    matchesContainer.appendChild(card);
  });
}

function navigateLigaRound(direction) {
  const target = displayedLigaRound + direction;
  if (target >= 0 && target < ligaState.fixture.length) {
    renderLigaRound(target);
  }
}

// Simula un único partido (el siguiente cronológicamente)
function simulateNextLigaMatch() {
  if (ligaState.isFinished) return;

  // Recalcular niveles antes de jugar para la ronda activa
  recalculateLigaLevels(ligaState.currentRound);

  const round = ligaState.currentRound;
  const matchIdx = ligaState.currentMatchIndex;
  const match = ligaState.fixture[round][matchIdx];

  // Simular los datos del partido
  const result = simulateMatchData(match.home, match.away);
  
  // Guardar resultados
  match.homeScore = result.localScore;
  match.awayScore = result.visitorScore;
  match.played = true;
  match.details = result;

  // Actualizar estadísticas de equipos en la tabla
  updateTeamStats(match.home, result.localScore, result.visitorScore);
  updateTeamStats(match.away, result.visitorScore, result.localScore);

  // Avanzar puntero
  ligaState.currentMatchIndex++;
  if (ligaState.currentMatchIndex >= ligaState.fixture[round].length) {
    ligaState.currentMatchIndex = 0;
    ligaState.currentRound++;
    
    if (ligaState.currentRound >= ligaState.fixture.length) {
      ligaState.isFinished = true;
    }
  }

  // Refrescar UI
  renderLigaTable();
  renderLigaRound(round); // mostrar la ronda actual en la que ocurrió el partido
  updateLigaProgressDisplay();
}

function updateTeamStats(team, goalsFor, goalsAgainst) {
  team.pj++;
  team.gf += goalsFor;
  team.gc += goalsAgainst;
  team.dg = team.gf - team.gc;

  if (goalsFor > goalsAgainst) {
    team.pts += 3;
    team.pg++;
  } else if (goalsFor === goalsAgainst) {
    team.pts += 1;
    team.pe++;
  } else {
    team.pp++;
  }
}

// Simula todos los partidos pendientes de la fecha actual
function simulateNextLigaRound() {
  if (ligaState.isFinished) return;

  const targetRound = ligaState.currentRound;
  while (ligaState.currentRound === targetRound && !ligaState.isFinished) {
    simulateNextLigaMatch();
  }
  
  // Mapear la vista a la fecha que acaba de terminar
  renderLigaRound(targetRound);
}

// Simula todo el resto de la liga de golpe
function simulateAllLiga() {
  while (!ligaState.isFinished) {
    simulateNextLigaMatch();
  }
  // Mapear vista a la última fecha
  renderLigaRound(ligaState.fixture.length - 1);
}


// ==========================================
//            MÓDULO: COPA / MUNDIAL
// ==========================================

function saveCopaPartida() {
  const dataStr = JSON.stringify(copaState);
  downloadFile("partida_copa.json", dataStr);
}

function loadCopaPartida(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.teams || !data.groups || typeof data.currentPhase === "undefined") {
        alert("El archivo no corresponde a una partida de copa válida.");
        return;
      }
      
      // Reconectar referencias físicas a los equipos de la copa en copaState.teams
      // 1. Fixture de grupos
      data.groupFixture.forEach(round => {
        round.forEach(match => {
          match.home = data.teams.find(t => t.id === match.home.id);
          match.away = data.teams.find(t => t.id === match.away.id);
        });
      });

      // 2. Grupos
      Object.keys(data.groups).forEach(letter => {
        data.groups[letter] = data.groups[letter].map(gt => 
          data.teams.find(t => t.id === gt.id)
        );
      });

      // 3. Tablas de grupos
      Object.keys(data.groupTables).forEach(letter => {
        data.groupTables[letter].forEach(row => {
          row.team = data.teams.find(t => t.id === row.team.id);
        });
      });

      // 4. Brackets / Playoffs
      const phases = ["octavos", "cuartos", "semifinal", "final"];
      phases.forEach(ph => {
        const pairs = data.knockoutBracket[ph];
        if (!pairs) return;
        pairs.forEach(p => {
          p.team1 = data.teams.find(t => t.id === p.team1.id);
          p.team2 = data.teams.find(t => t.id === p.team2.id);
          
          if (p.winner) p.winner = data.teams.find(t => t.id === p.winner.id);
          if (p.penaltyWinner) p.penaltyWinner = data.teams.find(t => t.id === p.penaltyWinner.id);

          p.match1.home = data.teams.find(t => t.id === p.match1.home.id);
          p.match1.away = data.teams.find(t => t.id === p.match1.away.id);
          if (p.match2) {
            p.match2.home = data.teams.find(t => t.id === p.match2.home.id);
            p.match2.away = data.teams.find(t => t.id === p.match2.away.id);
          }
        });
      });

      copaState = data;
      document.getElementById("copa-title-display").innerText = `Copa de ${copaState.teams.length} Equipos`;
      updateCopaProgressDisplay();
      renderCopaGroups();
      
      if (copaState.currentPhase === "groups") {
        renderCopaGroupRound(copaState.currentRound);
        switchCopaTab("groups");
      } else {
        renderKnockoutBracket();
        switchCopaTab("knockout");
      }

      alert("Partida de Copa cargada con éxito.");
      switchView("view-copa-sim");
    } catch (err) {
      alert("Error al procesar el archivo de partida: " + err.message);
    }
  };
  reader.readAsText(file);
}

function setupCopa() {
  const countSelect = document.getElementById("copa-teams-count");
  const randLevelsBtn = document.getElementById("btn-copa-randomize-levels");
  const startBtn = document.getElementById("btn-start-copa");

  countSelect.addEventListener("change", () => renderCopaSetup());
  randLevelsBtn.addEventListener("click", randomizeCopaLevels);
  startBtn.addEventListener("click", startCopaTorneo);

  // Pestañas
  document.getElementById("btn-copa-tab-groups").addEventListener("click", () => switchCopaTab("groups"));
  document.getElementById("btn-copa-tab-knockout").addEventListener("click", () => switchCopaTab("knockout"));

  // Controles del simulador
  document.getElementById("btn-copa-sim-match").addEventListener("click", simulateNextCopaMatch);
  document.getElementById("btn-copa-sim-round").addEventListener("click", simulateCopaRoundOrPhase);
  document.getElementById("btn-copa-sim-all").addEventListener("click", simulateAllCopa);
  document.getElementById("btn-copa-reset").addEventListener("click", () => switchView("view-menu"));
  document.getElementById("btn-copa-export").addEventListener("click", exportCopaReport);
  document.getElementById("btn-copa-prev-round").addEventListener("click", () => navigateCopaGroupRound(-1));
  document.getElementById("btn-copa-next-round").addEventListener("click", () => navigateCopaGroupRound(1));

  // Guardado y carga
  const saveBtn = document.getElementById("btn-copa-save");
  if (saveBtn) saveBtn.addEventListener("click", saveCopaPartida);

  const loadTrigger = document.getElementById("btn-copa-load-trigger");
  const savefileInput = document.getElementById("input-copa-savefile");
  if (loadTrigger && savefileInput) {
    loadTrigger.addEventListener("click", () => savefileInput.click());
    savefileInput.addEventListener("change", (e) => loadCopaPartida(e.target.files[0]));
  }
}

function switchCopaTab(tabName) {
  const groupsBtn = document.getElementById("btn-copa-tab-groups");
  const knockoutBtn = document.getElementById("btn-copa-tab-knockout");
  const groupsView = document.getElementById("copa-subview-groups");
  const knockoutView = document.getElementById("copa-subview-knockout");

  if (tabName === "groups") {
    groupsBtn.className = "btn btn-primary";
    knockoutBtn.className = "btn btn-outline";
    groupsView.style.display = "block";
    knockoutView.style.display = "none";
  } else {
    groupsBtn.className = "btn btn-outline";
    knockoutBtn.className = "btn btn-primary";
    groupsView.style.display = "none";
    knockoutView.style.display = "block";
    renderKnockoutBracket();
  }
}

function renderCopaSetup() {
  const count = parseInt(document.getElementById("copa-teams-count").value);
  const container = document.getElementById("copa-teams-setup-list");
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const defaultTeam = DEFAULT_TEAMS[i % DEFAULT_TEAMS.length];
    const row = document.createElement("div");
    row.className = "team-setup-row form-group";
    row.innerHTML = `
      <input type="text" class="form-control team-setup-name" value="${defaultTeam.name} ${i >= DEFAULT_TEAMS.length ? Math.floor(i / DEFAULT_TEAMS.length) + 1 : ''}" placeholder="Nombre del Equipo">
      <select class="form-control team-setup-level">
        <option value="good" ${defaultTeam.level === 'good' ? 'selected' : ''}>Bueno (B)</option>
        <option value="normal" ${defaultTeam.level === 'normal' ? 'selected' : ''}>Normal (N)</option>
        <option value="bad" ${defaultTeam.level === 'bad' ? 'selected' : ''}>Malo (M)</option>
      </select>
      <input type="color" class="form-control team-setup-color" value="${defaultTeam.color}" style="padding: 4px; height: 38px;">
    `;
    container.appendChild(row);
  }
}

function randomizeCopaLevels() {
  const levels = ["good", "normal", "bad"];
  document.querySelectorAll("#copa-teams-setup-list .team-setup-level").forEach(select => {
    select.value = levels[Math.floor(Math.random() * levels.length)];
  });
}

function startCopaTorneo() {
  const nameInputs = document.querySelectorAll("#copa-teams-setup-list .team-setup-name");
  const levelSelects = document.querySelectorAll("#copa-teams-setup-list .team-setup-level");
  const colorInputs = document.querySelectorAll("#copa-teams-setup-list .team-setup-color");
  
  const teams = [];
  const nameSet = new Set();

  for (let i = 0; i < nameInputs.length; i++) {
    let name = nameInputs[i].value.trim();
    if (!name) name = `Equipo ${i + 1}`;

    let uniqueName = name;
    let suffix = 1;
    while (nameSet.has(uniqueName)) {
      uniqueName = `${name} (${suffix})`;
      suffix++;
    }
    nameSet.add(uniqueName);

    teams.push({
      id: i,
      name: uniqueName,
      level: levelSelects[i].value,
      color: colorInputs[i].value,
      pts: 0, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0
    });
  }

  // Asignar parámetros
  copaState.teams = teams;
  copaState.groupFormat = document.getElementById("copa-group-format").value;
  copaState.knockoutFormat = document.getElementById("copa-knockout-format").value;
  copaState.currentPhase = "groups";
  copaState.currentRound = 0;
  copaState.currentMatchIndex = 0;
  copaState.isFinished = false;
  copaState.knockoutBracket = { octavos: [], cuartos: [], semifinal: [], final: [] };
  
  document.getElementById("copa-title-display").innerText = `Copa de ${teams.length} Equipos`;
  document.getElementById("btn-copa-export").disabled = true;

  // 1. Repartir en Grupos (A a D o A a H)
  const numTeams = teams.length;
  const numGroups = numTeams === 16 ? 4 : 8;
  copaState.groups = {};
  copaState.groupTables = {};

  const groupLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  
  // Barajar equipos para grupos aleatorios
  const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);

  for (let g = 0; g < numGroups; g++) {
    const letter = groupLetters[g];
    copaState.groups[letter] = shuffledTeams.slice(g * 4, (g + 1) * 4);
    copaState.groupTables[letter] = copaState.groups[letter].map(t => ({
      team: t, pts: 0, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0
    }));
  }

  // 2. Generar fixtures por grupo
  copaState.groupFixture = [];
  const groupRoundsCount = copaState.groupFormat === "double" ? 6 : 3;

  for (let r = 0; r < groupRoundsCount; r++) {
    copaState.groupFixture.push([]);
  }

  // Generar todos contra todos para cada grupo y distribuirlo en las fechas globales
  for (let g = 0; g < numGroups; g++) {
    const letter = groupLetters[g];
    const groupTeams = copaState.groups[letter];
    const groupMatches = generateFixture(groupTeams, copaState.groupFormat === "double");

    for (let r = 0; r < groupRoundsCount; r++) {
      groupMatches[r].forEach(match => {
        copaState.groupFixture[r].push({
          group: letter,
          home: match.home,
          away: match.away,
          homeScore: null,
          awayScore: null,
          played: false,
          details: null
        });
      });
    }
  }

  // Cargar visualizadores
  switchCopaTab("groups");
  updateCopaProgressDisplay();
  renderCopaGroups();
  renderCopaGroupRound(0);
  switchView("view-copa-sim");
}

function updateCopaProgressDisplay() {
  const phase = copaState.currentPhase;
  let phaseText = "";
  
  if (phase === "groups") {
    phaseText = `Fase de Grupos - Fecha ${copaState.currentRound + 1} de ${copaState.groupFixture.length}`;
  } else if (phase === "octavos") {
    phaseText = `Octavos de Final (${copaState.knockoutFormat === 'double' ? 'Ida y Vuelta' : 'Partido Único'})`;
  } else if (phase === "cuartos") {
    phaseText = `Cuartos de Final`;
  } else if (phase === "semifinal") {
    phaseText = `Semifinal`;
  } else if (phase === "final") {
    phaseText = `Gran Final`;
  } else if (phase === "finished") {
    phaseText = `Copa Finalizada`;
  }

  document.getElementById("copa-phase-display").innerText = phaseText;

  // Botones
  const isFin = phase === "finished";
  document.getElementById("btn-copa-sim-match").disabled = isFin;
  document.getElementById("btn-copa-sim-round").disabled = isFin;
  document.getElementById("btn-copa-sim-all").disabled = isFin;
  
  if (isFin) {
    document.getElementById("btn-copa-export").disabled = false;
  }
}

// Renderiza las tablas de posiciones de cada grupo
function renderCopaGroups() {
  const container = document.getElementById("copa-groups-container");
  container.innerHTML = "";

  Object.keys(copaState.groupTables).forEach(letter => {
    const tableData = copaState.groupTables[letter];
    
    // Criterios de orden: pts, dg, gf, nombre
    const sortedRows = [...tableData].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.dg !== a.dg) return b.dg - a.dg;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.team.name.localeCompare(b.team.name);
    });

    const card = document.createElement("div");
    card.className = "card group-card";
    
    let tableHtml = `
      <div class="group-title">Grupo ${letter}</div>
      <div class="table-container" style="margin-bottom: 0; box-shadow: none; border-radius: 8px;">
        <table style="font-size: 0.8rem;">
          <thead>
            <tr>
              <th style="padding: 0.5rem 0.25rem;">#</th>
              <th style="padding: 0.5rem 0.25rem;">Equipo</th>
              <th style="padding: 0.5rem 0.25rem;" class="txt-center">PTS</th>
              <th style="padding: 0.5rem 0.25rem;" class="txt-center">PJ</th>
              <th style="padding: 0.5rem 0.25rem;" class="txt-center">DG</th>
            </tr>
          </thead>
          <tbody>
    `;

    sortedRows.forEach((row, idx) => {
      // Si ya terminó la fase de grupos, marcar a los calificados (los 2 primeros)
      const isQualified = idx < 2 && (copaState.currentPhase !== "groups" || copaState.isFinished);
      const rowClass = isQualified ? "qualified-team" : "";
      
      tableHtml += `
        <tr class="${rowClass}">
          <td style="padding: 0.5rem 0.25rem;" class="txt-bold">${idx + 1}</td>
          <td style="padding: 0.5rem 0.25rem; font-weight: 500;">
            <div class="col-team-name" style="gap: 0.25rem;">
              <span class="team-color-indicator" style="width: 8px; height: 8px; color: ${row.team.color}; background-color: ${row.team.color}"></span>
              <span>${row.team.name}</span>
            </div>
          </td>
          <td style="padding: 0.5rem 0.25rem;" class="txt-center txt-bold">${row.pts}</td>
          <td style="padding: 0.5rem 0.25rem;" class="txt-center">${row.pj}</td>
          <td style="padding: 0.5rem 0.25rem;" class="txt-center">${row.dg >= 0 ? '+' + row.dg : row.dg}</td>
        </tr>
      `;
    });

    tableHtml += `</tbody></table></div>`;
    card.innerHTML = tableHtml;
    container.appendChild(card);
  });
}

// Renderiza los partidos de la fecha actual de fase de grupos
let displayedCopaGroupRound = 0;
function renderCopaGroupRound(roundIdx) {
  if (roundIdx < 0 || roundIdx >= copaState.groupFixture.length) return;
  displayedCopaGroupRound = roundIdx;

  document.getElementById("copa-group-round-title").innerText = `Partidos de la Fase de Grupos - Fecha ${roundIdx + 1}`;
  
  const container = document.getElementById("copa-group-matches-container");
  container.innerHTML = "";

  const matches = copaState.groupFixture[roundIdx];
  matches.forEach((m, matchIdx) => {
    const row = document.createElement("div");
    row.className = "match-row";
    
    let scoreDisplay = "vs";
    let pillClass = "pending";
    let buttonHtml = "";

    if (m.played) {
      scoreDisplay = `${m.homeScore} - ${m.awayScore}`;
      pillClass = "";
    } else if (copaState.currentPhase === "groups" && roundIdx === copaState.currentRound && matchIdx === copaState.currentMatchIndex) {
      scoreDisplay = "LIVE";
      pillClass = "live";
      buttonHtml = `<button class="btn btn-outline" style="padding: 2px 8px; font-size: 0.7rem; margin-top: 4px;" onclick="playCopaGroupMatchInteractive()">📺 Ver en Vivo</button>`;
    }

    row.innerHTML = `
      <div class="match-team home">
        <span style="font-size: 0.7rem; color: var(--text-muted); margin-right: 0.5rem;">[Gr. ${m.group}]</span>
        <span class="team-color-indicator" style="color: ${m.home.color}; background-color: ${m.home.color}"></span>
        <span>${m.home.name}</span>
      </div>
      <div class="d-flex" style="flex-direction: column; align-items: center;">
        <span class="match-score-pill ${pillClass}">${scoreDisplay}</span>
        ${buttonHtml}
      </div>
      <div class="match-team away">
        <span>${m.away.name}</span>
        <span class="team-color-indicator" style="color: ${m.away.color}; background-color: ${m.away.color}"></span>
        <span style="font-size: 0.7rem; color: var(--text-muted); margin-left: 0.5rem;">[Gr. ${m.group}]</span>
      </div>
    `;
    container.appendChild(row);
  });
}

function navigateCopaGroupRound(direction) {
  const target = displayedCopaGroupRound + direction;
  if (target >= 0 && target < copaState.groupFixture.length) {
    renderCopaGroupRound(target);
  }
}

// Simulación interactiva / paso a paso de la copa
function simulateNextCopaMatch() {
  if (copaState.currentPhase === "finished") return;

  if (copaState.currentPhase === "groups") {
    simulateNextCopaGroupMatch();
  } else {
    simulateNextCopaKnockoutMatch();
  }
}

function simulateNextCopaGroupMatch() {
  const round = copaState.currentRound;
  const matchIdx = copaState.currentMatchIndex;
  const match = copaState.groupFixture[round][matchIdx];

  const result = simulateMatchData(match.home, match.away);
  match.homeScore = result.localScore;
  match.awayScore = result.visitorScore;
  match.played = true;
  match.details = result;

  // Actualizar tabla del grupo
  const table = copaState.groupTables[match.group];
  const rowHome = table.find(r => r.team.id === match.home.id);
  const rowAway = table.find(r => r.team.id === match.away.id);

  updateCopaRowStats(rowHome, result.localScore, result.visitorScore);
  updateCopaRowStats(rowAway, result.visitorScore, result.localScore);

  // Avanzar puntero
  copaState.currentMatchIndex++;
  if (copaState.currentMatchIndex >= copaState.groupFixture[round].length) {
    copaState.currentMatchIndex = 0;
    copaState.currentRound++;

    if (copaState.currentRound >= copaState.groupFixture.length) {
      // Fase de grupos completada. Generar Octavos o Cuartos.
      generateKnockoutPhases();
    } else {
      displayedCopaGroupRound = copaState.currentRound;
    }
  }

  renderCopaGroups();
  renderCopaGroupRound(displayedCopaGroupRound);
  updateCopaProgressDisplay();
}

function updateCopaRowStats(row, gf, gc) {
  row.pj++;
  row.gf += gf;
  row.gc += gc;
  row.dg = row.gf - row.gc;

  if (gf > gc) {
    row.pts += 3;
    row.pg++;
  } else if (gf === gc) {
    row.pts += 1;
    row.pe++;
  } else {
    row.pp++;
  }
}

// Genera la primera ronda eliminatoria basándose en las tablas de posiciones
function generateKnockoutPhases() {
  const groupLetters = Object.keys(copaState.groupTables);
  const qualified = {}; // { A: [1º, 2º], B: [1º, 2º] ... }

  groupLetters.forEach(letter => {
    const table = copaState.groupTables[letter];
    const sorted = [...table].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.dg !== a.dg) return b.dg - a.dg;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.team.name.localeCompare(b.team.name);
    });
    qualified[letter] = [sorted[0].team, sorted[1].team];
  });

  if (groupLetters.length === 4) {
    // Clasificaron 8. Saltamos directo a Cuartos de Final
    copaState.currentPhase = "cuartos";
    copaState.currentMatchIndex = 0;
    
    // Cruces clásicos: 1A vs 2B, 1C vs 2D, 1B vs 2A, 1D vs 2C
    copaState.knockoutBracket.cuartos = [
      createKnockoutPair(qualified["A"][0], qualified["B"][1], "Q1"),
      createKnockoutPair(qualified["C"][0], qualified["D"][1], "Q2"),
      createKnockoutPair(qualified["B"][0], qualified["A"][1], "Q3"),
      createKnockoutPair(qualified["D"][0], qualified["C"][1], "Q4")
    ];
  } else {
    // Clasificaron 16. Octavos de Final
    copaState.currentPhase = "octavos";
    copaState.currentMatchIndex = 0;

    // Cruces: 1A vs 2B, 1C vs 2D, 1E vs 2F, 1G vs 2H, 1B vs 2A, 1D vs 2C, 1F vs 2E, 1H vs 2G
    copaState.knockoutBracket.octavos = [
      createKnockoutPair(qualified["A"][0], qualified["B"][1], "O1"),
      createKnockoutPair(qualified["C"][0], qualified["D"][1], "O2"),
      createKnockoutPair(qualified["E"][0], qualified["F"][1], "O3"),
      createKnockoutPair(qualified["G"][0], qualified["H"][1], "O4"),
      createKnockoutPair(qualified["B"][0], qualified["A"][1], "O5"),
      createKnockoutPair(qualified["D"][0], qualified["C"][1], "O6"),
      createKnockoutPair(qualified["F"][0], qualified["E"][1], "O7"),
      createKnockoutPair(qualified["H"][0], qualified["G"][1], "O8")
    ];
  }

  // Cambiar visualización
  switchCopaTab("knockout");
}

function createKnockoutPair(team1, team2, id) {
  const doubleLeg = id.startsWith("F") ? false : (copaState.knockoutFormat === "double");
  return {
    id,
    team1,
    team2,
    match1: { home: team1, away: team2, homeScore: null, awayScore: null, played: false, details: null },
    match2: doubleLeg ? { home: team2, away: team1, homeScore: null, awayScore: null, played: false, details: null } : null,
    team1ScoreTotal: null,
    team2ScoreTotal: null,
    penaltyWinner: null,
    winner: null
  };
}

// Simula el siguiente enfrentamiento eliminatorio de la ronda actual
function simulateNextCopaKnockoutMatch() {
  const phase = copaState.currentPhase;
  const bracket = copaState.knockoutBracket[phase];
  const idx = copaState.currentMatchIndex;

  if (idx >= bracket.length) return;

  const pair = bracket[idx];

  // Si ya tiene ganador, salteamos
  if (pair.winner) {
    copaState.currentMatchIndex++;
    checkPhaseProgression();
    return;
  }

  const doubleLeg = copaState.knockoutFormat === "double";

  if (!pair.match1.played) {
    // Simular Partido 1 (Ida)
    const res = simulateMatchData(pair.match1.home, pair.match1.away);
    pair.match1.homeScore = res.localScore;
    pair.match1.awayScore = res.visitorScore;
    pair.match1.played = true;
    pair.match1.details = res;
    
    if (!doubleLeg) {
      // Resolver al instante en partido único (si hay empate, tanda de penales)
      evaluateSingleLegWinner(pair);
    } else {
      // Pendiente de la vuelta
      renderKnockoutBracket();
    }
  } else if (doubleLeg && !pair.match2.played) {
    // Simular Partido 2 (Vuelta)
    const res = simulateMatchData(pair.match2.home, pair.match2.away);
    pair.match2.homeScore = res.localScore;
    pair.match2.awayScore = res.visitorScore;
    pair.match2.played = true;
    pair.match2.details = res;

    // Evaluar global e ir a penales si empata
    evaluateDoubleLegWinner(pair);
  }
}

// Evalúa el partido único
function evaluateSingleLegWinner(pair) {
  const s1 = pair.match1.homeScore;
  const s2 = pair.match1.awayScore;
  pair.team1ScoreTotal = s1;
  pair.team2ScoreTotal = s2;

  if (s1 > s2) {
    pair.winner = pair.team1;
    advanceMatchIndex();
  } else if (s2 > s1) {
    pair.winner = pair.team2;
    advanceMatchIndex();
  } else {
    // Empate: Tanda de Penales
    triggerPenaltyShootout(pair.team1, pair.team2, (winnerTeam) => {
      pair.penaltyWinner = winnerTeam;
      pair.winner = winnerTeam;
      advanceMatchIndex();
    });
  }
}

// Evalúa el global ida y vuelta
function evaluateDoubleLegWinner(pair) {
  // match1: t1 vs t2 (s1_1 - s1_2)
  // match2: t2 vs t1 (s2_1 - s2_2) (localía invertida: home es t2, away es t1)
  const scoreT1 = pair.match1.homeScore + pair.match2.awayScore;
  const scoreT2 = pair.match1.awayScore + pair.match2.homeScore;
  
  pair.team1ScoreTotal = scoreT1;
  pair.team2ScoreTotal = scoreT2;

  if (scoreT1 > scoreT2) {
    pair.winner = pair.team1;
    advanceMatchIndex();
  } else if (scoreT2 > scoreT1) {
    pair.winner = pair.team2;
    advanceMatchIndex();
  } else {
    // Empate global: Tanda de Penales
    triggerPenaltyShootout(pair.team1, pair.team2, (winnerTeam) => {
      pair.penaltyWinner = winnerTeam;
      pair.winner = winnerTeam;
      advanceMatchIndex();
    });
  }
}

function advanceMatchIndex() {
  copaState.currentMatchIndex++;
  renderKnockoutBracket();
  checkPhaseProgression();
}

function checkPhaseProgression() {
  const phase = copaState.currentPhase;
  const bracket = copaState.knockoutBracket[phase];

  if (copaState.currentMatchIndex >= bracket.length) {
    // La ronda actual ha finalizado. Proceder a la siguiente.
    copaState.currentMatchIndex = 0;
    
    if (phase === "octavos") {
      copaState.currentPhase = "cuartos";
      copaState.knockoutBracket.cuartos = [
        createKnockoutPair(bracket[0].winner, bracket[1].winner, "Q1"),
        createKnockoutPair(bracket[2].winner, bracket[3].winner, "Q2"),
        createKnockoutPair(bracket[4].winner, bracket[5].winner, "Q3"),
        createKnockoutPair(bracket[6].winner, bracket[7].winner, "Q4")
      ];
    } else if (phase === "cuartos") {
      copaState.currentPhase = "semifinal";
      copaState.knockoutBracket.semifinal = [
        createKnockoutPair(bracket[0].winner, bracket[1].winner, "S1"),
        createKnockoutPair(bracket[2].winner, bracket[3].winner, "S2")
      ];
    } else if (phase === "semifinal") {
      copaState.currentPhase = "final";
      // En la gran final, podemos forzar a que sea Partido Único si se prefiere, 
      // pero respetamos copaState.knockoutFormat para mantener consistencia.
      copaState.knockoutBracket.final = [
        createKnockoutPair(bracket[0].winner, bracket[1].winner, "F1")
      ];
    } else if (phase === "final") {
      copaState.currentPhase = "finished";
      copaState.isFinished = true;
    }
    
    renderKnockoutBracket();
  }
  updateCopaProgressDisplay();
}

// Simula la ronda completa de grupos o la llave completa de la fase eliminatoria activa
function simulateCopaRoundOrPhase() {
  if (copaState.currentPhase === "finished") return;

  const currentPhaseName = copaState.currentPhase;
  
  if (currentPhaseName === "groups") {
    const targetRound = copaState.currentRound;
    while (copaState.currentRound === targetRound && copaState.currentPhase === "groups") {
      simulateNextCopaGroupMatch();
    }
  } else {
    // En playoffs, simulamos la fase actual completa (ej: cuartos de final)
    while (copaState.currentPhase === currentPhaseName) {
      simulateNextCopaKnockoutMatch();
      // Si la simulación entra en un modal interactivo de penales, el bucle se detiene
      // y se resolverá al presionar confirmar resultado en el modal.
      if (document.getElementById("penalty-modal").classList.contains("active")) {
        break;
      }
    }
  }
}

// Simula todo el torneo de corrido hasta la finalización
function simulateAllCopa() {
  while (copaState.currentPhase !== "finished") {
    simulateNextCopaMatch();
    if (document.getElementById("penalty-modal").classList.contains("active")) {
      // Detener bucle para que el usuario juegue la tanda de penales
      break;
    }
  }
}

// Renderiza visualmente el cuadro (Bracket) de eliminación directa
function renderKnockoutBracket() {
  const container = document.getElementById("copa-bracket-container");
  container.innerHTML = "";

  const phases = ["octavos", "cuartos", "semifinal", "final"];
  
  // Si comenzamos desde cuartos (16 equipos), omitimos octavos
  const activePhases = copaState.knockoutBracket.octavos.length > 0 
    ? phases 
    : ["cuartos", "semifinal", "final"];

  activePhases.forEach(ph => {
    const col = document.createElement("div");
    col.className = "bracket-round";
    
    let label = ph.toUpperCase();
    if (ph === "semifinal") label = "SEMIFINALES";
    if (ph === "final") label = "FINAL";
    
    col.innerHTML = `<div class="bracket-round-title">${label}</div>`;

    const pairs = copaState.knockoutBracket[ph];

    if (pairs.length === 0) {
      // Relleno vacío con tarjetas pendientes de clasificados
      const placeholdersCount = ph === "octavos" ? 8 : ph === "cuartos" ? 4 : ph === "semifinal" ? 2 : 1;
      for (let i = 0; i < placeholdersCount; i++) {
        const item = document.createElement("div");
        item.className = "bracket-matchup";
        item.innerHTML = `
          <div class="bracket-team-row loser"><span>Pendiente</span></div>
          <div class="bracket-team-row loser"><span>Pendiente</span></div>
        `;
        col.appendChild(item);
      }
    } else {
      pairs.forEach((p, pairIdx) => {
        const item = document.createElement("div");
        const isCurrent = copaState.currentPhase === ph && copaState.currentMatchIndex === pairIdx;
        item.className = `bracket-matchup ${isCurrent ? 'active-matchup' : ''}`;
        
        let t1Class = "";
        let t2Class = "";
        if (p.winner) {
          t1Class = p.winner.id === p.team1.id ? "winner" : "loser";
          t2Class = p.winner.id === p.team2.id ? "winner" : "loser";
        }

        // Armado del texto de los resultados parciales/globales
        let scoreText1 = "-";
        let scoreText2 = "-";
        
        if (p.match1.played) {
          if (p.match2) {
            const m2Text = p.match2.played ? ` / ${p.match2.awayScore}` : " / -";
            scoreText1 = `${p.match1.homeScore}${m2Text}`;
            scoreText2 = `${p.match1.awayScore}${p.match2.played ? ` / ${p.match2.homeScore}` : " / -"}`;
            
            if (p.winner) {
              // Mostrar globales
              const penaltyIndicator = p.penaltyWinner 
                ? ` (${p.penaltyWinner.id === p.team1.id ? 'Pen. G' : 'Pen. P'})` 
                : "";
              scoreText1 += ` [${p.team1ScoreTotal}]${p.winner.id === p.team1.id ? penaltyIndicator : ""}`;
              scoreText2 += ` [${p.team2ScoreTotal}]${p.winner.id === p.team2.id ? penaltyIndicator : ""}`;
            }
          } else {
            const penaltyIndicator = p.penaltyWinner 
              ? ` (${p.penaltyWinner.id === p.team1.id ? 'Pen. G' : 'Pen. P'})` 
              : "";
            scoreText1 = `${p.match1.homeScore}${p.winner && p.winner.id === p.team1.id ? penaltyIndicator : ""}`;
            scoreText2 = `${p.match1.awayScore}${p.winner && p.winner.id === p.team2.id ? penaltyIndicator : ""}`;
          }
        }

        let actionBtnHtml = "";
        if (isCurrent && !p.winner) {
          const labelBtn = !p.match2 ? "📺 Ver en Vivo" : (!p.match1.played ? "📺 Ver Ida" : "📺 Ver Vuelta");
          actionBtnHtml = `
            <div class="text-center" style="margin-top: 0.5rem; border-top: 1px dashed var(--border-color); padding-top: 0.5rem;">
              <button class="btn btn-primary" style="padding: 2px 10px; font-size: 0.7rem; width: 100%;" onclick="playCopaKnockoutMatchInteractive()">
                ${labelBtn}
              </button>
            </div>
          `;
        }

        item.innerHTML = `
          <div class="bracket-team-row ${t1Class}">
            <div class="col-team-name" style="gap: 0.35rem;">
              <span class="team-color-indicator" style="width: 8px; height: 8px; color: ${p.team1.color}; background-color: ${p.team1.color}"></span>
              <span>${p.team1.name}</span>
            </div>
            <span class="bracket-team-score">${scoreText1}</span>
          </div>
          <div class="bracket-team-row ${t2Class}">
            <div class="col-team-name" style="gap: 0.35rem;">
              <span class="team-color-indicator" style="width: 8px; height: 8px; color: ${p.team2.color}; background-color: ${p.team2.color}"></span>
              <span>${p.team2.name}</span>
            </div>
            <span class="bracket-team-score">${scoreText2}</span>
          </div>
          ${actionBtnHtml}
        `;
        col.appendChild(item);
      });
    }
    container.appendChild(col);
  });
}


// ==========================================
//    MÓDULO: TANDA DE PENALES INTERACTIVA
// ==========================================

/**
 * Lanza la pantalla de penales en modal
 */
function triggerPenaltyShootout(team1, team2, callback) {
  penaltyState.local = team1;
  penaltyState.visitor = team2;
  penaltyState.localScore = 0;
  penaltyState.visitorScore = 0;
  penaltyState.localKicks = [];
  penaltyState.visitorKicks = [];
  penaltyState.currentKick = 0;
  penaltyState.teamTurn = "local";
  penaltyState.isFinished = false;
  penaltyState.callbackOnFinish = callback;

  // Actualizar nombres en el modal
  document.getElementById("penalty-teams-title").innerText = `${team1.name} vs ${team2.name}`;
  document.getElementById("penalty-local-name").innerText = team1.name.substring(0, 3).toUpperCase();
  document.getElementById("penalty-visitor-name").innerText = team2.name.substring(0, 3).toUpperCase();
  document.getElementById("penalty-score-display").innerText = "0 - 0";
  
  // Limpiar círculos visuales
  document.getElementById("penalty-local-dots").innerHTML = "";
  document.getElementById("penalty-visitor-dots").innerHTML = "";
  
  // Agregar los 5 círculos iniciales
  for (let i = 0; i < 5; i++) {
    const d1 = document.createElement("div");
    d1.className = "penalty-dot";
    document.getElementById("penalty-local-dots").appendChild(d1);
    
    const d2 = document.createElement("div");
    d2.className = "penalty-dot";
    document.getElementById("penalty-visitor-dots").appendChild(d2);
  }

  document.getElementById("penalty-die-pateador").innerText = "-";
  document.getElementById("penalty-die-arquero").innerText = "-";
  document.getElementById("penalty-result-lbl").innerText = `Comienza pateando ${team1.name}`;
  document.getElementById("penalty-result-lbl").style.color = "var(--text-muted)";

  document.getElementById("btn-penalty-kick").style.display = "inline-flex";
  document.getElementById("btn-penalty-auto").style.display = "inline-flex";
  document.getElementById("btn-penalty-close").style.display = "none";

  // Mostrar el modal
  document.getElementById("penalty-modal").classList.add("active");
}

// Vinculación de eventos de Penales
document.getElementById("btn-penalty-kick").addEventListener("click", playPenaltyKick);
document.getElementById("btn-penalty-auto").addEventListener("click", autoResolvePenaltyShootout);
document.getElementById("btn-penalty-close").addEventListener("click", () => {
  document.getElementById("penalty-modal").classList.remove("active");
  if (penaltyState.callbackOnFinish) {
    const winner = penaltyState.localScore > penaltyState.visitorScore ? penaltyState.local : penaltyState.visitor;
    penaltyState.callbackOnFinish(winner);
  }
});

function playPenaltyKick() {
  if (penaltyState.isFinished) return;

  const btnKick = document.getElementById("btn-penalty-kick");
  const btnAuto = document.getElementById("btn-penalty-auto");
  btnKick.disabled = true;
  btnAuto.disabled = true;

  const dieP = document.getElementById("penalty-die-pateador");
  const dieA = document.getElementById("penalty-die-arquero");
  
  // Cambiar nombres de las etiquetas para saber quién patea y quién ataja
  const localPat = penaltyState.teamTurn === "local";
  document.getElementById("penalty-label-pateador").innerText = localPat ? "Pateador (Loc)" : "Pateador (Vis)";
  document.getElementById("penalty-label-arquero").innerText = localPat ? "Arquero (Vis)" : "Arquero (Loc)";

  dieP.className = localPat ? "die local rolling" : "die visitor rolling";
  dieA.className = localPat ? "die visitor rolling" : "die local rolling";

  let rollCount = 0;
  const anim = setInterval(() => {
    dieP.innerText = rollNumber();
    dieA.innerText = rollNumber();
    rollCount++;
    if (rollCount > 5) {
      clearInterval(anim);
      dieP.classList.remove("rolling");
      dieA.classList.remove("rolling");
      executePenaltyDecision();
    }
  }, 80);
}

function executePenaltyDecision() {
  const pVal = rollNumber();
  const aVal = rollNumber();
  
  document.getElementById("penalty-die-pateador").innerText = pVal;
  document.getElementById("penalty-die-arquero").innerText = aVal;

  // Regla: si diferencia absoluta <= 1, el arquero lo ataja. Si no, es gol. (72% de gol)
  const diff = Math.abs(pVal - aVal);
  const isGoal = diff >= 2;

  const localTurn = penaltyState.teamTurn === "local";
  const labelResult = document.getElementById("penalty-result-lbl");
  
  const comment = isGoal 
    ? PENALTY_COMMENTARIES.goal[Math.floor(Math.random() * PENALTY_COMMENTARIES.goal.length)]
    : PENALTY_COMMENTARIES.miss[Math.floor(Math.random() * PENALTY_COMMENTARIES.miss.length)];
  
  if (localTurn) {
    penaltyState.localKicks.push(isGoal);
    if (isGoal) {
      penaltyState.localScore++;
      labelResult.innerText = `⚽ ¡GOL de ${penaltyState.local.name}! ${comment} (${pVal}-${aVal})`;
      labelResult.style.color = "var(--color-primary)";
    } else {
      labelResult.innerText = `❌ ¡FALLÓ ${penaltyState.local.name}! ${comment} (${pVal}-${aVal})`;
      labelResult.style.color = "var(--color-danger)";
    }
    updatePenaltyDots("local", penaltyState.localKicks);
    penaltyState.teamTurn = "visitor";
  } else {
    penaltyState.visitorKicks.push(isGoal);
    if (isGoal) {
      penaltyState.visitorScore++;
      labelResult.innerText = `⚽ ¡GOL de ${penaltyState.visitor.name}! ${comment} (${pVal}-${aVal})`;
      labelResult.style.color = "var(--color-info)";
    } else {
      labelResult.innerText = `❌ ¡FALLÓ ${penaltyState.visitor.name}! ${comment} (${pVal}-${aVal})`;
      labelResult.style.color = "var(--color-danger)";
    }
    updatePenaltyDots("visitor", penaltyState.visitorKicks);
    penaltyState.teamTurn = "local";
    penaltyState.currentKick++;
  }

  // Actualizar marcador
  document.getElementById("penalty-score-display").innerText = `${penaltyState.localScore} - ${penaltyState.visitorScore}`;

  // Evaluar si ya hay definición
  checkPenaltyWinner();

  const btnKick = document.getElementById("btn-penalty-kick");
  const btnAuto = document.getElementById("btn-penalty-auto");
  btnKick.disabled = false;
  btnAuto.disabled = false;
}

function updatePenaltyDots(side, kicks) {
  const containerId = side === "local" ? "penalty-local-dots" : "penalty-visitor-dots";
  const dotsContainer = document.getElementById(containerId);
  
  // Si estamos en muerte súbita (> 5 tiros), añadimos círculos adicionales
  if (kicks.length > dotsContainer.children.length) {
    const newDot = document.createElement("div");
    newDot.className = "penalty-dot";
    dotsContainer.appendChild(newDot);
  }

  const index = kicks.length - 1;
  const targetDot = dotsContainer.children[index];
  if (targetDot) {
    targetDot.className = `penalty-dot ${kicks[index] ? 'goal' : 'miss'}`;
  }
}

function checkPenaltyWinner() {
  const lKicks = penaltyState.localKicks;
  const vKicks = penaltyState.visitorKicks;
  const lScore = penaltyState.localScore;
  const vScore = penaltyState.visitorScore;

  const maxKicks = 5;

  // 1. Tanda regular (5 penales cada uno)
  if (lKicks.length <= maxKicks || vKicks.length <= maxKicks) {
    const lRem = maxKicks - lKicks.length;
    const vRem = maxKicks - vKicks.length;

    // ¿Es matemáticamente imposible empatar?
    if (lScore > vScore + vRem) {
      endPenaltyShootout(penaltyState.local);
      return;
    }
    if (vScore > lScore + lRem) {
      endPenaltyShootout(penaltyState.visitor);
      return;
    }
  }

  // 2. Muerte súbita (tanda regular terminada con empate)
  if (lKicks.length >= maxKicks && vKicks.length >= maxKicks && lKicks.length === vKicks.length) {
    if (lScore !== vScore) {
      endPenaltyShootout(lScore > vScore ? penaltyState.local : penaltyState.visitor);
    } else {
      document.getElementById("penalty-result-lbl").innerText = `¡Muerte Súbita! Patea ${penaltyState.local.name}...`;
      document.getElementById("penalty-result-lbl").style.color = "var(--color-accent)";
    }
  }
}

function endPenaltyShootout(winner) {
  penaltyState.isFinished = true;
  document.getElementById("penalty-result-lbl").innerText = `🏁 TANDA FINALIZADA. ¡Ganador: ${winner.name}!`;
  document.getElementById("penalty-result-lbl").style.color = "var(--color-accent)";

  document.getElementById("btn-penalty-kick").style.display = "none";
  document.getElementById("btn-penalty-auto").style.display = "none";
  document.getElementById("btn-penalty-close").style.display = "inline-flex";
}

function autoResolvePenaltyShootout() {
  while (!penaltyState.isFinished) {
    const pVal = rollNumber();
    const aVal = rollNumber();
    const diff = Math.abs(pVal - aVal);
    const isGoal = diff >= 2;

    const localTurn = penaltyState.teamTurn === "local";

    if (localTurn) {
      penaltyState.localKicks.push(isGoal);
      if (isGoal) penaltyState.localScore++;
      updatePenaltyDots("local", penaltyState.localKicks);
      penaltyState.teamTurn = "visitor";
    } else {
      penaltyState.visitorKicks.push(isGoal);
      if (isGoal) penaltyState.visitorScore++;
      updatePenaltyDots("visitor", penaltyState.visitorKicks);
      penaltyState.teamTurn = "local";
      penaltyState.currentKick++;
    }

    document.getElementById("penalty-score-display").innerText = `${penaltyState.localScore} - ${penaltyState.visitorScore}`;
    checkPenaltyWinner();
  }
}


// ==========================================
//        EXPORTADOR DE REPORTES (.TXT / .JSON)
// ==========================================

function downloadFile(filename, text) {
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Reporte de Liga
function exportLigaReport() {
  if (!ligaState.isFinished) return;

  const now = new Date().toLocaleString();
  
  // 1. Cabecera
  let report = "=========================================================\n";
  report += "           REPORTE FINAL: LIGA RETRO GOL 0-9\n";
  report += ` Generado: ${now}\n`;
  report += "=========================================================\n\n";

  // 2. Tabla de Posiciones
  report += "TABLA DE POSICIONES FINAL:\n";
  report += "-------------------------------------------------------------------------\n";
  report += "Pos | Equipo                 | NV | PTS | PJ | PG | PE | PP | GF | GC | DG\n";
  report += "-------------------------------------------------------------------------\n";

  const sortedTeams = [...ligaState.teams].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.name.localeCompare(b.name);
  });

  sortedTeams.forEach((t, i) => {
    const pos = (i + 1).toString().padStart(2, " ");
    const name = t.name.padEnd(22, " ");
    const nv = t.level[0].toUpperCase();
    const pts = t.pts.toString().padStart(3, " ");
    const pj = t.pj.toString().padStart(2, " ");
    const pg = t.pg.toString().padStart(2, " ");
    const pe = t.pe.toString().padStart(2, " ");
    const pp = t.pp.toString().padStart(2, " ");
    const gf = t.gf.toString().padStart(2, " ");
    const gc = t.gc.toString().padStart(2, " ");
    const dg = (t.dg >= 0 ? "+" + t.dg : t.dg).toString().padStart(3, " ");
    
    report += `${pos}  | ${name} |  ${nv} | ${pts} | ${pj} | ${pg} | ${pe} | ${pp} | ${gf} | ${gc} | ${dg}\n`;
  });
  report += "-------------------------------------------------------------------------\n\n";

  // 3. Resultados Detallados Fecha por Fecha
  report += "DETALLE DE PARTIDOS POR FECHA:\n";
  report += "=========================================================\n";

  ligaState.fixture.forEach((round, rIdx) => {
    report += `\nFECHA ${rIdx + 1}\n`;
    report += "---------------------------------------------------------\n";
    round.forEach(m => {
      const homeName = m.home.name.padEnd(20, " ");
      const awayName = m.away.name.padStart(20, " ");
      const score = `${m.homeScore} - ${m.awayScore}`.padStart(7, " ").padEnd(9, " ");
      report += `  ${homeName}  ${score}  ${awayName}\n`;
    });
  });

  // Guardar archivo
  const fileDate = new Date().toISOString().slice(0, 10);
  downloadFile(`Liga_Reporte_${fileDate}.txt`, report);
}

// Reporte de Copa
function exportCopaReport() {
  if (!copaState.isFinished) return;

  const now = new Date().toLocaleString();
  const numGroups = Object.keys(copaState.groups).length;

  let report = "=========================================================\n";
  report += "           REPORTE FINAL: COPA RETRO GOL 0-9\n";
  report += ` Generado: ${now}\n`;
  report += "=========================================================\n\n";

  // 1. Podio / Ganador
  const finalPair = copaState.knockoutBracket.final[0];
  const champion = finalPair.winner;
  const runnerUp = finalPair.winner.id === finalPair.team1.id ? finalPair.team2 : finalPair.team1;

  report += "🏆 CUADRO DE HONOR 🏆\n";
  report += "---------------------------------------------------------\n";
  report += ` CAMPEÓN:  ${champion.name} (${champion.level.toUpperCase()})\n`;
  report += ` SUB-SUBCAMPEÓN: ${runnerUp.name} (${runnerUp.level.toUpperCase()})\n`;
  report += "---------------------------------------------------------\n\n";

  // 2. Tablas de Posiciones de Grupos
  report += "TABLA DE POSICIONES FASE DE GRUPOS:\n";
  report += "=========================================================\n";

  Object.keys(copaState.groupTables).forEach(letter => {
    report += `\nGRUPO ${letter}\n`;
    report += "-----------------------------------------------------\n";
    report += "Pos | Equipo                 | NV | PTS | PJ | GF | GC | DG\n";
    report += "-----------------------------------------------------\n";
    
    const table = copaState.groupTables[letter];
    const sorted = [...table].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.dg !== a.dg) return b.dg - a.dg;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.team.name.localeCompare(b.team.name);
    });

    sorted.forEach((row, i) => {
      const pos = (i + 1).toString();
      const name = row.team.name.padEnd(22, " ");
      const nv = row.team.level[0].toUpperCase();
      const pts = row.pts.toString().padStart(3, " ");
      const pj = row.pj.toString().padStart(2, " ");
      const gf = row.gf.toString().padStart(2, " ");
      const gc = row.gc.toString().padStart(2, " ");
      const dg = (row.dg >= 0 ? "+" + row.dg : row.dg).toString().padStart(3, " ");
      report += `${pos}   | ${name} |  ${nv} | ${pts} | ${pj} | ${gf} | ${gc} | ${dg}\n`;
    });
  });
  report += "-----------------------------------------------------\n\n";

  // 3. Detalle de Play-offs / Llaves
  report += "FASE DE ELIMINACIÓN DIRECTA:\n";
  report += "=========================================================\n";

  const phases = ["octavos", "cuartos", "semifinal", "final"];
  phases.forEach(ph => {
    const list = copaState.knockoutBracket[ph];
    if (list.length === 0) return;

    report += `\n${ph.toUpperCase()}\n`;
    report += "---------------------------------------------------------\n";

    list.forEach(p => {
      let t1 = p.team1.name;
      let t2 = p.team2.name;
      let score1 = p.match1.homeScore;
      let score2 = p.match1.awayScore;
      
      let m2Text = "";
      let totalText = "";

      if (copaState.knockoutFormat === "double" && p.match2) {
        m2Text = ` (Vuelta: ${p.match2.awayScore}-${p.match2.homeScore})`;
        totalText = ` | Global: [${p.team1ScoreTotal}-${p.team2ScoreTotal}]`;
      }

      let penaltyText = "";
      if (p.penaltyWinner) {
        penaltyText = ` (Ganador por Penales: ${p.penaltyWinner.name})`;
      }

      report += `  ${t1} vs ${t2}\n`;
      report += `    Marcador: ${score1}-${score2}${m2Text}${totalText}${penaltyText}\n`;
    });
  });

  const fileDate = new Date().toISOString().slice(0, 10);
  downloadFile(`Copa_Reporte_${fileDate}.txt`, report);
}
