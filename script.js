const socials = [
  {
    name: "Instagram",
    handle: "@priority.bags",
    url: "https://www.instagram.com/priority.bags?igsh=OXJ6d3I5MXM0djU3",
    icon: "IG",
    color: "#d95f43",
  },
  {
    name: "Facebook",
    handle: "Priority Bags",
    url: "https://www.facebook.com/share/16nwvio56J/?mibextid=wwXIfr",
    icon: "FB",
    color: "#1877f2",
  },
  {
    name: "YouTube",
    handle: "@prioritybags",
    url: "https://youtube.com/@prioritybags?si=MvAj7X6_M2L_-ago",
    icon: "YT",
    color: "#ff0033",
  },
  {
    name: "LinkedIn",
    handle: "High Spirit Commercial Ventures Pvt. Ltd.",
    url: "https://www.linkedin.com/company/hscvpl/",
    icon: "IN",
    color: "#0a66c2",
  },
];

const defaultPublicUrl = "https://yc6wppwhf9-cmyk.github.io/Qrcode/";
const linkContainer = document.querySelector("#socialLinks");
const qrContainer = document.querySelector("#qrcode");
const pageUrlInput = document.querySelector("#pageUrl");
const refreshButton = document.querySelector("#refreshQr");
const downloadButton = document.querySelector("#downloadQr");

let qrCode;

function renderLinks() {
  linkContainer.innerHTML = socials
    .map(
      (social) => `
        <a class="social-link" href="${social.url}" target="_blank" rel="noreferrer" style="--accent: ${social.color}">
          <span class="icon" aria-hidden="true">${social.icon}</span>
          <span class="link-text">
            <span class="link-title">${social.name}</span>
            <span class="link-handle">${social.handle}</span>
          </span>
        </a>
      `,
    )
    .join("");
}

function renderQr(value) {
  qrContainer.innerHTML = "";
  qrCode = new QRCode(qrContainer, {
    text: value,
    width: 256,
    height: 256,
    colorDark: "#14151a",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

function getQrImageUrl() {
  const image = qrContainer.querySelector("img");
  const canvas = qrContainer.querySelector("canvas");

  if (image?.src) {
    return image.src;
  }

  if (canvas) {
    return canvas.toDataURL("image/png");
  }

  return "";
}

function downloadQr() {
  const imageUrl = getQrImageUrl();
  if (!imageUrl) return;

  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "social-links-qr.png";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const localHosts = ["localhost", "127.0.0.1", "::1"];
const isPublicHttpPage =
  window.location.protocol.startsWith("http") &&
  !localHosts.includes(window.location.hostname);

pageUrlInput.value = isPublicHttpPage ? window.location.href : defaultPublicUrl;

renderLinks();
renderQr(pageUrlInput.value);

refreshButton.addEventListener("click", () => {
  renderQr(pageUrlInput.value.trim() || defaultPublicUrl);
});

downloadButton.addEventListener("click", downloadQr);
