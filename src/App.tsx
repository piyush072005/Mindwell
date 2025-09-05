import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Heart, Brain, Users, BookOpen, Menu, X, MessageCircle, ChevronRight, AlertCircle, CheckCircle2, HelpCircle, Smile, Frown, Meh, TrendingUp, BarChart3, PenTool, Send, CheckSquare, Square, Plus, Quote, Trash2, LogIn, LogOut, Phone, CalendarDays, Flame, ListChecks, User as UserIcon } from 'lucide-react';
import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';
import BuddyJournalBot from './components/BuddyJournalBot';

// Components
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    setIsLoggingOut(true);
    
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear any local storage or session data
      localStorage.removeItem('user');
      sessionStorage.clear();
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Still redirect to login page even if there's an error
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-10 w-10 text-teal-600" />
              <span className="text-xl font-semibold text-gray-800">MindWell</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Link to="/" className=" text-teal-700 px-3 py-2 rounded-lg font-medium">HOME</Link>
            <Link to="/assessment" className="text-gray-600 hover:text-teal-600 px-3 py-2 font-medium">SELF ASSESSMENT</Link>
            <Link to="/insights" className="text-gray-600 hover:text-teal-600 px-3 py-2 font-medium">INSIGHTS</Link>
            <Link to="/support" className="text-gray-600 hover:text-teal-600 px-3 py-2 font-medium">HELP ME MODE</Link>
            <Link to="/moodgoals" className="text-gray-600 hover:text-teal-600 px-3 py-2 font-medium">MOOD GOALS</Link>
            <Link to="/journal" className="text-gray-600 hover:text-teal-600 px-3 py-2 font-medium">SANA-YourAI-Buddy</Link>
          </div>

          {/* Profile & Login Section */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 px-3 py-2 font-medium transition-colors">
              <UserIcon className="h-5 w-5" />
              <span>PROFILE</span>
            </Link>
            <Link to="/login" className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <LogIn className="h-5 w-5" />
              <span>LOGIN</span>
            </Link>
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 px-3 py-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className={`h-5 w-5 ${isLoggingOut ? 'animate-spin' : ''}`} />
              <span>{isLoggingOut ? 'LOGGING OUT...' : 'LOGOUT'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium bg-teal-100 text-teal-700">HOME</Link>
            <Link to="/assessment" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600">SELF ASSESSMENT</Link>
            <Link to="/moodgoals" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600">MOOD GOALS</Link>
            <Link to="/insights" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600">INSIGHTS</Link>
            <Link to="/support" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600">HELP ME MODE</Link>
            <Link to="/journal" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600">SANA</Link>
            
            {/* Mobile Profile & Login */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <Link to="/profile" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-teal-600">
                <UserIcon className="h-5 w-5" />
                <span>PROFILE</span>
              </Link>
              <Link to="/login" className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium bg-teal-600 text-white hover:bg-teal-700 mt-2">
                <LogIn className="h-5 w-5" />
                <span>LOGIN</span>
              </Link>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className={`h-5 w-5 ${isLoggingOut ? 'animate-spin' : ''}`} />
                <span>{isLoggingOut ? 'LOGGING OUT...' : 'LOGOUT'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-teal-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-teal-800 leading-tight">
                MENTAL HEALTH
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-teal-600">
                Your Journey to Mental Wellness
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              
            </p>
            
          
          </div>
          
          {/* Right Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80">
              {/* Human Head Silhouette */}
              <div className="absolute inset-0">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Head outline */}
                  <path
                    d="M100 20 C 60 20, 30 50, 30 100 C 30 150, 60 180, 100 180 C 140 180, 170 150, 170 100 C 170 50, 140 20, 100 20 Z"
                    fill="#0f766e"
                    className="drop-shadow-lg"
                  />
                  
                  {/* Brain */}
                  <circle cx="100" cy="100" r="35" fill="#f43f5e" stroke="#0ea5e9" strokeWidth="3" />
                  
                  {/* Brain details */}
                  <path d="M85 90 Q 100 85, 115 90" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                  <path d="M85 100 Q 100 95, 115 100" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                  <path d="M85 110 Q 100 105, 115 110" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                </svg>
              </div>
              
              {/* Gears */}
              <div className="absolute -top-4 -left-4 w-16 h-16">
                <svg viewBox="0 0 64 64" className="w-full h-full">
                  <circle cx="32" cy="32" r="30" fill="#0f766e" />
                  <circle cx="32" cy="32" r="25" fill="#0f766e" />
                  <circle cx="32" cy="32" r="20" fill="#0f766e" />
                  <circle cx="32" cy="32" r="15" fill="#0f766e" />
                  <circle cx="32" cy="32" r="10" fill="#0f766e" />
                  <circle cx="32" cy="32" r="5" fill="#0f766e" />
                </svg>
              </div>
              
              <div className="absolute -top-2 -right-2 w-12 h-12">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <circle cx="24" cy="24" r="22" fill="#0f766e" />
                  <circle cx="24" cy="24" r="18" fill="#0f766e" />
                  <circle cx="24" cy="24" r="14" fill="#0f766e" />
                  <circle cx="24" cy="24" r="10" fill="#0f766e" />
                  <circle cx="24" cy="32" r="6" fill="#0f766e" />
                </svg>
              </div>
              
              <div className="absolute top-16 -right-4 w-10 h-10">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <circle cx="20" cy="20" r="18" fill="#0f766e" />
                  <circle cx="20" cy="20" r="14" fill="#0f766e" />
                  <circle cx="20" cy="20" r="10" fill="#0f766e" />
                  <circle cx="20" cy="20" r="6" fill="#0f766e" />
                </svg>
              </div>
              
              {/* Hearts */}
              <div className="absolute -top-8 left-20 w-8 h-8">
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <path d="M16 28 C 12 24, 4 16, 4 10 C 4 6, 6 4, 10 4 C 12 4, 14 5, 16 8 C 18 5, 20 4, 22 4 C 26 4, 28 6, 28 10 C 28 16, 20 24, 16 28 Z" fill="white" stroke="#ef4444" strokeWidth="2" />
                </svg>
              </div>
              
              <div className="absolute top-24 -left-2 w-6 h-6">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path d="M12 21 C 9 18, 3 12, 3 7.5 C 3 5.5, 4.5 3, 7.5 3 C 9 3, 10.5 3.75, 12 6 C 13.5 3.75, 15 3, 16.5 3 C 19.5 3, 21 5.5, 21 7.5 C 21 12, 15 18, 12 21 Z" fill="white" stroke="#ef4444" strokeWidth="1.5" />
                </svg>
              </div>
              
              {/* Plus Signs */}
              <div className="absolute top-8 right-16 w-6 h-6">
                <div className="w-full h-full bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">+</span>
                </div>
              </div>
              
              <div className="absolute bottom-16 left-8 w-5 h-5">
                <div className="w-full h-full bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">+</span>
                </div>
              </div>
              
              <div className="absolute top-32 right-8 w-4 h-4">
                <div className="w-full h-full bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">+</span>
                </div>
              </div>
              
              {/* Stars/Sparkles */}
              <div className="absolute bottom-8 right-12 w-3 h-3">
                <svg viewBox="0 0 12 12" className="w-full h-full">
                  <polygon points="6,1 7,4 10,4 7.5,6.5 8.5,9.5 6,7.5 3.5,9.5 4.5,6.5 2,4 5,4" fill="#f97316" />
                </svg>
              </div>
              
              <div className="absolute bottom-16 right-20 w-2 h-2">
                <svg viewBox="0 0 8 8" className="w-full h-full">
                  <polygon points="4,0.5 4.5,2.5 6.5,2.5 5,3.5 5.5,5.5 4,4.5 2.5,5.5 3,3.5 1.5,2.5 3.5,2.5" fill="#f97316" />
                </svg>
              </div>
              
              {/* Foliage/Organic Shapes */}
              <div className="absolute -bottom-4 right-0 w-20 h-16">
                <svg viewBox="0 0 80 64" className="w-full h-full">
                  <path d="M0 64 Q 20 40, 40 64 Q 60 40, 80 64" fill="#0f766e" />
                  <path d="M10 64 Q 25 50, 40 64 Q 55 50, 70 64" fill="#0ea5e9" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Quote Rotator Section */}
      <QuoteRotator />
      
      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive mental health support designed to help you on your wellness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl border border-teal-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Self Assessment</h3>
              <p className="text-gray-600 mb-6">
                Take our comprehensive mood assessments to understand your mental health patterns and get personalized insights.
              </p>
              <Link to="/assessment" className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700">
                Learn More <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mood Goals</h3>
              <p className="text-gray-600 mb-6">
                Set personalized emotional goals and receive gentle, supportive nudges to help you achieve them.
              </p>
              <Link to="/moodgoals" className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700">
                Set Goals <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Support Groups</h3>
              <p className="text-gray-600 mb-6">
                Connect with others who understand your journey in our moderated, safe, and supportive community spaces.
              </p>
              <Link to="/support" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                Join Now <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl border border-teal-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Insights & Analytics</h3>
              <p className="text-gray-600 mb-6">
                Track your progress, identify patterns, and gain valuable insights into your mental health journey.
              </p>
              <Link to="/insights" className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700">
                View Insights <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of others who have taken the first step towards better mental health
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment" className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
              Take Assessment
            </Link>
            <Link to="/support" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:scale-105">
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon: Icon, to }: {
  title: string;
  description: string;
  icon: React.ElementType;
  to: string;
}) => {
  
  return (
  <Link
    to={to}
    className="card-3d p-6 floating"
  >
    <div className="card-3d-content">
      <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4 card-3d-icon">
        <Icon className="h-6 w-6 text-teal-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 depth-1">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  </Link>
  );
};

