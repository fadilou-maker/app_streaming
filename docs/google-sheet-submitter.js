(function () {
  const form = document.getElementById('survey-form');
  const ENDPOINT = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

  if (!form) return;

  const CHECKBOX_GROUPS = [
    'content_types',
    'discovery',
    'barriers',
    'data_sensitive',
    'ui_languages',
    'music_features',
    'video_features'
  ];

  function getCheckedValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
      .map((input) => input.value);
  }

  function serializeForm() {
    const formData = new FormData(form);
    const payload = {};

    for (const [key, value] of formData.entries()) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        if (!Array.isArray(payload[key])) payload[key] = [payload[key]];
        payload[key].push(value);
      } else {
        payload[key] = value;
      }
    }

    CHECKBOX_GROUPS.forEach((groupName) => {
      payload[groupName] = getCheckedValues(groupName);
    });

    payload.submitted_at = new Date().toISOString();
    return payload;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Envoi...';
    }

    try {
      const payload = serializeForm();
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result && result.error ? result.error : 'Erreur inconnue');
      }

      document.body.classList.add('is-thanks');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'envoi : ' + error.message);
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Soumettre';
      }
    }
  });
})();
