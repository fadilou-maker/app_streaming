const STORAGE_KEY = "app-streaming-survey-responses";

const form = document.getElementById("survey-form");
const success = document.getElementById("success");
const intro = document.querySelector(".intro");
const errorEl = document.getElementById("form-error");
const resetBtn = document.getElementById("reset-btn");

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = !message;
}

function readResponses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveResponse(entry) {
  const responses = readResponses();
  responses.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
  console.log("[App Streaming] Réponse enregistrée:", entry);
  console.log("[App Streaming] Total local:", responses.length);
}

function checkedValue(name) {
  const input = form.querySelector(`input[name="${name}"]:checked`);
  return input ? input.value : "";
}

function textValue(name) {
  const el = form.elements.namedItem(name);
  return el && "value" in el ? String(el.value || "").trim() : "";
}

function resolveFavorite() {
  const choice = checkedValue("q2_choice");
  const other = textValue("q2_other");
  if (choice === "Autre" && other) return other;
  if (choice && other && choice !== other) {
    return { favorite: choice, favoriteDetail: other };
  }
  if (choice) return choice;
  if (other) return other;
  return "";
}

function collectPayload() {
  const email = textValue("email");
  const favorite = resolveFavorite();
  const favoriteValue =
    typeof favorite === "object" ? favorite.favorite : favorite;
  const favoriteDetail =
    typeof favorite === "object" ? favorite.favoriteDetail : null;

  return {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    email: email || null,
    q1_streamingOpinion: textValue("q1"),
    q2_favorite: favoriteValue || null,
    q2_favoriteDetail: favoriteDetail,
    q3_whyFavorite: textValue("q3"),
    q4_allInOneScale: checkedValue("q4_scale") || null,
    q4_allInOneComment: textValue("q4_comment") || null,
    q5_whatsappOpinion: textValue("q5"),
    q6_whyWhatsapp: textValue("q6"),
    q7_knowSecureAlts: checkedValue("q7_yn") || null,
    q7_secureAltsComment: textValue("q7_comment") || null,
    q8_whyNotSecureAlts: textValue("q8") || null,
  };
}

function validate(payload) {
  const emailInput = form.elements.namedItem("email");
  if (
    emailInput instanceof HTMLInputElement &&
    emailInput.value.trim() &&
    !emailInput.checkValidity()
  ) {
    return { message: "L’adresse email n’est pas valide.", focus: emailInput };
  }

  if (!payload.q1_streamingOpinion) {
    return {
      message: "Merci de répondre à la question sur les apps de streaming.",
      focus: form.elements.namedItem("q1"),
    };
  }

  if (!payload.q2_favorite) {
    return {
      message: "Choisissez une préférence ou indiquez-la librement.",
      focus: form.elements.namedItem("q2_other"),
    };
  }

  if (!payload.q3_whyFavorite) {
    return {
      message: "Merci d’indiquer pourquoi vous préférez cette app.",
      focus: form.elements.namedItem("q3"),
    };
  }

  if (!payload.q4_allInOneScale) {
    return {
      message: "Indiquez votre intérêt pour une app tout-en-un (échelle 1–5).",
      focus: form.querySelector('input[name="q4_scale"]'),
    };
  }

  if (!payload.q5_whatsappOpinion) {
    return {
      message: "Merci de partager votre avis sur WhatsApp.",
      focus: form.elements.namedItem("q5"),
    };
  }

  if (!payload.q6_whyWhatsapp) {
    return {
      message: "Merci d’indiquer pourquoi vous êtes sur WhatsApp.",
      focus: form.elements.namedItem("q6"),
    };
  }

  if (!payload.q7_knowSecureAlts) {
    return {
      message: "Répondez Oui ou Non à la question sur les messageries sécurisées.",
      focus: form.querySelector('input[name="q7_yn"]'),
    };
  }

  return null;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showError("");

  const payload = collectPayload();
  const problem = validate(payload);
  if (problem) {
    showError(problem.message);
    if (problem.focus && "focus" in problem.focus) problem.focus.focus();
    return;
  }

  saveResponse(payload);
  form.hidden = true;
  intro.hidden = true;
  success.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

resetBtn.addEventListener("click", () => {
  form.reset();
  showError("");
  success.hidden = true;
  form.hidden = false;
  intro.hidden = false;
  form.elements.namedItem("q1")?.focus?.();
});
