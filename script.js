// ========== BASIC SITE FEATURES ==========

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll spy
const navLinks = document.querySelectorAll('.nav-link');
const sections = ['home', 'team', 'join', 'contact'].map(id => document.getElementById(id));
function onScroll() {
  const y = window.scrollY + 120;
  let current = sections[0].id;
  for (const sec of sections) { if (sec.offsetTop <= y) current = sec.id; }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Navigation click
navLinks.forEach(a => {
  a.addEventListener('click', () => {
    navLinks.forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});


// ========== DISCORD WEBHOOK INTEGRATION ==========
const webhookURL = "https://discord.com/api/webhooks/1433314627042934804/b4aYBaV8jHm4GjNjNCV9FDfV_3Os3AOkJB6r_noN0iDIIZ6U9aXidAaHsDiMIwfBq4Jj"; // <-- তোমার webhook বসাও

async function sendToDiscord(formData, formName) {
  const data = Object.fromEntries(new FormData(formData).entries());
  const embed = {
    title: `📩 New ${formName} Submission`,
    color: 5814783,
    fields: Object.entries(data).map(([k, v]) => ({
      name: k.charAt(0).toUpperCase() + k.slice(1),
      value: v || "N/A",
      inline: false
    })),
    timestamp: new Date(),
  };

  await fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] }),
  });
}

// Join form handler
document.getElementById("joinForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await sendToDiscord(e.target, "Join Us");
  alert("✅ Application sent successfully!");
  e.target.reset();
});

// Contact form handler
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  await sendToDiscord(e.target, "Contact");
  alert("✅ Message sent successfully!");
  e.target.reset();
});
