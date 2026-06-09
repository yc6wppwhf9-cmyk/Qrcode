const socials = [
  {
    name: "Website",
    handle: "prioritybags.in",
    url: "https://prioritybags.in/",
    icon: "assets/icons/website.svg",
    color: "#3d759e",
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
          <span class="icon" aria-hidden="true">
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
  const image = document.createElement("img");
  image.src = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&margin=16&data=${encodeURIComponent(value)}`;
  image.alt = "QR code for Priority Bags social links";
  image.crossOrigin = "anonymous";
  qrContainer.appendChild(image);
}

function getQrImageUrl() {
  const image = qrContainer.querySelector("img");

  if (image?.src) {
    return image.src;
  }

  return "";
}

async function downloadQr() {
  const imageUrl = getQrImageUrl();
  if (!imageUrl) return;

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = "priority-bags-social-qr.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
    return;
  } catch (error) {
    console.warn("QR download fell back to direct image link.", error);
  }

  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "priority-bags-social-qr.png";
  link.target = "_blank";
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
