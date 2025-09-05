import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Heart, Sparkles, BookOpen, Lightbulb } from 'lucide-react';

// Types for the chat system
interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  mood?: string;
  tags?: string[];
}

// Google Gemini API configuration (replace with your actual API key)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ' ';
const GEMINI_API_URL = ' ';

// Journaling prompts for inspiration
const JOURNALING_PROMPTS = [
  "What's something that made you smile today?",
  "Describe a challenge you faced and how you handled it.",
  "What are you grateful for right now?",
  "What's a goal you're working towards?",
  "Describe a person who has influenced you positively.",
  "What's something you learned about yourself recently?",
  "What would you tell your younger self?",
  "Describe your ideal day from start to finish.",
  "What's a skill you'd like to develop?",
  "What brings you peace and calm?",
  "Describe a moment when you felt proud of yourself.",
  "What's something you're looking forward to?",
  "What's a book, movie, or song that resonated with you?",
  "Describe a place that feels like home to you.",
  "What's something you've overcome that made you stronger?"
];

// Motivational responses for the bot
const MOTIVATIONAL_RESPONSES = [
  "That's wonderful! Thank you for sharing that with me.",
  "I'm so glad you're taking time to reflect on this.",
  "Your thoughts and feelings are so important.",
  "You're doing amazing work with your self-reflection.",
  "I appreciate you opening up about this.",
  "Your journey of self-discovery is inspiring.",
  "Keep writing - you're building something beautiful.",
  "Your words have power and meaning.",
  "Thank you for trusting me with your thoughts.",
  "You're creating a wonderful record of your life."
];

