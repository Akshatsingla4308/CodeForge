# CodeForge

> Online developer compiler and coding practice platform built with React, Vite, and Judge0 Cloud API.

**Live Deployment:** [https://code-forge-khaki.vercel.app](https://code-forge-khaki.vercel.app)  
**Author:** Akshat Singla (`aksaht.singla@gmail.com`)

---

## Features

- **Multi-Language Cloud Compilation:** Live code execution powered by the external Judge0 Cloud Engine API supporting Java (OpenJDK 17), Python 3, C (GCC), C++, and JavaScript (Node.js).
- **Automated Output Validation:** Instant test-case verification comparing standard output against expected problem outputs, with execution time and memory consumption metrics.
- **Problem Library:** Curated programming challenges spanning Easy, Medium, and Hard difficulties with structured inputs, outputs, and multi-language starter templates.
- **Personalized Progress Tracking:** Browser-persisted user session tracking uniquely solved questions, distinct problem attempts, success rate, and submission timestamps.
- **Clean Developer Interface:** Understated dark-themed interface built for focus and usability with zero fabricated progress or fake marketing metrics.
- **Administrator Problem Management:** Protected portal to create, customize, and manage coding challenges across all supported languages.

---

## Tech Stack

- **Frontend:** React 18, React Router v7, Vite
- **Styling:** Custom CSS with restrained dark developer palette
- **Icons:** Lucide React
- **Compiler API:** Judge0 Cloud Engine (`https://ce.judge0.com`)
- **Linting:** Oxlint

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Akshatsingla4308/CodeForge.git
cd CodeForge

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## License

MIT License. Developed by Akshat Singla.
