# CareSetu Marketing & Waitlist

A responsive product-validation website for CareSetu, a consultation cockpit for hospital outpatient departments. It explains the product to doctors and other medical professionals, gathers feature and pricing signals, and sends waitlist responses to Google Sheets through Google Apps Script.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

The form needs a deployed Google Apps Script endpoint before it can submit. Complete the setup below and add the URL to `.env.local`.

## Google Sheet setup

### 1. Create the sheet

1. In Google Drive, create a blank Google Sheet.
2. Rename it if you like, then create or rename the first tab to exactly `Responses`.
3. In row 1, add these headers in order:

```text
Timestamp | Name | Email | Role | Interest Level | Features Selected | Most Valuable Feature | Willingness To Pay | Missing Features | General Feedback | Source | User Agent
```

You can also let the included script create the headers: after completing steps 2–5 below, select `setupSheet` in Apps Script and click **Run** once.

### 2. Copy the Sheet ID

The Sheet URL looks like:

```text
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```

Copy the text between `/d/` and `/edit`.

### 3. Add the Apps Script

1. In the Sheet, open **Extensions → Apps Script**.
2. Delete the starter function in `Code.gs`.
3. Copy the contents of `google-apps-script/Code.gs` from this repository into the editor.
4. Replace `REPLACE_WITH_YOUR_GOOGLE_SHEET_ID` with the ID copied above.
5. Save the project and give it a name such as `CareSetu Waitlist`.

### 4. Authorize and verify the sheet

1. Choose `setupSheet` from the function menu and click **Run**.
2. Google will ask you to authorize the script. Choose your account, review the permissions, and allow access to the Sheet.
3. Return to the Sheet and confirm the `Responses` tab has the expected header row.

If Google shows an “unverified app” screen for your own script, open the advanced option and continue to your project. Only do this for the Apps Script project you created yourself.

### 5. Deploy as a Web App

1. In Apps Script, click **Deploy → New deployment**.
2. Next to **Select type**, choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**. This is required for visitors who are not signed into your Google account.
5. Click **Deploy** and approve any final permission request.
6. Copy the Web App URL. Use the URL ending in `/exec`, not the development URL ending in `/dev`.

When you change the Apps Script later, create a new version via **Deploy → Manage deployments → Edit → New version → Deploy**. The `/exec` URL stays the same.

### 6. Connect the website

Create `.env.local` in the project root (it is ignored by Git) and add:

```text
VITE_WAITLIST_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Restart the local development server after changing environment variables.

### 7. Test a submission

1. Run `npm run dev` and open the local URL shown in the terminal.
2. Complete every required field and submit the form.
3. Confirm the success screen appears.
4. Open the `Responses` tab in Google Sheets and verify a new row was added with a server-generated timestamp.
5. If no row appears, check that the tab is named `Responses`, the Sheet ID is correct, the latest script version is deployed, and Web App access is set to **Anyone**.

## Why the request uses `no-cors`

Google Apps Script Web Apps redirect POST responses through a Google content domain that does not consistently provide browser CORS headers. The frontend therefore sends a simple URL-encoded POST using `no-cors`. Visitors stay on the CareSetu page and never see a Google Form. Because an opaque browser response cannot be inspected, the success screen means the request was dispatched successfully; confirm actual storage during setup by checking the Sheet.

Some browsers leave that opaque redirect pending even after Apps Script has stored the row. The form therefore uses a six-second safety window: immediate network failures still show an error, while a request that remains pending moves to the success screen instead of leaving the visitor stuck on “Submitting…”.

Do not change the request to JSON with an `application/json` header unless you add a CORS-capable proxy. That would trigger a browser preflight that Apps Script Web Apps do not reliably handle.

## Lightweight abuse prevention

The site includes a hidden honeypot, a 30-second client-side submission cooldown, disabled controls while sending, server-side required-field checks, input length limits, and a script lock to avoid simultaneous row collisions. This is appropriate for an early validation site, but it is not strong security. A public endpoint can still be discovered and called directly. Add stronger protection or a managed form service if abuse becomes a problem.

The form intentionally does not collect IP addresses or patient information.

## Edit product content

Most editable product copy, feature names, roles, navigation and pricing ranges live in `src/config/content.ts`. The pricing ranges are clearly marked there because they are validation assumptions, not settled prices.

## Production build

```bash
npm run typecheck
npm run build
npm run preview
```

The production output is written to `dist/`.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel should detect Vite automatically. Use `npm run build` as the build command and `dist` as the output directory if it asks.
4. Under project **Settings → Environment Variables**, add `VITE_WAITLIST_ENDPOINT` with the deployed Apps Script `/exec` URL.
5. Deploy. After deployment, complete one real test submission and confirm the row appears in Google Sheets.

Environment variables beginning with `VITE_` are embedded into the public frontend bundle. The Apps Script URL is therefore not a secret; do not place credentials or private keys in it.

## Sharing metadata

Title, description, Open Graph text, Twitter metadata and the favicon are configured in `index.html`. No Open Graph image is set yet. To add one later, place the image in `public/` and add `og:image` and `twitter:image` tags with the final absolute production URL.
