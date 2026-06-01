const DELIVERY_EMAIL = "diagnostics@vxs.systems";

const form = document.querySelector("#fde-intake");
const output = document.querySelector("#output");
const copyButton = document.querySelector("#copy-output");
const emailLink = document.querySelector("#email-link");

function valueOf(id) {
  const node = document.querySelector(`#${id}`);
  return node ? node.value.trim() : "";
}

function checked(id) {
  const node = document.querySelector(`#${id}`);
  return node && node.checked ? "Yes" : "No";
}

function buildIntake() {
  return `FDE NON-CONFIDENTIAL RISK READ / INTAKE

CONTACT
Email: ${valueOf("email")}
Role: ${valueOf("role")}

SYSTEM SNAPSHOT
Product type: ${valueOf("productType")}
Current stage: ${valueOf("stage")}
Target scale: ${valueOf("scale")}
Primary process: ${valueOf("process")}
Ingredient count range: ${valueOf("ingredientCount")}
Sensitive system flags: ${valueOf("sensitive")}

MAIN CONCERN
${valueOf("concern")}

OPTIONAL PROCESS PARAMETERS OR RANGES
${valueOf("parameters") || "Not provided"}

CONSENT
Manual protocol-assisted review: ${checked("manualConsent")}
Anonymized aggregate pattern retention: ${checked("aggregateConsent")}
Public anonymized case reference after separate preview/approval: ${checked("publicConsent")}

NOTES
No complete formula, exact ratios, supplier names, or brand names are required for this early diagnostic batch.`;
}

function updateEmailLink(text) {
  const subject = encodeURIComponent("FDE Non-Confidential Risk Read Intake");
  const body = encodeURIComponent(text);
  emailLink.href = `mailto:${DELIVERY_EMAIL}?subject=${subject}&body=${body}`;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const text = buildIntake();
    output.textContent = text;
    updateEmailLink(text);
  });
}

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const text = output.textContent.trim();
    if (!text || text === "Generated risk read brief will appear here.") {
      output.textContent = "Generate the risk read brief first, then copy it.";
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy Generated Brief";
      }, 1400);
    } catch (error) {
      output.textContent = `${text}\n\nCOPY NOTE: Browser clipboard access was blocked. Select this text manually and copy it.`;
    }
  });
}
