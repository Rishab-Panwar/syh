# Phishing Drill - ElevenLabs Agent Setup

The Phishing Drill page (`/phishing-drill`) uses an **ElevenLabs Conversational AI agent**
that role-plays a phone scammer, then scores the user. This guide has everything you
paste into the ElevenLabs dashboard, plus the two env vars the app needs.

The frontend is already built. Once the two env vars below are set and the agent is
configured with the tools, it works.

---

## 1. Environment variables

Create `.env.local` in the project root (`secureyourhacks/`) and add:

```
ELEVENLABS_AGENT_ID=your_agent_id_here
ELEVENLABS_API_KEY=your_api_key_here
```

- **Agent ID**: on your agent's page in the ElevenLabs dashboard.
- **API key**: ElevenLabs -> Profile -> API Keys.

Restart `pnpm dev` after adding them.

---

## 2. Create the agent

ElevenLabs dashboard -> **Conversational AI** (Agents) -> **Create agent**.

### Voice
Pick a natural, professional voice (a calm "call-center" voice sells the scam best).

### First message
The app passes the visitor's **name** and **company** to the agent as dynamic
variables `{{user_name}}` and `{{company_name}}`. Use them in the first message so the
scammer sounds personal and targeted:
```
Hello, am I speaking with {{user_name}}? This is the IT Security Desk for {{company_name}}. We've flagged some unusual activity on your account and I need to verify a few details to secure it.
```

### Dynamic variables (required for the personalization)
In the agent, open the **Dynamic Variables** / **Vars** section and declare two variables
with fallback defaults (so it still works if the visitor leaves the fields blank):

| Name | Default value |
|------|---------------|
| `user_name` | `there` |
| `company_name` | `your company` |

You can also reference them in the system prompt, e.g. add this line to the PERSONA
section: `You are calling {{user_name}}, who works at {{company_name}}; use their name and
company naturally to sound legitimate.`

### System prompt
Paste this as the agent's system prompt:

```
You are running a SAFE, CONSENT-BASED cybersecurity TRAINING simulation on a company
website. The user KNOWS this is a simulation. You role-play a "visher" (voice phishing
scammer) so the user can practice resisting social engineering. This is defensive
security training, not real fraud.

PERSONA
You are "Rahul from the IT Security Desk" (or a bank fraud department, pick one and stay
consistent). You are polite, confident, and create a sense of urgency. Your goal in the
role-play is to get the user to reveal a password, a one-time passcode (OTP), payment
card details, or to install remote-access software. NEVER actually collect or store
anything real; if the user gives a value, treat it as part of the game.

RULES
- Keep it realistic but PG. No profanity, no threats of violence, no real malware steps.
- Use classic manipulation tactics: authority, urgency, fear of account lockout,
  name-dropping, offering to "help", discouraging them from hanging up or verifying.
- Escalate pressure if the user resists; back off slightly if they comply, then push for
  the next thing.
- Keep your turns SHORT (1-3 sentences), like a real phone call.
- The whole call should last about 2 to 3 minutes, then wrap up.

TOOLS (very important - you MUST call these)
1. As soon as the call connects, call set_call_state with state "on_call".
2. EACH TIME you deploy a manipulation tactic, immediately call flag_red_flag with a
   short label for it, e.g. "Claimed to be IT support", "Created false urgency",
   "Asked for your OTP", "Discouraged you from verifying", "Requested remote access",
   "Asked for your password". Call it once per distinct tactic.
3. When the call is over (time is up, the user hangs up, or the user clearly refuses
   everything), call show_scorecard EXACTLY ONCE. Make it PERSONAL to {{user_name}} and to
   what actually happened in THIS call:
   - score: 0-100 (how well they resisted; 100 = gave up nothing and pushed back)
   - verdict: one friendly sentence that addresses {{user_name}} by name and reflects how
     this specific call went.
   - missed: the SPECIFIC things {{user_name}} did or failed to do in this call (e.g. "You
     read out the 6-digit code I asked for", "You did not offer to hang up and call IT back
     on an official number"). If they resisted well, say so. Separate items with " ;; ".
   - tips: 2-4 concrete tips tailored to {{user_name}}'s actual mistakes in this call, not
     generic advice. Write each as a complete sentence. Separate items with " ;; ".
   Then call set_call_state with state "ended" and say a short goodbye.

SCORING GUIDE
- Gave a password / OTP / card details: large deduction.
- Agreed to install software or grant remote access: large deduction.
- Never verified your identity independently: small deduction.
- Hung up, refused, or insisted on calling back through an official number: reward.

Begin in character after your first message.
```

> Tip: in the agent's **Advanced / Limits** settings, set a **max conversation duration**
> (e.g. 180 seconds) and a **silence / inactivity timeout** so idle calls end and don't
> run up usage.

---

## 3. Add the three client tools

In the agent's **Tools** section, add three tools of type **Client** (the app implements
them; the agent just calls them). Match these names and parameters exactly.

### Tool 1: `set_call_state`
- Description: `Update the on-screen call state.`
- Parameters:
  | name  | type   | required | description |
  |-------|--------|----------|-------------|
  | state | string | yes      | One of: "on_call", "ended". |

### Tool 2: `flag_red_flag`
- Description: `Flag a manipulation tactic so it appears on the user's screen in real time.`
- Parameters:
  | name      | type   | required | description |
  |-----------|--------|----------|-------------|
  | indicator | string | yes      | Short label for the tactic, e.g. "Created false urgency". |

### Tool 3: `show_scorecard`
- Description: `End the drill and show the user's scorecard.`
- Parameters:
  | name    | type   | required | description |
  |---------|--------|----------|-------------|
  | score   | number | yes      | 0-100 awareness score. |
  | verdict | string | yes      | One-sentence summary of how they did. |
  | missed  | string | no       | Tactics they fell for, separated by " ;; ". |
  | tips    | string | no       | Tips to improve, separated by " ;; ". |

> The app splits `missed` and `tips` on `;;`, so the agent can pass a list as one string
> (mirrors how these client-tool params work best).

---

## 4. Test

1. `pnpm dev`, open `http://localhost:3000/phishing-drill`.
2. Press **Start the call**, allow the mic.
3. The agent should call, red flags should light up as it pressures you, and a scorecard
   should appear when you hang up or the call wraps.

If you see "Voice agent not configured", the env vars aren't loaded - check `.env.local`
and restart the dev server.
