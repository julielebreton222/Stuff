# The Knight Who Lost His Heart

A small fairy-tale storybook app for someone going through their first heartbreak.
He taps through the pages of a story, and inside the story are little experiments: some
on the screen, some quests in real life. Each finished chapter mends one piece of a
broken heart with gold (like kintsugi).

## How it works

- **Cover / map:** the heart in eight pieces, plus the list of chapters (each unlocks after the one before).
- **Story pages:** tap anywhere to turn the page.
- **Experiment pages:** the "next" arrow unlocks once the experiment is done.
- **☾ A hard night:** a breathing sanctuary for bad moments, always one tap away.
- **📜 Book of Deeds:** everything he's written and every quest he's done.
- **Sealed letter:** his letter to his future self shows on the cover and only opens on the date he chose.

Everything is saved **only on his phone** (browser storage). Nothing is sent anywhere.
The unsent letter in Chapter II is never saved at all.

## Editing the words

All of the copy lives in **`js/story.js`**. Change any text there; the page types and
how to use them are explained at the top of that file. Set `heroName` to his name or a
nickname, and every `{name}` in the story will use it.

## Running it

It's plain HTML/CSS/JS with no build step:

```
python3 -m http.server 8000
# then open http://localhost:8000
```

To send it to him, turn on **GitHub Pages** (Settings → Pages → deploy from this branch)
and send him the link. On his phone he can use "Add to Home Screen" so it feels like an app.

## Experiments in the current draft

| Chapter | Experiment | Why it helps |
|---|---|---|
| I. The Storm | **Stone of sorrow:** write what weighs, hold the stone until it lightens, throw it in the lake | Names the feeling and gives a physical act of release |
| II. The Well | **Unsent letter, burned:** words turn to sparks and vanish | Gets the unsaid things out without sending anything |
| III. The Chapel | **Candle gazing:** 3 min with a flickering flame and gentle whispers | Calms the racing mind (a simple focus meditation) |
| IV. The Mirror | **Who were you before?** plus a quest to do one of those things again | Rebuilds his identity apart from the relationship |
| V. The Dragon | **Name your dragon**, then **shake it off** for one minute | Externalising the pain (narrative therapy) and discharging stress |
| VI. The Village | **Call a friend**; **the icy spring** (cold water on the face) | Connection, and a quick reset for the nervous system |
| VII. The Forge | **What did this love teach you?** | Finding meaning without blame |
| VIII. The Horizon | **Letter to your future self**, sealed for 1/3/6 months | Hope, plus a future moment to look forward to |

## More experiments to swap in (the weird ones that work)

- **Write his legend in the third person.** "{name} felt…" Self-distancing makes feelings easier to look at.
- **The Plant.** Plant a seed in real life and check on it; it grows while he heals.
- **The Night Walk.** Go outside after dark and find three stars, or anything that makes him feel small in a good way (awe shrinks rumination).
- **Scream into the Well.** Go somewhere alone (car, pillow, beach) and yell once, as loud as possible.
- **The Hum.** Hum one low note for a whole minute; it calms the vagus nerve.
- **The Treasure Vault.** Sort memories into "keep in the vault" (good memories he doesn't have to erase) and "throw to the sea".
- **The Oath.** A sword-raising vow, e.g. "for 30 days I will not check her profile", with a day counter.
- **The Feast.** Cook a proper meal for himself, alone, on purpose.
- **The Good Deed.** Help one stranger or friend without telling anyone.
- **The Curse Breaker.** Write the cruellest thought his mind tells him, then answer it as a wise old wizard would.
- **Hand on the Heart.** Put a hand on his chest for 30 seconds and feel it beating. It still works.
- **The Unfamiliar Road.** Walk, bike or drive somewhere he has never been.
- **The Map of Allies.** Draw the people in his life who'd show up for him.
- **The Worry Hour.** Allow himself to think about her only between, say, 7:00 and 7:15pm; outside that, "the dragon sleeps".
- **Sad Song, Then Brave Song.** Listen to the saddest song he knows, then pick a "battle anthem" for the next chapter.
- **A Message from the Village.** Hidden notes from his sister and friends tucked into the story.
