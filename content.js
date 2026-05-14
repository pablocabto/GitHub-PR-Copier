function getPrTitle() {
  const titleElement =
    document.querySelector('[data-component="PH_Title"] span.markdown-title') ||
    document.querySelector('h1[data-component="PH_Title"] span')

  return titleElement?.textContent?.trim() || "Unknown PR title";
}

function getPrStats() {
  const pageText = document.body.innerText;

  const match =
    pageText.match(/\+([\d,]+)\s+−([\d,]+)/) ||
    pageText.match(/\+([\d,]+)\s+-([\d,]+)/);

  if (!match) {
    return null;
  }

  return {
    additions: match[1],
    deletions: match[2]
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

async function copyPrSummary() {
  const title = getPrTitle();
  const url = window.location.href;
  const stats = getPrStats();

  const plainTextLines = [
    `Name: ${title}`,
    `PR: ${url}`
  ];

  if (stats) {
    plainTextLines.push(`+${stats.additions} -${stats.deletions}`);
  }

  const plainText = plainTextLines.join("\n");

  const html = `
    <div>
      <strong>Name:</strong> ${escapeHtml(title)}<br>
      <strong>PR:</strong> <a href="${escapeAttribute(url)}">${escapeHtml(url)}</a>
      ${
        stats
          ? `<br><strong><span style="color: #1a7f37;">+${escapeHtml(stats.additions)}</span> <span style="color: red;">-${escapeHtml(stats.deletions)}</span></strong>`
          : ""
      }
    </div>
  `;

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([plainText], { type: "text/plain" }),
        "text/html": new Blob([html], { type: "text/html" })
      })
    ]);

    showTemporaryMessage("PR copiada al portapapeles");
  } catch (error) {
    console.error("No se pudo copiar como HTML. Probando texto plano.", error);

    await navigator.clipboard.writeText(plainText);
    showTemporaryMessage("PR copiada como texto plano");
  }
}

function showTemporaryMessage(message) {
  const box = document.createElement("div");

  box.textContent = message;

  Object.assign(box.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: "999999",
    padding: "10px 14px",
    background: "#1f883d",
    color: "white",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)"
  });

  document.body.appendChild(box);

  setTimeout(() => {
    box.remove();
  }, 2000);
}

copyPrSummary();