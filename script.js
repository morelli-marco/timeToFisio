// Site small behaviours

document.getElementById('year').textContent = new Date().getFullYear();

// WhatsApp quick booking
const whatsappBtn = document.getElementById('whatsappBtn');
whatsappBtn.addEventListener('click', () => {
  const phone = '+393451234567'; // sostituisci con il numero reale
  const text = encodeURIComponent('Ciao! Vorrei prenotare una visita presso Studio Equilibrio. Nome: ');
  window.open(`https://wa.me/${phone.replace(/[^\d]/g,'')}?text=${text}`, '_blank');
});

// Form submission: uses Formspree endpoint set in form action. 
// Replace action with your real endpoint (https://formspree.io/f/xxxx)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // client-side validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const action = form.action;

  status.textContent = 'Invio in corso...';
  status.style.color = '#666';

  try {
    const res = await fetch(action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (res.ok) {
      status.textContent = 'Richiesta inviata! Ti risponderemo al più presto.';
      status.style.color = 'green';
      form.reset();
    } else {
      const json = await res.json().catch(()=>null);
      status.textContent = json && json.error ? `Errore: ${json.error}` : 'Errore nell\'invio. Prova di nuovo più tardi.';
      status.style.color = 'crimson';
    }
  } catch (err) {
    status.textContent = 'Errore di rete. Controlla la connessione o usa WhatsApp.';
    status.style.color = 'crimson';
    console.error(err);
  }
});
