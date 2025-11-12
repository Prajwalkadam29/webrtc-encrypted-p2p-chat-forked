import React, { useState, useEffect } from 'react';
import { Wallet, Shield, Lock, Zap, Users, MessageSquare, FileText, CheckCircle, Github, Twitter, ChevronRight, Sparkles, Code, Globe, ArrowRight, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import ThreeBackground from './ThreeBackground';

const LandingPage = ({ onGetStarted }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [theme, setTheme] = useState('dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const features = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'AES-GCM-256 encryption ensures your messages stay private. Only you and your peers can read the messages.',
      detail: 'Using Web Crypto API with ECDH key exchange'
    },
    {
      icon: Zap,
      title: 'Peer-to-Peer Connection',
      description: 'Direct WebRTC connections between users. No central server can access your data.',
      detail: 'Mesh topology supporting up to 4 users per room'
    },
    {
      icon: Shield,
      title: 'Web3 Authentication',
      description: 'Sign in with your Ethereum wallet using Sign-In with Ethereum (SIWE) standard.',
      detail: 'ERC-4361 compliant, works with all EVM chains'
    },
    {
      icon: FileText,
      title: 'Secure File Sharing',
      description: 'Share files with SHA-256 integrity verification and chunked transfer for reliability.',
      detail: 'Support for large files with progress tracking'
    }
  ];

  const stats = [
    { value: '4', label: 'Users per Room', sublabel: 'Mesh topology' },
    { value: '256-bit', label: 'AES-GCM', sublabel: 'Encryption' },
    { value: 'Zero', label: 'Server Storage', sublabel: 'True P2P' },
    { value: '100%', label: 'Open Source', sublabel: 'On GitHub' }
  ];

  const useCases = [
    {
      emoji: '💼',
      title: 'Team Collaboration',
      description: 'Discuss sensitive projects without corporate surveillance'
    },
    {
      emoji: '🏥',
      title: 'Healthcare',
      description: 'HIPAA-compliant communication for patient privacy'
    },
    {
      emoji: '⚖️',
      title: 'Legal Services',
      description: 'Attorney-client privileged conversations'
    },
    {
      emoji: '🎓',
      title: 'Education',
      description: 'Private tutoring and academic discussions'
    },
    {
      emoji: '💰',
      title: 'Finance',
      description: 'Secure discussions about investments and trading'
    },
    {
      emoji: '🌍',
      title: 'Activists',
      description: 'Free speech without censorship or surveillance'
    }
  ];

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }} className="bg-white dark:bg-vscode-dark transition-colors duration-300">
      {/* Background - only show in dark mode */}
      {/* Background - visible in both modes */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }} className="opacity-100 transition-opacity duration-300">
        <ThreeBackground theme={theme} />
      </div>


      {/* Gradient overlay */}
      <div 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 1,
          pointerEvents: 'none'
        }} 
        className="bg-gradient-to-b from-transparent via-transparent to-transparent dark:bg-gradient-radial dark:from-vscode-dark/60 dark:to-vscode-dark/90 transition-all duration-300"
      />

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Fixed Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-white/80 dark:bg-vscode-card/30 border-b border-gray-200 dark:border-vscode-border/30 transition-colors duration-300"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-metamask-orange to-metamask-yellow flex items-center justify-center">
              <MessageSquare size={24} className="text-vscode-dark" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white font-bold text-xl transition-colors">DAuthChat</h1>
              <p className="text-gray-500 dark:text-vscode-text-muted text-xs transition-colors">Decentralized P2P Messaging</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#features" className="text-gray-600 dark:text-vscode-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Features</a>
            <a href="#how-it-works" className="text-gray-600 dark:text-vscode-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors text-sm">How It Works</a>
            <a href="#use-cases" className="text-gray-600 dark:text-vscode-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Use Cases</a>
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="flex items-center justify-center w-[60px] h-[30px] rounded-full bg-gray-200 dark:bg-zinc-700 p-[3px] hover:cursor-pointer transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="flex items-center justify-center w-[24px] h-[24px] rounded-full bg-white dark:bg-zinc-900 shadow-md"
                animate={{ x: theme === 'dark' ? 26 : 0 }}
                transition={spring}
              >
                {theme === 'dark' ? (
                  <Moon size={14} className="text-yellow-400" />
                ) : (
                  <Sun size={14} className="text-orange-500" />
                )}
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="bg-gradient-to-r from-metamask-orange to-metamask-yellow text-vscode-dark font-bold px-6 py-2.5 rounded-lg flex items-center space-x-2"
            >
              <Wallet size={18} />
              <span>Get Started</span>
            </motion.button>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section id="features" className="px-8 pt-32 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left: Hero Text */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-vscode-hover/50 backdrop-blur-sm border border-gray-200 dark:border-vscode-border/50 mb-6 transition-colors"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Sparkles size={16} className="text-metamask-orange" />
                <span className="text-xs text-gray-600 dark:text-vscode-text-secondary font-semibold transition-colors">100% Open Source • Zero Data Collection</span>
              </motion.div>

              <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors">
                Private Chat,<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-metamask-orange to-metamask-yellow">
                  Zero Compromise
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-vscode-text-secondary mb-8 leading-relaxed transition-colors">
                End-to-end encrypted peer-to-peer messaging powered by Web3. 
                No servers, no tracking, no censorship. Your conversations belong to you.
              </p>

              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(246, 133, 27, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-metamask-orange to-metamask-yellow text-vscode-dark font-bold px-8 py-4 rounded-xl flex items-center space-x-3 text-lg shadow-lg"
                >
                  <Wallet size={24} />
                  <span>Connect Wallet</span>
                  <ArrowRight size={20} />
                </motion.button>

                <motion.a
                  href="https://github.com/Moral-Victory/webrtc-encrypted-p2p-chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl border-2 border-gray-300 dark:border-vscode-border hover:border-metamask-orange dark:hover:border-metamask-orange text-gray-900 dark:text-white font-semibold flex items-center space-x-2 transition-colors"
                >
                  <Github size={20} />
                  <span>View on GitHub</span>
                </motion.a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-metamask-orange mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-900 dark:text-white font-semibold transition-colors">{stat.label}</div>
                    <div className="text-xs text-gray-500 dark:text-vscode-text-muted transition-colors">{stat.sublabel}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Feature Cards */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 10 }}
                  onClick={() => setActiveFeature(index)}
                  className={`p-6 rounded-2xl backdrop-blur-md border cursor-pointer transition-all ${
                    activeFeature === index 
                      ? 'bg-white dark:bg-vscode-card/80 border-metamask-orange/50 shadow-lg shadow-metamask-orange/20' 
                      : 'bg-white/50 dark:bg-vscode-card/40 border-gray-200 dark:border-vscode-border/30 hover:border-metamask-orange/30'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      activeFeature === index ? 'bg-metamask-orange/20' : 'bg-gray-100 dark:bg-vscode-hover/50'
                    } transition-colors`}>
                      <feature.icon size={24} className={activeFeature === index ? 'text-metamask-orange' : 'text-gray-600 dark:text-vscode-accent'} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2 transition-colors">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-vscode-text-secondary text-sm mb-2 transition-colors">{feature.description}</p>
                      {activeFeature === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-200 dark:border-vscode-border/30"
                        >
                          <Code size={14} className="text-metamask-orange" />
                          <span className="text-xs text-gray-500 dark:text-vscode-text-muted transition-colors">{feature.detail}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-8 py-20 bg-gray-50 dark:bg-vscode-darker/50 backdrop-blur-sm transition-colors">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">How It Works</h2>
              <p className="text-xl text-gray-600 dark:text-vscode-text-secondary transition-colors">Simple, secure, and decentralized</p>
            </motion.div>

            <div className="grid grid-cols-4 gap-8">
              {[
                { 
                  step: '01', 
                  icon: Wallet, 
                  title: 'Connect Wallet', 
                  description: 'Sign in with MetaMask wallet'
                },
                { 
                  step: '02', 
                  icon: Users, 
                  title: 'Join a Room', 
                  description: 'Choose a room and establish direct P2P connections with other users'
                },
                { 
                  step: '03', 
                  icon: Lock, 
                  title: 'Keys Exchange', 
                  description: 'ECDH key exchange creates unique encryption keys for each peer'
                },
                { 
                  step: '04', 
                  icon: MessageSquare, 
                  title: 'Chat Securely', 
                  description: 'Send encrypted messages and files directly to your peers'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative"
                >
                  <div className="p-6 rounded-2xl bg-white dark:bg-vscode-card/60 backdrop-blur-md border border-gray-200 dark:border-vscode-border/30 hover:border-metamask-orange/30 transition-all">
                    <div className="text-6xl font-bold text-gray-400 dark:text-vscode-hover mb-4 transition-colors">{item.step}</div>
                    <div className="w-12 h-12 rounded-xl bg-metamask-orange/20 flex items-center justify-center mb-4">
                      <item.icon size={24} className="text-metamask-orange" />
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2 transition-colors">{item.title}</h3>
                    <p className="text-gray-600 dark:text-vscode-text-secondary text-sm transition-colors">{item.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ChevronRight size={24} className="text-gray-300 dark:text-vscode-border transition-colors" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="px-8 py-20 bg-white dark:bg-transparent transition-colors">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Who Benefits?</h2>
              <p className="text-xl text-gray-600 dark:text-vscode-text-secondary transition-colors">Privacy matters across industries</p>
            </motion.div>

            <div className="grid grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 rounded-2xl bg-white dark:bg-vscode-card/60 backdrop-blur-md border border-gray-200 dark:border-vscode-border/30 hover:border-metamask-orange/30 transition-all text-center"
                >
                  <div className="text-5xl mb-4">{useCase.emoji}</div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2 transition-colors">{useCase.title}</h3>
                  <p className="text-gray-600 dark:text-vscode-text-secondary text-sm transition-colors">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 py-20 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-metamask-orange/10 dark:to-metamask-yellow/10 backdrop-blur-sm transition-colors">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Ready to Chat Privately?</h2>
              <p className="text-xl text-gray-600 dark:text-vscode-text-secondary mb-10 transition-colors">
                No signup, no email, no phone number. Just your wallet.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 50px rgba(246, 133, 27, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="bg-gradient-to-r from-metamask-orange to-metamask-yellow text-vscode-dark font-bold px-12 py-5 rounded-xl flex items-center space-x-3 text-xl shadow-2xl mx-auto"
              >
                <Wallet size={28} />
                <span>Connect Your Wallet</span>
                <Sparkles size={24} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-10 backdrop-blur-md bg-gray-100 dark:bg-vscode-darker/50 border-t border-gray-200 dark:border-vscode-border/30 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-metamask-orange to-metamask-yellow flex items-center justify-center">
                <MessageSquare size={18} className="text-vscode-dark" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-semibold transition-colors">DAuthChat</p>
                <p className="text-gray-500 dark:text-vscode-text-muted text-xs transition-colors">© 2025 • Open Source</p>
              </div>
            </div>

            {/* <div className="flex items-center space-x-6">
              <a href="https://github.com" className="text-gray-600 dark:text-vscode-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-600 dark:text-vscode-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://discord.com" className="text-gray-600 dark:text-vscode-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors">
                <MessageSquare size={20} />
              </a>
            </div> */}

            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-vscode-text-muted transition-colors">
              <CheckCircle size={14} className="text-green-500 dark:text-green-400" />
              <span>All data stays on your device</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
