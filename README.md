# 🕵️ Cyber Detective

> A terminal-themed detective game built with React Native CLI. Analyze clues, crack cases, buy hints, and chase perfect solve times across 10+ cyber-crime investigations.

![React Native](https://img.shields.io/badge/React_Native-0.73+-61DAFB?logo=react&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-00ff9f)

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Gameplay](#-gameplay)
- [Scoring System](#-scoring-system)
- [Achievements](#-achievements)
- [Daily Case](#-daily-case)
- [Customization](#-customization)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

- 🎯 **10+ handcrafted cases** — phishing, ransomware, deepfakes, crypto heists, insider threats
- ⏱️ **Per-case timer** — solve fast or the suspect escapes
- 💡 **Hint system** — spend credits to unlock clues, but hints reduce your payout
- 🏁 **Personal leaderboard** — ranks your solves by fastest time with medals
- 🏅 **12 achievements** — auto-tracked, persisted, and unlocked with popups
- 📅 **Daily case** — a new deterministic case each day with +50% reward bonus
- 🔥 **Daily streaks** — build a streak, chase the best-streak record
- 💾 **AsyncStorage persistence** — credits, solved cases, best times, streaks all survive restarts
- 🖥️ **Cyberpunk terminal UI** — deep navy + neon green, monospace font throughout
- 📱 **Fully offline** — no backend required

---

> Add your own screenshots here.
> Suggested folder: `/docs/screenshots/`

|

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | React Native CLI |
| Navigation | `@react-navigation/native` + `@react-navigation/stack` |
| Persistence | `@react-native-async-storage/async-storage` |
| Native deps | `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler` |
| Language | JavaScript (ES2020+) |
| Fonts | System monospace |

---

## 🚀 Installation

### Prerequisites

- Node.js ≥ 18
- React Native CLI environment set up ([official guide](https://reactnative.dev/docs/environment-setup))
- Xcode (iOS) or Android Studio (Android)

### Clone & Install

```bash
git clone https://github.com/yashikachandrakar04/CyberDetective.git
cd CyberDetective
npm install
```

### Install Dependencies (single line)

```bash
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-vector-icons @react-native-async-storage/async-storage
```

### iOS Pods

```bash
cd ios && pod install && cd ..
```

### Run

```bash
# Android
npx react-native run-android

# iOS (macOS only)
npx react-native run-ios
```

### ⚠️ Important — `index.js` Patch

Add this line at the **very top** of `index.js`:

```javascript
import 'react-native-gesture-handler';
```

---

## 📂 Project Structure

```
CyberDetective/
├── index.js
├── App.tsx
├── src/
│   ├── data/
│   │   ├── cases.jsx                 # 10 base cases
│   │   └── achievements.jsx          # 12 achievement definitions
│   ├── hooks/
│   │   └── useGameState.jsx          # global state + persistence
│   ├── utils/
│   │   ├── storage.jsx              # AsyncStorage wrapper (v2 schema)
│   │   └── dailyCase.jsx            # deterministic daily case + streak
│   ├── styles/
│   │   └── theme.jsx                # design tokens
│   ├── components/
│   │   ├── CaseCard.js
│   │   ├── ClueCard.jsx
│   │   ├── Timer.jsx
│   └── screens/
|
```

---

## 🎮 Gameplay

1. **Home** — pick any open case, or jump into the **Daily Case**, **Leaderboard**, or **Achievements**
2. **Case** — read the brief, tap clues to inspect them in a terminal view, buy a hint if stuck
3. **Timer** — every case has a countdown; hit 0 and the case fails
4. **Accuse** — select a suspect and submit
5. **Result** — instant verdict with payout breakdown (base + time bonus − hint penalty)

### Controls

| Action | Gesture |
|---|---|
| Open case | Tap the case card |
| View clue | Tap the clue row |
| Buy hint | Tap 💡 HINT |
| Accuse | Tap ⚖️ MAKE ACCUSATION |
| Reset all progress | Long-press RESET at bottom of Home |

---

## 💰 Scoring System

Every correct accusation pays out:

```
payout = base_reward
       + round(base_reward × 0.5 × (1 − elapsed / timeLimit))   ← time bonus
       − (hints_used × round(base_reward × 0.1))                ← hint penalty
```

| Case Difficulty | Base Reward | Time Limit |
|---|---|---|
| 🟢 EASY | 500–700 | 150–180 s |
| 🟡 MEDIUM | 1,000–1,500 | 240 s |
| 🔴 HARD | 2,500–3,500 | 300–360 s |
| 📅 DAILY | base × 1.5 | base × 0.75 |

**Perfect solve** = no hints + finish under half the time limit.

---

## 🏅 Achievements

All 12 unlock automatically — no manual checks.

| Icon | Title | How to Unlock |
|---|---|---|
| 🎯 | First Contact | Solve your first case |
| 🕵️ | Field Agent | Solve 3 cases |
| 🏆 | Cyber Legend | Solve all base cases |
| 🧠 | Pure Logic | Solve 5 cases with no hints |
| ⚡ | Fast Hands | Solve any case in under 30 s |
| 🚀 | Speedster | Solve any case in under 15 s |
| 💎 | Flawless | 3 perfect solves |
| 💰 | Well Funded | Reach 5,000 credits |
| 💸 | Cyber Tycoon | Reach 15,000 credits |
| 🔥 | On a Roll | 3-day daily streak |
| ☄️ | Unstoppable | 7-day daily streak |
| 📅 | Daily Grinder | Complete 5 daily cases |

---

## 📅 Daily Case

- Every calendar day generates one case using a **deterministic FNV-1a hash** of today's date — every player sees the same case
- **+50% reward bonus**, **25% shorter timer**
- One attempt per day; already-played days show your result
- **Streak** increments if you played yesterday, resets to 1 if you skipped a day
- Best streak is tracked permanently

---

## 🎨 Customization

### Add a New Case

Open `src/data/cases.js` and append:

```javascript
{
  id: 11,
  title: 'Your Case Title',
  difficulty: 'MEDIUM',           // EASY | MEDIUM | HARD
  reward: 1500,
  timeLimit: 240,                 // seconds
  hintCost: 100,                  // credits
  hint: 'A nudge that costs credits.',
  brief: 'Short mission description.',
  clues: [
    { id: 'c1', icon: '📧', title: 'Clue Title', content: 'Multi-line\nclue text.' },
    // ...
  ],
  suspects: ['Suspect A', 'Suspect B', 'Suspect C'],
  answer: 'Suspect B',
  explanation: 'Why the answer is correct.',
}
```

### Add a New Achievement

Open `src/data/achievements.js`:

```javascript
{
  id: 'my_achievement',
  icon: '🎖️',
  title: 'Custom Title',
  description: 'What the player needs to do.',
  check: (state, ctx) => state.solved && Object.keys(state.solved).length >= 5,
}
```

### Theme

All colors, spacing, radii, and font sizes live in `src/styles/theme.js`. Change `theme.primary` to re-skin the entire app instantly.

---

## 🗺 Roadmap

- [x] Base case flow (Home → Case → Clue → Result)
- [x] AsyncStorage persistence
- [x] Timer per case
- [x] Hint system with credit cost
- [x] Personal leaderboard
- [x] Achievements
- [x] Daily case + streaks
- [ ] Profile stats screen
- [ ] Global leaderboard (Firebase)
- [ ] Push notifications for daily reminders
- [ ] Sound effects & haptics
- [ ] Multiplayer co-op cases
- [ ] Dark/light theme toggle
- [ ] Case editor / JSON import

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-case`
3. Commit: `git commit -m "Add new ransomware case"`
4. Push: `git push origin feature/my-case`
5. Open a Pull Request

**New cases are always welcome!** Submit them as a single JSON object in `src/data/cases.js`.

---

## 📄 License

MIT © 2026

---

## Author

**Yashika**
[https://github.com/yashikachandrakar04/CyberDetective](https://github.com/yashikachandrakar04/CyberDetective)

---

## 🙏 Acknowledgments

- Inspired by classic detective games, cyberpunk aesthetics, and terminal UIs
- Built with [React Native](https://reactnative.dev) and [React Navigation](https://reactnavigation.org)

---

<p align="center"><b>🕵️ Stay sharp, Detective.</b></p>