const BuddyJournalBot: React.FC = () => {
  // State management
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi there! I'm Buddy, your friendly journaling companion! 🌟 I'm here to help you explore your thoughts, celebrate your wins, and support your daily writing practice. What's on your mind today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [showPrompts, setShowPrompts] = useState(false);

  // Refs for auto-scroll and focus
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Generate a response using Google Gemini API (or fallback to local responses)
  const generateBotResponse = async (userMessage: string): Promise<string> => {
    try {
      // Try Gemini API first
      if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your-api-key-here') {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Buddy, a friendly, empathetic journaling assistant. Your role is to:
                    - Provide warm, encouraging responses to journal entries
                    - Ask thoughtful follow-up questions to help users explore their thoughts deeper
                    - Offer positive reinforcement and validation
                    - Suggest journaling prompts when appropriate
                    - NEVER give clinical advice, medical diagnoses, or therapy recommendations
                    - Focus exclusively on supporting healthy journaling and self-reflection
                    - Keep responses conversational, warm, and under 100 words
                    - Use emojis occasionally to keep the tone friendly
                    
                    User's journal entry: ${userMessage}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 150,
              topP: 0.8,
              topK: 40
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          return data.candidates?.[0]?.content?.parts?.[0]?.text || generateFallbackResponse(userMessage);
        }
      }
    } catch (error) {
      console.log('Gemini API not available, using fallback responses');
    }

    // Fallback to local response generation
    return generateFallbackResponse(userMessage);
  };

  // Generate fallback responses when OpenAI is not available
  const generateFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for common patterns and respond appropriately
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm so happy to see you today! 🌟 How are you feeling?";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('upset')) {
      return "I hear you, and it's okay to feel this way. 💙 Writing about difficult emotions can be really healing. Would you like to tell me more about what's happening?";
    }
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('excited') || lowerMessage.includes('good')) {
      return "That's wonderful! 🎉 I love hearing about your positive moments. What made today special for you?";
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
      return "Stress and worry are completely normal parts of life. 🌱 Taking time to write about them can help you process and understand them better. What's on your mind?";
    }
    
    if (lowerMessage.includes('goal') || lowerMessage.includes('dream') || lowerMessage.includes('want')) {
      return "Having goals and dreams is so important! ✨ Tell me more about what you're working towards. I'd love to hear your vision!";
    }
    
    // Default encouraging response
    const randomResponse = MOTIVATIONAL_RESPONSES[Math.floor(Math.random() * MOTIVATIONAL_RESPONSES.length)];
    const followUpQuestions = [
      "What else would you like to explore today?",
      "How does writing about this make you feel?",
      "Is there anything else on your mind?",
      "What would you like to focus on next?"
    ];
    const randomQuestion = followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
    
    return `${randomResponse} ${randomQuestion}`;
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    
    // Save to journal entries
    const journalEntry: JournalEntry = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      timestamp: new Date(),
      tags: extractTags(inputValue.trim())
    };
    setJournalEntries(prev => [...prev, journalEntry]);

    // Clear input and show typing indicator
    setInputValue('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: ChatMessage = {
      id: 'typing',
      type: 'bot',
      content: 'Buddy is thinking...',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    // Generate bot response
    const botResponse = await generateBotResponse(userMessage.content);
    
    // Remove typing indicator and add bot response
    setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
    
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  // Extract potential tags from user input
  const extractTags = (content: string): string[] => {
    const commonTags = ['gratitude', 'goals', 'reflection', 'challenges', 'achievements', 'relationships', 'work', 'health', 'creativity', 'learning'];
    const lowerContent = content.toLowerCase();
    return commonTags.filter(tag => lowerContent.includes(tag));
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get a random journaling prompt
  const getRandomPrompt = () => {
    return JOURNALING_PROMPTS[Math.floor(Math.random() * JOURNALING_PROMPTS.length)];
  };

  // Handle prompt selection
  const handlePromptSelect = (prompt: string) => {
    setInputValue(prompt);
    setShowPrompts(false);
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Buddy JournalBot</h1>
            <p className="text-teal-100">Your friendly journaling companion</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="h-96 overflow-y-auto p-6 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Heart className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-teal-500 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
                }`}
              >
                {message.isTyping ? (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{message.content}</p>
                )}
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-teal-100' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Section */}
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setShowPrompts(!showPrompts)}
                className="flex items-center space-x-2 text-sm text-teal-600 hover:text-teal-700 transition-colors"
              >
                <Lightbulb className="h-4 w-4" />
                <span>Get inspired</span>
              </button>
              
              <div className="text-xs text-gray-400">
                {journalEntries.length} entries today
              </div>
            </div>
            
            {/* Journaling Prompts */}
            {showPrompts && (
              <div className="mb-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
                <p className="text-sm text-teal-800 mb-2 font-medium">Journaling prompts to get you started:</p>
                <div className="grid grid-cols-1 gap-2">
                  {JOURNALING_PROMPTS.slice(0, 5).map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptSelect(prompt)}
                      className="text-left text-sm text-teal-700 hover:text-teal-800 hover:bg-teal-100 p-2 rounded transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What's on your mind today? Share your thoughts, feelings, or experiences..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white p-3 rounded-lg transition-colors duration-200 flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <button
              onClick={() => setShowPrompts(!showPrompts)}
              className="flex items-center space-x-1 hover:text-teal-600 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Prompts</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1 hover:text-teal-600 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Print Journal</span>
            </button>
          </div>
          
          <div className="text-xs text-gray-400">
            Powered by Google Gemini • Your privacy is protected
          </div>
        </div>
      </div>

      {/* Journal Summary (Collapsible) */}
      {journalEntries.length > 0 && (
        <div className="border-t border-gray-100 bg-gray-50 p-4">
          <details className="group">
            <summary className="cursor-pointer flex items-center justify-between text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
              <span>Today's Journal Entries ({journalEntries.length})</span>
              <div className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform">
                ▼
              </div>
            </summary>
            <div className="mt-3 space-y-2">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="bg-white p-3 rounded-lg border border-gray-200 text-sm">
                  <p className="text-gray-800 mb-2">{entry.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex space-x-1">
                        {entry.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default BuddyJournalBot;

