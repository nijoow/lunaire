# 🌙 Café Lunaire (카페 루네어)

> AI Agent(Antigravity)를 활용하여 기획/디자인/개발 전체 프로세스를 최적화하여 작업중인 카페 웹사이트 구현 사이드 프로젝트

---

## ✨ Key Features (주요 기능)

- **Antigravity Agent를 활용한 페르소나 설계**: 카페 브랜딩, 디자인 및 핵심 기능 정의
- **AI 기반 UX 라이팅 및 레이아웃 구조화**: AI로 와이어프레임의 논리적 구조를 설계하고, 사용자 경험을 고려한 UI 배치 결정
- **Agent-driven developement 기반 개발**: UI 구현 및 비즈니스 로직을 agent driven 으로 개발 진행

---

## 🛠 Tech Stack (기술 스택)

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Backend / Database**: [Supabase](https://supabase.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Deployment**: [Vercel](https://vercel.com)

---

## 📂 Project Structure (폴더 구조)

```text
src/
├── app/          # Next.js App Router (Pages, Routes, Client Comp)
├── components/   # Shared UI Components (ui, common)
├── features/     # Feature-based Components (menu, order, social)
├── domain/       # Business Logic & Service Layers (data, types)
├── lib/          # Utilities & Third-party Config (supabase)
├── stores/       # Global State (zustand)
└── types/        # Shared Types
```
