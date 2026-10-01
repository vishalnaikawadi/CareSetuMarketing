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

The existing production project is:

- **GitHub repository:** `vishalnaikawadi/CareSetuMarketing`
- **Vercel team:** `BNB` (`bnb25`)
- **Vercel project:** `care-setu-marketing`
- **Production branch:** `main`
- **Production URL:** <https://care-setu-marketing.vercel.app/>

Do not create or import another Vercel project for this repository. Link to the existing `care-setu-marketing` project instead.

### Access needed by a collaborator

A collaborator needs:

1. Access to the GitHub repository.
2. Membership in the `BNB` Vercel team with access to `care-setu-marketing`.
3. Access to the Google Sheet and Apps Script project only if they need to change or verify the waitlist backend. The existing website can be redeployed without changing the Apps Script.

If the project does not appear in Vercel, ask a team owner to grant project access. Do not work around missing access by creating a duplicate project.

### Recommended: work with Vercel from Codex

Codex can inspect projects, deployments, domains and logs through the Vercel plugin, and it can use the Vercel CLI for linking, environment changes and deployments.

1. In ChatGPT/Codex, open **Plugins**, find **Vercel**, and install it.
2. Connect the Vercel account that belongs to the `BNB` team.
3. On Vercel's authorization page, select **BNB**.
4. If a **Configure** option is shown, grant the plugin access to `care-setu-marketing`. Team authorization by itself may not include any projects.
5. Ask Codex to verify the connection before making changes.

Useful prompts:

```text
Using the Vercel plugin, check the BNB/care-setu-marketing project and summarize its latest production deployment.

Check the latest CareSetu deployment, build logs and runtime errors. Do not change anything.

Verify that VITE_WAITLIST_ENDPOINT is configured for Production and Preview without printing its value.

Build this repository, deploy a Vercel preview, test it, and give me the preview URL. Do not promote it to production.

Deploy the current main branch to production, verify the live URL, and test one waitlist submission.
```

For read-only checks, prefer the Vercel plugin. For project linking, environment-variable changes or explicit deployments, Codex can use the Vercel CLI. Codex should ask before consequential actions such as changing access, replacing environment variables, promoting a deployment or rolling back production.

If the plugin sees `BNB` but returns no projects or a `403 Forbidden` error, reconnect it and use **Configure** to include `care-setu-marketing`. Confirm project access by asking Codex to list the project's deployments.

### Fresh clone and CLI setup

Requirements: Node.js 20 or newer, npm, GitHub access and Vercel team access.

From a fresh clone:

```bash
git clone https://github.com/vishalnaikawadi/CareSetuMarketing.git
cd CareSetuMarketing
npm install
npm run typecheck
npm run build
```

Authenticate and link the clone to the existing Vercel project:

```bash
npx vercel@latest login
npx vercel@latest whoami
npx vercel@latest teams ls
npx vercel@latest link --yes --project care-setu-marketing --scope bnb25
```

`vercel link` creates a local `.vercel/` directory containing project metadata. It is machine-specific and must not be committed. The CLI normally adds it to `.gitignore`; verify that before committing.

If the wrong Vercel team is active:

```bash
npx vercel@latest teams switch bnb25
```

Pull the Development environment into the ignored `.env.local` file:

```bash
npx vercel@latest env pull .env.local --yes --environment=development
```

`vercel env pull` replaces the destination file. Preserve any unrelated local-only values before running it.

Then run the site locally:

```bash
npm run dev
```

### First-time Vercel import

These steps are only for rebuilding the Vercel project if the existing project has intentionally been removed:

1. In Vercel, choose **Add New → Project**.
2. Import `vishalnaikawadi/CareSetuMarketing` from GitHub.
3. Select the `BNB` team.
4. Use these settings:

| Setting | Value |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `./` |
| Install Command | `npm install` or Vercel default |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Production Branch | `main` |

No `vercel.json` file is required for the current site.

Before the first deployment, add `VITE_WAITLIST_ENDPOINT` under **Project Settings → Environment Variables**. Its value must be the deployed Google Apps Script Web App URL ending in `/exec`. Enable it for **Production**, **Preview**, and **Development** so the form works in every environment.

### Environment-variable rules

The project requires one variable:

