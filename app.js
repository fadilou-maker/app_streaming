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

function collectPayload(formData) {
  const email = String(formData.get("email") || "").trim();
  return {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    email: email || null,
    opinion: String(formData.get("opinion") || "").trim(),
    favorite: String(formData.get("favorite") || "").trim(),
    why: String(formData.get("why") || "").trim(),
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showError("");

  const formData = new FormData(form);
  const payload = collectPayload(formData);

  if (!payload.opinion || !payload.favorite || !payload.why) {
    showError("Merci de remplir les trois questions obligatoires.");
    return;
  }

  const emailInput = form.elements.namedItem("email");
  if (emailInput instanceof HTMLInputElement && emailInput.value.trim()) {
    if (!emailInput.checkValidity()) {
      showError("L’adresse email n’est pas valide.");
      emailInput.focus();
      return;
    }
  }

  saveResponse(payload);
  form.hidden = true;
  intro.hidden = true;
  success.hidden = false;
  success.focus?.();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

resetBtn.addEventListener("click", () => {
  form.reset();
  showError("");
  success.hidden = true;
  form.hidden = false;
  intro.hidden = false;
  form.elements.namedItem("opinion")?.focus?.();
});
