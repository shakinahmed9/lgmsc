// ========== BASIC SITE FEATURES ==========
document.querySelectorAll('[id^="year"]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ========== DISCORD WEBHOOKS ==========
const webhooks = {
  join: "https://discord.com/api/webhooks/XXXXXXXXXXX/JOIN_WEBHOOK_KEY_HERE",   // Join Us webhook
  contact: "https://discord.com/api/webhooks/YYYYYYYYYYY/CONTACT_WEBHOOK_KEY_HERE" // Contact webhook
};

// Universal send function
async function sendToDiscord(formData, formName, webhook) {
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

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] }),
  });
}

// ========== JOIN FORM ==========
const joinForm = document.getElementById("joinForm");
if (joinForm) {
  joinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await sendToDiscord(e.target, "Join Us", webhooks.join);
    alert("✅ Application sent successfully!");
    e.target.reset();
  });
}

// ========== CONTACT FORM ==========
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await sendToDiscord(e.target, "Contact", webhooks.contact);
    alert("✅ Message sent successfully!");
    e.target.reset();
  });
}
