# Deploy to a GCP VM (Docker Compose)

Self-contained: the Next.js app **is** the whole deploy. Ask SecureBot and Risk
Agent call **Vertex AI (Gemini)** directly from the Next server, so there is no
separate backend, no DocMind, and no database.

```
Browser ──► Caddy (:80 / :443) ──► client (Next.js, :3000) ──► Vertex AI (Gemini)
                                                            └─► ElevenLabs (voice)
```

Running on GCP puts the app right next to Vertex AI, so the LLM calls are fast.

---

## 1. Create the VM

- **Machine type:** `e2-small` or `e2-medium` is plenty (there's no heavy backend now).
- **Boot disk:** Ubuntu 22.04 LTS, 20 GB+.
- **Firewall:** check **Allow HTTP traffic** (and **HTTPS** if you'll use a domain).

## 2. Install Docker on the VM

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER
# log out and back in so the group change applies
```

## 3. Get the project onto the VM

Clone the repo on the VM:

```bash
git clone https://github.com/Rishab-Panwar/syh.git
cd syh
```

The service-account key is **not** in git (it's a secret), so copy it separately
from your laptop:

```bash
# from your laptop
gcloud compute scp "C:/Users/ankit/OneDrive/Desktop/tasks/secureyourhacks/gcp-vertex-sa.json" VM_NAME:~/syh/ --zone=ZONE
```

> Or, better, skip the key entirely and attach a VM service account (see step 6).

## 4. Configure environment

```bash
cd ~/secureyourhacks
cp .env.example .env
nano .env
```

Fill in:
- `SITE_ADDRESS` -> leave `:80` for IP access, or set your domain for HTTPS.
- `GOOGLE_CLOUD_PROJECT` -> your project id (default `mlops-487010`).
- `ELEVENLABS_AGENT_ID` / `ELEVENLABS_API_KEY` -> for the Phishing Drill.
- Lead email vars -> optional.

## 5. Build and start

```bash
docker compose up -d --build
```

First build takes a few minutes (installs Node deps + Next build). Check it:

```bash
docker compose ps
docker compose logs -f client
```

Open **http://VM_EXTERNAL_IP** in a browser.

## 6. (Recommended) Use the VM's service account instead of the key file

Cleaner on GCP: attach a **VM service account** with the **Vertex AI User** role,
then you don't need the key file at all. In `docker-compose.yml`, under `client`:
- delete the `volumes:` block (the `gcp-vertex-sa.json` mount), and
- remove the `GOOGLE_APPLICATION_CREDENTIALS` line.

Vertex authenticates via the VM's metadata credentials automatically. **Then rotate
and delete the `gcp-vertex-sa.json` key** in GCP for good hygiene.

## 7. (Optional) HTTPS with a domain

1. Point an **A record** for your domain at the VM's external IP.
2. Set `SITE_ADDRESS=your.domain.com` in `.env`.
3. Allow HTTPS (443) on the firewall.
4. `docker compose up -d` — Caddy fetches a Let's Encrypt cert automatically.

---

## Updating after code changes

```bash
cd ~/secureyourhacks && git pull   # or re-scp the folder
docker compose up -d --build
```

## Editing the SecureBot knowledge base

The bot's knowledge lives in `lib/knowledge-base.ts` (plain text). Edit it, then
`docker compose up -d --build`. No re-indexing, no vector DB.

## Security reminder

The `gcp-vertex-sa.json` key was shared in chat during setup — **rotate it** (GCP
Console -> IAM -> Service Accounts -> Keys: delete the old one, create a new one),
and never commit it (it's already in `.gitignore` and `.dockerignore`).

## Common issues

- **AI features error / auth failure** -> `gcp-vertex-sa.json` missing on the VM, or
  the service account lacks the **Vertex AI User** role.
- **Phishing Drill "not configured"** -> set `ELEVENLABS_*` in `.env` and
  `docker compose up -d client`.
- **Port 80 blocked** -> enable "Allow HTTP traffic" on the VM / firewall.
