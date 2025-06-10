# Pruebas Automatizadas - Votación y Comentarios de Autos 🚗

## Proyecto técnico - HU_1 (WebdriverIO + Allure)

**Página bajo prueba:**  
https://buggy.justtestit.org/

**Autor:** Mauricio Ramírez  
**Fecha:** 10 de Junio 2025

---

## 📌 **Descripción**
Automatización de pruebas funcionales para validar la historia de usuario:  
**"Como usuario autenticado necesito votar un auto y dejar un comentario para el auto seleccionado."**

Se cubren todos los criterios de aceptación, incluyendo controles de acceso, visibilidad de elementos, y visualización de información principal.

---

## 🧪 **Casos de Prueba**

| Caso | Nombre | Tipo      | Descripción Breve                                                          |
|------|--------|-----------|----------------------------------------------------------------------------|
| CP1  | Votar auto autenticado          | Positivo | Votar un auto con usuario autenticado, verifica incremento de votos |
| CP2  | No mostrar opción de votar sin sesión | Negativo | No permite votar/comentar sin sesión; muestra mensaje alternativo      |
| CP3  | Dejar un comentario autenticado | Positivo | Comentar y votar autenticado, verifica aparición del comentario y autor |
| CP4  | Visualización de tabla de comentarios | Visualización | La tabla muestra columnas “Date”, “Author”, “Comment”                   |
| CP5  | Visualización de descripción, especificación y votos | Visualización | Se muestran descripción, specs y votos del auto                         |
| CP6  | Intentar comentar sin sesión    | Negativo | No permite dejar comentarios sin login; muestra mensaje alternativo     |

---

## 🚩 **Hallazgos**
- **BUG:** El campo “Author” en los comentarios queda vacío aun estando autenticado. Se reporta con evidencia en Allure.

---

## 🚀 **Cómo Ejecutar**

### **1. Pre-requisitos**
- Node.js >= 18
- Chrome instalado
- Instalar dependencias: npm install (en el caso de tener inconvenientes de permisos para ejecutar npm install, abrir powershell como administrador y ejecutar lo siguiente: Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
y luego volver a ejecutar el npm install)

- Instalar Allure globalmente: npm install -g allure-commandline

## ⚠️ Requisito para Reporte Allure

- Asegúrate de tener **Java 8 o superior instalado**.
- Verifica que el comando `java` funcione en tu terminal (`java -version`).
- Si recibes el error `JAVA_HOME is not set...`, instala Java y reinicia la terminal.
- Descarga Java desde [AdoptOpenJDK](https://adoptopenjdk.net/) o [Oracle](https://www.oracle.com/java/technologies/downloads/).

### **2. Ejecutar las pruebas**
npm test (el cual ya genera el reporte Allure y al finalizar los tests abre automaticamente a traves de este comando: allure open)

## 📝 **Notas**
- Todos los casos de prueba incluyen **capturas de pantalla** y se documentan en el reporte Allure.
- Se reporta bug encontrado sobre el campo **Author** vacío.

