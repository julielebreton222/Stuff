/*
 * THE STORY — all the words in the app live here.
 * Edit freely. Each chapter is a list of pages, shown one at a time.
 *
 * Page types:
 *   { type: "text", text: "..." }              tap to continue. Blank lines = new paragraph.
 *   { type: "stone", text: "..." }             write what weighs on you, hold the stone, throw it in the lake
 *   { type: "burn", text: "..." }              the unsent letter, given to the fire (never saved)
 *   { type: "candle", text: "...", minutes: 3, whispers: [...] }   candle gazing
 *   { type: "reflect", id: "unique-id", text: "...", placeholder: "..." }   saved in his Book of Deeds
 *   { type: "quest", id: "unique-id", text: "...", task: "..." }    a real-world quest he marks as done
 *   { type: "future", text: "..." }            letter to his future self, sealed until a date he picks
 *
 * Use {name} anywhere and it becomes the hero's name (set below).
 */

window.STORY = {
  heroName: "Sir Knight", // put your brother's name or nickname here
  title: "The Knight Who Lost His Heart",
  subtitle: "A tale in eight chapters",

  chapters: [
    {
      id: "storm",
      title: "I. The Storm",
      pages: [
        { type: "text", text: "Once, in a kingdom not so far from here, there lived a knight called {name}.\n\nHe had given his heart away, the way young knights do: completely, and without keeping a spare." },
        { type: "text", text: "Then one grey morning, the heart came back to him. Broken.\n\nIt did not shatter loudly. It simply stopped fitting in his chest, and the pieces scattered across the land like seeds in the wind." },
        { type: "text", text: "{name} did not know where to go. The roads he knew all led back to the same door.\n\nSo he sat down at the edge of a dark lake, and for the first time in his life, he let himself feel lost." },
        { type: "stone", text: "An old ferryman pointed at the shore. \"Every traveller carries a stone,\" he said. \"Write on it what weighs most. Hold it until it grows lighter. Then give it to the water.\"" },
        { type: "text", text: "The lake swallowed the stone without a sound.\n\nThe pain did not leave. But for the first time, {name} noticed he was the one holding it, and that meant he could, someday, set it down." },
      ],
    },
    {
      id: "well",
      title: "II. The Well of Tears",
      pages: [
        { type: "text", text: "Deep in the forest stood a well that no one had ever seen the bottom of.\n\nTravellers said it held every word that lovers never got to say." },
        { type: "text", text: "A spirit rose from the water, pale as morning mist. \"You have words stuck in your throat,\" she said. \"They are choking you. Give them to me.\"" },
        { type: "burn", text: "Write the letter you will never send. Say everything: the angry parts, the tender parts, the questions. No one will ever read it. When you're ready, give it to the fire." },
        { type: "text", text: "The words rose as sparks and went out among the stars.\n\n{name} felt emptier. But it was the kind of empty that has room in it." },
      ],
    },
    {
      id: "chapel",
      title: "III. The Candle in the Chapel",
      pages: [
        { type: "text", text: "Night fell, and {name} found shelter in a ruined chapel. The roof was open to the sky. On the altar stood a single candle, waiting." },
        { type: "text", text: "A voice in the dark said: \"You have been running through your thoughts like a hunted deer. Sit. Watch the flame. Let the thoughts come, and let them leave like smoke.\"" },
        {
          type: "candle",
          text: "Find a quiet place. Light the candle, and watch the flame for three minutes. If your mind wanders, that's fine. Just come back to the light.",
          minutes: 3,
          whispers: [
            "Breathe in slowly…",
            "…and out.",
            "Thoughts are smoke. Let them rise.",
            "You don't need to solve anything tonight.",
            "Just the flame. Just this breath.",
            "You are still here. That is enough.",
          ],
        },
        { type: "text", text: "When the candle burned low, {name} realised the storm in him had quietened, just a little, for just a while.\n\nThat was the first piece of his heart he found." },
      ],
    },
    {
      id: "mirror",
      title: "IV. The Old Mirror",
      pages: [
        { type: "text", text: "In a dusty tower, {name} found a mirror. It did not show his face. It showed a boy he almost recognised: laughing, curious, wild with plans." },
        { type: "text", text: "\"Who is that?\" he asked.\n\n\"That is you,\" said the mirror, \"before you forgot. A heart can break, but the person who carried it is still standing.\"" },
        { type: "reflect", id: "mirror-self", text: "Write three things you loved doing, or loved about yourself, before this love story began.", placeholder: "1.\n2.\n3." },
        { type: "quest", id: "mirror-quest", text: "The mirror gave him a quest.", task: "This week, do one of those three things again, even just for an hour." },
      ],
    },
    {
      id: "dragon",
      title: "V. The Dragon of Memory",
      pages: [
        { type: "text", text: "Every heartbroken knight meets the dragon eventually.\n\nIt lives in old songs, in certain streets, in a name on a screen. It breathes memories, and they burn." },
        { type: "text", text: "{name} realised he could not slay this dragon. But he could learn its name, and a thing with a name is a thing you can face." },
        { type: "reflect", id: "dragon-name", text: "Give your pain a creature's name and shape. What does it look like? When does it attack? What does it whisper?", placeholder: "My dragon is called…" },
        { type: "quest", id: "dragon-shake", text: "Wild animals know a secret. After a fright, they shake their whole body until the fear falls off them.", task: "Stand up, put on a loud song, and shake everything (arms, legs, head) for one full minute. Yes, really." },
        { type: "text", text: "The dragon did not die. But it shrank, a little, every time {name} looked it in the eye." },
      ],
    },
    {
      id: "village",
      title: "VI. The Village",
      pages: [
        { type: "text", text: "At last, {name} came to a village. He expected to be alone there too.\n\nInstead, the blacksmith, the baker and the old shepherd each had a story about the first time their heart broke." },
        { type: "text", text: "\"You thought you were the only one,\" laughed the shepherd. \"Everyone thinks that. It's the great secret of the world: we are all walking around with mended hearts.\"" },
        { type: "quest", id: "village-call", text: "Knights are not meant to ride alone.", task: "Call or meet someone you trust today. You don't have to talk about it, just spend time with them." },
        { type: "quest", id: "village-spring", text: "Behind the village was an icy spring said to wake up sleeping hearts.", task: "Splash your face with very cold water (or end your shower with 30 cold seconds). Notice how alive you feel." },
      ],
    },
    {
      id: "forge",
      title: "VII. The Forge",
      pages: [
        { type: "text", text: "The blacksmith took the pieces {name} had gathered and laid them on the anvil.\n\n\"In the far East,\" she said, \"they mend broken bowls with gold. The cracks become the most beautiful part.\"" },
        { type: "reflect", id: "forge-lessons", text: "What did this love teach you? About what you want, what you give, what you deserve?", placeholder: "It taught me…" },
        { type: "text", text: "The heart came out of the fire whole again. Not the same as before; it would never be the same.\n\nIt was stronger, and threaded with gold." },
      ],
    },
    {
      id: "horizon",
      title: "VIII. The Horizon",
      pages: [
        { type: "text", text: "{name} climbed the last hill and saw the horizon, wide and unknown.\n\nFor the first time, unknown did not feel frightening. It felt like room." },
        { type: "future", text: "Before setting off, write a letter to the knight you will be a few months from now. Tell him how you feel today, what you hope for him, what he survived. It will be sealed until the day you choose." },
        { type: "text", text: "And so {name} rode on, with a mended heart and a sealed letter in his saddlebag.\n\nThis is not the end of his story. It's the end of the first chapter." },
      ],
    },
  ],

  // Shown when he taps the moon on the cover ("a hard night").
  sanctuary: {
    title: "The Sanctuary",
    text: "Some nights the dragon is loud. That's alright. You don't have to be brave right now. Breathe with the light.",
    footer: "This feeling is a wave, and waves pass. If it gets too heavy, call someone who loves you. You are not alone in this kingdom.",
  },
};
