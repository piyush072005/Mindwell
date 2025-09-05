import React from 'react';
import BuddyJournalBot from './BuddyJournalBot';

const BuddyJournalBotDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-teal-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">
            Meet Buddy JournalBot
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your friendly AI-powered journaling companion that helps you explore your thoughts, 
            celebrate your wins, and build a meaningful daily writing practice.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100 shadow-sm">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Conversational AI</h3>
            <p className="text-gray-600 text-sm">
              Buddy responds with empathy and encouragement, making journaling feel like talking to a supportive friend.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100 shadow-sm">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Prompts</h3>
            <p className="text-gray-600 text-sm">
              Get inspired with thoughtful journaling prompts designed to spark reflection and self-discovery.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100 shadow-sm">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Privacy First</h3>
            <p className="text-gray-600 text-sm">
              Your journal entries are stored locally and never shared. Your thoughts stay private and secure.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-teal-100 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Start Writing</h3>
              <p className="text-sm text-gray-600">
                Share your thoughts, feelings, or experiences in the chat interface.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Get Response</h3>
              <p className="text-sm text-gray-600">
                Buddy provides encouraging feedback and thoughtful follow-up questions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Explore Deeper</h3>
              <p className="text-sm text-gray-600">
                Use prompts and follow-up questions to dive deeper into your thoughts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                4
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Build Habit</h3>
              <p className="text-sm text-gray-600">
                Develop a consistent journaling practice with daily encouragement.
              </p>
            </div>
          </div>
        </div>

        {/* Buddy JournalBot Component */}
        <div className="mb-12">
          <BuddyJournalBot />
        </div>

        {/* Benefits Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-teal-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Benefits of Journaling with Buddy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Emotional Processing</h4>
                  <p className="text-sm text-gray-600">
                    Writing helps you process emotions and gain clarity on your thoughts and feelings.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Self-Discovery</h4>
                  <p className="text-sm text-gray-600">
                    Discover patterns, insights, and personal growth through regular reflection.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Stress Reduction</h4>
                  <p className="text-sm text-gray-600">
                    Journaling can reduce stress and anxiety by providing an outlet for your thoughts.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Goal Setting</h4>
                  <p className="text-sm text-gray-600">
                    Clarify your goals and track progress toward achieving them.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Memory Preservation</h4>
                  <p className="text-sm text-gray-600">
                    Create a lasting record of your life experiences and personal growth.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Confidence Building</h4>
                  <p className="text-sm text-gray-600">
                    Build self-confidence by recognizing your achievements and progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12">
          <p>
            Buddy JournalBot is designed to support healthy journaling practices and is not a substitute for professional mental health care.
          </p>
          <p className="mt-2">
            If you're experiencing a mental health crisis, please contact a mental health professional or call your local crisis hotline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuddyJournalBotDemo;
