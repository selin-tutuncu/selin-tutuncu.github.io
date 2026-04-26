// =============================================
// Hafta 7 - Bootstrap + JavaScript Lab
// Selin TUTUNCU | Web Programlama
// =============================================

// --- Yıl güncelle ---
document.getElementById("footerYil").textContent = new Date().getFullYear();

// =============================================
// 1) TEMA DEĞİŞTİRME
// =============================================
const temaBtn = document.getElementById("temaBtn");
let karanlikTema = false;

temaBtn.addEventListener("click", function () {
  karanlikTema = !karanlikTema;
  const body      = document.getElementById("pageBody");
  const navbar    = document.getElementById("mainNavbar");
  const footer    = document.getElementById("pageFooter");
  const formCard  = document.getElementById("formCard");
  const hero      = document.querySelector(".hero-section");

  if (karanlikTema) {
    body.classList.add("dark-theme");
    navbar.classList.remove("navbar-light", "bg-white");
    navbar.classList.add("navbar-dark");
    footer.classList.add("dark-footer");
    formCard.classList.add("dark-card");
    hero.classList.add("dark-hero");
    temaBtn.textContent = "☀️ Tema Değiştir";
  } else {
    body.classList.remove("dark-theme");
    navbar.classList.remove("navbar-dark");
    navbar.classList.add("navbar-light", "bg-white");
    footer.classList.remove("dark-footer");
    formCard.classList.remove("dark-card");
    hero.classList.remove("dark-hero");
    temaBtn.textContent = "🌙 Tema Değiştir";
  }
});

// =============================================
// 2) ETKİNLİK KARTINDAN OTOMATİK SEÇİM
// =============================================
function etkinlikSec(etkinlikAdi) {
  const select = document.getElementById("etkinlikSec");
  select.value = etkinlikAdi;
  document.getElementById("basvuruFormu").scrollIntoView({ behavior: "smooth", block: "start" });
}

// =============================================
// 3) FORM GÖNDERİMİ & DOĞRULAMA
// =============================================
const form        = document.getElementById("basvuruForm");
const uyariAlani  = document.getElementById("uyariAlani");
const sonucBolumu = document.getElementById("sonucBolumu");
const sonucAlani  = document.getElementById("sonucAlani");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Sayfa yenilenmesin

  // Alanları al
  const adSoyad  = document.getElementById("adSoyad").value.trim();
  const email    = document.getElementById("email").value.trim();
  const etkinlik = document.getElementById("etkinlikSec").value;
  const deneyim  = document.getElementById("deneyim").value;
  const mesaj    = document.getElementById("mesaj").value.trim();
  const kvkk     = document.getElementById("kvkk").checked;

  // --- Boş alan kontrolü ---
  const eksikler = [];
  if (!adSoyad)  eksikler.push("Ad Soyad");
  if (!email)    eksikler.push("E-posta");
  if (!etkinlik) eksikler.push("Etkinlik Seçimi");
  if (!deneyim)  eksikler.push("Deneyim Seviyesi");
  if (!kvkk)     eksikler.push("KVKK Onayı");

  if (eksikler.length > 0) {
    uyariAlani.classList.remove("d-none");
    uyariAlani.innerHTML =
      "⚠️ Lütfen şu alanları doldurunuz: <strong>" + eksikler.join(", ") + "</strong>";
    return;
  }

  // --- E-posta format kontrolü ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    uyariAlani.classList.remove("d-none");
    uyariAlani.textContent = "⚠️ Lütfen geçerli bir e-posta adresi giriniz.";
    return;
  }

  // Uyarıyı gizle
  uyariAlani.classList.add("d-none");

  // --- Başarılı: Özet kartı oluştur ---
  const simdi = new Date();
  const tarihStr = simdi.toLocaleDateString("tr-TR", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });

  sonucAlani.innerHTML = `
    <div class="text-center mb-4">
      <div style="font-size:3rem;">✅</div>
      <h4 class="fw-bold mt-2 text-success">Başvurunuz Alındı!</h4>
      <p class="text-muted small">Aşağıda başvuru özetinizi görebilirsiniz.</p>
    </div>
    <hr>
    <div class="row g-3 mt-1">
      <div class="col-6">
        <div class="small text-muted fw-semibold">Ad Soyad</div>
        <div class="fw-bold">${adSoyad}</div>
      </div>
      <div class="col-6">
        <div class="small text-muted fw-semibold">E-posta</div>
        <div class="fw-bold">${email}</div>
      </div>
      <div class="col-6">
        <div class="small text-muted fw-semibold">Seçilen Etkinlik</div>
        <div class="fw-bold">${etkinlik}</div>
      </div>
      <div class="col-6">
        <div class="small text-muted fw-semibold">Deneyim Seviyesi</div>
        <div class="fw-bold">${deneyim}</div>
      </div>
      ${mesaj ? `
      <div class="col-12">
        <div class="small text-muted fw-semibold">Beklentiler</div>
        <div class="fw-bold">${mesaj}</div>
      </div>` : ""}
      <div class="col-12">
        <div class="small text-muted fw-semibold">Başvuru Tarihi</div>
        <div class="fw-bold">${tarihStr}</div>
      </div>
    </div>
    <hr>
    <div class="text-center mt-3">
      <button class="btn btn-outline-primary btn-sm rounded-3" onclick="yeniBasvuru()">
        Yeni Başvuru Yap
      </button>
    </div>
  `;

  sonucBolumu.style.setProperty("display", "block", "important");
  sonucBolumu.scrollIntoView({ behavior: "smooth", block: "start" });

  form.reset();
});

// --- Formu sıfırlama ---
function yeniBasvuru() {
  sonucBolumu.style.setProperty("display", "none", "important");
  document.getElementById("basvuruFormu").scrollIntoView({ behavior: "smooth" });
}
