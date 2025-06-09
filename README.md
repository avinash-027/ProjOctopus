# ProjOctopus

Hlo..🐙😑😶👾

## 🚀 Installation & Setup

**1. Clone the Repository**

```bash
git clone https://github.com/avinash-027/ProjOctopus.git
```

**2. Backend Setup (.NET)**

```bash
cd ProjOctopus/ProjOctopus/OpenAIapi
dotnet build
dotnet watch run
```

> ✅ Make sure you have [.NET SDK](https://dotnet.microsoft.com/download) installed.

🔑 **Configure Gemini API Key**

In the `appsettings.json` file, locate this section:

```json
{
  ...
  "AllowedHosts": "*",
  "GeminiApiKey": "***REMOVED***"
}
```

Replace `"***REMOVED***"` with your own Gemini API key.

👉 You can generate your Gemini API key by visiting: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

**3. Frontend Setup (Angular)**

```bash
cd ProjOctopus/frontend
npm install
npm start     # or use ng serve
```

> ✅ Ensure [Node.js](https://nodejs.org/) and Angular CLI (`npm install -g @angular/cli`) are installed.
