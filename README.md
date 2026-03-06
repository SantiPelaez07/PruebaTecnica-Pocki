# Pocki Assistant – Prueba Técnica Fullstack Junior

Bot de WhatsApp que analiza mensajes de usuarios usando OpenAI, ejecuta herramientas personalizadas y responde con resultados procesados. Implementado con **NestJS** y **PostgreSQL**.

---

## Table of Contents
1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Endpoints](#endpoints)
4. [Arquitectura](#arquitectura)
5. [Decisiones Técnicas](#decisiones-técnicas)
6. [Uso de OpenAI](#uso-de-openai)
7. [Tools Implementadas](#tools-implementadas)
8. [Pruebas y Ejecución](#pruebas-y-ejecución)

---

## 1.Instalación
Clonar el repositorio:

```bash
git clone https://github.com/SantiPelaez07/PruebaTecnica-Pocki.git
cd PruebaTecnica-Pocki
npm install
```

## 2.Configuración

Crear el archivo `.env` en la raíz del proyecto. Este archivo contendrá variables de entorno y claves importantes que no deben ser públicas, como la **OPENAI_API_KEY**.

- Reemplaza `sk-xxxx` con la API key que proporciona OpenAI desde su dashboard.  
- Mantén `USE_OPENAI_MOCK=true` mientras no haya una key activa.  
- Cuando agregues la key real, cambia `USE_OPENAI_MOCK` a `false`. **No elimines esta variable.**

Ejemplo de `.env`:

```bash
OPENAI_API_KEY=sk-xxxx
USE_OPENAI_MOCK=true
```

Adicionalmente se debe crear la base de datos en el motor SQL de tu preferencia y asegurarse de que el puerto de comunicación esté abierto.  
En este proyecto se utilizó **XAMPP** con MySQL. Para configurar la conexión, modifica los valores en `database.config.ts` según tu entorno:

```ts
host: 'localhost',
port: 3306,
username: 'root',
password: '',
```

## 3.Endpoints

### Crear mensaje
- **Método:** POST 
- **Ruta:** `http://localhost:3000/chat`  
- **Descripción:** Crea un mensaje en la base de datos.  
- **Request:** 
```json
{
  "userPhone": "xxxxxxxxxx",
  "question": "Quiero saber el precio del dolar"
}
```
- **Response (ejemplo):**
```json
[
  {
    "id": 1,
    "content": "Hola, quiero la TRM",
    "createdAt": "2026-03-06T10:00:00.000Z",
    "responses": [
      {
        "id": 1,
        "content": "La TRM actual es $3.987,54"
      }
    ]
  }
]
```

### Listar mensaje por ID
- **Método:** GET  
- **Ruta:** `http://localhost:3000/chat/1`  
- **Descripción:** Devuelve el mensaje registrado con el id correspondiente.  
- **Request:** Requiere un parametro el cual será el ID como se evidencia en la URL.  
- **Response (ejemplo):**
```json
[
  {
    "id": 1,
    "content": "Hola, quiero la TRM",
    "createdAt": "2026-03-06T10:00:00.000Z",
    "responses": [
      {
        "id": 1,
        "content": "La TRM actual es $3.987,54"
      }
    ]
  }
]
```

### Listar todos los mensajes
- **Método:** GET  
- **Ruta:** `http://localhost:3000/chat`  
- **Descripción:** Devuelve todos los mensajes registrados en la base de datos.  
- **Request:** No requiere body ni parámetros.  
- **Response (ejemplo):**
```json
[
  {
    "id": 1,
    "content": "Hola, quiero la TRM",
    "createdAt": "2026-03-06T10:00:00.000Z",
    "responses": [
      {
        "id": 1,
        "content": "La TRM actual es $3.987,54"
      }
    ]
  }
]
```

## 4.Arquitectura

**NestJS Modular:**
- ChatModule → Servicios, controladores y DTOs.
- OpenaiService → Conexión con OpenAI y gestión de prompts.
- Tools → Funciones externas como DolarTool para TRM.

DTOs: control de datos de entrada y salida.
Services: lógica de negocio centralizada.
Controllers: exponen endpoints HTTP.
Repository: acceso a la base de datos con TypeORM.

La arquitectura sigue clean code y separación de responsabilidades.


## 5.Decisiones técnicas

-Uso de NestJS por modularidad y escalabilidad.
-Validaciones: DTOs y excepciones (BadRequestException, NotFoundException).
-Fallback OpenAI: detección manual de intención cuando no hay créditos disponibles.
-Queries optimizadas para evitar doble llamada a la base de datos.
-Tools encapsuladas para facilitar futuras integraciones.

## 6.Uso de OPENAI

El servicio está implementado y registrado.
Para activar IA:
```bash
Configurar OPENAI_API_KEY en .env.
Poner USE_OPENAI_MOCK=false.
```
Actualmente se usa validación manual de intención para continuar el flujo mientras no hay créditos.

## 7.Tool implementada

- TRM Tool: obtiene la tasa de cambio del dólar en Colombia usando la API dolarapi.com.
- Se ejecuta automáticamente cuando el usuario solicita la TRM.
- Formatea la respuesta de manera legible y con moneda local.

## 8.Pruebas y ejecución

Levantar la aplicación en modo desarrollo:
```bash
npm run start:dev
```
-Enviar requests usando Postman o curl.
-Validar respuestas de mensajes y TRM.
-Activar OpenAI con API key y USE_OPENAI_MOCK=false para probar IA.

## 🎥 Demo

[![Demo API](![Vídeo de muestra](image.png))](https://youtu.be/fOeLLnxDEuI)

