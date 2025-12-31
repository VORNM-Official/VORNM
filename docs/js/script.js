// ============================================
// КОНФИГУРАЦИЯ - ИЗМЕНИТЕ ЭТИ ЗНАЧЕНИЯ
// ============================================

const CONFIG = {
  // URL основного веб-сайта (для входа через браузер и кнопки "Скачать для ПК")
  webAppUrl: "https://handsomely-shapely-dotterel.cloudpub.ru:443",

  // URL для скачивания Android приложения
  androidDownloadUrl: "https://download.vornm.app/android/vornm-latest.apk",

  // URL для скачивания ПК версии (если нужна прямая загрузка вместо открытия веб-версии)
  // Если оставить пустым, будет открываться webAppUrl
  pcDownloadUrl: "",

  // Альтернативный вариант: можно указать разные URL для разных платформ
  pcUrls: {
    windows: "",
    mac: "",
    linux: "",
  },
}

// ============================================
// КОД ПРИЛОЖЕНИЯ - НЕ ИЗМЕНЯЙТЕ БЕЗ НЕОБХОДИМОСТИ
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Кнопка "Войти через браузер"
  const webLoginBtn = document.getElementById("webLoginBtn")
  if (webLoginBtn) {
    webLoginBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.open(CONFIG.webAppUrl, "_blank")
    })
  }

  // Кнопка скачивания для Android
  const androidDownloadBtn = document.getElementById("androidDownloadBtn")
  if (androidDownloadBtn) {
    androidDownloadBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.location.href = CONFIG.androidDownloadUrl
    })
  }

  // Кнопка скачивания для ПК
  const pcDownloadBtn = document.getElementById("pcDownloadBtn")
  if (pcDownloadBtn) {
    pcDownloadBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Если указан прямой URL для скачивания ПК версии
      if (CONFIG.pcDownloadUrl) {
        window.location.href = CONFIG.pcDownloadUrl
        return
      }

      // Если нужно определить платформу и предложить соответствующую загрузку
      const userAgent = navigator.userAgent.toLowerCase()
      let downloadUrl = CONFIG.webAppUrl // По умолчанию открываем веб-версию

      if (CONFIG.pcUrls.windows && userAgent.includes("win")) {
        downloadUrl = CONFIG.pcUrls.windows
      } else if (CONFIG.pcUrls.mac && userAgent.includes("mac")) {
        downloadUrl = CONFIG.pcUrls.mac
      } else if (CONFIG.pcUrls.linux && userAgent.includes("linux")) {
        downloadUrl = CONFIG.pcUrls.linux
      }

      // Если это веб-версия, открываем в новой вкладке, иначе скачиваем
      if (downloadUrl === CONFIG.webAppUrl) {
        window.open(downloadUrl, "_blank")
      } else {
        window.location.href = downloadUrl
      }
    })
  }

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href !== "#" && href.length > 1) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    })
  })

  // Анимация появления элементов при прокрутке
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Применяем анимацию к карточкам
  document.querySelectorAll(".feature-card, .news-card, .download-card, .news-article").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Функция для получения версии приложения (можно использовать для отображения)
function getAppVersion() {
  return "2.0.1"
}

// Функция для проверки доступности обновлений (заготовка)
async function checkForUpdates() {
  // Здесь можно добавить логику проверки обновлений через API
  console.log("Checking for updates...")
}