```text
VITE_WAITLIST_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

- `.env.local` is for local development and must not be committed.
- `.env.example` documents the required key without containing a value.
- Variables prefixed with `VITE_` are embedded into the browser bundle at build time. They are public configuration, never a suitable place for passwords, API keys or private credentials.
- Changing an environment variable does not update an existing deployment. Redeploy after every Vercel environment-variable change.
- The Apps Script URL is public by design, but access to the Sheet and Apps Script project should still be restricted to the appropriate collaborators.

To inspect or update the variable with the CLI:

```bash
npx vercel@latest env ls
npx vercel@latest env add VITE_WAITLIST_ENDPOINT
npx vercel@latest env pull .env.local --yes --environment=development
```

Use the interactive `env add` flow to select Production, Preview and Development. Do not paste credentials into shell commands or commit them to Git.

### Normal GitHub deployment workflow

Vercel's Git integration handles the usual workflow automatically:

- A push to `main` creates a **Production** deployment and updates the production URL.
- A push to another branch or a pull request creates a unique **Preview** deployment.
- Every deployment is tied to a Git commit, making it easy to inspect or roll back.

Recommended workflow:

```bash
git checkout -b my-change
# make changes
npm run typecheck
npm run build
git add <changed-files>
git commit -m "Describe the change"
git push -u origin my-change
```

Test the Vercel preview URL before merging the branch into `main`.

### Manual preview and production deployments

Run these commands from the linked project directory.

Create a preview deployment:

```bash
npm run typecheck
npm run build
npx vercel@latest deploy
```

Deploy explicitly to production only after the preview is verified:

```bash
npx vercel@latest deploy --prod
```

For this repository, pushing a reviewed commit to `main` is preferred over routine manual production deployments because it preserves the Git-to-deployment history.

### Verify every production deployment

1. Open <https://care-setu-marketing.vercel.app/> and verify the page loads on desktop and mobile.
2. Confirm the navigation and waitlist form render correctly.
3. Submit clearly labelled fake information.
4. Confirm the success state appears.
5. Open the Google Sheet's `Responses` tab and verify that a new row was stored.
6. Remove the test row if it is no longer needed.

The success screen confirms that the browser dispatched the request; the Google Sheet is the source of truth that storage succeeded.

Useful diagnostics:

```bash
npx vercel@latest list --scope bnb25
npx vercel@latest inspect <deployment-url>
npx vercel@latest inspect <deployment-url> --logs
npx vercel@latest logs <deployment-url> --level error
curl -I https://care-setu-marketing.vercel.app/
```

This is currently a static Vite site, so runtime-function logs may be empty. Build logs and the browser console are usually more useful. For protected preview deployments, use `vercel curl` instead of disabling deployment protection:

```bash
npx vercel@latest curl / --deployment <preview-url>
```

### Rollback and recovery

If production is broken, identify a known-good deployment in the Vercel dashboard or with `vercel list`, verify it, and then roll back:

```bash
npx vercel@latest rollback <known-good-deployment-url>
```

A rollback changes production traffic, so confirm the exact target deployment first. After recovery, fix the source code and push a new reviewed commit to `main`; do not leave Git and production permanently out of sync.

### Common deployment problems

| Problem | What to check |
| --- | --- |
| Plugin sees the team but no projects | Reconnect Vercel, select `BNB`, and configure project access for `care-setu-marketing`. |
| CLI links to the wrong account or team | Run `vercel whoami`, `vercel teams ls`, and `vercel teams switch bnb25`, then link again. |
| Form reports missing configuration | Confirm `VITE_WAITLIST_ENDPOINT` exists for that environment, then redeploy. |
| Form says success but no Sheet row appears | Confirm the URL ends in `/exec`, the Apps Script deployment is current, access is **Anyone**, and the Sheet tab is `Responses`. |
| Vercel build fails | Run `npm install`, `npm run typecheck`, and `npm run build` locally; then inspect Vercel build logs. |
| Site deploys but assets do not load | Confirm the root is `./`, the framework is Vite, and the output directory is `dist`. |
| Preview URL is protected | Use `vercel curl`; do not turn off deployment protection just for automated testing. |
| Environment value was changed but behavior is unchanged | Create a new deployment because environment variables are embedded during the Vite build. |

Official references: [Vercel deployments](https://vercel.com/docs/deployments), [Git deployments](https://vercel.com/docs/git), [Vercel CLI](https://vercel.com/docs/cli), [environment variables](https://vercel.com/docs/environment-variables), and [Vercel MCP](https://vercel.com/docs/mcp).

## Sharing metadata

Title, description, Open Graph text, Twitter metadata and the favicon are configured in `index.html`. No Open Graph image is set yet. To add one later, place the image in `public/` and add `og:image` and `twitter:image` tags with the final absolute production URL.
