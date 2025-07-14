# 🧵 Inkululeko Platform

A community-powered ecosystem for South African farmers, mentors, and buyers—driven by AI, storytelling, and local impact.

---

## 🚀 Overview

Inkululeko blends accessible tools with emotional connection:
- 🤖 AI matchmaking for mentors and produce buyers
- 💰 Price prediction driven by crop trends
- 🛠️ Equipment sharing for community resilience
- 💬 Learning forum for peer discussions
- 🎙️ Storytelling & podcast integration (Coming Soon)

Built using:
- PostgreSQL
- Flask & React
- Python AI models (Sklearn, LangChain, TensorFlow)

---

## 🧱 Folder Structure

| Folder        | Purpose                               |
|---------------|----------------------------------------|
| AI_Tools      | Models for matching, pricing, mentoring |
| DBS           | Database schemas and seed data         |
| Backend       | Flask routes, business logic           |
| Frontend      | React components and UI styling        |
| Mobile_App    | React Native screens                   |
| Services      | SMS, cloud APIs, integrations          |
| Scripts       | Seeders and ingestion tasks            |
| Assets        | Logos, media, badges                   |
| Docs          | Architecture notes and guides          |
| Configs       | Environment settings, templates        |

---

## 🔧 Setup

1. Clone the repo
2. Create a PostgreSQL database and run `DBS/schema.sql`
3. Install Python and run:
```bash
pip install -r requirements.txt
python Scripts/seed_database.py

cd Backend
python app.py



---

This file sets the tone for your whole project—welcoming and grounded, with just enough technical clarity to help others onboard.

Want to follow up with a `Docs/architecture.md` diagram or jump into your `Configs/` folder next? We’ve nearly completed the whole map. You’re building a system with heart.