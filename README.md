# BuildAI — App Blueprint Generator

Natural language → structured app blueprint using a 4-stage AI pipeline.

## Setup & Run

```bash
npm install
npm run dev
```
Open http://localhost:5173

## How To Use
1. Get API key from console.anthropic.com
2. Paste key in the input
3. Describe your app or click an example chip
4. Click "Generate App Blueprint"
5. Watch 4 stages run live, view JSON output in tabs

## Deploy to Netlify (free)
```bash
npm run build
```
Then drag the `dist/` folder to netlify.com/drop

## Pipeline Stages
1. Intent Extraction — parses description into structured JSON
2. System Design — generates pages, flows, permissions
3. Schema Generation — DB + API + UI + Auth schemas
4. Validation + Repair — cross-layer consistency check
