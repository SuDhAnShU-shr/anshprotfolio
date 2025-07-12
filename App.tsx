import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Download, 
  Mail, 
  MessageCircle, 
  Sun, 
  Moon, 
  Palette, 
  Zap,
  Code,
  User,
  Briefcase,
  Award,
  MapPin,
  ExternalLink,
  Play,
  FileText,
  Search,
  Send,
  Calendar,
  Star,
  Eye,
  Users,
  TrendingUp,
  Bot,
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Phone
} from 'lucide-react';

type Theme = 'light' | 'dark' | 'neon' | 'pastel';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  icon: string;
  featured: boolean;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  certificateId?: string;
}

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface TimelineItem {
  date: string;
  title: string;
  tech: string[];
}

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [showCodeSandbox, setShowCodeSandbox] = useState(false);
  const [showResumeAnalyzer, setShowResumeAnalyzer] = useState(false);
  const [htmlCode, setHtmlCode] = useState('<div class="animated-button">Click me!</div>');
  const [cssCode, setCssCode] = useState(`.animated-button {
  padding: 12px 24px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
  font-family: Inter, sans-serif;
  font-weight: 600;
}

.animated-button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}`);
  const [jsCode, setJsCode] = useState(`document.querySelector('.animated-button').addEventListener('click', function() {
  this.style.transform = 'scale(0.95)';
  this.textContent = 'Clicked!';
  setTimeout(() => {
    this.style.transform = 'scale(1.05)';
    this.textContent = 'Click me!';
  }, 150);
});`);
  const [activeCodeTab, setActiveCodeTab] = useState('html');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [visitorCount, setVisitorCount] = useState(1247);
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const texts = ['Developer', 'Problem Solver', 'Innovator'];

  const skills: Skill[] = [
    { name: 'HTML', level: 90, icon: '🌐' },
    { name: 'CSS', level: 85, icon: '🎨' },
    { name: 'JavaScript', level: 80, icon: '⚡' },
    { name: 'Python', level: 75, icon: '🐍' },
    { name: 'Linux', level: 70, icon: '🐧' },
    { name: 'DBMS', level: 65, icon: '🗄️' },
    { name: 'C', level: 60, icon: '⚙️' }
  ];

  const timeline: TimelineItem[] = [
    { date: 'August 2024', title: 'Web Fundamentals', tech: ['HTML', 'CSS', 'JavaScript'] },
    { date: 'October 2024', title: 'Backend Development', tech: ['Python'] },
    { date: 'February 2025', title: 'System Programming', tech: ['C', 'DBMS'] },
    { date: 'July 2025', title: 'DevOps & Cloud', tech: ['Docker', 'Kubernetes', 'Linux', 'AWS', 'Jenkins', 'Flask', 'MongoDB'] }
  ];

  const projects: Project[] = [
    {
      id: '1',
      title: 'Rajasthani Di Rasoi',
      description: 'A traditional Rajasthani restaurant website showcasing authentic cuisine and cultural heritage with interactive menu and booking system',
      tech: ['HTML', 'CSS', 'JavaScript'],
      icon: '🍽️',
      featured: true
    },
    {
      id: '2',
      title: 'Public Toilet Locator App',
      description: 'Social impact app helping users find clean public toilets using real-time location, community reviews, and accessibility features',
      tech: ['React Native', 'Firebase', 'Google Maps API'],
      icon: '🚻',
      featured: true
    },
    {
      id: '3',
      title: 'Smart Portfolio Website',
      description: 'This AI-powered portfolio with chatbot, theme switcher, code sandbox, resume analyzer, and interactive animations',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'AI Integration'],
      icon: '🧠',
      featured: true
    }
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'Student Volunteer – One India, One World 2025',
      issuer: 'Lovely Professional University',
      date: 'April 22-24, 2025',
      description: 'Organized national cultural events at LPU as part of the Student Welfare Wing',
    },
    {
      id: '2',
      title: 'Voice of Leadership Anchoring',
      issuer: 'Pradyut Foundation',
      date: '2025',
      description: 'Participated in public speaking & leadership workshop by Dr. Sachin Sidhra',
      certificateId: 'cb4ead25-1f68-414e-a927-89976079ec62'
    },
    {
      id: '3',
      title: 'Linux Essentials Certificate',
      issuer: 'Linux Professional Institute',
      date: '2025',
      description: 'Fundamental Linux system administration and command line skills',
    }
  ];

  // Typing animation effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < texts[textIndex].length) {
        setCurrentText(prev => prev + texts[textIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else if (!isDeleting && charIndex === texts[textIndex].length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex(prev => (prev + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  // Visitor counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Initialize chatbot
  useEffect(() => {
    setChatMessages([{
      text: "Hi 👋 I'm Sudhanshu! Want to explore my best work or download my resume?",
      isUser: false
    }]);
  }, []);

  const themeClasses = {
    light: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-900 text-white',
    neon: 'bg-black text-cyan-400',
    pastel: 'bg-pink-50 text-purple-900'
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'light': return { primary: 'bg-blue-600', secondary: 'bg-purple-600', accent: 'bg-emerald-600' };
      case 'dark': return { primary: 'bg-blue-500', secondary: 'bg-purple-500', accent: 'bg-emerald-500' };
      case 'neon': return { primary: 'bg-cyan-500', secondary: 'bg-pink-500', accent: 'bg-green-500' };
      case 'pastel': return { primary: 'bg-rose-400', secondary: 'bg-violet-400', accent: 'bg-teal-400' };
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      let response = "Thanks for your question! I'm here to help you learn more about Sudhanshu's work.";
      
      if (userMessage.toLowerCase().includes('project') || userMessage.toLowerCase().includes('best')) {
        response = "My best project is the Public Toilet Locator App - it uses React Native, Firebase, and Google Maps API to help people find clean public facilities. It's a social impact project that solves a real problem!";
      } else if (userMessage.toLowerCase().includes('tech') || userMessage.toLowerCase().includes('skill') || userMessage.toLowerCase().includes('stack')) {
        response = "I work with HTML, CSS, JavaScript, Python, Linux, DBMS, and C. I'm also learning Docker, Kubernetes, AWS, and MongoDB. Always excited to pick up new technologies!";
      } else if (userMessage.toLowerCase().includes('intern') || userMessage.toLowerCase().includes('experience') || userMessage.toLowerCase().includes('volunteer')) {
        response = "I volunteered at LPU for the 'One India, One World 2025' cultural event and participated in leadership workshops. It was an amazing experience organizing national-level events!";
      } else if (userMessage.toLowerCase().includes('resume') || userMessage.toLowerCase().includes('cv')) {
        response = "You can download my resume using the 'Resume' button in the hero section. It has all my latest projects, skills, and achievements!";
      } else if (userMessage.toLowerCase().includes('contact') || userMessage.toLowerCase().includes('hire') || userMessage.toLowerCase().includes('work')) {
        response = "I'm always open to new opportunities! You can reach me at sudhanshu.sharma.vs@gmail.com or connect with me on LinkedIn. Let's build something amazing together!";
      }

      setChatMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  const analyzeResume = () => {
    if (!resumeFile) return;

    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResumeAnalysis({
        score: Math.floor(Math.random() * 20) + 75, // 75-95
        strengths: [
          'Strong technical skills section',
          'Good project diversity',
          'Clear formatting and structure',
          'Relevant experience highlighted'
        ],
        improvements: [
          'Add more quantified achievements',
          'Include soft skills section',
          'Add industry-specific keywords',
          'Consider adding a summary section'
        ],
        keywords: ['React', 'JavaScript', 'Python', 'Full-stack', 'Problem-solving', 'Team collaboration']
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const executeCode = () => {
    const iframe = document.getElementById('code-preview') as HTMLIFrameElement;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body style="margin: 20px; font-family: Inter, sans-serif;">
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
        </html>
      `);
      doc.close();
    }
  };

  useEffect(() => {
    if (showCodeSandbox) {
      setTimeout(executeCode, 100);
    }
  }, [htmlCode, cssCode, jsCode, showCodeSandbox]);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your message! I\'ll get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses[theme]}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gradient">Sudhanshu</div>
            
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-blue-400 transition-colors">Skills</button>
              <button onClick={() => scrollToSection('certificates')} className="hover:text-blue-400 transition-colors">Certificates</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">Contact</button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Switcher */}
              <div className="flex items-center space-x-2 glass rounded-lg p-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-2 rounded transition-all ${theme === 'light' ? 'bg-yellow-400 text-black' : 'hover:bg-white/10'}`}
                >
                  <Sun size={16} />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-2 rounded transition-all ${theme === 'dark' ? 'bg-gray-700' : 'hover:bg-white/10'}`}
                >
                  <Moon size={16} />
                </button>
                <button
                  onClick={() => setTheme('neon')}
                  className={`p-2 rounded transition-all ${theme === 'neon' ? 'bg-cyan-500' : 'hover:bg-white/10'}`}
                >
                  <Zap size={16} />
                </button>
                <button
                  onClick={() => setTheme('pastel')}
                  className={`p-2 rounded transition-all ${theme === 'pastel' ? 'bg-pink-400' : 'hover:bg-white/10'}`}
                >
                  <Palette size={16} />
                </button>
              </div>

              <a
                href="https://github.com/SuDhAnShU-shr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-lg hover:scale-110 transition-transform"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="text-gradient">{currentText}</span>
                <span className="animate-pulse">|</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Building the future, one line of code at a time. Passionate about creating innovative solutions that make a difference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
              >
                View My Work
              </button>
              <a
                href="/CV General Sudhanshu.docx"
                download
                className="px-8 py-4 glass border border-white/20 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center gap-2 justify-center"
              >
                <Download size={20} />
                Resume
              </a>
              <a
                href="https://github.com/SuDhAnShU-shr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 glass border border-white/20 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center gap-2 justify-center"
              >
                <Github size={20} />
                GitHub
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{visitorCount.toLocaleString()} visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} />
                <span>Growing daily</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-emerald-400 p-1 animate-float">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 glass rounded-lg p-4 text-center max-w-xs">
                <p className="text-lg font-semibold mb-2">Hi, I'm Sudhanshu 👋</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  I build smart solutions with code and creativity.<br />
                  Let's create something that matters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">About Me</h2>
          <div className="glass rounded-2xl p-8 md:p-12">
            <p className="text-lg leading-relaxed mb-6">
              I'm Sudhanshu, a passionate and curious developer who started with basic web pages and slowly grew into solving real-world problems with code.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              From building my first restaurant website to integrating AI features into my portfolio, I love experimenting and learning new tools.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              I enjoy challenges, real collaboration, and turning ideas into things that people can actually use.
            </p>
            <p className="text-lg leading-relaxed font-semibold text-blue-400">
              If you're building something meaningful, I'd love to be part of it.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Journey Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Tech Journey Timeline</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="glass rounded-lg p-6 hover:scale-105 transition-transform">
                    <div className="flex items-center gap-2 mb-2 justify-center">
                      <Calendar size={16} />
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {item.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 z-10 animate-pulse"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="glass rounded-lg p-6 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-xl font-semibold">{skill.name}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500 mt-2 block">{skill.level}% proficiency</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Featured Projects</h2>
          
          {/* Search Bar */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="glass rounded-xl p-6 hover:scale-105 transition-transform group">
                <div className="text-4xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <ExternalLink size={16} />
                    Live Demo
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 glass border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                    <Github size={16} />
                    Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Interactive Tools</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Analyzer */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-blue-500" size={24} />
                <h3 className="text-xl font-semibold">AI Resume Analyzer</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Upload your resume and get instant AI-powered feedback and suggestions.
              </p>
              <button
                onClick={() => setShowResumeAnalyzer(true)}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 transition-transform"
              >
                Try Resume Analyzer
              </button>
            </div>

            {/* Code Sandbox */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-emerald-500" size={24} />
                <h3 className="text-xl font-semibold">Live Code Sandbox</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Test and run HTML, CSS, and JavaScript code in real-time.
              </p>
              <button
                onClick={() => setShowCodeSandbox(true)}
                className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-transform"
              >
                Open Code Editor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Certificates & Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div key={cert.id} className="glass rounded-xl p-6 hover:scale-105 transition-transform group cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-yellow-500" size={24} />
                  <span className="text-sm text-gray-500">{cert.date}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                <p className="text-blue-400 mb-3">{cert.issuer}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{cert.description}</p>
                {cert.certificateId && (
                  <p className="text-xs text-gray-500 mb-4">ID: {cert.certificateId}</p>
                )}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                    <ExternalLink size={14} />
                    View Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gradient">Location</h2>
          <div className="glass rounded-xl p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="text-red-500" size={24} />
              <span className="text-xl font-semibold">Phagwara, Punjab</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Volunteered at LPU – One India, One World 2025 cultural festival
            </p>
            <div className="h-64 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="text-white text-center z-10">
                <MapPin size={48} className="mx-auto mb-2 animate-bounce" />
                <p className="font-semibold text-lg">Lovely Professional University</p>
                <p className="text-sm opacity-90">Cultural Event Volunteer - 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-500" size={20} />
                  <a href="mailto:sudhanshu.sharma.vs@gmail.com" className="hover:text-blue-400 transition-colors">
                    sudhanshu.sharma.vs@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="text-gray-500" size={20} />
                  <a href="https://github.com/SuDhAnShU-shr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    github.com/SuDhAnShU-shr
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <User className="text-blue-500" size={20} />
                  <a href="https://www.linkedin.com/in/sudhanshu-sharma-1745b8324" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-8">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 mb-4">
            © 2025 Sudhanshu Sharma. Built with React, TypeScript, and lots of ☕
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/SuDhAnShU-shr" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="mailto:sudhanshu.sharma.vs@gmail.com" className="text-gray-500 hover:text-blue-400 transition-colors">
              <Mail size={20} />
            </a>
            <a href="https://www.linkedin.com/in/sudhanshu-sharma-1745b8324" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
              <User size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Contact Icons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a
          href="https://wa.me/YOUR_PHONE_NUMBER"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        >
          <MessageCircle size={24} />
        </a>
        <a
          href="mailto:sudhanshu.sharma.vs@gmail.com"
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        >
          <Mail size={24} />
        </a>
      </div>

      {/* AI Chatbot */}
      <div className="fixed bottom-24 right-6 z-50">
        {!showChatbot ? (
          <button
            onClick={() => setShowChatbot(true)}
            className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg animate-pulse"
          >
            <Bot size={28} />
          </button>
        ) : (
          <div className="w-80 h-96 glass rounded-lg border border-white/20 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bot className="text-blue-500" size={20} />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.isUser 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 glass rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Resume Analyzer Modal */}
      {showResumeAnalyzer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">AI Resume Analyzer</h3>
              <button
                onClick={() => setShowResumeAnalyzer(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {!resumeAnalysis ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-lg mb-2">Upload your resume</p>
                  <p className="text-sm text-gray-500 mb-4">Supports PDF and DOCX files</p>
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors inline-block"
                  >
                    Choose File
                  </label>
                </div>

                {resumeFile && (
                  <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="text-green-500" size={20} />
                      <span>{resumeFile.name}</span>
                    </div>
                    <button
                      onClick={analyzeResume}
                      disabled={isAnalyzing}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500 mb-2">{resumeAnalysis.score}/100</div>
                  <p className="text-gray-600 dark:text-gray-300">Overall Resume Score</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={20} />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {resumeAnalysis.strengths.map((strength: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                          • {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="text-orange-500" size={20} />
                      Improvements
                    </h4>
                    <ul className="space-y-2">
                      {resumeAnalysis.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                          • {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Recommended Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeAnalysis.keywords.map((keyword: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setResumeAnalysis(null);
                    setResumeFile(null);
                  }}
                  className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Analyze Another Resume
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Code Sandbox Modal */}
      {showCodeSandbox && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Live Code Sandbox</h3>
              <button
                onClick={() => setShowCodeSandbox(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 h-[70vh]">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveCodeTab('html')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeCodeTab === 'html' ? 'bg-orange-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    HTML
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('css')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeCodeTab === 'css' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    CSS
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('js')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeCodeTab === 'js' ? 'bg-yellow-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    JavaScript
                  </button>
                </div>

                <div className="h-full">
                  {activeCodeTab === 'html' && (
                    <textarea
                      value={htmlCode}
                      onChange={(e) => setHtmlCode(e.target.value)}
                      className="w-full h-full p-4 glass rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
                      placeholder="Enter HTML code..."
                    />
                  )}
                  {activeCodeTab === 'css' && (
                    <textarea
                      value={cssCode}
                      onChange={(e) => setCssCode(e.target.value)}
                      className="w-full h-full p-4 glass rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
                      placeholder="Enter CSS code..."
                    />
                  )}
                  {activeCodeTab === 'js' && (
                    <textarea
                      value={jsCode}
                      onChange={(e) => setJsCode(e.target.value)}
                      className="w-full h-full p-4 glass rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
                      placeholder="Enter JavaScript code..."
                    />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Live Preview</h4>
                  <button
                    onClick={executeCode}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <Play size={16} />
                    Run Code
                  </button>
                </div>
                <iframe
                  id="code-preview"
                  className="w-full h-full border border-white/20 rounded-lg bg-white"
                  title="Code Preview"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;