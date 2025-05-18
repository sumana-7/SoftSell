# SoftSell - Software License Resale Marketplace

A modern marketplace platform for buying and selling software licenses securely.

## Features

- Modern, responsive UI built with React and Tailwind CSS
- Real-time chat support with AI assistance
- Secure license verification system
- User-friendly marketplace interface
- Comprehensive search and filtering capabilities

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Vite
- Backend: Node.js, Express, TypeScript
- AI Integration: OpenAI API (optional)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/sumana-7/SoftSell.git
cd purple-softsell-launchpad
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
OPENAI_API_KEY=your_api_key_here  # Optional for AI chat
```

4. Start the development servers:

In one terminal, start the backend:
```bash
npm run dev:server
```

In another terminal, start the frontend:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:8092
- Backend: http://localhost:3001

## Development

- Frontend code is in the `src` directory
- Backend code is in the `server` directory
- Components are in `src/components`
- API integration is in `src/lib`

## Author

- [sumana-7](https://github.com/sumana-7)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
