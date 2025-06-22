let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;

function showPage(pageId) {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("mainApp").style.display = "none";
  document.getElementById(pageId).style.display = "block";
}

function handleRegister() {
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!username || !password) {
    alert("Completa ambos campos");
    return;
  }

  if (users[username]) {
    alert("Ese usuario ya existe");
    return;
  }

  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Cuenta creada con éxito");
  showPage("loginPage");
}

function handleLogin() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) {
    alert("Completa ambos campos");
    return;
  }

  if (users[username] !== password) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  currentUser = username;
  document.getElementById("userGreeting").innerText = username;
  showPage("mainApp");
  document.getElementById("chatBox").innerHTML = ""; // limpiar chat
}

function sendMessage() {
  const input = document.getElementById("userMessage");
  const message = input.value.trim();
  if (!message) return;
  appendToChat(`Tú: ${message}`);
  input.value = "";

  const response = getBotResponse(message.toLowerCase());
  appendToChat(`Asistente: ${response}`);
}

function appendToChat(text) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(msg) {
  const respuestas = [
    {
      k: ["bullying", "acoso", "burlas", "molestan"],
      r: "Lamento que estés enfrentando bullying. No estás solo. Hablar con un adulto de confianza, como un profesor, orientador o familiar, puede ayudarte mucho. También es útil escribir lo que sientes y no guardarlo dentro. Estoy aquí para escucharte siempre."
    },
    {
      k: ["triste", "deprimido", "depresión"],
      r: "Sentirse triste es válido. A veces, lo mejor es aceptar que estás pasando por un mal momento y darte permiso para sentir. Hablarlo con alguien puede aliviar. También puedes probar con actividades que te gusten, respirar profundo o simplemente descansar. No estás solo."
    },
    {
      k: ["enojo", "enojado", "rabia", "furia"],
      r: "El enojo puede ser difícil de controlar. Una técnica útil es contar hasta 10 antes de reaccionar o escribir lo que sientes en una hoja. El ejercicio también ayuda a liberar esa energía. Si el enojo persiste, compartirlo con alguien de confianza puede ayudarte a entenderlo."
    },
    {
      k: ["solo", "sola", "nadie me entiende"],
      r: "Sentirse solo es doloroso, pero no significa que nadie se preocupe por ti. A veces, la mente nos engaña y nos hace creer cosas negativas. Buscar a alguien para hablar, incluso si solo es un mensaje, puede cambiar mucho. Yo estoy aquí para acompañarte."
    },
    {
      k: ["escuela", "colegio", "clases", "profesor"],
      r: "La escuela puede ser difícil. Si estás teniendo problemas con compañeros o profesores, intenta hablar con un adulto responsable en el lugar. También puedes anotar lo que ocurre para tener claro cómo explicar la situación. Defender tu bienestar siempre es válido."
    },
    {
      k: ["familia", "papá", "mamá", "hermanos", "casa"],
      r: "Los problemas familiares afectan mucho nuestras emociones. Si no puedes hablar con tu familia, busca apoyo en un orientador, tío o profesor. Expresar tus emociones sin miedo es importante. Todos merecemos un ambiente seguro en casa, incluyéndote a ti."
    },
    {
      k: ["suicidio", "matarme", "no quiero vivir", "terminar todo"],
      r: "Por favor, si estás pensando en hacerte daño, habla inmediatamente con un adulto, una línea de ayuda o un profesional. Tu vida es valiosa y hay personas que se preocupan por ti, incluso si ahora no lo ves. No estás solo. Busca ayuda. Mereces apoyo, comprensión y otra oportunidad."
    },
    {
      k: ["ayuda", "necesito", "auxilio"],
      r: "Estoy aquí para ayudarte. Cuéntame con calma lo que estás viviendo. No importa si parece pequeño o muy grande, tu experiencia importa. A veces, escribirlo puede ayudarte a entenderlo mejor. Vamos paso a paso."
    },
    {
      k: ["amigos", "amistad", "compañero", "grupo"],
      r: "Las relaciones con amigos pueden ser difíciles, especialmente si sientes que te excluyen o no te respetan. Hablar con ellos con sinceridad puede ayudar. Y si no cambia, recuerda: es mejor estar solo que mal acompañado. Busca personas que te valoren tal como eres."
    },
    {
      k: ["feliz", "contento", "alegre", "bien"],
      r: "¡Me alegra mucho que te sientas así! Aprovecha ese estado para hacer algo que te gusta o compartir tu felicidad con otros. También puedes anotar lo que te hace sentir bien, así puedes recordarlo en días difíciles. Sigue cultivando eso positivo dentro de ti."
    },
    {
      k: ["odio", "me odian", "nadie me quiere"],
      r: "Es muy duro sentirse rechazado. Pero a veces nuestras emociones nos hacen ver lo peor. Eso no significa que sea verdad. Hay personas que te valoran aunque no lo digan. Y si aún no las encuentras, créeme: las encontrarás. Mereces respeto y cariño, como todos."
    },
    {
      k: ["vergüenza", "ridículo", "humillado"],
      r: "Sentirse avergonzado es muy humano. Pero todos cometemos errores, y muchas veces no es tan grave como creemos. Aprende de la experiencia, sonríe si puedes, y sigue adelante. No dejes que un momento defina lo que eres. Eres más fuerte de lo que crees."
    },
    {
      k: ["miedo", "temor", "ansiedad"],
      r: "El miedo nos protege, pero también puede paralizarnos. Respira lento, cuenta hasta cuatro, exhala y repite. Si el miedo es por algo real, hablemos. Si es ansiedad, recuerda que pasará. Todo pasa. Y no estás solo. Hay luz al otro lado del miedo."
    },
    {
      k: ["no puedo más", "agotado", "cansado"],
      r: "Cuando te sientas así, es momento de parar un poco. Respira. Dormir, hablar, caminar o simplemente llorar pueden ayudarte. No estás obligado a ser fuerte todo el tiempo. Incluso los más valientes necesitan descansar. Aquí estoy para apoyarte mientras te recuperas."
    }
  ];

  for (let r of respuestas) {
    for (let palabra of r.k) {
      if (msg.includes(palabra)) return r.r;
    }
  }

  return "No entendí muy bien, pero estoy aquí para escucharte. ¿Podrías explicarlo con otras palabras?";
}
