**1. SRS (Software Requirements Specification)**

**Název projektu:** Posterio

**Autor:** Nicolas Jiří Melda

**Datum:** 2025

**Úvod**

Posterio je webová galerie pro designéry zaměřená na sdílení vlastních
plakátů. Aplikace nabízí možnost registrace, správy vlastních příspěvků
a objevování ostatních plakátů.

**Funkční požadavky**

- Registrace a přihlášení uživatelů (email + heslo).

- Upload plakátu s vyplněním všeho potřebného pro příspěvek

- Automatické získání dominantních barev z plakátu.

- Možnost upravit a smazat vlastní plakáty.

- Ukládání plakátů do oblíbených.

- Filtrování plakátů podle kategorií.

- Zobrazení uživatelského profilu s vlastními plakáty a oblíbenými.

**Nefunkční požadavky**

- Responzivní design.

- Bezpečné uchování hesel.

- Session-based autentizace a autorizace přístupu.

- Rychlý upload souborů přes externí službu (Uploadthing).

**Omezení**

- Maximální velikost nahrávaného souboru: 5 MB.

- Pouze formáty JPG, PNG, WEBP.

# ** 2. SDD (Software Design Document) -- Posterio** {#sdd-software-design-document-posterio}

## **Architektura**

- **Framework:** Next.js (App Router)

- **Backend:** Server Actions (Next.js API)

- **ORM (Object-Relational Mapping):** Prisma

- **Databáze:** MongoDB

- **Autentizace:** BetterAuth (session tokeny)

- **Upload:** Uploadthing

- **Styly:** Tailwind CSS

## **Datové modely (Entity)**

### User

- id: String -- Unikátní ID uživatele (cuid)

- name: String -- Jméno uživatele

- email: String -- Email (unikátní)

- emailVerified: Boolean -- Ověření emailu

- image: String? -- Profilový obrázek (volitelný)

- premium: Boolean -- Prémiový uživatel (ano/ne)

- role: String -- Role uživatele (např. user, admin)

- banned: Boolean -- Informace o banu

- banReason: String? -- Důvod banu (volitelný)

- banExpires: Int? -- Expirace banu (timestamp)

- createdAt: DateTime -- Datum vytvoření účtu

- updatedAt: DateTime -- Datum poslední aktualizace

- **Vztahy:** Sessions, Accounts, Posters, Favorites

### Session

- id: String -- ID session

- userId: String -- ID vlastníka session

- token: String -- Session token

- expiresAt: DateTime -- Expirace session

- ipAddress: String? -- IP adresa

- userAgent: String? -- Informace o zařízení

- impersonatedBy: String? -- Impersonace jiným uživatelem (pokud
  existuje)

- createdAt: DateTime

- updatedAt: DateTime

- **Vztah:** patří k User

### Account

- id: String

- userId: String

- accountId: String

- providerId: String -- Například Google, GitHub

- accessToken: String?

- refreshToken: String?

- accessTokenExpiresAt: DateTime?

- refreshTokenExpiresAt: DateTime?

- scope: String?

- password: String? -- Pokud účet vznikl přímou registrací

- createdAt: DateTime

- updatedAt: DateTime

- **Vztah:** patří k User

### Verification

- id: String

- identifier: String

- value: String -- Ověřovací kód

- expiresAt: DateTime -- Expirace ověření

- createdAt: DateTime

- updatedAt: DateTime

### Poster

- id: String

- title: String -- Název plakátu

- description: String? -- Popis plakátu

- fonts: String\[\] -- Použité fonty

- colors: String\[\] -- Dominantní barvy

- tools: String\[\] -- Nástroje použité při tvorbě

- views: Int -- Počet zobrazení (default 0)

- socials: String\[\] -- Linky na sociální sítě

- imgUrl: String -- URL plakátu

- categoryIds: String\[\] -- ID kategorií

- userId: String -- Vlastník plakátu

- createdAt: DateTime

- updatedAt: DateTime

- **Vztahy:** User, PosterCategory\[\], Favorites\[\]

### Category

- id: String

- name: String -- Název kategorie (unikátní)

- description: String?

- **Vztah:** PosterCategory\[\]

### PosterCategory

- id: String

- posterId: String

- categoryId: String

- **Vztah:** Poster, Category

- **Unikátní kombinace:** (posterId, categoryId)

### Favorite

- id: String

- userId: String

- posterId: String

- createdAt: DateTime

- **Vztah:** User, Poster

- **Unikátní kombinace:** (userId, posterId)

**Hlavní komponenty:**

- /actions/ -- serverové akce (CRUD plakátů, filtrace, login)

- /components/ -- UI komponenty (plakáty, profily, filtry)

- /middleware.ts -- ochrana rout pro přihlášené uživatele

**Bezpečnostní mechanismy:**

- Session tokeny uložené v MongoDB

- Middleware validující přístup

- Ochrana proti uploadu neautorizovanými uživateli

**Validace dat:**

- Kontrola typu souboru

- Validace délky názvu plakátu

- Kontrola existence uživatele při operacích

# **3. Uživatelská příručka a Administrátorská příručka** {#uživatelská-příručka-a-administrátorská-příručka}

**Registrace / Přihlášení:**

- Na hlavní stránce klikněte na tlačítko „Login" v pravém horním rohu
  pro přesměrování na login stránku a zde vyberte „Create Account" dole
  v přihlašovacím okně.

- Pro přihlášení použijte „Login" formulář.

**Upload plakátu:**

- Po přihlášení se objeví vedle vašeho profilu „plus" znak na který
  klikněte pro přesměrování na upload stránku.

- Vyberte soubor a vyplňte vše potřebné.

- Po uložení se plakát zobrazí ve vašem profilu a na hlavní stránce.

**Správa plakátů:**

- Na stránce profilu v záložce „My posts" lze plakáty upravit nebo
  smazat.

**Favorites:**

- U libovolného plakátu klikněte na ikonu hvězdičky pro přidání do
  oblíbených.

**Správa uživatelů:**

- V databázi MongoDB můžete ručně spravovat uživatele a plakáty.

**Bezpečnost:**

- Hesla jsou hashována, kód dodržuje ochranu proti neoprávněnému
  přístupu přes Middleware.
