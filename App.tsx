import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Heart, Brain, Users, BookOpen, Menu, X, MessageCircle, ChevronRight, AlertCircle, CheckCircle2, HelpCircle, Smile, Frown, Meh, TrendingUp, BarChart3, PenTool, Send, CheckSquare, Square, Plus, Quote, Trash2, LogIn, LogOut, Phone, CalendarDays, Flame, ListChecks, User as UserIcon } from 'lucide-react';
import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';



// Components
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={`bg-orange-50 shadow-lg backdrop-blur-sm bg-opacity-90 sticky top-0 z-50 transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-teal-600" />
              <span className="text-xl font-semibold text-gray-800">MindWell</span>
              {/* Remove currentMood display */}
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLinks />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLinks mobile />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        if (!supabase) return;
        const { data } = await supabase.auth.getSession();
        setIsAuthenticated(!!data.session);
      } catch {}
    };
    init();
    if (supabase) {
      const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
        setIsAuthenticated(!!session);
      });
      return () => listener.subscription.unsubscribe();
    }
  }, []);

  const links = [
    { to: "/assessment", icon: Brain, text: "Self Assessment" },
    { to: "/support", icon: Users, text: "Support" },
    { to: "/insights", icon: BarChart3, text: "Insights" },
    { to: "/account", icon: UserIcon, text: "Profile" },
  ];

  const baseClasses = mobile
    ? "block px-3 py-2 rounded-md text-base font-medium"
    : "text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transform hover:scale-110 transition-transform duration-200";

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`${baseClasses} flex items-center space-x-2`}
        >
          <link.icon className="h-5 w-5" />
          <span>{link.text}</span>
        </Link>
      ))}
      {isAuthenticated && (
        <button
          onClick={async () => {
            try {
              if (!supabase) return navigate('/login');
              await supabase.auth.signOut();
            } catch {}
            navigate('/login');
          }}
          className={`${baseClasses} flex items-center space-x-2`}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      )}
    </>
  );
};

// Mood Tracker Component
const MoodTracker = () => {
  const [weeklyMoods, setWeeklyMoods] = useState<Array<{ date: string, mood: string, score: number }>>([]);
  useEffect(() => {
    const savedMoods = localStorage.getItem('weeklyMoods');
    if (savedMoods) {
      setWeeklyMoods(JSON.parse(savedMoods));
    }
  }, []);

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return Smile;
      case 'sad': return Frown;
      case 'neutral': return Meh;
      case 'anxious': return AlertCircle;
      default: return Meh;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'text-green-500';
      case 'sad': return 'text-blue-500';
      case 'anxious': return 'text-red-500';
      case 'neutral': return 'text-yellow-500';
      default: return 'text-gray-400';
    }
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  return (
    <div className="bg-orange-50 rounded-lg shadow-lg p-6 mb-8 border border-orange-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 depth-1">Your Week at a Glance</h2>
        <BarChart3 className="h-6 w-6 text-teal-600" />
      </div>
      <div className="grid grid-cols-7 gap-2">
        {last7Days.map((date) => {
          const dayMood = weeklyMoods.find(m => m.date === date);
          const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
          const MoodIcon = dayMood ? getMoodIcon(dayMood.mood) : Meh;
          const isToday = date === new Date().toISOString().split('T')[0];

          return (
            <div key={date} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{dayName}</div>
              <div className={`w-10 h-10 mx-auto rounded-full border-2 flex items-center justify-center transition-all duration-300
                ${dayMood ? 'border-teal-400 bg-teal-100' : 'border-orange-200 bg-orange-100'}
                ${isToday ? 'ring-2 ring-teal-300 ring-opacity-50' : ''}`}>
                <MoodIcon className={`h-5 w-5 ${dayMood ? getMoodColor(dayMood.mood) : 'text-gray-400'}`} />
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(date).getDate()}
                {isToday && <div className="w-1 h-1 bg-teal-500 rounded-full mx-auto mt-1"></div>}
              </div>
            </div>
          );
        })}
      </div>
      {weeklyMoods.length > 0 && (
        <div className="mt-4 text-center">
          <Link to="/assessment" className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center justify-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            Track Today's Mood
          </Link>
        </div>
      )}
    </div>
  );
};

// Daily Activities Checklist Component
const DailyActivitiesChecklist = () => {
  const [activities, setActivities] = useState<Array<{ id: string, text: string, completed: boolean }>>([]);
  const [newActivityText, setNewActivityText] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const today = new Date().toISOString().split('T')[0];
      try {
        if (supabase) {
          const { data: sessionData } = await supabase.auth.getSession();
          const uid = sessionData.session?.user?.id || null;
          setUserId(uid);
          if (uid) {
            const { data, error } = await supabase
              .from('daily_activities')
              .select('id, text, completed')
              .eq('user_id', uid)
              .eq('date', today)
              .order('created_at', { ascending: true });
            if (!error && data) {
              setActivities(data.map((d: any) => ({ id: String(d.id), text: d.text, completed: d.completed })));
              localStorage.setItem(`dailyActivities_${today}`, JSON.stringify(data.map((d: any) => ({ id: String(d.id), text: d.text, completed: d.completed }))));
              return;
            }
          }
        }
      } catch {}
      const savedActivities = localStorage.getItem(`dailyActivities_${today}`);
      if (savedActivities) setActivities(JSON.parse(savedActivities));
    };
    load();
  }, []);

  const toggleActivity = (id: string) => {
    const updatedActivities = activities.map(activity =>
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    );
    setActivities(updatedActivities);

    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`dailyActivities_${today}`, JSON.stringify(updatedActivities));

    // Persist toggle to Supabase
    (async () => {
      try {
        if (supabase && userId) {
          const activity = updatedActivities.find(a => a.id === id);
          if (activity) {
            const numericId = Number(id);
            if (!Number.isNaN(numericId)) {
              await supabase
                .from('daily_activities')
                .update({ completed: activity.completed, updated_at: new Date().toISOString() })
                .eq('id', numericId)
                .eq('user_id', userId);
            }
          }
        }
      } catch {}
    })();
  };

  const addActivity = () => {
    const text = newActivityText.trim();
    if (text.length === 0) return;
    const today = new Date().toISOString().split('T')[0];
    const localId = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const newActivity = { id: localId, text, completed: false };
    const updated = [...activities, newActivity];
    setActivities(updated);
    localStorage.setItem(`dailyActivities_${today}`, JSON.stringify(updated));
    setNewActivityText('');

    // Create in Supabase
    (async () => {
      try {
        if (supabase && userId) {
          const { data, error } = await supabase
            .from('daily_activities')
            .insert([{ user_id: userId, date: today, text, completed: false }])
            .select('id')
            .single();
          if (!error && data) {
            const persistedId = String(data.id);
            const synced = updated.map(a => (a.id === localId ? { ...a, id: persistedId } : a));
            setActivities(synced);
            localStorage.setItem(`dailyActivities_${today}`, JSON.stringify(synced));
          }
        }
      } catch {}
    })();
  };

  const handleNewActivityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addActivity();
    }
  };

  const deleteActivity = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = activities.filter(a => a.id !== id);
    setActivities(updated);
    localStorage.setItem(`dailyActivities_${today}`, JSON.stringify(updated));

    // Delete from Supabase
    (async () => {
      try {
        if (supabase && userId) {
          const numericId = Number(id);
          if (!Number.isNaN(numericId)) {
            await supabase
              .from('daily_activities')
              .delete()
              .eq('id', numericId)
              .eq('user_id', userId);
          }
        }
      } catch {}
    })();
  };

  const hasActivities = activities.length > 0;

  const completedCount = activities.filter(a => a.completed).length;
  const progressPercentage = (completedCount / activities.length) * 100;

  return (
    <div className="bg-orange-50 rounded-lg shadow-lg p-6 mb-8 border border-orange-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 depth-1">Today's Wellness Activities</h2>
        <div className="flex items-center">
          {hasActivities && (
            <span className="text-sm text-gray-500 mr-2">{completedCount}/{activities.length}</span>
          )}
          <CheckSquare className="h-6 w-6 text-teal-600 floating" />
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newActivityText}
          onChange={(e) => setNewActivityText(e.target.value)}
          onKeyDown={handleNewActivityKeyDown}
          placeholder="Add a new activity (e.g., 10-min walk)"
          className="flex-1 input-field"
        />
        <button
          onClick={addActivity}
          className="btn-primary flex items-center justify-center"
          aria-label="Add activity"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {hasActivities && (
        <div className="mb-4">
          <div className="w-full bg-orange-200 rounded-full h-2">
            <div
              className="bg-teal-500 rounded-full h-2 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedCount === activities.length
              ? "🎉 Great job! You've completed all your activities today!"
              : `Keep going! ${activities.length - completedCount} activities remaining.`}
          </p>
        </div>
      )}

      {hasActivities && (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center p-3 rounded-lg border border-orange-200 hover:border-teal-400 
                       hover:bg-teal-50 transition-all duration-200 cursor-pointer"
              onClick={() => toggleActivity(activity.id)}
            >
              {activity.completed ? (
                <CheckSquare className="h-5 w-5 text-teal-600 mr-3" />
              ) : (
                <Square className="h-5 w-5 text-orange-400 mr-3" />
              )}
              <span className={`${activity.completed ? 'text-gray-500 line-through' : 'text-gray-700'} flex-1`}>
                {activity.text}
              </span>
              <button
                className="ml-3 text-gray-400 hover:text-red-600 transition-colors"
                aria-label="Delete activity"
                onClick={(e) => { e.stopPropagation(); deleteActivity(activity.id); }}
                title="Delete"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Quotes Rotator Component
const QuotesRotator = () => {
  const localQuotes: Array<{ text: string; author?: string }> = [
    { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "This too shall pass. Breathe in, breathe out.", author: undefined },
    { text: "Small steps every day add up to big changes.", author: undefined },
    { text: "You are stronger than you think, and more resilient than you know.", author: undefined },
    { text: "Be kind to your mind. Rest is productive.", author: undefined },
    { text: "Your feelings are valid. Your story matters.", author: undefined },
    { text: "One day at a time. One moment at a time.", author: undefined },
    { text: "Healing is not linear. Give yourself grace.", author: undefined },
    { text: "Progress over perfection. Keep going.", author: undefined }
  ];

  const [quotes, setQuotes] = useState<Array<{ text: string; author?: string }>>(localQuotes);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Try to load quotes from Supabase if client is configured
    const loadQuotes = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('quotes')
          .select('text, author')
          .eq('category', 'positivity')
          .limit(50);
        if (error) throw error;
        if (data && data.length > 0) {
          const mapped = data.map((q: any) => ({ text: q.text as string, author: q.author || undefined }));
          setQuotes(mapped);
          setCurrent(0);
        }
      } catch (e) {
        // Fallback to local quotes silently
      }
    };
    loadQuotes();

    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % (quotes.length || localQuotes.length));
    }, 10000);
    return () => clearInterval(id);
  }, []);

  const list = quotes && quotes.length > 0 ? quotes : localQuotes;
  const active = list[current % list.length];

  return (
    <div className="bg-orange-50 rounded-lg shadow-lg p-6 border border-orange-100 h-full flex flex-col justify-between">
      <div className="flex items-center mb-4">
        <Quote className="h-6 w-6 text-teal-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800 depth-1">Daily Positivity</h2>
      </div>
      <div className="flex-1 flex items-center">
        <blockquote className="text-gray-700 text-lg italic">
          “{active.text}”
          {active.author && (
            <footer className="mt-2 not-italic text-sm text-gray-500">— {active.author}</footer>
          )}
        </blockquote>
      </div>
      <div className="flex items-center justify-center mt-6 space-x-1">
        {list.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full ${idx === current ? 'bg-teal-600' : 'bg-orange-200'}`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  
  const getBackgroundClass = () => {
    return "min-h-screen bg-gradient-to-br from-teal-50 to-orange-50";
  };

  return (
  <div className={`${getBackgroundClass()} transition-all duration-1000`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl transform transition-all duration-500 hover:scale-105">
          Your Journey to
          <span className="text-teal-600"> Mental Wellness</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A safe space for your mental health journey. Access professional support,
          join community groups, and discover resources for your wellbeing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4">
          <QuotesRotator />
        </div>
        <div className="lg:col-span-8 space-y-8">
          <div>
            <MoodTracker />
          </div>
          <div>
            <DailyActivitiesChecklist />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 perspective-1000">
        <FeatureCard
          title="Self Assessment"
          description="Take our mood-based assessments to track your wellbeing"
          icon={Brain}
          to="/assessment"
        />
        <FeatureCard
          title="Support"
          description="Connect with others in moderated, anonymous support"
          icon={Users}
          to="/support"
        />
        <FeatureCard
          title="Insights"
          description="View your mood trends, distribution, and triggers"
          icon={BarChart3}
          to="/insights"
        />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;