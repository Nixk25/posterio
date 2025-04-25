<h1>Posterio🖼️</h1>

<h2>Intro</h2>
<p>
Posterio je webová galerie pro designéry zaměřená primárně na sdílení plakátů. 
Cílem tohoto projektu bylo navrhnout a implementovat backendovou část aplikace v souladu s principy enterprise systémů – včetně důrazu na architekturu, bezpečnost, validaci, dokumentaci a logování.
</p>

<h2>Cíl práce</h2>
<ul>
  <li>Vytvořit udržovatelnou a bezpečnou webovou aplikaci pro sdílení plakátů mezi designéry.</li>
  <li>Využít vlastní implementaci server-side logiky pomocí Next.js Server Actions.</li>
  <li>Důraz na čistou architekturu, oddělení zodpovědností, validaci vstupů a ochranu dat.</li>
</ul>

<h2>Použité technologie</h2>
<ul>
  <li><strong>Frontend:</strong> Next.js (App Router)</li>
  <li><strong>Backend:</strong> Server Actions (Next.js API)</li>
  <li><strong>Autentizace:</strong> BetterAuth (session token uložený v MongoDB)</li>
  <li><strong>Databáze:</strong> MongoDB + Prisma</li>
  <li><strong>Styly:</strong> Tailwind CSS</li>
  <li><strong>Upload souborů:</strong> uploadthing</li>
  <li><strong>Detekce barev:</strong> node-vibrant</li>
</ul>

<h2>Architektura 🧱</h2>
<ul>
  <li><strong>App Router:</strong> Logika rozdělena mezi složky <code>/app/api</code> (např. <code>auth</code>, <code>uploadthing</code>) a <code>/actions</code> (serverové funkce podle CRUD operací a filtrování)</li>
  <li><strong>Komponenty:</strong> Všechny UI komponenty jsou vlastní a uložené v <code>/components</code></li>
  <li><strong>Middleware:</strong> Pro ochranu rout před nepřihlášenými uživateli</li>
  <li><strong>Validace:</strong> Vstupy jsou validovány ručně ve funkcích, se zpětnou vazbou přes chybové zprávy a stavové kódy</li>
</ul>

<h2>Bezpečnost 🔒</h2>
<ul>
  <li>Session token autentizace s uložením v MongoDB (BetterAuth)</li>
  <li>Role-based autorizace (uživatel vs. admin – rozšiřitelné)</li>
  <li>Middleware ochrana rout (např. dashboard je přístupný pouze přihlášeným)</li>
</ul>

<h2>Validace a API odpovědi ✅</h2>
<ul>
  <li>Validace vstupů ve formulářích i na serveru</li>
  <li>Konzistentní struktura odpovědí – úspěch / chyba, jednotné JSON výstupy</li>
  <li>Příklady chybových stavů (401, 403, 422) s detailními zprávami</li>
</ul>


<h2>Logování a monitoring 🧪</h2>
<ul>
  <li>Serverové akce logují chyby pomocí <code>console.error</code> nebo custom wrapperu</li>
  <li>Logika rozšířitelná pro produkční monitoring (např. Sentry, LogRocket)</li>
</ul>

<h2>Ukázka průchodu backendem 🔁</h2>
<p>
Typický požadavek (např. přidání plakátu) projde od validace vstupu, přes serverovou akci (v <code>/actions/posters</code>), uloží se přes Prisma do databáze a výsledkem je zpětná odpověď klientovi. Každý krok je oddělen a strukturován podle principů vícevrstvé architektury.
</p>

<h2>Visuals ✨</h2>
<img width="100%" alt="Posterio Screenshot" src="https://github.com/user-attachments/assets/09a85db7-b270-4100-99c1-a3bffe44c069">
