# 🛠️ Toolbar by FixTech SV

**Toolbar** es una aplicación de escritorio para **Windows y macOS**, modular y ligera, diseñada para potenciar la productividad y el control de herramientas de streaming y del sistema. Construida con tecnologías web modernas y un backend robusto, ofrece un ecosistema dinámico de extensiones.

---

## ✨ Características Principales

* **🔌 Tienda de Extensiones:** Instala, actualiza y gestiona extensiones (OBS Studio, Discord, TikTok LIVE Studio, Twitch y Spotify) desde la **Tienda** del menú principal, sin reinstalar la aplicación.
* **🔘 Botones y Rutinas:** Abre programas, archivos y sitios web, envía atajos de teclado, controla el audio y la multimedia, y apaga, reinicia o bloquea el equipo. Con las **Rutinas**, un solo botón ejecuta varias tareas en orden.
* **📱 Control Remoto Móvil:** Controla tu cuadrícula de botones desde tu teléfono o tablet en tu red local escaneando un código QR. Puedes vincular varios dispositivos y administrarlos desde la app.
* **🎨 Interfaz Personalizable:** Tema oscuro, varios perfiles de botones, cuadrícula de 2, 4 o 6 columnas y un fondo distinto para cada perfil (imagen o GIF).
* **🔄 Actualizaciones Automáticas:** Las nuevas versiones se descargan e instalan desde la app, en Windows y en Mac.
* **⚙️ Arranque Automático:** Puede iniciarse sola al encender Windows o macOS.
* **🌡️ Sensores de Temperatura** *(Windows)*: Lectura de temperaturas de CPU/GPU en tiempo real (requiere LibreHardwareMonitor).
* **📦 Sistema de Respaldos:** Exporta e importa tus perfiles, imágenes y configuraciones en archivos `.zip`.

---

## 💻 Tecnologías Utilizadas

Este proyecto está desarrollado bajo una arquitectura de alto rendimiento:

* **Frontend:** React, TypeScript, Tailwind CSS.
* **Backend / Core:** Tauri v2, Rust.
* **Inyección de Plugins:** Sistema seguro de ejecución de scripts en memoria mediante Blob Objects y Contexto Global de React.

---

## 📥 Instalación y Descargas

Descarga la última versión desde **[Releases](https://github.com/williamrosa/toolbar-releases/releases/latest)**.

### Windows
1. Descarga el archivo `Toolbar.by.Fixtech.sv_<versión>_x64-setup.exe`.
2. Ejecuta el instalador y sigue las instrucciones en pantalla.

### Mac (Apple Silicon e Intel)
1. Descarga el archivo `.dmg`, ábrelo y arrastra **Toolbar** a **Aplicaciones**.
2. Toolbar todavía no está firmada por Apple, así que macOS la bloquea la primera vez que la abres. Cuando diga que no puede verificar al desarrollador, pulsa **Listo**.
3. Ve a **Ajustes del Sistema → Privacidad y seguridad**, baja hasta el aviso de Toolbar y pulsa **Abrir igualmente**. Confirma con tu contraseña.
4. Si en lugar de eso macOS dice que la app **"está dañada"**, abre **Terminal**, pega este comando y vuelve a abrir la app:
   ```
   xattr -cr "/Applications/Toolbar by Fixtech sv.app"
   ```
5. Acepta los permisos que pida: **Accesibilidad** (atajos, macros y Discord) y **Automatización** (Spotify).

Esto se hace solo la primera vez. Después, las actualizaciones se instalan solas desde la app.

---

## 🔑 Licencia

Toolbar requiere una licencia activa. La primera vez que la abras te pedirá tu clave. Después puedes verla, verificarla o renovarla desde **Configuración → Sistema → Licencia del Sistema**.

> **Extensiones:** se instalan y actualizan desde la **Tienda**, en el menú principal de la aplicación. Los ajustes de cada extensión están en **Configuración → Integraciones**.

---

## 🧑‍💻 Desarrollado por
**FixTech SV** - Soluciones Tecnológicas y Desarrollo de Software.

[Facebook](https://www.facebook.com/profile.php?id=61574757665043) · [Instagram](https://www.instagram.com/fixtechsv/)
