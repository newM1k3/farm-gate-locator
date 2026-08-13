# 🤝 How the AI Agents Work Together on a Project

> A plain-language guide to how Bubbles and the team collaborate from idea to launch.

---

## The Big Picture

Think of the team like a small software company — each person has a specialty, and they hand work off to each other in a natural order. No one works in isolation; every agent's output becomes the next agent's starting point.

Bubbles 🦞 is the hub. All communication flows through Bubbles, who routes work, reviews results, and keeps you updated.

---

## A Real Project: From "I Have an Idea" to "It's Live"

Let's say you want to build a habit-tracking app. Here's how the team would handle it, step by step.

### Phase 1: Discovery — Should We Build This?

```
You → Bubbles: "I want to build a habit tracker app"
```

**Bubbles** kicks things off:

1. Asks you clarifying questions: Who is it for? What makes it different? Mobile or web?

2. Brings in **Research** to investigate:
   - What habit-tracking apps already exist?
   - What do people like and hate about them?
   - How big is this market?
   - What features do successful apps have?

3. Brings in **Product** to help define the vision:
   - Who is the target user?
   - What's the core problem we're solving?
   - What features are must-haves vs. nice-to-haves?

**What comes back to you:** A short report saying "Here's the market, here's the opportunity, here's what we should focus on."

---

### Phase 2: Planning — What Are We Building?

```
Bubbles coordinates: Product + The Architect + Art
```

Once you say "go," the planning starts:

1. **Product** writes the feature list and prioritizes what to build first (MVP — Minimum Viable Product).

2. **The Architect** designs the technical foundation:
   - What database do we need?
   - How will the app be structured?
   - What technology should we use?
   - How do pieces connect (API, auth, storage)?

3. **Art** starts thinking about the user experience:
   - What does the main screen look like?
   - How does the user add a habit?
   - What does the progress dashboard show?
   - Initial wireframes or style direction

**What comes back to you:** A plan — features, tech choices, and design direction. You approve before we build.

---

### Phase 3: Design — Making It Look Good

```
Art leads, with Product and QA providing input
```

1. **Art** creates the actual designs:
   - Every screen and state (loading, empty, error, success)
   - Colors, fonts, buttons, spacing (the design system)
   - Interactive prototype you can click through

2. **Product** reviews designs against user needs — is this actually usable?

3. **QA** reviews for edge cases — what happens if there are zero habits? A hundred? Bad internet?

**What comes back to you:** Visual designs and a clickable prototype. You can say "change this" or "I like that."

---

### Phase 4: Build — Writing the Code

```
Dave leads, with The Architect overseeing structure
```

1. **Dave** writes the actual code:
   - Builds each screen based on Art's designs
   - Writes the backend logic (creating habits, tracking streaks)
   - Connects to the database The Architect designed
   - Works in small pieces, testing as he goes

2. **The Architect** reviews for structure — is the code well-organized and maintainable?

3. **AI Data** helps if there's sample data to work with or analytics to set up.

4. **Bubbles** checks progress and keeps you updated.

**What comes back to you:** A working (but not yet public) version of the app. You can try it out.

---

### Phase 5: Test — Finding What's Broken

```
QA leads, everyone helps
```

1. **QA** runs through every feature systematically:
   - Does every button work?
   - Does it look right on different screen sizes?
   - What happens with weird inputs?
   - Does it match Art's designs?

2. **Dave** fixes bugs that QA finds.

3. **Art** checks that the built version matches the designs.

4. **Bubbles** keeps a bug list and makes sure everything gets resolved.

**What comes back to you:** A tested, polished app ready for the real world.

---

### Phase 6: Launch — Going Live

```
DevOps leads, Dave supports
```

1. **DevOps** handles the launch:
   - Sets up the production server or cloud hosting
   - Configures the domain name and security (SSL)
   - Deploys the app
   - Monitors to make sure everything runs smoothly

2. **Dave** is on standby for any launch-day issues.

3. **Bubbles** gives you the final go-live confirmation.

**What comes back to you:** Your app is live! 🎉

---

## Who Talks to Whom?

```
                    ┌─────────────┐
                    │    YOU      │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Bubbles 🦞  │  ← You only talk to Bubbles
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │        │         │        │          │
   ┌────▼──┐ ┌───▼──┐ ┌───▼──┐ ┌──▼───┐ ┌───▼────┐
   │Product│ │Research│ │ Art  │ │ Dave │ │The Arch│
   └───────┘ └──────┘ └──┬───┘ └──┬───┘ └────────┘
                         │        │
                    ┌────▼──┐ ┌───▼───┐
                    │  QA   │ │DevOps │
                    └───────┘ └───────┘
                         │
                    ┌────▼──┐
                    │AI Data│
                    └───────┘
```

- **You → Bubbles:** The only conversation you need to have. Bubbles handles the rest.
- **Bubbles → Everyone:** Assigns work, reviews results, keeps things moving.
- **Agent → Agent:** They hand off work to each other when needed, but Bubbles always stays in the loop.

---

## Common Questions

### Do all nine agents work on every project?

No. Bubbles only brings in the agents who are needed. A simple website might only need Art and Dave. A complex app might need everyone.

### Can I talk directly to Art or Dave?

Nope — that's by design. Bubbles is your single point of contact. It keeps things simple for you and prevents confusion (imagine nine people all asking you questions at once).

### What if I don't like something an agent produces?

Tell Bubbles. Bubbles will pass your feedback to the agent with clear instructions on what to change. Think of it like giving feedback to a project manager who then works with the team.

### How fast do they work?

They work in parallel when possible. While Research investigates the market, Art can start exploring design directions. But each phase has natural handoffs — Art needs Product's feature list before designing screens, and Dave needs Art's designs before coding.

### Do the agents learn from past projects?

Yes — Bubbles has a long-term memory system that records important decisions, lessons learned, and your preferences. Over time, the team gets better at understanding your style and needs.

---

## One Project, One Team

The key idea: **you don't need to manage nine people.** You talk to Bubbles, describe what you want, and the team figures out the rest. Each agent brings their expertise to the right phase of the project, and Bubbles makes sure nothing falls through the cracks.

Think of it like hiring a small agency — you tell the account manager what you want, and they coordinate the designers, developers, and testers behind the scenes. Except this agency works 24/7 and never forgets what you told them. 😄

---

*Written at a Grade 10 reading level — no jargon, no assumptions, just clear explanations.*
