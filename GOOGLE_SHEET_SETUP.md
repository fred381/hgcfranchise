# Connecting the interest form to a Google Sheet

The registration form posts to a Google Apps Script web app, which appends each
submission as a row in a Google Sheet. This takes about five minutes to set up
and is free.

## What you do

1. **Create the sheet.** Go to <https://sheets.google.com> and create a new,
   blank spreadsheet. Name it something like "Florida franchise interest". You
   do not need to add any column headers, the script adds them automatically on
   the first submission.

2. **Open the script editor.** In that sheet, choose **Extensions, then Apps
   Script**. A code editor opens in a new tab.

3. **Paste the code.** Delete whatever is in the editor, then copy the entire
   contents of [`apps-script.gs`](./apps-script.gs) from this repository and
   paste it in. Click the save icon.

4. **Deploy it as a web app.**
   - Click **Deploy, then New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Set **Description** to anything, for example "Interest form".
   - Set **Execute as** to **Me**.
   - Set **Who has access** to **Anyone**. (This lets the public page submit to
     it. The script only ever appends rows, it never reads or returns your data.)
   - Click **Deploy**.

5. **Authorise it.** Google asks you to review permissions the first time.
   Choose your account, and if you see an "unverified app" warning, click
   **Advanced, then Go to (your project)** and allow it. This is normal for your
   own scripts.

6. **Copy the web app URL.** After deploying, Google shows a **Web app URL**
   ending in `/exec`. Copy it.

7. **Send me that URL.** I will paste it into the page in two places and push
   the change. That is the only thing I need from you.

   If you would rather do it yourself: in `index.html`, replace
   `https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec` in **both** the
   form `action` attribute and the `ENDPOINT` constant in the script near the
   bottom of the file.

## Testing it

Open the live page, fill in the form and submit. A new row should appear in the
sheet within a second or two. To be notified of new entries, in the sheet choose
**Tools, then Notification settings** (or **Notification rules**) and set it to
email you when changes are made.

## If you change the script later

Each time you edit `apps-script.gs` and want the change to go live, you must
create a **new deployment** (or **Manage deployments** then edit the existing
one and pick a new version). Simply saving the code is not enough.

## A note on how it submits

Google Apps Script web apps do not send the CORS headers a browser needs to read
a cross-site response. The page works around this by posting in "no-cors" mode:
the row is written reliably, but the browser cannot read the reply, so the page
treats a completed request as success. This is standard practice for this setup
and is fine for a market test.
