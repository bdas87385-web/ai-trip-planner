/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  User, 
  Download, 
  Share2, 
  Calendar, 
  CreditCard, 
  Clock, 
  Utensils, 
  Hotel, 
  Star, 
  PlaneTakeoff, 
  Bus, 
  Train, 
  Car, 
  Award, 
  Settings, 
  ChevronRight,
  Plus,
  LayoutDashboard,
  Compass,
  Zap,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Screen = 'home' | 'planner' | 'itinerary' | 'dashboard';

interface TripDetails {
  startingCity: string;
  destination: string;
  duration: string;
  budget: string;
  tripType: 'Solo' | 'Couple' | 'Honeymoon' | 'Friends' | 'Family';
  travelStyle: 'Budget' | 'Mid-range' | 'Luxury';
}

// --- Shared Components ---

const Navbar = ({ currentScreen, setScreen }: { currentScreen: Screen, setScreen: (s: Screen) => void }) => (
  <nav className="fixed top-0 left-0 w-full z-50 h-16 glass-panel border-b border-white/20 px-6 flex items-center justify-between">
    <div className="flex items-center gap-8">
      <div 
        className="text-2xl font-extrabold text-primary cursor-pointer tracking-tight"
        onClick={() => setScreen('home')}
      >
        BharatAI Travel
      </div>
      <div className="hidden md:flex items-center gap-8">
        {[
          { name: 'Home', id: 'home' as const },
          { name: 'My Trips', id: 'itinerary' as const },
          { name: 'Dashboard', id: 'dashboard' as const },
          { name: 'Pricing', id: 'home' as const }
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => setScreen(item.id)}
            className={`text-sm font-semibold transition-colors hover:text-primary ${
              currentScreen === item.id ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button 
        className="hidden sm:block text-sm font-semibold text-on-surface hover:text-primary transition-colors"
        onClick={() => setScreen('dashboard')}
      >
        Login
      </button>
      <button 
        className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full text-sm font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
        onClick={() => setScreen('planner')}
      >
        Plan a Trip
      </button>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-surface-container-highest border-t border-outline-variant py-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-1 space-y-4">
        <div className="text-xl font-extrabold text-primary">BharatAI Travel</div>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          © 2024 BharatAI Travel. Discover India with Intelligence. Making every journey a story worth telling.
        </p>
      </div>
      <div className="grid grid-cols-2 col-span-1 md:col-span-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-bold text-on-surface text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary">About</a></li>
            <li><a href="#" className="hover:text-primary">Privacy</a></li>
            <li><a href="#" className="hover:text-primary">Terms</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-on-surface text-sm">Support</h4>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary">Help Center</a></li>
            <li><a href="#" className="hover:text-primary">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary">Feedback</a></li>
          </ul>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-bold text-on-surface text-sm">Newsletter</h4>
        <p className="text-sm text-on-surface-variant">Get travel tips and curated itineraries delivered weekly.</p>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Email address" 
            className="bg-surface-container-low border border-outline-variant rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button className="bg-secondary text-white p-2 rounded-full hover:opacity-90 transition-opacity">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  </footer>
);

// --- Screen Components ---

const HomeScreen = ({ onPlan }: { onPlan: () => void }) => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1548013146-72479768b921?auto=format&fit=crop&q=80&w=2000" 
            alt="Hawa Mahal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#f8f9fa]"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-5xl px-6 text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold text-on-surface drop-shadow-sm leading-tight"
          >
            Your Dream Trip to India, <br/>
            <span className="text-primary italic">Planned in Seconds</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto"
          >
            Experience the magic of Bharat through intelligent AI itineraries tailored to your unique taste, budget, and pace.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="glass-panel p-2 rounded-full shadow-2xl max-w-2xl mx-auto flex items-center gap-2 pr-2 pl-6"
          >
            <MapPin className="text-primary" size={24} />
            <input 
              type="text" 
              placeholder="Where to? (e.g. Jaipur, Kerala, Leh)" 
              className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/60 font-medium"
            />
            <button 
              onClick={onPlan}
              className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-secondary/20"
            >
              Explore <Sparkles size={18} />
            </button>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <span className="text-on-surface-variant/70 uppercase tracking-widest text-[10px] mt-1.5">Popular:</span>
            {['Taj Mahal', 'Goa Beaches', 'Varanasi Ghats'].map(tag => (
              <button key={tag} className="px-4 py-1.5 rounded-full border border-outline-variant hover:border-primary hover:text-primary transition-colors bg-white/40 backdrop-blur-sm">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Fully Personalized",
              desc: "Our AI learns your preferences to suggest activities you'll actually love, from hidden cafes to ancient temples.",
              icon: User,
              color: "primary",
              bg: "primary-container"
            },
            {
              title: "Ready-to-Execute",
              desc: "Get comprehensive day-wise plans with booking links, transport logistics, and local tips ready for action.",
              icon: Zap,
              color: "secondary",
              bg: "secondary-container"
            },
            {
              title: "Budget-Smart",
              desc: "Smart cost estimations and optimization help you travel more while spending less, perfectly adjusted to your wallet.",
              icon: CreditCard,
              color: "tertiary",
              bg: "tertiary-container"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_4px_20px_rgba(84,79,192,0.06)] border border-outline-variant/30 group"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 bg-${item.color}/10 text-${item.color} group-hover:bg-${item.bg} group-hover:text-white transition-colors`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Magic in Three Steps</h2>
            <div className="w-20 h-1.5 bg-primary-container mx-auto rounded-full"></div>
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px border-t-2 border-dashed border-outline-variant -translate-y-1/2 z-0"></div>
            {[
              { step: '1', title: 'Input Details', desc: 'Tell us your destination, dates, and what kind of traveler you are.' },
              { step: '2', title: 'AI Generates', desc: 'Our intelligence engine creates a balanced, optimized route in seconds.' },
              { step: '3', title: 'Start Your Journey', desc: 'Finalize your plan, book everything, and hit the road with confidence.' }
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center mb-6 text-2xl font-bold text-primary border-4 border-[#f8f9fa]">
                  {s.step}
                </div>
                <h4 className="text-lg font-bold mb-2">{s.title}</h4>
                <p className="text-on-surface-variant text-sm max-w-[200px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">A Sneak Peek at Perfection</h2>
            <p className="text-lg text-on-surface-variant">
              Stop juggling tabs and spreadsheets. BharatAI Journey delivers beautiful, interactive itineraries that live on your phone.
            </p>
            <ul className="space-y-4">
              {[
                "Real-time weather updates & transit alerts",
                "Direct booking links for IRCTC, Flights, and Hotels",
                "Curated local food guides (Veg/Non-Veg filters)"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-semibold text-sm">
                  <CheckCircle2 className="text-tertiary" size={20} />
                  {item}
                </li>
              ))}
            </ul>
            <button onClick={onPlan} className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:opacity-90 transition-all">
              Start Planning for Free
            </button>
          </div>
          
          <div className="flex-1 relative">
            <div className="glass-panel p-8 rounded-3xl shadow-2xl relative z-10 max-w-sm mx-auto space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary mb-1">Day 01 in Kerala</p>
                  <h3 className="text-2xl font-bold">Munnar Mist</h3>
                </div>
                <div className="bg-tertiary-container/20 text-tertiary px-3 py-1 rounded-full flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase">On Track</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  { time: '09:00 AM', title: 'Tea Garden Sunrise Walk', desc: 'Soft trekking through Kolukkumalai Estate.', icon: Clock, color: 'secondary' },
                  { time: '01:00 PM', title: 'Authentic Sadhya Lunch', desc: 'Traditional Kerala leaf-meal experience.', icon: Utensils, color: 'primary', tags: ['VEG', 'LOCAL FAVORITE'] },
                  { time: '06:00 PM', title: 'Amber Dale Resort', desc: 'Likely Delay: Low (10m)', icon: Hotel, color: 'secondary' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-lg bg-${item.color}/10 text-${item.color}`}>
                        <item.icon size={16} />
                      </div>
                      {i < 2 && <div className="w-px flex-1 bg-outline-variant/30 my-2"></div>}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-on-surface-variant/60">{item.time}</p>
                      <h4 className="text-sm font-bold">{item.title}</h4>
                      <p className="text-[11px] text-on-surface-variant/80">{item.desc}</p>
                      {item.tags && (
                        <div className="flex gap-2 pt-1">
                          {item.tags.map(t => (
                            <span key={t} className="text-[8px] font-black px-1.5 py-0.5 rounded border border-current bg-current/5 opacity-80">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-outline-variant/20 flex justify-between items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-high overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                    </div>
                  ))}
                </div>
                <button className="bg-on-surface text-surface px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Edit Plan
                </button>
              </div>
            </div>
            {/* Blurs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-on-background text-surface text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-5xl font-extrabold">India Awaits You.</h2>
          <p className="text-lg text-surface-variant/80 max-w-2xl mx-auto">
            Join over 50,000+ travelers who have discovered the smarter way to explore the beauty of Bharat. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button onClick={onPlan} className="bg-primary-container text-on-primary-container px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-transform">
              Start Planning for Free
            </button>
            <button className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-colors">
              View Demo Itinerary
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const PlannerScreen = ({ 
  onFinish, 
  tripDetails, 
  setTripDetails 
}: { 
  onFinish: () => void;
  tripDetails: TripDetails;
  setTripDetails: (details: TripDetails) => void;
}) => {
  const [step, setStep] = useState(1);

  const updateDetail = (key: keyof TripDetails, value: any) => {
    setTripDetails({ ...tripDetails, [key]: value });
  };

  return (
    <div className="pt-24 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-4 order-2 lg:order-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-outline-variant/30 space-y-8">
              <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-6">
                <Sparkles className="text-secondary" />
                <h2 className="text-2xl font-bold tracking-tight">Trip Summary</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: 'From', value: tripDetails.startingCity || 'Not set', icon: PlaneTakeoff },
                  { label: 'Destination', value: tripDetails.destination || 'Flexible', icon: MapPin },
                  { label: 'Duration', value: `${tripDetails.duration} Days`, icon: Calendar },
                  { label: 'Budget', value: `₹${Number(tripDetails.budget).toLocaleString()}`, icon: CreditCard },
                  { label: 'Trip Type', value: tripDetails.tripType, icon: User },
                  { label: 'Travel Style', value: tripDetails.travelStyle, icon: Compass }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">{item.label}</p>
                      <p className="font-bold text-sm">{item.value}</p>
                    </div>
                    <item.icon size={16} className="text-primary/60 mt-1" />
                  </div>
                ))}
              </div>
              
              <div className="p-5 rounded-2xl bg-secondary/5 border border-secondary/10 space-y-2">
                <div className="flex items-center gap-2 text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                  <span className="text-[11px] font-black uppercase">Engineered for Bharat</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Our AI is currently prioritizing local hidden gems based on your {tripDetails.travelStyle} style.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Form */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <p className="text-sm font-bold text-primary">Step {step} of 2: {step === 1 ? 'Core Details' : 'Trip Vibe'}</p>
              <p className="text-xs font-bold text-on-surface-variant">{step === 1 ? '50%' : '100%'} Complete</p>
            </div>
            <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
              <motion.div 
                initial={false}
                animate={{ width: step === 1 ? '50%' : '100%' }}
                className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(133,83,0,0.3)]"
              ></motion.div>
            </div>
          </div>
          
          <div className="glass-panel p-8 md:p-10 rounded-3xl space-y-10 shadow-xl border-white/60 min-h-[600px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10 flex-1"
                >
                  <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight">Plan Your Journey</h1>
                    <p className="text-on-surface-variant">Let's start with the basics of your grand Indian adventure.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        Starting City
                      </label>
                      <input 
                        type="text"
                        value={tripDetails.startingCity}
                        onChange={(e) => updateDetail('startingCity', e.target.value)}
                        placeholder="e.g. Mumbai, Delhi..."
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold flex items-center gap-2">
                        <Globe size={16} className="text-primary" />
                        Destination
                      </label>
                      <input 
                        type="text"
                        value={tripDetails.destination}
                        onChange={(e) => updateDetail('destination', e.target.value)}
                        placeholder="e.g. Goa, or leave blank"
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold flex items-center gap-2">
                        <Calendar size={16} className="text-secondary" />
                        Duration (days)
                      </label>
                      <input 
                        type="number"
                        value={tripDetails.duration}
                        onChange={(e) => updateDetail('duration', e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold flex items-center gap-2">
                        <CreditCard size={16} className="text-tertiary" />
                        Total budget (₹)
                      </label>
                      <input 
                        type="number"
                        value={tripDetails.budget}
                        onChange={(e) => updateDetail('budget', e.target.value)}
                        placeholder="e.g. 25000"
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-tertiary/20 focus:border-tertiary transition-all font-medium"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10 flex-1"
                >
                  <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight">Trip Vibe</h1>
                    <p className="text-on-surface-variant">How should this trip feel? Tailor the soul of your journey.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-sm font-bold flex items-center gap-2">
                        <User size={16} className="text-primary" />
                        Trip Type
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {['Solo', 'Couple', 'Honeymoon', 'Friends', 'Family'].map((type) => (
                          <button
                            key={type}
                            onClick={() => updateDetail('tripType', type)}
                            className={`py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                              tripDetails.tripType === type
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/40'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-bold flex items-center gap-2">
                        <Compass size={16} className="text-secondary" />
                        Travel Style
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Budget', 'Mid-range', 'Luxury'].map((style) => (
                          <button
                            key={style}
                            onClick={() => updateDetail('travelStyle', style)}
                            className={`py-6 rounded-2xl border-2 font-bold text-sm transition-all flex flex-col items-center gap-2 ${
                              tripDetails.travelStyle === style
                                ? 'border-secondary bg-secondary/5 text-secondary shadow-sm'
                                : 'border-outline-variant/30 text-on-surface-variant hover:border-secondary/40'
                            }`}
                          >
                            <Sparkles size={18} className={tripDetails.travelStyle === style ? 'text-secondary' : 'opacity-20'} />
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center justify-between pt-8 border-t border-outline-variant/20 mt-auto">
              {step === 2 && (
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                >
                  <ChevronRight className="rotate-180" size={18} />
                  Back to Details
                </button>
              )}
              <div className="flex-1"></div>
              <button 
                onClick={step === 1 ? () => setStep(2) : onFinish}
                className="bg-secondary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all shadow-secondary/20"
              >
                {step === 1 ? 'Nearly There' : 'Generate Itinerary'}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          
          {/* Heritage Insight Card */}
          <div className="relative h-56 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1000" 
              alt="Udaipur Lake Palace" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/40 to-transparent flex items-center px-10">
              <div className="max-w-xs space-y-3">
                <div className="flex items-center gap-2 text-white/80">
                  <Award size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Heritage Insight</span>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight">Udaipur's Floating Royalty</h3>
                <p className="text-sm text-white/90 font-medium">
                  Did you know? Udaipur's Lake Palace was built in 1743 as a winter retreat for the Mewar royal family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItineraryScreen = () => {
  return (
    <div className="flex pt-16 min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 hidden lg:flex flex-col bg-surface-container-low border-r border-outline-variant/20 fixed h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-8 space-y-1">
          <h3 className="text-2xl font-black text-primary tracking-tight">Namaste, Traveler</h3>
          <p className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
            <Award size={14} className="text-primary" />
            Gold Member
          </p>
        </div>
        
        <nav className="px-4 space-y-2">
          {[
            { label: 'Trip Overview', icon: LayoutDashboard, active: true },
            { label: 'Day-wise Plan', icon: Compass },
            { label: 'Stays & Hotels', icon: Hotel },
            { label: 'Budget Breakdown', icon: CreditCard }
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${
                item.active 
                  ? 'bg-secondary-container/20 text-secondary' 
                  : 'text-on-surface-variant hover:bg-surface-container-high/50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto p-6">
          <div className="bg-secondary p-5 rounded-2xl shadow-xl space-y-4">
            <p className="text-white text-xs font-bold leading-relaxed">Upgrade to Pro for personalized food tours & local guides.</p>
            <button className="w-full bg-white text-secondary py-3 rounded-xl text-sm font-black uppercase tracking-widest shadow-sm hover:scale-105 transition-transform">
              Upgrade
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 flex-1 p-6 md:p-10 max-w-6xl mx-auto space-y-12">
        {/* Banner */}
        <section className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1548013146-72479768b921?auto=format&fit=crop&q=80&w=2000" 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
          
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="glass-panel p-8 rounded-3xl max-w-2xl border-white/30 space-y-4">
              <span className="bg-primary text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">7-Day Royal Rajasthan Odyssey</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Jaipur & Udaipur Retreat</h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Calendar size={18} className="text-primary-container" />
                  Dec 15 - Dec 22, 2024
                </div>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <CreditCard size={18} className="text-primary-container" />
                  Total Budget: ₹85,000
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white border border-white/40 hover:bg-white/40 transition-all">
                <Share2 size={24} />
              </button>
              <button className="bg-secondary text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 shadow-2xl hover:scale-105 transition-all">
                <Download size={20} />
                Download PDF
              </button>
            </div>
          </div>
        </section>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-10 rounded-[2rem] space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-primary">
              <Sparkles size={24} />
              Trip Summary
            </h2>
            <p className="text-on-surface-variant leading-relaxed font-medium">
              Embark on a curated journey through the 'Pink City' of Jaipur and the 'City of Lakes', Udaipur. This itinerary balances majestic fort explorations with serene lakeside evenings, curated by BharatAI to optimize travel time and cultural immersion. You'll experience traditional Rajasthani hospitality, vibrant bazaars, and architectural marvels.
            </p>
          </div>
          
          <div className="bg-secondary-container/10 border border-secondary-container/20 p-10 rounded-[2rem] relative overflow-hidden space-y-6 group">
            <Settings size={120} className="absolute -bottom-10 -right-10 text-secondary/5 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
            <h2 className="text-2xl font-bold flex items-center gap-3 text-on-secondary-container">
              <Zap size={24} className="text-secondary" />
              Smart Tips
            </h2>
            <ul className="space-y-4">
              {[
                "Carry warm layers for chilly Udaipur nights",
                "Book Amer Fort elephant rides before 9 AM",
                "Try 'Lal Maas' at local palace cafes"
              ].map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm font-bold text-on-secondary-container/80">
                  <CheckCircle2 size={18} className="text-secondary flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Daily Itinerary */}
        <section className="space-y-8">
          <h2 className="text-3xl font-extrabold tracking-tight">Daily Adventures</h2>
          <div className="space-y-12 relative before:absolute before:left-[45px] md:before:left-[45px] before:top-4 before:bottom-4 before:w-0.5 before:bg-outline-variant/30">
            {[1, 2].map((day, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8 relative">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-3xl bg-white shadow-xl border border-outline-variant/10 flex flex-col items-center justify-center p-2 relative z-10">
                    <span className="text-3xl font-black text-primary">D{day}</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Jaipur</span>
                  </div>
                </div>
                
                <div className="glass-card p-8 rounded-[2rem] space-y-8 hover:shadow-xl group">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold tracking-tight">{day === 1 ? 'Arrival & Pink City Glow' : 'The Fort Trail'}</h3>
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${day === 1 ? 'bg-tertiary-container/20 text-tertiary' : 'bg-secondary-container/20 text-secondary'}`}>
                      {day === 1 ? 'High Activity' : 'Cultural Focus'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { title: day === 1 ? 'Morning Arrival' : 'Amer Fort', icon: day === 1 ? PlaneTakeoff : Hotel, desc: day === 1 ? 'Check-in at Hotel Royal.' : 'Audio tour of Sheesh Mahal.' },
                      { title: day === 1 ? 'City Palace Visit' : 'Nahargarh Viewpoint', icon: Globe, desc: day === 1 ? 'Explore the royal museum.' : 'Best sunset views of city.' },
                      { title: day === 1 ? 'Dinner at Chokhi Dhani' : 'Veg Dinner: Rawat', icon: Utensils, desc: day === 1 ? 'Traditional village theme.' : 'Famous for Pyaaz Kachori.' }
                    ].map((act, j) => (
                      <div key={j} className="flex gap-4 group/item">
                        <div className="p-3 shadow-sm rounded-2xl bg-surface-container-high/50 text-secondary group-hover/item:scale-110 transition-transform">
                          <act.icon size={20} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold">{act.title}</h4>
                          <p className="text-xs text-on-surface-variant leading-relaxed">{act.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stays */}
        <section className="space-y-8">
          <h2 className="text-3xl font-extrabold tracking-tight">Stay Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "The Raj Palace",
                rating: 4.8,
                recommended: true,
                price: "₹12,500",
                desc: "Grand heritage property with world-class amenities and traditional architecture. Located centrally in Jaipur.",
                img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1000"
              },
              {
                name: "Taj Lake Palace",
                rating: 4.9,
                price: "₹45,000",
                desc: "Floating marble palace in the middle of Lake Pichola. The ultimate Udaipur luxury experience.",
                img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
              }
            ].map((stay, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-xl border border-outline-variant/20 flex flex-col group">
                <div className="h-64 relative overflow-hidden">
                  <img src={stay.img} alt={stay.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {stay.recommended && (
                    <div className="absolute top-6 right-6 bg-tertiary text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Recommended
                    </div>
                  )}
                  <div className="absolute top-6 left-6 glass-panel px-3 py-1.5 rounded-2xl flex items-center gap-1.5">
                    <Star size={14} className="text-primary fill-primary" />
                    <span className="text-xs font-bold text-on-surface">{stay.rating}</span>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight">{stay.name}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{stay.desc}</p>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-outline-variant/20 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Starting From</p>
                      <p className="text-2xl font-black text-primary">{stay.price}<span className="text-xs font-medium text-on-surface-variant">/night</span></p>
                    </div>
                    <button className="bg-primary text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg hover:scale-105 transition-all">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Budget Breakdown */}
        <section className="space-y-8">
          <h2 className="text-3xl font-extrabold tracking-tight">Financial Blueprint</h2>
          <div className="glass-card rounded-[3rem] p-12 shadow-2xl flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 w-full space-y-4">
              {[
                { label: 'Accommodation', amount: '₹45,000', color: 'primary', icon: Hotel },
                { label: 'Transport (Train/Cab)', amount: '₹15,000', color: 'secondary', icon: Train },
                { label: 'Food & Dining', amount: '₹18,000', color: 'tertiary', icon: Utensils },
                { label: 'Sightseeing & Entry', amount: '₹7,000', color: 'on-surface-variant', icon: MapPin }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-surface-container-high/40 rounded-3xl hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-5">
                    <div className={`p-4 rounded-2xl shadow-sm bg-${item.color}/10 text-${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <span className="font-bold text-sm">{item.label}</span>
                  </div>
                  <span className="text-xl font-black tracking-tight">{item.amount}</span>
                </div>
              ))}
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <div className="relative w-72 h-72 rounded-full border-[24px] border-surface-container-highest flex items-center justify-center shadow-xl">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle 
                    cx="144" cy="144" r="132" 
                    fill="transparent" 
                    stroke="var(--color-primary)" 
                    strokeWidth="24" 
                    strokeDasharray="830"
                    strokeDashoffset="240"
                    strokeLinecap="round"
                    className="opacity-90"
                  />
                  <circle 
                    cx="144" cy="144" r="132" 
                    fill="transparent" 
                    stroke="var(--color-secondary)" 
                    strokeWidth="24" 
                    strokeDasharray="830"
                    strokeDashoffset="600"
                    strokeLinecap="round"
                    className="opacity-90"
                  />
                </svg>
                <div className="text-center space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/60">Total Estimated</p>
                  <p className="text-6xl font-black text-primary tracking-tighter">₹85k</p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant text-center max-w-xs italic font-medium leading-relaxed">
                "This budget is optimized for a comfortable mid-range experience with selected luxury stays."
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const DashboardScreen = () => {
  return (
    <div className="flex pt-16 min-h-screen">
      <aside className="w-64 hidden lg:flex flex-col bg-white border-r border-outline-variant/10 fixed h-[calc(100vh-64px)] overflow-y-auto">
        <div className="p-8 space-y-1">
          <h3 className="text-2xl font-black text-primary">Namaste, Traveler</h3>
          <p className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
            <Award size={14} className="text-primary" />
            Gold Member
          </p>
        </div>
        
        <nav className="px-4 space-y-2">
          {[
            { label: 'Dashboard', icon: LayoutDashboard, active: true },
            { label: 'Saved Trips', icon: Globe },
            { label: 'Subscription', icon: Star },
            { label: 'Preferences', icon: Settings }
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all font-bold text-sm ${
                item.active 
                  ? 'bg-secondary-container/20 text-secondary shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-container-high/50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto p-6">
          <div className="bg-secondary text-white p-6 rounded-[2rem] shadow-2xl space-y-4 relative overflow-hidden">
            <Sparkles className="absolute -top-4 -right-4 text-white/10 w-24 h-24" />
            <p className="font-bold relative z-10 leading-tight">Ready for more adventures?</p>
            <button className="w-full bg-primary-container text-on-primary-container py-3 rounded-xl text-sm font-black uppercase tracking-widest shadow-xl relative z-10 hover:scale-105 transition-transform">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </aside>

      <main className="lg:ml-64 flex-1 p-6 md:p-10 max-w-6xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-10 rounded-[2.5rem] flex items-center gap-10 shadow-2xl border-white/60 relative overflow-hidden">
            <div className="flex-1 space-y-4 relative z-10">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Namaste, Aryan!</h1>
              <p className="text-lg text-on-surface-variant font-medium leading-relaxed">
                Your next adventure is just an AI-thought away. Explore your curated Indian itineraries below.
              </p>
            </div>
            <div className="w-32 h-32 rounded-full border-[6px] border-primary p-2 flex-shrink-0 relative z-10 shadow-xl bg-white">
              <img src="https://i.pravatar.cc/200?img=12" alt="p" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/20 shadow-xl space-y-8">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Monthly Usage</span>
              <span className="bg-tertiary-container text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">Free</span>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-6xl font-black text-on-surface tracking-tighter">2/3</span>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Plans Developed</p>
                </div>
              </div>
              <div className="w-full bg-surface-container-high h-4 rounded-full overflow-hidden shadow-inner">
                <div className="bg-primary h-full w-[66%] shadow-[0_0_15px_rgba(133,83,0,0.5)] rounded-full"></div>
              </div>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                Upgrade to Pro for unlimited AI-powered itineraries and heritage secret spots.
              </p>
            </div>
          </div>
        </div>

        <section className="space-y-8">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-extrabold tracking-tight">Saved Trips</h2>
            <button className="text-secondary font-bold text-sm flex items-center gap-1.5 group">
              View All <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Royal Agra & Fatehpur", 
                loc: "Uttar Pradesh, India", 
                date: "4 Days • Oct 12-16", 
                budget: "₹15,000",
                img: "https://images.unsplash.com/photo-1564507592333-c60657451dd7?auto=format&fit=crop&q=80&w=600"
              },
              { 
                title: "Backwaters & Spice Clouds", 
                loc: "Alleppey, Kerala", 
                date: "7 Days • Nov 02-09", 
                budget: "₹32,000",
                img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=600"
              },
              { 
                title: "Pink City Heritage Trail", 
                loc: "Jaipur, Rajasthan", 
                date: "3 Days • Dec 20-23", 
                budget: "₹12,000",
                img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=600"
              }
            ].map((trip, i) => (
              <div key={i} className="glass-card rounded-[2rem] overflow-hidden shadow-md group hover:shadow-2xl hover:translate-y-[-5px]">
                <div className="relative h-56 overflow-hidden">
                  <img src={trip.img} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 glass-panel px-4 py-2 rounded-2xl text-[10px] font-black tracking-widest text-on-surface border-white/60">
                    {trip.date}
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{trip.title}</h3>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <MapPin size={14} className="text-secondary" />
                      <span className="text-xs font-bold">{trip.loc}</span>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                    <span className="text-xs font-black text-tertiary uppercase tracking-widest">Budget: {trip.budget}</span>
                    <button className="bg-secondary text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-all">
                      View Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Manage Billing', desc: 'Update payment method or view receipts', icon: CreditCard, color: 'primary' },
            { title: 'Subscription Settings', desc: 'Manage your Gold Tier membership', icon: Award, color: 'secondary' }
          ].map((action, i) => (
            <button key={i} className="bg-surface-container-high/40 p-8 rounded-[2rem] flex items-center justify-between border border-outline-variant/5 shadow-sm hover:shadow-md hover:bg-surface-container-high transition-all text-left">
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-3xl bg-${action.color}/10 text-${action.color} shadow-sm`}>
                  <action.icon size={28} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lg">{action.title}</h4>
                  <p className="text-xs font-semibold text-on-surface-variant leading-relaxed">{action.desc}</p>
                </div>
              </div>
              <div className="p-2 rounded-full text-secondary hover:bg-secondary/10 transition-colors">
                <ChevronRight size={24} />
              </div>
            </button>
          ))}
        </section>
      </main>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    startingCity: '',
    destination: '',
    duration: '5',
    budget: '25000',
    tripType: 'Solo',
    travelStyle: 'Budget'
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] selection:bg-secondary/20 selection:text-secondary">
      <Navbar currentScreen={screen} setScreen={setScreen} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          >
            {screen === 'home' && <HomeScreen onPlan={() => setScreen('planner')} />}
            {screen === 'planner' && (
              <PlannerScreen 
                tripDetails={tripDetails}
                setTripDetails={setTripDetails}
                onFinish={() => setScreen('itinerary')} 
              />
            )}
            {screen === 'itinerary' && <ItineraryScreen />}
            {screen === 'dashboard' && <DashboardScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      
      {/* Floating Action Button (Mobile) */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="md:hidden fixed bottom-8 right-8 z-50 bg-secondary text-white h-14 w-14 rounded-full shadow-2xl flex items-center justify-center border-4 border-white"
        onClick={() => setScreen('planner')}
      >
        <Plus size={24} />
      </motion.button>
    </div>
  );
}

