# SoftSell - Software License Resale Marketplace

A modern marketplace platform for buying and selling software licenses securely.

Build Time: ~2 hours 40 minutes

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
OPENAI_API_KEY=your_api_key_here (optional)
```

4. Start the development server:
```bash
# Start the backend server
npm run dev:server

# In a new terminal, start the frontend
npm run dev
```

## Deployment

### Vercel Deployment

1. Fork or push your code to GitHub

2. Visit [Vercel](https://vercel.com) and sign up/login with your GitHub account

3. Click "New Project" and select your repository

4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: dist

5. Add Environment Variables:
   - Add any required environment variables in the Vercel project settings

6. Click "Deploy"

Your application will be automatically deployed and you'll receive a production URL.

### Automatic Deployments

Vercel will automatically deploy changes when you push to your repository's main branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Development

- Frontend code is in the `src` directory
- Backend code is in the `server` directory
- Components are in `src/components`
- API integration is in `src/lib`

## Author

- [sumana-7](https://github.com/sumana-7)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Time Taken
⏱️ 3 hours