const SelfAssessment = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [suggestedActivities, setSuggestedActivities] = useState<Array<{ id: string, text: string }>>([]);
  

  const moods = [
    {
      id: 'happy',
      label: 'Happy',
      icon: Smile,
      color: 'text-green-500',
      bg: 'bg-green-50',
      border: 'border-green-200',
      description: 'Feeling positive and upbeat'
    },
    {
      id: 'sad',
      label: 'Sad',
      icon: Frown,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      description: 'Feeling down or melancholy'
    },
    {
      id: 'anxious',
      label: 'Anxious',
      icon: AlertCircle,
      color: 'text-red-500',
      bg: 'bg-red-50',
      border: 'border-red-200',
      description: 'Feeling worried or nervous'
    },
    {
      id: 'neutral',
      label: 'Neutral',
      icon: Meh,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      description: 'Feeling balanced or okay'
    }
  ];

  const getQuestionsForMood = (mood: string) => {
    const questionSets = {
      happy: [
        {
          text: "What's contributing most to your positive mood today?",
          options: [
            "Personal achievements or success",
            "Quality time with loved ones",
            "Physical activity or exercise",
            "Creative activities or hobbies"
          ]
        },
        {
          text: "How would you like to maintain this positive energy?",
          options: [
            "Share it with others",
            "Use it for productive activities",
            "Practice gratitude",
            "Plan future positive experiences"
          ]
        },
        {
          text: "On a scale of energy, how do you feel right now?",
          options: [
            "Very energetic and motivated",
            "Moderately energetic",
            "Calm but positive",
            "Content but relaxed"
          ]
        },
        {
          text: "What aspect of your life feels most fulfilling today?",
          options: [
            "Work or career progress",
            "Relationships and connections",
            "Personal growth and learning",
            "Health and wellbeing"
          ]
        }
      ],
      sad: [
        {
          text: "What's the main source of your sadness today?",
          options: [
            "Personal loss or disappointment",
            "Relationship difficulties",
            "Work or academic stress",
            "General feeling of emptiness"
          ]
        },
        {
          text: "How long have you been feeling this way?",
          options: [
            "Just today",
            "A few days",
            "About a week",
            "More than a week"
          ]
        },
        {
          text: "What usually helps you when you feel sad?",
          options: [
            "Talking to someone I trust",
            "Engaging in self-care activities",
            "Physical exercise or movement",
            "Creative expression or journaling"
          ]
        },
        {
          text: "How is this affecting your daily activities?",
          options: [
            "Not affecting them much",
            "Making some tasks harder",
            "Significantly impacting my routine",
            "Making it hard to do basic tasks"
          ]
        }
      ],
      anxious: [
        {
          text: "What's triggering your anxiety today?",
          options: [
            "Upcoming events or deadlines",
            "Social situations or interactions",
            "Health or safety concerns",
            "Uncertain or unknown situations"
          ]
        },
        {
          text: "How are you experiencing this anxiety physically?",
          options: [
            "Rapid heartbeat or breathing",
            "Muscle tension or restlessness",
            "Stomach discomfort or nausea",
            "Fatigue or difficulty concentrating"
          ]
        },
        {
          text: "What coping strategies have you tried today?",
          options: [
            "Deep breathing or meditation",
            "Physical exercise or movement",
            "Talking to someone supportive",
            "Distraction activities"
          ]
        },
        {
          text: "How manageable does your anxiety feel right now?",
          options: [
            "Very manageable with my usual strategies",
            "Somewhat manageable but challenging",
            "Difficult to manage on my own",
            "Overwhelming and hard to control"
          ]
        }
      ],
      neutral: [
        {
          text: "How would you describe your neutral mood today?",
          options: [
            "Calm and balanced",
            "Neither happy nor sad, just okay",
            "Feeling emotionally flat or numb",
            "Stable but lacking energy"
          ]
        },
        {
          text: "What would help you feel more engaged today?",
          options: [
            "Connecting with friends or family",
            "Trying a new activity or hobby",
            "Setting small, achievable goals",
            "Spending time in nature"
          ]
        },
        {
          text: "How satisfied are you with your current routine?",
          options: [
            "Very satisfied, it works well",
            "Mostly satisfied with minor adjustments needed",
            "Somewhat dissatisfied, needs changes",
            "Not satisfied, major changes needed"
          ]
        },
        {
          text: "What aspect of your life would you like to focus on improving?",
          options: [
            "Physical health and fitness",
            "Relationships and social connections",
            "Career or personal development",
            "Mental and emotional wellbeing"
          ]
        }
      ]
    };
    return questionSets[mood as keyof typeof questionSets] || [];
  };

  const handleMoodSelection = (moodId: string) => {
    setSelectedMood(moodId);
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleAnswer = async (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    const questions = getQuestionsForMood(selectedMood!);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save mood data to localStorage
      const today = new Date().toISOString().split('T')[0];
      const savedMoods = JSON.parse(localStorage.getItem('weeklyMoods') || '[]');
      const updatedMoods = savedMoods.filter((m: any) => m.date !== today);
      const score = newAnswers.reduce((sum, answer) => sum + answer, 0);
      updatedMoods.push({
        date: today,
        mood: selectedMood,
        score
      });
      localStorage.setItem('weeklyMoods', JSON.stringify(updatedMoods));

      // Also save to Supabase if available
      try {
        if (supabase) {
          const { data: sessionData } = await supabase.auth.getSession();
          const userId = sessionData.session?.user?.id;
          if (userId) {
            await supabase.from('mood_assessments').insert([
              {
                user_id: userId,
                date: today,
                mood: selectedMood,
                score,
                answers: newAnswers,
                created_at: new Date().toISOString()
              }
            ]);
          }
        }
      } catch {
        // ignore remote save errors to not block UX
      }

      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    const questions = getQuestionsForMood(selectedMood!);
    const maxScore = questions.length * 3;
    const percentage = (total / maxScore) * 100;


    if (selectedMood === 'happy') {
      return {
        level: "Positive Wellbeing",
        icon: CheckCircle2,
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        message: "Great to see you're feeling positive! Let's help you maintain and build on this good mood.",
        recommendations: [
          "Practice gratitude by writing down three things you're thankful for",
          "Share your positive energy with others",
          "Engage in activities that bring you joy",
          "Plan something to look forward to"
        ]
      };
    } else if (selectedMood === 'sad') {
      if (percentage >= 60) {
        return {
          level: "Significant Sadness",
          icon: AlertCircle,
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
          message: "You're going through a difficult time. It's important to reach out for support and be gentle with yourself.",
          recommendations: [
            "Consider speaking with a mental health professional",
            "Reach out to trusted friends or family",
            "Visit our support for community connection",
            "Practice self-compassion and gentle self-care"
          ]
        };
      } else {
        return {
          level: "Mild Sadness",
          icon: HelpCircle,
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
          message: "It's normal to feel sad sometimes. Let's focus on gentle ways to support yourself through this.",
          recommendations: [
            "Engage in activities that usually bring you comfort",
            "Connect with supportive people in your life",
            "Try gentle exercise like walking or stretching",
            "Practice mindfulness or meditation"
          ]
        };
      }
    } else if (selectedMood === 'anxious') {
      if (percentage >= 60) {
        return {
          level: "High Anxiety",
          icon: AlertCircle,
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
          message: "Your anxiety seems quite intense right now. Let's focus on immediate coping strategies and professional support.",
          recommendations: [
            "Practice deep breathing exercises (4-7-8 technique)",
            "Consider speaking with a therapist about anxiety management",
            "Try grounding techniques (5-4-3-2-1 method)",
            "Limit caffeine and practice good sleep hygiene"
          ]
        };
      } else {
        return {
          level: "Manageable Anxiety",
          icon: HelpCircle,
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          message: "You're experiencing some anxiety, but it seems manageable. Let's reinforce your coping strategies.",
          recommendations: [
            "Continue with breathing exercises and mindfulness",
            "Maintain regular exercise and healthy routines",
            "Practice progressive muscle relaxation",
            "Consider joining our anxiety support group"
          ]
        };
      }
    } else { // neutral
      return {
        level: "Balanced State",
        icon: CheckCircle2,
        color: "text-teal-600",
        bg: "bg-teal-100",
        border: "border-teal-300",
        message: "You're in a stable, neutral state. This is a good time to focus on personal growth and building positive habits.",
        recommendations: [
          "Set small, achievable goals for personal growth",
          "Try new activities to discover what brings you joy",
          "Build stronger connections with others",
          "Establish routines that support your wellbeing"
        ]
      };
    }
  };

  const getJournalPrompt = (mood: string) => {
    switch (mood) {
      case 'happy':
        return "Do you want to save this moment in your life? Tell me what made today special for you.";
      case 'sad':
      case 'anxious':
        return "Do you want to tell me what happened with you today? Just tell me about your day - I'm here to listen.";
      case 'neutral':
        return "How was your day today? Feel free to share whatever comes to mind.";
      default:
        return "Tell me about your day.";
    }
  };

  const generateActivitiesFromJournal = (mood: string) => {
    const activities = [];

    if (mood === 'happy') {
      activities.push(
        { id: '1', text: 'Write down 3 things you\'re grateful for today' },
        { id: '2', text: 'Share your positive energy with a friend or family member' },
        { id: '3', text: 'Take a photo or create a memory of this good moment' },
        { id: '4', text: 'Plan something fun for tomorrow to maintain the momentum' }
      );
    } else if (mood === 'sad') {
      activities.push(
        { id: '1', text: 'Practice 5 minutes of deep breathing or meditation' },
        { id: '2', text: 'Reach out to someone you trust for support' },
        { id: '3', text: 'Do one small act of self-care (tea, bath, favorite music)' },
        { id: '4', text: 'Take a gentle walk outside or by a window' }
      );
    } else if (mood === 'anxious') {
      activities.push(
        { id: '1', text: 'Try the 4-7-8 breathing technique (4 in, 7 hold, 8 out)' },
        { id: '2', text: 'Practice the 5-4-3-2-1 grounding technique' },
        { id: '3', text: 'Write down your worries and one small action for each' },
        { id: '4', text: 'Do 10 minutes of gentle stretching or movement' }
      );
    } else {
      activities.push(
        { id: '1', text: 'Set one small, achievable goal for tomorrow' },
        { id: '2', text: 'Try a new activity or hobby for 15 minutes' },
        { id: '3', text: 'Connect with a friend or family member' },
        { id: '4', text: 'Spend 10 minutes in nature or looking outside' }
      );
    }

    return activities;
  };

  const handleJournalSubmit = () => {
    const activities = generateActivitiesFromJournal(selectedMood!);
    setSuggestedActivities(activities);

    // Save activities to localStorage for today
    const today = new Date().toISOString().split('T')[0];
    const activitiesWithCompleted = activities.map(activity => ({
      ...activity,
      completed: false
    }));
    localStorage.setItem(`dailyActivities_${today}`, JSON.stringify(activitiesWithCompleted));

    // Save journal entry
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    journalEntries.push({
      date: today,
      mood: selectedMood,
      entry: journalEntry,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));

    // Save journal entry to Supabase (non-blocking)
    (async () => {
      try {
        if (supabase) {
          const { data: sessionData } = await supabase.auth.getSession();
          const userId = sessionData.session?.user?.id;
          if (userId) {
            await supabase.from('journal_entries').insert([
              {
                user_id: userId,
                date: today,
                mood: selectedMood,
                entry: journalEntry,
                created_at: new Date().toISOString()
              }
            ]);
          }
        }
      } catch {
        // ignore remote save errors to not block UX
      }
    })();

    setShowJournal(false);
  };

  const restartAssessment = () => {
    setSelectedMood(null);
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
    setShowJournal(false);
    setJournalEntry('');
    setSuggestedActivities([]);
  };

  if (!selectedMood) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 depth-2">How are you feeling today?</h1>
            <p className="mt-4 text-lg text-gray-600">
              Select your current mood to get personalized questions and insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {moods.map((mood, index) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelection(mood.id)}
                className={`card-3d p-6 text-center floating hover:scale-110 transition-all duration-300 
                  hover:${(mood.id)} transform-gpu`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  filter: `hue-rotate(${mood.id === 'happy' ? '0deg' : mood.id === 'sad' ? '200deg' : mood.id === 'anxious' ? '350deg' : '60deg'})`
                }}
              >
                <div className={`w-16 h-16 mx-auto rounded-full ${mood.bg} ${mood.border} border-2 flex items-center justify-center mb-4`}>
                  <mood.icon className={`h-8 w-8 ${mood.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{mood.label}</h3>
                <p className="text-sm text-gray-600">{mood.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const questions = getQuestionsForMood(selectedMood);
  const selectedMoodConfig = moods.find(m => m.id === selectedMood)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <selectedMoodConfig.icon className={`h-8 w-8 ${selectedMoodConfig.color} mr-2`} />
            <h1 className="text-3xl font-bold text-gray-800 depth-2">
              {selectedMoodConfig.label} Mood Assessment
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Let's explore your {selectedMoodConfig.label.toLowerCase()} mood with some personalized questions.
          </p>
        </div>

        {!showResults ? (
          <div className="bg-orange-50 rounded-lg shadow-lg p-6 md:p-8 border border-orange-100">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">
                  Question {currentStep + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-teal-600">
                  {Math.round(((currentStep + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-500 rounded-full h-2 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-6 depth-1">
              {questions[currentStep].text}
            </h2>

            <div className="space-y-3">
              {questions[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-4 text-left rounded-lg border border-orange-200 hover:border-teal-400 
                           hover:bg-teal-50 transition-all duration-200 flex items-center justify-between
                           group transform hover:translate-x-2 hover:shadow-md"
                >
                  <span className="text-gray-700 group-hover:text-teal-700">{option}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-teal-600" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setSelectedMood(null)}
              className="mt-6 text-teal-600 hover:text-teal-700 text-sm font-medium"
            >
              ← Change Mood Selection
            </button>
          </div>
        ) : showJournal ? (
          <div className="bg-orange-50 rounded-lg shadow-lg p-6 md:p-8 border border-orange-100">
            <div className="text-center mb-6">
              <PenTool className="h-12 w-12 text-teal-600 mx-auto mb-4 floating" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 depth-1">
                {getJournalPrompt(selectedMood!)}
              </h2>
              <p className="text-gray-600">
                Take a moment to reflect on your day. Your thoughts are private and will help us suggest personalized activities.
              </p>
            </div>

            <div className="mb-6">
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Write about your day here... even a single line is enough."
                className="w-full h-32 p-4 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-teal-400 focus:border-teal-400 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowJournal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-md
                         hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1"
              >
                Skip for Now
              </button>
              <button
                onClick={handleJournalSubmit}
                disabled={journalEntry.trim().length === 0}
                className="flex-1 btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5 mr-2" />
                Continue
              </button>
            </div>
          </div>
        ) : suggestedActivities.length > 0 ? (
          <div className="bg-orange-50 rounded-lg shadow-lg p-6 md:p-8 border border-orange-100">
            <div className="text-center mb-6">
              <CheckCircle2 className="h-12 w-12 text-teal-600 mx-auto mb-4 floating" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 depth-1">
                Your Personalized Activities
              </h2>
              <p className="text-gray-600">
                Based on your mood and reflection, here are some activities to help you today.
                These have been added to your daily checklist on the home page.
              </p>
            </div>

            <div className="mb-6">
              <div className="space-y-3">
                {suggestedActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center p-4 rounded-lg border border-teal-200 bg-teal-100 
                             transform transition-all duration-200 hover:translate-x-2"
                  >
                    <CheckSquare className="h-5 w-5 text-teal-600 mr-3" />
                    <span className="text-gray-700">{activity.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={restartAssessment}
                className="flex-1 px-4 py-2 border border-teal-600 text-teal-600 rounded-md
                         hover:bg-teal-100 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md"
              >
                Take Assessment Again
              </button>
              <Link
                to="/"
                className="flex-1 btn-primary text-center"
              >
                Go to Home & Track Activities
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 rounded-lg shadow-lg p-6 md:p-8 border border-orange-100">
            {(() => {
              const result = calculateResults();
              return (
                <>
                  <div className={`rounded-lg ${result.bg} ${result.border} border p-6 mb-6 transform transition-all duration-300 hover:scale-105`}>
                    <div className="flex items-center mb-4">
                      <result.icon className={`h-6 w-6 ${result.color} mr-2 floating`} />
                      <h2 className={`text-xl font-semibold ${result.color}`}>
                        {result.level}
                      </h2>
                    </div>
                    <p className="text-gray-700">{result.message}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 depth-1">
                      Personalized Recommendations
                    </h3>
                    <ul className="space-y-3">
                      {result.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start transform transition-all duration-200 hover:translate-x-2">
                          <CheckCircle2 className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                          <span className="text-gray-700">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowJournal(true)}
                      className="flex-1 btn-primary flex items-center justify-center"
                    >
                      <PenTool className="h-5 w-5 mr-2" />
                      Continue with Journaling
                    </button>
                    <Link
                      to="/support"
                      className="flex-1 px-4 py-2 border border-teal-600 text-teal-600 rounded-md
                               hover:bg-teal-100 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md text-center"
                    >
                      Join Support
                    </Link>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

const SupportGroups = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 depth-2">Support</h1>
          <p className="mt-4 text-lg text-gray-600">
            Join our moderated support to connect with others who understand your journey.
          </p>
        </div>

        {/* Crisis Banner */}
        <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-red-800">In Crisis?</div>
              <p className="text-sm text-red-700 mt-1">If you're having thoughts of suicide or are in immediate danger, please reach out for help right away.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="tel:988" className="px-3 py-1 rounded-md bg-red-600 text-white text-sm flex items-center gap-2 hover:bg-red-700">
                  <Phone className="h-4 w-4" />
                  Call 988
                </a>
                <a href="sms:741741?&body=HOME" className="px-3 py-1 rounded-md bg-red-100 text-red-700 border border-red-200 text-sm hover:bg-red-200">
                  Text HOME to 741741
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Emergency Support */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-orange-100 shadow-sm">
            <div className="flex items-center gap-2 p-4 border-b border-orange-100">
              <Phone className="h-5 w-5 text-red-600" />
              <h2 className="text-lg font-semibold text-gray-800">Emergency Support</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="rounded-lg border border-orange-100 p-4 bg-orange-50">
                <div className="font-medium text-gray-800">National Suicide Prevention Lifeline</div>
                <div className="text-xs text-gray-500 mt-1">24/7 free and confidential support</div>
                <a href="tel:988" className="mt-3 inline-flex items-center gap-2 text-teal-700 text-sm hover:text-teal-800">
                  <Phone className="h-4 w-4" /> 988
                </a>
              </div>
              <div className="rounded-lg border border-orange-100 p-4 bg-orange-50">
                <div className="font-medium text-gray-800">Crisis Text Line</div>
                <div className="text-xs text-gray-500 mt-1">Text with a crisis counselor</div>
                <a href="sms:741741?&body=HOME" className="mt-3 inline-flex items-center gap-2 text-teal-700 text-sm hover:text-teal-800">
                  <MessageCircle className="h-4 w-4" /> Text HOME to 741741
                </a>
              </div>
            </div>
          </div>

          {/* Mental Health Resources */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-orange-100 shadow-sm">
            <div className="flex items-center gap-2 p-4 border-b border-orange-100">
              <Brain className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Mental Health Resources</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="rounded-lg border border-orange-100 p-4 bg-orange-50">
                <div className="font-medium text-gray-800">National Institute of Mental Health</div>
                <div className="text-xs text-gray-500 mt-1">Comprehensive mental health information</div>
                <a href="https://www.nimh.nih.gov" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-teal-700 text-sm hover:text-teal-800">
                  <BookOpen className="h-4 w-4" /> Visit Website
                </a>
              </div>
              <div className="rounded-lg border border-orange-100 p-4 bg-orange-50">
                <div className="font-medium text-gray-800">Mental Health America</div>
                <div className="text-xs text-gray-500 mt-1">Resources, screening tools, and support</div>
                <a href="https://www.mhanational.org" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-teal-700 text-sm hover:text-teal-800">
                  <BookOpen className="h-4 w-4" /> Visit Website
                </a>
              </div>
            </div>
          </div>

          {/* Therapy & Counseling */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-orange-100 shadow-sm">
            <div className="flex items-center gap-2 p-4 border-b border-orange-100">
              <MessageCircle className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">Therapy & Counseling</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="rounded-lg border border-orange-100 p-4 bg-orange-50">
                <div className="font-medium text-gray-800">Psychology Today</div>
                <div className="text-xs text-gray-500 mt-1">Find therapists in your area</div>
                <a href="https://www.psychologytoday.com" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-teal-700 text-sm hover:text-teal-800">
                  <BookOpen className="h-4 w-4" /> Visit Website
                </a>
              </div>
              <div className="rounded-lg border border-orange-100 p-4 bg-orange-50">
                <div className="font-medium text-gray-800">BetterHelp</div>
                <div className="text-xs text-gray-500 mt-1">Online therapy platform</div>
                <a href="https://www.betterhelp.com" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-teal-700 text-sm hover:text-teal-800">
                  <BookOpen className="h-4 w-4" /> Visit Website
                </a>
              </div>
            </div>
          </div>

          {/* Wellness Apps */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-orange-100 shadow-sm">
            <div className="flex items-center gap-2 p-4 border-b border-orange-100">
              <Heart className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-800">Wellness Apps</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="rounded-lg border border-orange-100 p-4 bg-orange-50">
                <div className="font-medium text-gray-800">Headspace</div>
                <div className="text-xs text-gray-500 mt-1">Meditation and mindfulness</div>
                <a href="https://www.headspace.com" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-teal-700 text-sm hover:text-teal-800">
                  <BookOpen className="h-4 w-4" /> Visit Website
                </a>
              </div>
              <div className="rounded-lg border border-orange-100 p-4 bg-orange-50">
                <div className="font-medium text-gray-800">Calm</div>
                <div className="text-xs text-gray-500 mt-1">Sleep stories, meditation, relaxation</div>
                <a href="https://www.calm.com" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-teal-700 text-sm hover:text-teal-800">
                  <BookOpen className="h-4 w-4" /> Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>

        

        {selectedGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-orange-50 rounded-lg p-6 max-w-md w-full transform transition-all duration-300 scale-100 rotate-0 hover:rotate-0 border border-orange-100">
              <h3 className="text-xl font-semibold mb-4 depth-1 text-gray-800">Join Support Group</h3>
              <p className="text-gray-600 mb-6">
                By joining this group, you agree to maintain confidentiality and follow our community guidelines.
                All sessions are moderated by licensed professionals.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 btn-primary"
                  onClick={() => {
                    // Handle join logic here
                    setSelectedGroup(null);
                  }}
                >
                  Confirm Join
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Insights = () => {
  // Pull from localStorage as a basic example; in a real app we'd request from backend
  const weeklyMoods = JSON.parse(localStorage.getItem('weeklyMoods') || '[]') as Array<{ date: string; mood: string; score: number }>;

  const totalEntries = weeklyMoods.length;
  const last7 = weeklyMoods.slice(-7);
  const weekAvg = last7.length ? (last7.reduce((s, m) => s + (m.score ?? 0), 0) / (last7.length * 3)).toFixed(1) : '0.0';
  const trackingDays = new Set(weeklyMoods.map(m => m.date)).size;
  const streak = (() => {
    // naive streak over daily entries
    let count = 0;
    let day = new Date();
    for (;;) {
      const iso = day.toISOString().split('T')[0];
      if (weeklyMoods.some(m => m.date === iso)) {
        count += 1;
        day.setDate(day.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  })();

  const moodCounts: Record<string, number> = weeklyMoods.reduce((acc: Record<string, number>, m) => {
    acc[m.mood] = (acc[m.mood] || 0) + 1;
    return acc;
  }, {});
  const moods = ['happy', 'neutral', 'anxious', 'sad'];
  const totalForPct = weeklyMoods.length || 1;

  // For the trend line, just sample last 4 points (or pad)
  const trend = (() => {
    const points = weeklyMoods.slice(-4).map(m => Math.min(10, Math.max(1, (m.score ?? 0) + 1)));
    while (points.length < 4) points.unshift(7);
    return points;
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-teal-600" />
            <h1 className="text-3xl font-bold text-gray-800">Your Mood Insights</h1>
          </div>
          <p className="text-gray-600 mt-1">Understand your patterns and celebrate your progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-orange-100 p-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ListChecks className="h-4 w-4 text-teal-600" />
              <span>Total Entries</span>
            </div>
            <div className="text-3xl font-semibold text-gray-800 mt-1">{totalEntries}</div>
          </div>
          <div className="bg-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center gap-2 text-sm opacity-90">
              <TrendingUp className="h-4 w-4" />
              <span>This Week's Avg</span>
            </div>
            <div className="text-3xl font-semibold mt-1">{weekAvg}/10</div>
          </div>
          <div className="bg-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center gap-2 text-sm opacity-90">
              <CalendarDays className="h-4 w-4" />
              <span>Tracking Days</span>
            </div>
            <div className="text-3xl font-semibold mt-1">{trackingDays}</div>
          </div>
          <div className="bg-orange-500 rounded-lg p-4 text-white">
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Flame className="h-4 w-4" />
              <span>Streak</span>
            </div>
            <div className="text-3xl font-semibold mt-1">{streak}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-lg border border-orange-100 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">30-Day Mood Trend</h2>
            <div className="text-xs text-gray-500 mb-4">Your daily average mood intensity over time</div>
            <div className="h-56 w-full relative">
              {/* Simple SVG trend line to avoid chart deps */}
              <svg viewBox="0 0 400 160" className="w-full h-full">
                <defs>
                  <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke="url(#g)"
                  strokeWidth="3"
                  points={`20,${160 - trend[0]*12} 140,${160 - trend[1]*12} 260,${160 - trend[2]*12} 380,${160 - trend[3]*12}`}
                />
                {trend.map((v, i) => (
                  <circle key={i} cx={20 + i*120} cy={160 - v*12} r="4" fill="#14b8a6" />
                ))}
              </svg>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-orange-100 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Mood Distribution</h2>
            <div className="space-y-3 mt-3">
              {moods.map((m) => {
                const pct = Math.round(((moodCounts[m] || 0) / totalForPct) * 100);
                const label = m === 'happy' ? 'Joyful' : m.charAt(0).toUpperCase() + m.slice(1);
                return (
                  <div key={m} className="text-sm">
                    <div className="flex items-center justify-between text-gray-700">
                      <span>{label}</span>
                      <span className="text-gray-500">{pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-orange-100 rounded-full mt-1">
                      <div className="h-2 bg-teal-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-orange-100 p-4 lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Common Triggers</h2>
            <div className="space-y-3 text-sm text-gray-700">
              {/* Static placeholders; could be derived from journal keyword extraction */}
              <div className="flex items-center justify-between"><span>Work</span><span className="text-gray-500">3 times</span></div>
              <div className="flex items-center justify-between"><span>Sleep</span><span className="text-gray-500">1 times</span></div>
              <div className="flex items-center justify-between"><span>Finances</span><span className="text-gray-500">1 times</span></div>
              <div className="flex items-center justify-between"><span>Relationships</span><span className="text-gray-500">1 times</span></div>
              <div className="flex items-center justify-between"><span>Social</span><span className="text-gray-500">1 times</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        if (!supabase) return;
        const { data } = await supabase.auth.getSession();
        const email = data.session?.user?.email || null;
        setUserEmail(email);
        if (data.session?.user) {
          // Check if profile exists
          const { data: existing } = await supabase
            .from('profiles')
            .select('id')
            .eq('user_id', data.session.user.id)
            .maybeSingle();
          if (!existing) navigate('/profile');
        }
      } catch {}
    };
    getSession();

    if (supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUserEmail(session?.user?.email || null);
        if (session?.user) {
          (async () => {
            const { data: existing } = await supabase
              .from('profiles')
              .select('id')
              .eq('user_id', session.user.id)
              .maybeSingle();
            if (!existing) navigate('/profile');
          })();
        }
      });
      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      if (!supabase) return alert('Supabase env not configured');
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (e: any) {
      alert(e.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      if (!supabase) return;
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (e: any) {
      alert(e.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!supabase) return alert('Supabase env not configured');
      setLoading(true);
      setInfo(null);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // onAuthStateChange will handle redirect to /profile if needed
    } catch (err: any) {
      alert(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!supabase) return alert('Supabase env not configured');
      setLoading(true);
      setInfo(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      if (error) throw error;
      if (!data.session) {
        setInfo('Check your email to confirm your account.');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-orange-50 rounded-lg shadow-lg p-6 border border-orange-100">
          <div className="flex items-center mb-4">
            <UserIcon className="h-6 w-6 text-teal-600 mr-2" />
            <h1 className="text-2xl font-semibold text-gray-800 depth-1">Account</h1>
          </div>

          {userEmail ? (
            <div className="space-y-4">
              <div className="text-gray-700">Signed in as <span className="font-medium">{userEmail}</span></div>
              <button
                onClick={signOut}
                disabled={loading}
                className="w-full border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="inline-block h-5 w-5 mr-2" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">Sign in to sync your moods and activities across devices.</p>
              <button
                onClick={signInWithGoogle}
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center disabled:opacity-50"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Continue with Google
              </button>
              {!supabase && (
                <p className="text-xs text-red-600">Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p>
              )}

              <div className="flex items-center my-2">
                <div className="flex-1 h-px bg-orange-200" />
                <span className="px-3 text-xs text-gray-400">OR</span>
                <div className="flex-1 h-px bg-orange-200" />
              </div>

              <div className="flex gap-2 text-sm">
                <button
                  className={`px-3 py-1 rounded-md border ${mode === 'login' ? 'bg-teal-600 text-white border-teal-600' : 'border-orange-200 text-gray-600'}`}
                  onClick={() => setMode('login')}
                  type="button"
                >
                  Login
                </button>
                <button
                  className={`px-3 py-1 rounded-md border ${mode === 'register' ? 'bg-teal-600 text-white border-teal-600' : 'border-orange-200 text-gray-600'}`}
                  onClick={() => setMode('register')}
                  type="button"
                >
                  Register
                </button>
              </div>

              <form onSubmit={mode === 'login' ? signInWithEmail : registerWithEmail} className="space-y-3">
                <input
                  className="input-field"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {mode === 'login' ? 'Login with Email' : 'Register with Email'}
                </button>
              </form>
              {info && <p className="text-xs text-gray-500">{info}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileSetup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!supabase) return;
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if (!user) {
        navigate('/login');
        return;
      }

      setEmail(user.email || '');
      const googleAvatar = (user.user_metadata && (user.user_metadata.avatar_url || user.user_metadata.picture)) || '';
      setAvatarUrl(googleAvatar);

      // If profile already exists, prefill and allow edit or skip
      const { data: existing } = await supabase
        .from('profiles')
        .select('name, phone, email, age, gender, avatar_url')
        .eq('user_id', user.id)
        .maybeSingle();
      if (existing) {
        setName(existing.name || '');
        setPhone(existing.phone || '');
        setEmail(existing.email || user.email || '');
        setAge(existing.age ? String(existing.age) : '');
        setGender(existing.gender || '');
        setAvatarUrl(existing.avatar_url || googleAvatar);
      }
    };
    init();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!supabase) return alert('Supabase not configured');
      setLoading(true);
      const { data: sessionData, error: sErr } = await supabase.auth.getSession();
      if (sErr) throw sErr;
      const user = sessionData.session?.user;
      if (!user) throw new Error('Not authenticated');

      const payload = {
        user_id: user.id,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        age: age ? Number(age) : null,
        gender: gender.trim(),
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString()
      } as any;

      const { error } = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'user_id' });
      if (error) throw error;
      navigate('/');
    } catch (err: any) {
      alert(err.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const onPickAvatar = () => {
    fileInputRef.current?.click();
  };

  const onAvatarSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!supabase) return alert('Supabase not configured');
      const file = e.target.files?.[0];
      if (!file) return;
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if (!user) return alert('You must be logged in');

      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
      if (upErr) throw upErr;
      const { data: publicData } = supabase.storage.from('avatars').getPublicUrl(path);
      const publicUrl = publicData.publicUrl;
      setAvatarUrl(publicUrl);
    } catch (err: any) {
      alert(err.message || 'Failed to upload image');
    } finally {
      // reset value so the same file can be picked again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-8">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="bg-orange-50 rounded-lg shadow-lg p-6 border border-orange-100">
          <div className="flex items-center mb-6">
            <UserIcon className="h-6 w-6 text-teal-600 mr-2" />
            <h1 className="text-2xl font-semibold text-gray-800 depth-1">Create Your Profile</h1>
          </div>

          <div className="flex items-center mb-6">
            <img src={avatarUrl || 'https://placehold.co/96x96?text=Avatar'} alt="Profile" className="h-16 w-16 rounded-full border border-orange-200 mr-4 object-cover" />
            <div>
              <div className="text-sm text-gray-500">Defaulting to your Google profile photo. You can upload a new one.</div>
              <div className="mt-2">
                <button type="button" onClick={onPickAvatar} className="px-3 py-1 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition-all duration-200">Upload Photo</button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onAvatarSelected} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input className="input-field" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" required />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <input className="input-field" value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g., +1 555 555 5555" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input className="input-field" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Age</label>
              <input className="input-field" value={age} onChange={e => setAge(e.target.value)} type="number" min="0" max="120" placeholder="Your age" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Gender</label>
              <select className="input-field" value={gender} onChange={e => setGender(e.target.value)}>
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button type="button" onClick={() => navigate('/')} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200">Skip for now</button>
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileView = () => {
  const [profile, setProfile] = useState<any | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!supabase) return navigate('/login');
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if (!user) return navigate('/login');
      setEmail(user.email || null);
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      setProfile(data || null);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-orange-50 rounded-lg shadow-lg p-6 border border-orange-100">
          <div className="flex items-center mb-6">
            <UserIcon className="h-6 w-6 text-teal-600 mr-2" />
            <h1 className="text-2xl font-semibold text-gray-800 depth-1">Your Profile</h1>
          </div>
          <div className="flex items-center mb-6">
            <img src={(profile?.avatar_url) || 'https://placehold.co/96x96?text=Avatar'} alt="Avatar" className="h-16 w-16 rounded-full border border-orange-200 mr-4 object-cover" />
            <div>
              <div className="text-lg font-medium text-gray-800">{profile?.name || 'Unnamed'}</div>
              <div className="text-sm text-gray-600">{email}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Phone</div>
              <div className="text-gray-800">{profile?.phone || '-'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Age</div>
              <div className="text-gray-800">{profile?.age ?? '-'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Gender</div>
              <div className="text-gray-800">{profile?.gender || '-'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Updated</div>
              <div className="text-gray-800">{profile?.updated_at ? new Date(profile.updated_at).toLocaleString() : '-'}</div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Link to="/profile" className="btn-primary">Edit Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mood Goals Component
const MoodGoals = () => {
  const [goals, setGoals] = useState<Array<{
    id: string;
    title: string;
    description: string;
    targetMood: string;
    currentProgress: number;
    targetDate: string;
    completed: boolean;
    nudges: Array<{ id: string; text: string; completed: boolean }>;
  }>>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetMood: 'happy',
    targetDate: '',
    nudges: []
  });

  const moodOptions = [
    { value: 'happy', label: 'Happy & Joyful', icon: Smile, color: 'text-green-500', bg: 'bg-green-50' },
    { value: 'calm', label: 'Calm & Peaceful', icon: Heart, color: 'text-blue-500', bg: 'bg-blue-50' },
    { value: 'confident', label: 'Confident & Strong', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
    { value: 'grateful', label: 'Grateful & Appreciative', icon: CheckCircle2, color: 'text-teal-500', bg: 'bg-teal-50' }
  ];

  const suggestedNudges = {
    happy: [
      'Practice gratitude by writing 3 things you appreciate',
      'Listen to uplifting music for 10 minutes',
      'Share a positive moment with someone you care about',
      'Do something creative or playful',
      'Take a walk in nature and notice beauty around you'
    ],
    calm: [
      'Practice 5 minutes of deep breathing',
      'Try a 10-minute guided meditation',
      'Write down your thoughts in a journal',
      'Take a warm bath or shower',
      'Listen to calming nature sounds'
    ],
    confident: [
      'List 3 recent accomplishments',
      'Practice positive self-talk',
      'Set a small, achievable goal for today',
      'Stand in a power pose for 2 minutes',
      'Do something that challenges you slightly'
    ],
    grateful: [
      'Write a thank you note to someone',
      'Reflect on a difficult situation and find the silver lining',
      'Express appreciation to a colleague or friend',
      'Keep a gratitude jar and add one thing daily',
      'Volunteer or help someone in need'
    ]
  };

  useEffect(() => {
    // Load goals from localStorage
    const savedGoals = localStorage.getItem('moodGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const saveGoals = (updatedGoals: typeof goals) => {
    localStorage.setItem('moodGoals', JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  const addGoal = () => {
    if (!newGoal.title.trim() || !newGoal.targetDate) return;

    const goal = {
      id: Date.now().toString(),
      title: newGoal.title.trim(),
      description: newGoal.description.trim(),
      targetMood: newGoal.targetMood,
      currentProgress: 0,
      targetDate: newGoal.targetDate,
      completed: false,
      nudges: suggestedNudges[newGoal.targetMood as keyof typeof suggestedNudges].map((nudge, index) => ({
        id: `${Date.now()}_${index}`,
        text: nudge,
        completed: false
      }))
    };

    const updatedGoals = [...goals, goal];
    saveGoals(updatedGoals);
    
    // Reset form
    setNewGoal({
      title: '',
      description: '',
      targetMood: 'happy',
      targetDate: '',
      nudges: []
    });
    setShowAddGoal(false);
  };

  const updateProgress = (goalId: string, nudgeId: string, completed: boolean) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const updatedNudges = goal.nudges.map(nudge => 
          nudge.id === nudgeId ? { ...nudge, completed } : nudge
        );
        const completedCount = updatedNudges.filter(n => n.completed).length;
        const progress = Math.round((completedCount / updatedNudges.length) * 100);
        
        return {
          ...goal,
          nudges: updatedNudges,
          currentProgress: progress,
          completed: progress >= 80
        };
      }
      return goal;
    });
    
    saveGoals(updatedGoals);
  };

  const deleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    saveGoals(updatedGoals);
  };

  const getMoodIcon = (mood: string) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption ? moodOption.icon : Smile;
  };

  const getMoodColor = (mood: string) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption ? moodOption.color : 'text-gray-500';
  };

  const getMoodBg = (mood: string) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption ? moodOption.bg : 'bg-gray-50';
  };

  const getEncouragementMessage = (progress: number, targetMood: string) => {
    if (progress >= 80) {
      return "🎉 Amazing progress! You're so close to your goal!";
    } else if (progress >= 60) {
      return "🌟 You're doing great! Keep up the wonderful work!";
    } else if (progress >= 40) {
      return "💪 You're making steady progress. Every step counts!";
    } else if (progress >= 20) {
      return "🌱 Great start! You're building positive habits!";
    } else {
      return "🌅 Every journey begins with a single step. You've got this!";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Mood Goals</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Set personalized emotional goals and receive gentle, supportive nudges to help you achieve them.
            Remember, progress is personal and every step forward matters.
          </p>
        </div>

        {/* Add Goal Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAddGoal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Plus className="h-6 w-6 inline mr-2" />
            Set New Mood Goal
          </button>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
          {goals.map((goal) => {
            const MoodIcon = getMoodIcon(goal.targetMood);
            const daysUntilTarget = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={goal.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Goal Header */}
                <div className={`p-8 ${getMoodBg(goal.targetMood)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-5">
                      <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center`}>
                        <MoodIcon className={`h-6 w-6 ${getMoodColor(goal.targetMood)}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{goal.title}</h3>
                        <p className="text-gray-600">{goal.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete goal"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Progress</span>
                    <span className="text-lg font-bold text-teal-600">{goal.currentProgress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${goal.currentProgress}%` }}
                    ></div>
                  </div>

                  {/* Encouragement Message */}
                  <div className="text-center mb-4 p-3 bg-teal-50 rounded-lg">
                    <p className="text-sm text-teal-700 font-medium">
                      {getEncouragementMessage(goal.currentProgress, goal.targetMood)}
                    </p>
                  </div>

                  {/* Target Date */}
                  <div className="text-center mb-4">
                    <span className="text-sm text-gray-500">
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                      {daysUntilTarget > 0 && (
                        <span className="ml-2 text-teal-600 font-medium">
                          ({daysUntilTarget} days left)
                        </span>
                      )}
                      {daysUntilTarget <= 0 && (
                        <span className="ml-2 text-orange-600 font-medium">
                          (Target date reached)
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Nudges */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700 mb-3">Today's Supportive Actions:</h4>
                    {goal.nudges.map((nudge) => (
                      <div
                        key={nudge.id}
                        className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-teal-300 transition-all duration-200"
                      >
                        <button
                          onClick={() => updateProgress(goal.id, nudge.id, !nudge.completed)}
                          className="mr-3"
                        >
                          {nudge.completed ? (
                            <CheckSquare className="h-5 w-5 text-teal-600" />
                          ) : (
                            <Square className="h-5 w-5 text-gray-400 hover:text-teal-500" />
                          )}
                        </button>
                        <span className={`flex-1 text-sm ${nudge.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {nudge.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {goals.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-teal-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Mood Goals Set Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your emotional wellness journey by setting your first mood goal. 
              We'll provide gentle, supportive nudges to help you achieve it.
            </p>
            <button
              onClick={() => setShowAddGoal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Create Your First Goal
            </button>
          </div>
        )}
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Set a New Mood Goal</h2>
              <button
                onClick={() => setShowAddGoal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); addGoal(); }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What emotional state would you like to cultivate?
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Feel more confident at work"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us more about your goal
                </label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Describe what this emotional state means to you and why it's important..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What mood are you aiming for?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {moodOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <label
                        key={option.value}
                        className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                          newGoal.targetMood === option.value
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="targetMood"
                          value={option.value}
                          checked={newGoal.targetMood === option.value}
                          onChange={(e) => setNewGoal({ ...newGoal, targetMood: e.target.value })}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-6 w-6 ${option.color}`} />
                          <span className="font-medium text-gray-700">{option.label}</span>
                        </div>
                        {newGoal.targetMood === option.value && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When would you like to achieve this goal?
                </label>
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Quote Rotator Component
const QuoteRotator = () => {
  const quotes = [
    {
      text: "You don't have to control your thoughts. You just have to stop letting them control you.",
      author: "Dan Millman"
    },
    {
      text: "Start where you are. Use what you have. Do what you can.",
      author: "Arthur Ashe"
    },
    {
      text: "This too shall pass. Breathe in, breathe out.",
      author: "Anonymous"
    },
    {
      text: "Small steps every day add up to big changes.",
      author: "Anonymous"
    },
    {
      text: "You are stronger than you think, and more resilient than you know.",
      author: "Anonymous"
    },
    {
      text: "Be kind to your mind. Rest is productive.",
      author: "Anonymous"
    },
    {
      text: "Your feelings are valid. Your story matters.",
      author: "Anonymous"
    },
    {
      text: "One day at a time. One moment at a time.",
      author: "Anonymous"
    },
    {
      text: "Healing is not linear. Give yourself grace.",
      author: "Anonymous"
    },
    {
      text: "Progress over perfection. Keep going.",
      author: "Anonymous"
    }
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 8000); // Change quote every 8 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Quote className="h-16 w-16 text-teal-400 mx-auto mb-6" />
        </div>
        
        <blockquote className="mb-8">
          <p className="text-3xl md:text-4xl font-light text-gray-700 leading-relaxed mb-6 italic">
            "{currentQuote.text}"
          </p>
          {currentQuote.author && (
            <footer className="text-lg text-teal-600 font-medium">
              — {currentQuote.author}
            </footer>
          )}
        </blockquote>

        {/* Quote Indicators */}
        <div className="flex items-center justify-center space-x-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuoteIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentQuoteIndex
                  ? 'bg-teal-500 scale-125'
                  : 'bg-teal-200 hover:bg-teal-300'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<SelfAssessment />} />
          <Route path="/support" element={<SupportGroups />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<ProfileView />} />
          <Route path="/profile" element={<ProfileSetup />} />
          <Route path="/moodgoals" element={<MoodGoals />} />
          <Route path="/journal" element={<BuddyJournalBot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;