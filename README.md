# Cocktail Conjurer 🍸

An AI-powered cocktail recipe generator that transforms your available ingredients into delightful drink recipes. Whether you're a professional bartender or a home mixologist, Cocktail Conjurer helps you discover new and exciting cocktail combinations tailored to your preferences and available ingredients.

![wizard-logo](https://github.com/user-attachments/assets/9a4b319f-3e0c-40da-9f55-fdf76127959f)

## Overview

Cocktail Conjurer combines the power of artificial intelligence with mixology expertise to create unique, personalized cocktail recipes. Simply input your available ingredients and preferences, and let our AI bartender craft the perfect cocktail recipe just for you. Each recipe comes with its own AI-generated image, providing a beautiful visual representation of your custom cocktail creation.

## Features

- 🤖 AI-powered cocktail recipe generation
- 🎨 AI-generated unique cocktail images for each recipe
- 🧪 Customizable ingredient preferences
- 🎨 Beautiful, responsive UI with dark/light mode support
- 📱 Mobile-friendly design
- ⚡ Real-time recipe generation
- 🔄 Smart recipe adjustments based on available ingredients
- 💡 Ingredient substitution suggestions
- 📝 Detailed preparation instructions

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
   - Specify drink strength
   - Set flavor preferences
   - Choose serving style
4. Click "Generate Recipe"
5. Get your personalized cocktail recipe with a unique AI-generated image!

## Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Traditional Hosting
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please ensure your PR adheres to the following guidelines:
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commit messages clear and descriptive

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

## Acknowledgments

- Thanks to Together AI for providing the AI capabilities
- Thanks to the shadcn/ui team for the beautiful UI components
- Thanks to the open-source community for their invaluable contributions
