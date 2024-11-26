# Cocktail Conjurer 🍸

Your personal AI bartender. Input your ingredients and preferences, and let our AI craft the perfect cocktail recipe just for you.

## Features

- 🤖 AI-powered cocktail recipe generation
- 🧪 Customizable ingredient preferences
- 🎨 Beautiful, responsive UI with dark/light mode support
- 📱 Mobile-friendly design
- ⚡ Real-time recipe generation

## Tech Stack

- **Framework:** Next.js 14 with React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui with Radix UI
- **AI Integration:** Together AI
- **Form Handling:** React Hook Form with Zod validation
- **Theme:** next-themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kylburns89/cocktail-conjurer.git
cd cocktail-conjurer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Together AI API key:
```env
TOGETHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Visit the website
2. Input your available ingredients
3. Adjust preferences (optional)
4. Click "Generate Recipe"
5. Get your personalized cocktail recipe!

## Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by [kylburns89](https://github.com/kylburns89)
