const socials = [
  {
    name: "Website",
    handle: "prioritybags.in",
    url: "https://prioritybags.in/",
    icon: "assets/logo.png",
    color: "#3d759e",
    logo: true,
  },
  {
    name: "Instagram",
    handle: "@priority.bags",
    url: "https://www.instagram.com/priority.bags?igsh=OXJ6d3I5MXM0djU3",
    icon: "assets/icons/instagram.svg",
    color: "#d95f43",
  },
  {
    name: "Facebook",
    handle: "Priority Bags",
    url: "https://www.facebook.com/share/16nwvio56J/?mibextid=wwXIfr",
    icon: "assets/icons/facebook.svg",
    color: "#1877f2",
  },
  {
    name: "YouTube",
    handle: "@prioritybags",
    url: "https://youtube.com/@prioritybags?si=MvAj7X6_M2L_-ago",
    icon: "assets/icons/youtube.svg",
    color: "#ff0033",
  },
  {
    name: "LinkedIn",
    handle: "High Spirit Commercial Ventures Pvt. Ltd.",
    url: "https://www.linkedin.com/company/hscvpl/",
    icon: "assets/icons/linkedin.svg",
    color: "#0a66c2",
  },
];

const defaultPublicUrl = "https://yc6wppwhf9-cmyk.github.io/Qrcode/";
const linkContainer = document.querySelector("#socialLinks");
const qrContainer = document.querySelector("#qrcode");
const pageUrlInput = document.querySelector("#pageUrl");
const refreshButton = document.querySelector("#refreshQr");
const downloadButton = document.querySelector("#downloadQr");
const qrPanel = document.querySelector("#qrPanel");

function renderLinks() {
  linkContainer.innerHTML = socials
    .map(
      (social) => `
        <a class="social-link" href="${social.url}" target="_blank" rel="noreferrer" style="--accent: ${social.color}">
          <span class="icon ${social.logo ? "brand-icon" : ""}" aria-hidden="true">
            <img src="${social.icon}" alt="" loading="lazy" />
          </span>
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
  const canvas = document.createElement("canvas");
  const size = 512;
  canvas.width = size;
  canvas.height = size;
  qrContainer.appendChild(canvas);

  const context = canvas.getContext("2d");
  const qrImage = new Image();
  const logoImage = new Image();
  qrImage.crossOrigin = "anonymous";
  logoImage.crossOrigin = "anonymous";

  qrImage.onload = () => {
    context.drawImage(qrImage, 0, 0, size, size);
    logoImage.src = "assets/logo.png";
  };

  logoImage.onload = () => {
    const logoBox = 92;
    const logoPadding = 14;
    const x = (size - logoBox) / 2;
    const y = (size - logoBox) / 2;

    context.fillStyle = "#ffffff";
    context.beginPath();
    context.roundRect(
      x - logoPadding,
      y - logoPadding,
      logoBox + logoPadding * 2,
      logoBox + logoPadding * 2,
      12,
    );
    context.fill();
    context.drawImage(logoImage, x, y, logoBox, logoBox);
  };

  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=16&data=${encodeURIComponent(value)}`;
}

function getQrImageUrl() {
  const canvas = qrContainer.querySelector("canvas");

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
  link.download = "priority-bags-social-qr.png";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const localHosts = ["localhost", "127.0.0.1", "::1"];
const isPublicHttpPage =
  window.location.protocol.startsWith("http") &&
  !localHosts.includes(window.location.hostname);
const isPublicPreview =
  new URLSearchParams(window.location.search).get("preview") === "public";

if (isPublicHttpPage || isPublicPreview) {
  document.body.classList.add("public-view");
  qrPanel.setAttribute("aria-hidden", "true");
}

pageUrlInput.value = isPublicHttpPage ? window.location.href : defaultPublicUrl;

renderLinks();
renderQr(pageUrlInput.value);

refreshButton.addEventListener("click", () => {
  renderQr(pageUrlInput.value.trim() || defaultPublicUrl);
});

downloadButton.addEventListener("click", downloadQr);
