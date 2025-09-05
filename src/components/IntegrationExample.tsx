import React from 'react';
import BuddyJournalBot from './BuddyJournalBot';

// Example of how to integrate BuddyJournalBot into your existing App.tsx
const IntegrationExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50">
      {/* Your existing navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-800">MindWell</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Home</span>
              <span className="text-gray-600">Assessment</span>
              <span className="text-gray-600">Journal</span>
              <span className="text-gray-600">Support</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Daily Journaling with Buddy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take a moment to reflect on your day, explore your thoughts, and build a meaningful writing practice 
              with your friendly AI companion.
            </p>
          </div>

          {/* Buddy JournalBot Component */}
          <BuddyJournalBot />
        </div>
      </div>
    </div>
  );
};

export default IntegrationExample;
