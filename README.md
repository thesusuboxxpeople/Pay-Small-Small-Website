# Paysmallsmall

Paysmallsmall landing site with the Founder&apos;s Club program, app ecosystem packages, and WhatsApp application flow.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` or `http://localhost:3000/founders-club`.

## Quality checks

```bash
npm run lint
npm run build
npm audit
```

## Laravel Forge deployment

The production build is exported to `out/` for Nginx to serve directly. Configure the Forge site's web directory as `/out` and use:

```bash
cd /home/forge/YOUR-SITE-DIRECTORY
git pull origin main
npm ci
npm run check
```
