# Chaitanya Embed

A modern, real-time AI chat interface built with Next.js 15, React 19, and Socket.IO. This embeddable chat application provides a seamless conversational experience with AI agents, featuring real-time streaming responses, markdown rendering, and a beautiful dark-themed UI.

## ✨ Features

- **Real-time Chat**: Stream AI responses in real-time using Socket.IO
- **Multi-Agent Support**: Connect with different AI agents dynamically
- **Rich Markdown Rendering**: Full support for markdown, code syntax highlighting
- **Conversation History**: Persistent conversations with automatic state management
- **Responsive UI**: Beautiful gradient-based dark theme with smooth animations
- **Auto-reconnection**: Automatic socket reconnection on connection loss
- **Typing Indicators**: Visual feedback during AI response generation
- **Code Highlighting**: Syntax highlighting for 180+ programming languages
- **Embeddable**: Designed to be embedded in other applications

## 🚀 Tech Stack

### Core Framework

- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - UI library with latest features
- **TypeScript 5** - Type-safe development

### State Management

- **Redux Toolkit 2.9.2** - Global state management
- **RTK Query** - API data fetching and caching
- **React Redux 9.2.0** - React bindings for Redux

### Real-time Communication

- **Socket.IO Client 4.8.1** - WebSocket-based real-time communication

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Tailwind Typography** - Beautiful typographic defaults
- **Lucide React** - Modern icon library

### Markdown & Code Rendering

- **React Markdown 10.1.0** - Markdown component
- **Remark GFM 4.0.1** - GitHub Flavored Markdown support
- **Rehype Highlight 7.0.2** - Syntax highlighting
- **React Syntax Highlighter 16.1.0** - Code block rendering
- **Highlight.js 11.11.1** - Syntax highlighting engine

### Development Tools

- **ESLint 9** - Code linting
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks
- **Lint-staged 16.2.6** - Pre-commit linting

## 📋 Prerequisites

- Node.js 20+ (recommended)
- npm, yarn, or pnpm package manager
- Backend API server (for agent data)
- Socket.IO server (for real-time communication)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chaitanya-embed
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
   NEXT_PUBLIC_USER_ID=your-user-id
   NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
   ```

   - `NEXT_PUBLIC_BACKEND_URL`: Your backend API endpoint
   - `NEXT_PUBLIC_USER_ID`: User identifier for authentication
   - `NEXT_PUBLIC_SOCKET_URL`: Socket.IO server URL

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
chaitanya-embed/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main chat page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── atoms/              # Atomic components
│   │   └── TypingIndicator.tsx
│   ├── molecules/          # Molecular components
│   │   ├── ChatMessage.tsx
│   │   └── MarkdownRenderer.tsx
│   ├── organisms/          # Organism components
│   └── templates/          # Template components
├── context/                # React Context providers
│   └── app.tsx            # App context for agent data
├── hooks/                 # Custom React hooks
│   └── useSocket.ts       # Socket.IO hook
├── store/                 # Redux store
│   ├── chaitanya.ts       # RTK Query API endpoints
│   ├── emptyApi.ts        # Base API configuration
│   ├── index.ts           # Store configuration
│   ├── provider.tsx       # Redux provider
│   ├── socket.ts          # Socket service
│   └── socketSlice.ts     # Socket state slice
├── public/                # Static assets
├── env.ts                 # Environment configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🏗️ Architecture

### Component Structure

The project follows **Atomic Design** principles:

- **Atoms**: Basic UI elements (TypingIndicator)
- **Molecules**: Combinations of atoms (ChatMessage, MarkdownRenderer)
- **Organisms**: Complex UI sections
- **Templates**: Page-level layouts

### State Management

- **Redux Toolkit**: Global application state
- **RTK Query**: API data fetching and caching with automatic re-fetching
- **Socket Slice**: WebSocket connection state management

### Real-time Communication Flow

1. User sends a message
2. Message is emitted to Socket.IO server via `stream` event
3. Server responds with:
   - `stream.start`: Streaming begins
   - `stream.chunk`: Individual message chunks
   - `stream.end`: Streaming complete
   - `stream.updated`: Conversation metadata updated
   - `stream.error`: Error occurred

## 🔌 Socket Events

### Emitted Events

- **`stream`**: Send a new message
  ```typescript
  {
    userId: string;
    agentId: string;
    message: string;
    conversationId?: string;
    metadata?: object;
  }
  ```

### Listened Events

- **`stream.start`**: AI starts responding
- **`stream.chunk`**: Partial response chunk
  ```typescript
  {
    message: string;
  }
  ```
- **`stream.end`**: Response complete
- **`stream.updated`**: Conversation updated
  ```typescript
  {
    conversationId: string;
  }
  ```
- **`stream.error`**: Error occurred
  ```typescript
  {
    error: string;
  }
  ```

## 🎨 Styling

The application uses a custom dark theme with:

- Gradient backgrounds
- Smooth transitions and animations
- Tailwind CSS utility classes
- Custom typography for markdown content
- Responsive design for all screen sizes

### Custom Animations

- `fadeIn`: Smooth fade-in effect for messages
- `pulse`: Animated status indicators
- `scale`: Button hover effects

## 📦 API Endpoints

### Embed API (via RTK Query)

1. **Get Current Agent**

   ```typescript
   GET /embed/agent
   Headers: { 'x-user-id': string }
   ```

2. **Get Agent by ID**

   ```typescript
   GET /embed/agent/:id
   Headers: { 'x-user-id': string }
   ```

3. **Get Conversation by ID**
   ```typescript
   GET /embed/conversation/:id
   Headers: { 'x-user-id': string }
   ```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:

- `NEXT_PUBLIC_BACKEND_URL`
- `NEXT_PUBLIC_USER_ID`
- `NEXT_PUBLIC_SOCKET_URL`

### Recommended Platforms

- **Vercel** (optimized for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** (containerized deployment)

## 🔧 Development Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run precommit` - Run pre-commit hooks (lint-staged)

## 🧪 Code Quality

### Pre-commit Hooks

The project uses Husky and lint-staged to ensure code quality:

- Automatic code formatting with Prettier
- Linting on commit
- Format check for JS, TS, JSON, MD, and YAML files

### Prettier Configuration

Code is formatted according to `.prettierrc` rules.

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Follow Atomic Design principles
- Write meaningful commit messages
- Ensure all lint checks pass before committing

## 📝 Key Features Explained

### Real-time Streaming

The chat uses Socket.IO to stream AI responses in real-time, providing a smooth user experience similar to ChatGPT.

### Conversation Persistence

Conversations are automatically saved and can be resumed using the conversation ID stored in localStorage.

### Auto-reconnection

The socket automatically reconnects when the user starts typing after a disconnection, ensuring seamless communication.

### Markdown Support

Full GitHub Flavored Markdown support including:

- Headers, lists, tables
- Code blocks with syntax highlighting
- Links, images, blockquotes
- Task lists

## 🐛 Troubleshooting

### Socket Connection Issues

- Check if the Socket.IO server is running
- Verify `NEXT_PUBLIC_SOCKET_URL` is correct
- Check browser console for connection errors

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version (requires 20+)

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.js` content paths
- Verify `globals.css` is imported in layout

---

Built with ❤️ using Next.js and React
