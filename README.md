# Chart-AI - AI-Powered Learning Flow Builder

<div align="center">

![Chart-AI](https://img.shields.io/badge/FlowDo-Learning%20Flow%20Builder-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite)

**An intelligent, interactive learning flow builder that helps you organize, visualize, and enhance your study materials with AI assistance.**

[Features](#-features) • [Technologies](#-core-technologies) • [Installation](#-installation) • [Usage](#-usage) • [Project Structure](#-project-structure)

</div>

---

## 📖 Overview

Chart-AI is a modern, web-based learning management tool that combines visual graph-based learning flows with AI-powered content generation. It allows students and educators to create interactive study plans, connect learning concepts, and leverage AI to explain, enhance, and generate educational content.

### Key Highlights

- 🎨 **Visual Learning Flows**: Create and manage interconnected learning nodes
- 🤖 **AI-Powered Assistance**: Integrated with Google Gemini API for content generation
- 💬 **Context-Aware Chat**: Chat with your flow using RAG (Retrieval-Augmented Generation)
- 📁 **File Support**: Upload and convert files (PDF, TXT, MD) into study flows
- 🗄️ **Persistent Storage**: Automatic saving using IndexedDB
- 🎯 **Auto-Layout**: Magic organize feature for automatic node arrangement

---

## ✨ Features

### 🎯 Core Features

#### 1. **Visual Node-Based Learning Flows**
- Create different types of learning nodes:
  - **Lecture**: Course materials and presentations
  - **Concept**: Core concepts and definitions
  - **Question**: Quiz and practice questions
  - **Summary**: Key takeaways and summaries
  - **Task**: Action items and assignments
  - **Goal**: Learning objectives
  - **Note**: Personal notes
  - **Idea**: Brainstorming and ideas
  - **Resource**: External resources and links
- Drag and drop nodes to organize your flow
- Resize nodes to fit your content
- Connect nodes with edges to show relationships
- Group related nodes together

#### 2. **AI-Powered Content Generation**
- **Explain**: Get AI-generated explanations for concepts
- **Quiz**: Generate practice questions
- **Enhance**: Improve and expand existing content
- **Decompose**: Break down complex topics into smaller parts
- **Brainstorm**: Generate related ideas and connections
- **Flow Generation**: Create complete study plans from topics or files

#### 3. **Chat with Your Flow (RAG Integration)**
- Global chat sidebar for asking questions
- Context-aware responses based on visible nodes
- Automatically extracts text content from visible nodes
- Answers questions about relationships between concepts
- Example: "What is the relationship between Newton's First Law and the Quiz?"

#### 4. **File Upload & Conversion**
- Upload files (PDF, TXT, MD) to generate study flows
- Convert uploaded files into structured learning nodes
- AI analyzes file content and creates relevant steps
- Support for both topic-based and file-based flow generation

#### 5. **Auto-Layout & Magic Organize**
- One-click automatic node arrangement
- Hierarchical tree structure using Dagre layout algorithm
- Handles both connected and isolated nodes
- Centers layout in viewport automatically
- Grid arrangement for nodes without connections

#### 6. **Canvas Navigation**
- **Minimap**: Zoomed-out overview of entire canvas
  - Click to navigate to different areas
  - Shows viewport rectangle
  - Toggleable visibility
- **Fit to View**: Instantly center camera on all content
- **Zoom Controls**: 
  - Zoom slider for precise control
  - Zoom in/out buttons
  - Current zoom percentage display
  - Zoom range: 0.2x to 3x

#### 7. **Node Management**
- **Attachments**: Add files, images, and links to nodes
- **Completion Tracking**: Mark nodes as completed
- **Node Resizing**: Adjust node dimensions
- **Node Deletion**: Remove nodes and their connections
- **Group Management**: Create, resize, and delete node groups

#### 8. **Data Persistence**
- **IndexedDB Storage**: Automatic saving to browser database
- **Export/Import**: Download and upload flow data as JSON
- **Auto-save**: Changes saved automatically
- **Reset Functionality**: Clear all data with confirmation

#### 9. **Structured AI Output**
- JSON-formatted responses for better UI presentation
- Structured fields:
  - `summary`: Main explanation
  - `key_points`: Array of important points
  - `suggested_next_steps`: Optional follow-up actions
- Beautiful formatting with icons and styling

#### 10. **User Interface**
- Modern, dark-themed UI with Tailwind CSS
- Responsive design
- Context menus for quick actions
- Toast notifications for user feedback
- Loading overlays during AI processing
- Confirmation modals for destructive actions

---

## 🛠️ Core Technologies

### Frontend Framework & Language
- **React 18.3.1**: Modern UI library with hooks and functional components
- **TypeScript 5.5.3**: Type-safe JavaScript for better development experience
- **Vite 5.4.2**: Fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **Lucide React 0.344.0**: Beautiful icon library
- **React Hot Toast 2.6.0**: Elegant toast notifications

### AI & API Integration
- **Google Gemini API**: AI content generation and chat functionality
- **Custom AI Service**: Wrapper for Gemini API with structured output support
- **RAG Implementation**: Context-aware responses using visible node content

### Data Management
- **IndexedDB**: Browser-based database for persistent storage
- **Custom Database Utils**: Abstraction layer for IndexedDB operations

### Layout & Graph Algorithms
- **Dagre 0.8.5**: Graph layout library for automatic node arrangement
- **Custom Layout Utils**: Viewport-aware organization functions

### File Handling
- **PDF.js 5.4.449**: PDF text extraction (via pdfjs-dist)
- **FileReader API**: Native browser API for file reading
- **Custom File Handlers**: Utilities for text, image, and PDF processing

### Development Tools
- **ESLint 9.9.1**: Code linting and quality checks
- **TypeScript ESLint**: TypeScript-specific linting rules
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Google Gemini API key (optional, demo mode available)
- Firebase environment variables (will be provided)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chart-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
     ```bash
     cp .env.example .env.local
     ```
   - The Firebase configuration is already set up in `.env.example`
   - Add your Google Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_gemini_api_key_here
     ```
   - Leave Gemini API key empty for demo mode (uses mock responses)

4. **Start development server**
   ```bash
   npm run dev
   ```
   - The app will be available at `http://localhost:5173`
   - If you see a blank screen, check the browser console for Firebase configuration errors
   - Ensure all environment variables in `.env.local` are properly set

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

### Troubleshooting

**Blank Screen at Startup:**
- Check that `.env.local` exists with all required Firebase variables
- Open browser DevTools (F12) → Console to see Firebase initialization errors
- All 6 Firebase variables must be set: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`

**Firebase Not Loading:**
- If you see "Firebase Configuration Error" message, verify `.env.local` has correct values
- Restart dev server: `npm run dev`
- Clear browser cache if needed

---

## 🚀 Usage

### Getting Started

1. **Create Your First Flow**
   - Right-click on the canvas to open the context menu
   - Select a node type (Lecture, Concept, Question, etc.)
   - Click on the node to edit its content

2. **Connect Nodes**
   - Click the output pin (right side) of a node
   - Drag to the input pin (left side) of another node
   - Release to create a connection

3. **Use AI Features**
   - Right-click on a node to open the AI menu
   - Choose an action: Explain, Quiz, Enhance, Decompose, or Brainstorm
   - View the AI-generated content in the node

4. **Generate a Study Plan**
   - Click the "Plan" button in the toolbar
   - Enter a topic OR upload a file
   - Click "Generate Plan"
   - AI creates a structured flow automatically

5. **Chat with Your Flow**
   - Click the "Chat" button to open the sidebar
   - Ask questions about your visible nodes
   - Get context-aware answers from the AI

6. **Organize Your Flow**
   - Click "Magic Organize" to automatically arrange nodes
   - Use the minimap to navigate large flows
   - Use "Fit to View" to center all content

### Keyboard Shortcuts
- **Right-click**: Open context menu
- **Scroll**: Zoom in/out
- **Drag**: Pan canvas or move nodes
- **Click pins**: Connect nodes

---

## 📁 Project Structure

```
FlowDo/
├── src/
│   ├── components/          # React components
│   │   ├── AIInsight.tsx    # Structured AI response display
│   │   ├── ChatSidebar.tsx  # RAG chat interface
│   │   ├── ContextMenus.tsx # Right-click menus
│   │   ├── FlowNode.tsx     # Individual node component
│   │   ├── Minimap.tsx      # Canvas overview
│   │   ├── Modals.tsx       # Modal dialogs
│   │   ├── NodeGroup.tsx    # Node grouping container
│   │   ├── Wire.tsx         # Edge/connection component
│   │   └── ZoomControls.tsx # Zoom UI controls
│   ├── constants/           # App constants
│   │   └── index.ts         # Node types, colors, mock data
│   ├── data/               # Initial data
│   │   └── initialData.ts  # Sample nodes and edges
│   ├── hooks/              # Custom React hooks
│   │   └── useCanvasInteractions.ts # Canvas event handling
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # Interfaces and types
│   ├── utils/              # Utility functions
│   │   ├── aiService.ts    # AI/Gemini integration
│   │   ├── database.ts     # IndexedDB operations
│   │   ├── fileHandlers.ts # File processing
│   │   └── layout.ts       # Auto-layout algorithms
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

---

## 🔧 Configuration

### API Key Setup
1. Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Open Settings in the app
3. Paste your API key
4. Click Save

### Customization
- **Node Types**: Edit `src/constants/index.ts` to add/modify node types
- **Colors**: Modify `COLORS` constant in `src/constants/index.ts`
- **Default Sizes**: Adjust `DEFAULT_NODE_WIDTH` and `DEFAULT_NODE_HEIGHT`

---

## 🎨 Features in Detail

### AI Content Generation Modes

1. **Explain Mode**
   - Returns structured JSON with summary, key points, and next steps
   - Perfect for understanding complex concepts

2. **Quiz Mode**
   - Generates practice questions
   - Helps with exam preparation

3. **Enhance Mode**
   - Improves and expands existing content
   - Adds depth and clarity

4. **Decompose Mode**
   - Breaks down topics into smaller tasks
   - Creates actionable steps

5. **Brainstorm Mode**
   - Generates related ideas and connections
   - Sparks creativity

6. **Flow Mode**
   - Creates complete study plans
   - Generates nodes with dependencies
   - Works with topics or file content

### RAG Chat System
- Analyzes visible nodes on canvas
- Extracts text content from nodes
- Sends context to AI for accurate responses
- Maintains conversation history

### Auto-Layout Algorithm
- Uses Dagre for hierarchical layouts
- Handles complex graph structures
- Separates connected and isolated nodes
- Centers result in viewport

---

## 🐛 Troubleshooting

### Common Issues

1. **AI not working**
   - Check if API key is set in Settings
   - Verify internet connection
   - Try demo mode (leave API key empty)

2. **Nodes not saving**
   - Check browser console for errors
   - Verify IndexedDB is enabled
   - Try clearing browser cache

3. **File upload not working**
   - Ensure file is in supported format (TXT, MD, PDF)
   - Check file size (large files may timeout)
   - For PDFs, ensure text is extractable

4. **Layout issues**
   - Use "Magic Organize" to reset layout
   - Check for disconnected nodes
   - Try "Fit to View" to center content

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain type safety
- Add comments for complex logic
- Test features before submitting

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **Google Gemini API** for AI capabilities
- **Dagre** for graph layout algorithms
- **Lucide** for beautiful icons
- **React** and **Vite** communities

---

## 📧 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

<div align="center">

**Built with ❤️ for learners and educators**

</div>

