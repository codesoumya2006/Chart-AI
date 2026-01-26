import React, { useRef, useState } from 'react';
import { Settings, BookOpen, Wand2, Sparkles, UploadCloud, FileText, AlertTriangle, Key } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  apiKey: string;
  onApiKeyChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  apiKey,
  onApiKeyChange,
  onSave,
  onClose
}) => {
  const { theme } = useTheme();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm">
      <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-300'} border p-6 rounded-lg w-96 shadow-xl`}>
        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <Settings className="w-5 h-5" /> Settings
        </h2>
        <div className="mb-4">
          <label htmlFor="settingsGeminiApiKey" className={`block text-sm mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Google Gemini API Key</label>
          <input 
            id="settingsGeminiApiKey"
            name="geminiApiKey"
            type="password" 
            className={`w-full rounded p-2 text-sm focus:outline-none focus:border-blue-500 border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-300'}`}
            placeholder="Paste your Gemini API key here" 
            value={apiKey} 
            onChange={(e) => onApiKeyChange(e.target.value)} 
          />
          <div className={`text-xs mt-3 p-2 rounded ${theme === 'dark' ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
            <p className="font-semibold mb-1">🔒 Privacy & Security:</p>
            <ul className="text-xs space-y-1 ml-4 list-disc">
              <li>Your API key is stored <strong>only in your browser's localStorage</strong></li>
              <li>Never shared with any server or other users</li>
              <li>Never committed to GitHub or version control</li>
              <li>You can update or remove it anytime</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose} 
            className={`px-3 py-1.5 text-sm rounded ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-200'}`}
          >
            Cancel
          </button>
          <button 
            onClick={onSave} 
            className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 rounded font-medium text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

interface TopicModalProps {
  isOpen: boolean;
  topicInput: string;
  onTopicInputChange: (value: string) => void;
  onGenerate: () => void;
  onClose: () => void;
  isLoading: boolean;
  onFileUpload: (file: File) => void;
  fileName: string | null;
}

export const TopicModal: React.FC<TopicModalProps> = ({
  isOpen,
  topicInput,
  onTopicInputChange,
  onGenerate,
  onClose,
  isLoading,
  onFileUpload,
  fileName
}) => {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm">
      <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-300'} border p-6 rounded-lg w-[480px] shadow-2xl`}>
        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
          <BookOpen className="w-5 h-5" /> Create Study Plan
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="topicInput" className={`text-xs uppercase font-semibold mb-1 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>By Topic</label>
            <textarea 
              id="topicInput"
              name="topicInput"
              className={`w-full rounded p-3 text-sm focus:outline-none focus:border-purple-500 border min-h-[80px] ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-300'}`}
              placeholder="E.g., Quantum Mechanics, History of Rome..." 
              value={topicInput} 
              onChange={(e) => onTopicInputChange(e.target.value)} 
            />
          </div>

          <div className="flex items-center gap-2">
            <div className={`h-px flex-1 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-300'}`}></div>
            <span className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'}`}>OR BY FILE</span>
            <div className={`h-px flex-1 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-300'}`}></div>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              fileName 
                ? theme === 'dark' 
                  ? 'border-purple-500/50 bg-purple-500/10' 
                  : 'border-purple-400/50 bg-purple-100'
                : theme === 'dark'
                  ? 'border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100'
            }`}
          >
            <input 
              id="topicFileInput"
              name="topicFile"
              ref={fileInputRef}
              type="file" 
              accept=".pdf,.txt,.md" 
              className="hidden" 
              onChange={(e) => e.target.files?.[0] && onFileUpload(e.target.files[0])}
              aria-label="Upload file for topic"
            />
            {fileName ? (
              <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`}>
                <FileText size={20} />
                <span className="text-sm font-medium truncate max-w-[300px]">{fileName}</span>
              </div>
            ) : (
              <div className={`flex flex-col items-center gap-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                <UploadCloud size={24} />
                <span className="text-xs">Upload PDF or Text file</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button 
            onClick={onClose} 
            className="px-3 py-1.5 text-sm hover:bg-zinc-800 rounded text-zinc-300"
          >
            Cancel
          </button>
          <button 
            onClick={onGenerate} 
            disabled={(!topicInput.trim() && !fileName) || isLoading} 
            className="px-4 py-1.5 text-sm bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded font-medium flex items-center gap-2 text-white"
          >
            {isLoading ? 'Generating...' : 'Generate Plan'} <Wand2 size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
};

interface LoadingOverlayProps {
  isVisible: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-indigo-900/80 backdrop-blur text-indigo-100 px-4 py-2 rounded-full text-sm font-medium z-[100] animate-pulse shadow-lg flex items-center gap-2">
      <Sparkles size={16} /> AI Thinking...
    </div>
  );
};

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'warning'
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: 'text-red-500',
      button: 'bg-red-600 hover:bg-red-500',
      border: 'border-red-500/30'
    },
    warning: {
      icon: 'text-amber-500',
      button: 'bg-amber-600 hover:bg-amber-500',
      border: 'border-amber-500/30'
    },
    info: {
      icon: 'text-blue-500',
      button: 'bg-blue-600 hover:bg-blue-500',
      border: 'border-blue-500/30'
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm">
      <div className={`bg-zinc-900 border ${styles.border} p-6 rounded-lg w-[400px] shadow-2xl`}>
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className={`w-6 h-6 ${styles.icon} shrink-0 mt-0.5`} />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-sm text-zinc-400">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button 
            onClick={onCancel} 
            className="px-4 py-2 text-sm hover:bg-zinc-800 rounded text-zinc-300 transition-colors"
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm} 
            className={`px-4 py-2 text-sm ${styles.button} rounded font-medium text-white transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

interface AddGeminiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddKey: (key: string) => void;
}

export const AddGeminiKeyModal: React.FC<AddGeminiKeyModalProps> = ({
  isOpen,
  onClose,
  onAddKey
}) => {
  const { theme } = useTheme();
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const trimmedKey = apiKeyInput.trim();
    if (!trimmedKey) return;

    setIsValidating(true);
    try {
      // Basic validation that the key looks like a Gemini API key
      if (trimmedKey.length < 20) {
        alert('API key appears too short. Please check your key.');
        setIsValidating(false);
        return;
      }

      onAddKey(trimmedKey);
      setApiKeyInput('');
    } catch {
      alert('Failed to add API key.');
      setIsValidating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm">
      <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-300'} border p-6 rounded-lg w-[500px] shadow-2xl`}>
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-yellow-500" />
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Add Your Gemini API Key
          </h2>
        </div>

        <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
          You need to provide your own Google Gemini API key to use AI features. Each user must add their own key.
        </p>

        <div className={`p-3 rounded mb-4 ${theme === 'dark' ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
          <p className="text-xs font-semibold mb-2">📚 How to get your API key:</p>
          <ol className="text-xs space-y-1 ml-4 list-decimal">
            <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Google AI Studio</a></li>
            <li>Sign in with your Google account</li>
            <li>Click "Create API Key" in the new project</li>
            <li>Copy the key and paste it below</li>
          </ol>
        </div>

        <input
          id="addGeminiApiKey"
          name="geminiApiKey"
          type="password"
          className={`w-full rounded p-3 text-sm focus:outline-none focus:border-blue-500 border mb-4 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-300'}`}
          placeholder="Paste your Gemini API key here"
          value={apiKeyInput}
          onChange={(e) => setApiKeyInput(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
          disabled={isValidating}
          aria-label="Google Gemini API Key"
        />

        <div className={`p-3 rounded mb-4 text-xs ${theme === 'dark' ? 'bg-green-500/10 text-green-300' : 'bg-green-100 text-green-800'}`}>
          <p className="font-semibold mb-1">🔒 Your privacy is protected:</p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>Your key is stored <strong>only in your browser</strong> (localStorage)</li>
            <li>Never sent to any server or database</li>
            <li>Never shared with other users</li>
            <li>You're the only one who can see it</li>
          </ul>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isValidating}
            className={`px-4 py-2 text-sm rounded transition-colors ${
              theme === 'dark'
                ? 'hover:bg-zinc-800 text-zinc-300'
                : 'hover:bg-gray-200 text-gray-700'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!apiKeyInput.trim() || isValidating}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded font-medium text-white transition-colors"
          >
            {isValidating ? 'Adding...' : 'Add Key'}
          </button>
        </div>
      </div>
    </div>
  );
};