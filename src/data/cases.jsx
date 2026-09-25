export const cases = [
  {
    id: 1,
    title: 'The Phantom Phisher',
    difficulty: 'EASY',
    reward: 500,
    timeLimit: 180,
    hintCost: 50,
    hint: 'Compare the timestamp in the chat intercept with the online suspects list.',
    brief:
      'A phishing campaign is targeting bank customers. Three suspects were flagged. Analyze the evidence to identify the culprit.',
    clues: [
      {
        id: 'c1',
        icon: '📧',
        title: 'Email Header',
        content:
          'Return-Path: <spoofed@secure-bank-verify.com>\nIP: 192.168.45.12 (Proxy: NordVPN)\nSent: 03:47 AM',
      },
      {
        id: 'c2',
        icon: '💾',
        title: 'Malware Sample',
        content:
          'Filename: invoice.pdf.exe\nMD5: a3f5c9e... (known trojan)\nC2 Server: 45.32.11.98',
      },
      {
        id: 'c3',
        icon: '🔍',
        title: 'Suspect Logs',
        content:
          'Suspects online at 03:47 AM:\n- Alice: yes (gaming)\n- Bob: yes (matches C2 IP)\n- Carol: no (offline)',
      },
      {
        id: 'c4',
        icon: '💬',
        title: 'Chat Intercept',
        content: '"Bob: got 200 emails out, boss. Using the usual VPN node."',
      },
    ],
    suspects: ['Alice', 'Bob', 'Carol'],
    answer: 'Bob',
    explanation:
      'The C2 server IP, chat intercept, and login timing all point to Bob.',
  },
  {
    id: 2,
    title: 'Ransomware Riddle',
    difficulty: 'MEDIUM',
    reward: 1200,
    timeLimit: 240,
    hintCost: 100,
    hint: 'Cross-reference the USB device insertion time with the unusual login.',
    brief:
      'A hospital was hit by ransomware. Find the insider who planted the payload.',
    clues: [
      {
        id: 'c1',
        icon: '🧬',
        title: 'Payload Hash',
        content: 'SHA256: 9f2b...e7a1\nSigned by: RevoCert (revoked 2023)',
      },
      {
        id: 'c2',
        icon: '📅',
        title: 'Access Log',
        content:
          'Server accessed:\n- 02:11 Dr. Kim (cardiology)\n- 02:13 Nurse Joy (ER)\n- 02:19 IT_Tech07 (unknown)',
      },
      {
        id: 'c3',
        icon: '🖥️',
        title: 'USB Insert Event',
        content: 'Device "KINGSTON_8GB" inserted on IT_Tech07 workstation at 02:17',
      },
      {
        id: 'c4',
        icon: '🌐',
        title: 'Dark Web Post',
        content:
          '"Insider for hire — hospital networks, $5k. Contact: tech07@protonmail"',
      },
    ],
    suspects: ['Dr. Kim', 'Nurse Joy', 'IT_Tech07'],
    answer: 'IT_Tech07',
    explanation: 'USB event, dark web alias, and unusual access time incriminate IT_Tech07.',
  },
  {
    id: 3,
    title: 'Crypto Heist',
    difficulty: 'HARD',
    reward: 3000,
    timeLimit: 300,
    hintCost: 200,
    hint: 'This case may involve collusion — check if more than one suspect is involved.',
    brief: 'A crypto exchange lost $40M. Track the on-chain trail to the hacker.',
    clues: [
      {
        id: 'c1',
        icon: '⛓️',
        title: 'Blockchain Trail',
        content:
          'Stolen funds routed through Tornado Cash → 3 wallets → finally to Binance account ending 4821',
      },
      {
        id: 'c2',
        icon: '📱',
        title: 'SIM Swap Record',
        content: 'Victim SIM swapped at 14:02. Employee ID: EMP-221 (KYC analyst)',
      },
      {
        id: 'c3',
        icon: '📝',
        title: 'KYC Data',
        content:
          'Binance account 4821 registered to "A. Nakamura" — verified by EMP-221',
      },
      {
        id: 'c4',
        icon: '📡',
        title: 'Signal Intercept',
        content:
          '"Nakamura here. My guy inside exchange handled it. Wire the cut to the usual address."',
      },
    ],
    suspects: ['A. Nakamura', 'EMP-221', 'Both colluded'],
    answer: 'Both colluded',
    explanation:
      'The KYC analyst approved a fake account for Nakamura — inside job + external actor.',
  },
  {
    id: 4,
    title: 'The Ghost in the Server',
    difficulty: 'MEDIUM',
    reward: 1000,
    timeLimit: 240,
    hintCost: 100,
    hint: 'Look for who had physical access to the data center at the breach time.',
    brief: 'A government database was breached at 23:14. Find the intruder.',
    clues: [
      {
        id: 'c1',
        icon: '🔐',
        title: 'Firewall Log',
        content:
          '23:14:02 — Unauthorized SSH from internal IP 10.0.4.88\n23:14:45 — Data exfiltration (4.2 GB)',
      },
      {
        id: 'c2',
        icon: '🎫',
        title: 'Badge Access',
        content:
          '23:08 — Badge #3391 (Ravi) entered Server Room B\n23:55 — Badge #3391 exited',
      },
      {
        id: 'c3',
        icon: '📹',
        title: 'Camera Feed',
        content:
          '23:10 — Figure in hoodie, no face visible, carrying laptop bag',
      },
      {
        id: 'c4',
        icon: '🖥️',
        title: 'Workstation Trace',
        content:
          '10.0.4.88 belongs to workstation in Server Room B. Logged in as: ravi.k',
      },
    ],
    suspects: ['Ravi', 'Security Guard', 'Night Janitor'],
    answer: 'Ravi',
    explanation:
      'Ravi\'s badge accessed the room, his workstation IP matches the breach, and timing aligns.',
  },
  {
    id: 5,
    title: 'Deepfake Deception',
    difficulty: 'EASY',
    reward: 600,
    timeLimit: 150,
    hintCost: 50,
    hint: 'Check the metadata — deepfakes often have telltale codec artifacts.',
    brief:
      'A CEO deepfake authorized a $2M wire transfer. Identify the mastermind.',
    clues: [
      {
        id: 'c1',
        icon: '🎥',
        title: 'Video Metadata',
        content:
          'Codec: h264\nEncoder: FaceSwap v4.1\nCreated: 2 hours before the call\nEXIF stripped',
      },
      {
        id: 'c2',
        icon: '📞',
        title: 'Call Log',
        content:
          'Call originated from VOIP number traced to hotel: Grand Hyatt Room 412',
      },
      {
        id: 'c3',
        icon: '🏨',
        title: 'Hotel Guest',
        content: 'Room 412 — checked in as "M. Sharma" (2 nights)',
      },
      {
        id: 'c4',
        icon: '💼',
        title: 'Internal Tip',
        content:
          '"Sharma said he had a big presentation. Acted nervous, paid cash."',
      },
    ],
    suspects: ['M. Sharma', 'CEO\'s Assistant', 'Unknown Contractor'],
    answer: 'M. Sharma',
    explanation:
      'Video encoder, VOIP trace, and hotel registration all point to M. Sharma.',
  },
  {
    id: 6,
    title: 'Insider Threat',
    difficulty: 'MEDIUM',
    reward: 1500,
    timeLimit: 240,
    hintCost: 100,
    hint: 'The leaker is someone who had access to BOTH files that leaked.',
    brief: 'Two classified documents leaked to a rival firm. Find the mole.',
    clues: [
      {
        id: 'c1',
        icon: '📄',
        title: 'Leaked Docs',
        content:
          'Doc A: Project_HORIZON_budget.xlsx (accessed by 4 employees)\nDoc B: Project_HORIZON_roadmap.pptx (accessed by 3 employees)',
      },
      {
        id: 'c2',
        icon: '👥',
        title: 'Access Lists',
        content:
          'Doc A: Sara, Mike, Priya, Dev\nDoc B: Priya, Dev, Elena',
      },
      {
        id: 'c3',
        icon: '📧',
        title: 'Suspicious Email',
        content:
          'From priya.k@company.com to external@rival-corp.io: "attached, as discussed" (encrypted)',
      },
      {
        id: 'c4',
        icon: '💰',
        title: 'Bank Alert',
        content:
          'Priya K. received ₹8,00,000 from shell company 3 days after the leak.',
      },
    ],
    suspects: ['Sara', 'Mike', 'Priya', 'Dev', 'Elena'],
    answer: 'Priya',
    explanation:
      'Priya accessed both files, sent suspicious email, and received a payment.',
  },
  {
    id: 7,
    title: 'Botnet Overlord',
    difficulty: 'HARD',
    reward: 2500,
    timeLimit: 300,
    hintCost: 200,
    hint: 'Correlate timezone with the command-and-control server activity peak.',
    brief:
      'A botnet of 200k devices is DDoSing infrastructure. Find the operator.',
    clues: [
      {
        id: 'c1',
        icon: '🌐',
        title: 'C2 Server',
        content:
          'IP: 185.220.101.44 (Tor exit node)\nCommands sent at 04:00–06:00 UTC daily',
      },
      {
        id: 'c2',
        icon: '🕐',
        title: 'Activity Pattern',
        content: 'Operator most active during 09:00–11:00 local time',
      },
      {
        id: 'c3',
        icon: '💻',
        title: 'Malware Analysis',
        content:
          'Compiler artifact includes path: C:\\Users\\Иван\\Desktop\\build\\rat.c',
      },
      {
        id: 'c4',
        icon: '🗣️',
        title: 'Forum Post',
        content:
          'User "xX_Slavik_Xx" brags: "my bots sleep at 6am my time, I sleep after"',
      },
    ],
    suspects: ['Operator in UTC+5', 'Operator in UTC+2', 'Operator in UTC-5'],
    answer: 'Operator in UTC+5',
    explanation:
      'Commands sent 04–06 UTC = 09–11 local means +5 offset. Russian path also hints Eastern Europe but +5 (e.g. India/Pakistan).',
  },
  {
    id: 8,
    title: 'The Silent Keylogger',
    difficulty: 'MEDIUM',
    reward: 1300,
    timeLimit: 240,
    hintCost: 100,
    hint: 'Look for the device that was plugged in briefly but shows no legit reason.',
    brief:
      'Executive accounts were compromised. A physical keylogger was planted.',
    clues: [
      {
        id: 'c1',
        icon: '🖱️',
        title: 'USB History',
        content:
          'Device A: Logitech keyboard (registered)\nDevice B: "USB Composite Device" inserted 4 min, 2 weeks ago (unknown)',
      },
      {
        id: 'c2',
        icon: '👤',
        title: 'Office Visitors',
        content:
          'Cleaner (nightly), IT Support (weekly), Delivery guy (once, 2 weeks ago, claimed wrong floor)',
      },
      {
        id: 'c3',
        icon: '📹',
        title: 'Lobby Footage',
        content:
          '2 weeks ago, 21:47 — Delivery man spends 40 min on exec floor, badge not scanned',
      },
      {
        id: 'c4',
        icon: '📦',
        title: 'Delivery Record',
        content:
          'Package addressed to "S. Chen" — no such employee on file. Delivery person ID matched fake credentials.',
      },
    ],
    suspects: ['Cleaner', 'IT Support', 'Fake Delivery Guy'],
    answer: 'Fake Delivery Guy',
    explanation:
      'The fake delivery person had 40 min unattended access and matches the USB timing.',
  },
  {
    id: 9,
    title: 'The Screenshot Leak',
    difficulty: 'EASY',
    reward: 700,
    timeLimit: 180,
    hintCost: 50,
    hint: 'Watermarks in leaked screenshots can be uniquely traced.',
    brief:
      'A confidential product screenshot leaked to press. Find the leaker.',
    clues: [
      {
        id: 'c1',
        icon: '🖼️',
        title: 'Leaked Image',
        content:
          'Watermark in corner: "u_beta_0042" (invisible to eye, revealed by enhancement)',
      },
      {
        id: 'c2',
        icon: '🔢',
        title: 'Watermark Log',
        content:
          'u_beta_0042 = assigned to Karan M. (QA team, beta tester)',
      },
      {
        id: 'c3',
        icon: '📤',
        title: 'Upload Trace',
        content:
          'Image first seen on Twitter via account @techie_karan_99 (created 3 days ago)',
      },
      {
        id: 'c4',
        icon: '🚫',
        title: 'NDA Status',
        content:
          'Karan M. signed NDA on joining. Also flagged for prior policy violation.',
      },
    ],
    suspects: ['Karan M.', 'Press Team', 'Unknown hacker'],
    answer: 'Karan M.',
    explanation: 'The watermark uniquely identifies the leaker as Karan M.',
  },
  {
    id: 10,
    title: 'The Zero-Day Broker',
    difficulty: 'HARD',
    reward: 3500,
    timeLimit: 360,
    hintCost: 250,
    hint: 'Follow the money — cryptocurrency flows often reveal true identity.',
    brief:
      'A dangerous zero-day exploit was sold to criminals. Find the broker.',
    clues: [
      {
        id: 'c1',
        icon: '💣',
        title: 'Exploit Sample',
        content:
          'Zero-day in popular VPN product. Sold for 40 BTC on dark market "ShadowBid"',
      },
      {
        id: 'c2',
        icon: '⛓️',
        title: 'Payment Trail',
        content:
          '40 BTC → mixer → 12 BTC to cold wallet "0xA1B2..." → 8 BTC cashout at exchange KYC to "N. Verma"',
      },
      {
        id: 'c3',
        icon: '🕵️',
        title: 'Researcher Profile',
        content:
          'Nikhil Verma — independent security researcher, published 3 VPN CVEs in 2 years',
      },
      {
        id: 'c4',
        icon: '💬',
        title: 'Forum Handle',
        content:
          'ShadowBid seller "nv_zero" — bio says "finding the edge before everyone else"',
      },
    ],
    suspects: ['Nikhil Verma', 'Anonymous group', 'Foreign state actor'],
    answer: 'Nikhil Verma',
    explanation:
      'CVE history, KYC cashout, and forum handle pseudonym uniquely identify Nikhil Verma.',
  },
];