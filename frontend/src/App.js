import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [typedText, setTypedText] = useState('');
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [mode, setMode] = useState('hardware'); // 'software' or 'hardware'

  const fullText = "Hi, I'm Aman Mitra";
  
  // ==================== EDITABLE DATA SECTION ====================
  // 🎯 EDIT THESE SECTIONS TO CUSTOMIZE YOUR PORTFOLIO
  
  // Software Skills - Edit percentages here
  const SOFTWARE_SKILLS = [
    { name: 'JavaScript', level: 90, color: 'bg-yellow-400' },
    { name: 'React', level: 85, color: 'bg-blue-400' },
    { name: 'Node.js', level: 80, color: 'bg-green-400' },
    { name: 'Python', level: 88, color: 'bg-blue-600' },
    { name: 'TypeScript', level: 82, color: 'bg-blue-500' },
    { name: 'MongoDB', level: 75, color: 'bg-green-600' },
    { name: 'UI/UX Design', level: 70, color: 'bg-purple-400' },
    { name: 'AWS/Cloud', level: 65, color: 'bg-orange-400' }
  ];

  // Hardware Skills - Edit percentages here
  const HARDWARE_SKILLS = [
    { name: 'PCB Design (Altium/KiCad)', level: 92, color: 'bg-green-400' },
    { name: 'Embedded C/C++', level: 88, color: 'bg-blue-400' },
    { name: 'Circuit Analysis', level: 90, color: 'bg-yellow-400' },
    { name: 'Microcontrollers (ARM/AVR)', level: 85, color: 'bg-purple-400' },
    { name: 'FPGA Design (Verilog/VHDL)', level: 80, color: 'bg-red-400' },
    { name: 'Power Electronics', level: 78, color: 'bg-indigo-400' },
    { name: 'Signal Processing', level: 75, color: 'bg-pink-400' },
    { name: 'Hardware Testing & Debug', level: 87, color: 'bg-teal-400' }
  ];

  // Software Projects - Add/Remove projects here
  const SOFTWARE_PROJECTS = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and integrated payment processing',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      status: 'Completed',
      type: 'Full Stack'
    },
    {
      id: 2,
      title: 'Real-time Chat Application',
      description: 'WebSocket-based chat app with user authentication and message encryption',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
      technologies: ['React', 'Socket.io', 'Node.js', 'JWT', 'Redis'],
      status: 'In Progress',
      type: 'Real-time App'
    },
    {
      id: 3,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Machine learning dashboard for data visualization and predictive analytics',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5',
      technologies: ['React', 'Python', 'TensorFlow', 'D3.js', 'FastAPI'],
      status: 'Completed',
      type: 'AI/ML'
    },
    {
      id: 4,
      title: 'Mobile Task Manager',
      description: 'Cross-platform mobile app for task management with offline sync',
      image: 'https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg',
      technologies: ['React Native', 'Firebase', 'Redux', 'AsyncStorage'],
      status: 'Testing Phase',
      type: 'Mobile App'
    }
  ];

  // Hardware Projects - Add/Remove projects here
  const HARDWARE_PROJECTS = [
    {
      id: 1,
      title: 'IoT Environmental Monitor',
      description: 'Multi-sensor PCB with ESP32 for real-time environmental monitoring with wireless data transmission',
      image: 'https://images.unsplash.com/photo-1557701197-2f99da0922dd',
      technologies: ['ESP32', 'PCB Design', 'I2C/SPI', 'WiFi', 'Custom Sensors'],
      status: 'Completed',
      type: 'Embedded System'
    },
    {
      id: 2,
      title: 'FPGA-based Signal Processor',
      description: 'Real-time digital signal processing system using Xilinx FPGA with custom DSP algorithms',
      image: 'https://images.unsplash.com/photo-1610878785620-3ab2d3a2ae7b',
      technologies: ['Xilinx FPGA', 'Verilog', 'DSP', 'High-Speed ADC', 'UART'],
      status: 'In Progress',
      type: 'Digital Design'
    },
    {
      id: 3,
      title: 'Power Management Unit',
      description: 'Efficient switching power supply with multiple rails and protection circuits for embedded systems',
      image: 'https://images.unsplash.com/photo-1569615313731-7407da4f4594',
      technologies: ['SMPS Design', 'Buck/Boost Converters', 'LDO', 'Protection Circuits'],
      status: 'Completed',
      type: 'Power Electronics'
    },
    {
      id: 4,
      title: 'ARM-based Control System',
      description: 'Industrial control unit with STM32 microcontroller, CAN communication, and HMI interface',
      image: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec',
      technologies: ['STM32', 'CAN Bus', 'Motor Control', 'HMI', 'Industrial Protocols'],
      status: 'Testing Phase',
      type: 'Control Systems'
    }
  ];

  // Software Certifications - Add/Remove here
  const SOFTWARE_CERTIFICATIONS = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional Developer',
    'MongoDB Certified Developer',
    'React Advanced Certification',
    'Node.js Professional Certificate'
  ];

  // Hardware Certifications - Add/Remove here
  const HARDWARE_CERTIFICATIONS = [
    'IPC-A-610 Certified (PCB Assembly)',
    'ARM Cortex-M Specialist',
    'Certified LabVIEW Associate Developer',
    'EMC/EMI Compliance Testing',
    'Xilinx Certified FPGA Developer'
  ];

  // Software Tools
  const SOFTWARE_TOOLS = [
    'VS Code', 'Git', 'Docker', 'Kubernetes', 'AWS', 'MongoDB', 
    'PostgreSQL', 'Redis', 'Figma', 'Postman', 'Jest', 'Webpack',
    'Next.js', 'GraphQL'
  ];

  // Hardware Tools
  const HARDWARE_TOOLS = [
    'Altium Designer', 'KiCad', 'MATLAB/Simulink', 'LabVIEW', 'LTspice', 
    'Oscilloscope', 'Logic Analyzer', 'Spectrum Analyzer', 'Soldering Station',
    'Xilinx Vivado', 'STM32CubeIDE', 'MPLAB X', 'SIwave', 'CST Studio'
  ];

  // ==================== END EDITABLE DATA SECTION ====================

  // Get current data based on mode
  const currentSkills = mode === 'software' ? SOFTWARE_SKILLS : HARDWARE_SKILLS;
  const currentProjects = mode === 'software' ? SOFTWARE_PROJECTS : HARDWARE_PROJECTS;
  const currentCertifications = mode === 'software' ? SOFTWARE_CERTIFICATIONS : HARDWARE_CERTIFICATIONS;
  const currentTools = mode === 'software' ? SOFTWARE_TOOLS : HARDWARE_TOOLS;

  // Mode-specific content
  const modeContent = {
    software: {
      title: 'Full Stack Developer & Software Engineer',
      subtitle: 'Passionate about creating beautiful, functional, and user-friendly applications that make a difference in people\'s lives.',
      heroImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5',
      aboutText: [
        'I\'m a passionate full-stack developer with a keen eye for design and a love for creating innovative solutions. With several years of experience in web development, I specialize in modern JavaScript frameworks and have a strong foundation in both frontend and backend technologies.',
        'When I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while brainstorming the next big idea. I believe in writing clean, maintainable code and creating user experiences that delight and inspire.',
        'I believe in the power of technology to solve real-world problems and am committed to creating applications that are not only functional but also scalable, maintainable, and user-centric.'
      ],
      aboutImage: 'https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg',
      primaryColor: 'purple',
      secondaryColor: 'pink',
      accentColor: 'blue'
    },
    hardware: {
      title: 'Hardware Engineer & Electronics Designer',
      subtitle: 'Passionate about designing innovative electronic systems, from PCB layout to embedded firmware. Bridging the gap between digital concepts and physical reality.',
      heroImage: 'https://images.unsplash.com/photo-1650530415027-dc9199f473ec',
      aboutText: [
        'I\'m a passionate hardware engineer with expertise in electronics design, embedded systems, and PCB development. With a strong foundation in both analog and digital circuit design, I specialize in creating innovative solutions that bridge the physical and digital worlds.',
        'My experience spans from low-level firmware development to high-level system architecture. I enjoy the challenge of optimizing power consumption, ensuring signal integrity, and designing robust systems that perform reliably in demanding environments.',
        'I believe in the power of hardware to solve real-world problems and am committed to creating designs that are not only functional but also manufacturable, testable, and cost-effective.'
      ],
      aboutImage: 'https://images.unsplash.com/photo-1557701197-2f99da0922dd',
      primaryColor: 'green',
      secondaryColor: 'blue',
      accentColor: 'teal'
    }
  };

  const current = modeContent[mode];

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Reset animations when mode changes
  useEffect(() => {
    setSkillsAnimated(false);
    setTimeout(() => setSkillsAnimated(true), 500);
  }, [mode]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
            if (entry.target.id === 'skills') {
              setSkillsAnimated(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  const toggleMode = (newMode) => {
    setMode(newMode);
    setSkillsAnimated(false);
    setTimeout(() => setSkillsAnimated(true), 500);
  };

  const getColorClasses = (type) => {
    const colors = {
      software: {
        primary: 'purple',
        secondary: 'pink',
        accent: 'blue'
      },
      hardware: {
        primary: 'green',
        secondary: 'blue',
        accent: 'teal'
      }
    };
    
    const colorSet = colors[mode];
    return `${colorSet[type]}-500`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className={`text-2xl font-bold bg-gradient-to-r from-${current.primaryColor}-400 to-${current.secondaryColor}-400 bg-clip-text text-transparent`}>
                AM
              </span>
            </div>
            
            {/* Mode Toggle Buttons */}
            <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => toggleMode('software')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  mode === 'software'
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                💻 Software
              </button>
              <button
                onClick={() => toggleMode('hardware')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  mode === 'hardware'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                ⚡ Hardware
              </button>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeSection === item
                        ? `bg-${current.primaryColor}-500 text-white`
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={current.heroImage} 
            alt="Background" 
            className="w-full h-full object-cover opacity-20 transition-all duration-1000"
            style={{
              transform: `translateY(${typeof window !== 'undefined' ? window.scrollY * 0.5 : 0}px)`
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r from-${current.primaryColor}-900/50 to-${current.secondaryColor}-900/50`}></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className={`bg-gradient-to-r from-${current.primaryColor}-400 via-${current.secondaryColor}-400 to-${current.accentColor}-400 bg-clip-text text-transparent`}>
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {current.title}
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            {current.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className={`px-8 py-3 bg-gradient-to-r from-${current.primaryColor}-500 to-${current.secondaryColor}-500 text-white font-semibold rounded-lg hover:from-${current.primaryColor}-600 hover:to-${current.secondaryColor}-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              {mode === 'software' ? 'View My Code' : 'View My Designs'}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-3 border-2 border-${current.primaryColor}-500 text-${current.primaryColor}-400 font-semibold rounded-lg hover:bg-${current.primaryColor}-500 hover:text-white transform hover:scale-105 transition-all duration-300`}
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Floating elements */}
        <div className={`absolute top-20 left-10 w-20 h-20 bg-${current.primaryColor}-500/20 rounded-full animate-bounce`}></div>
        <div className={`absolute bottom-20 right-10 w-16 h-16 bg-${current.secondaryColor}-500/20 rounded-full animate-pulse`}></div>
        <div className={`absolute top-1/2 left-5 w-12 h-12 bg-${current.accentColor}-500/20 rounded-full animate-ping`}></div>
        
        {/* Mode-specific overlay patterns */}
        {mode === 'hardware' && (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0,10 L10,10 M10,0 L10,20 M10,10 L20,10" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                  <circle cx="10" cy="10" r="1" fill="currentColor"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)"/>
            </svg>
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-${current.primaryColor}-400 to-${current.secondaryColor}-400 bg-clip-text text-transparent`}>
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {current.aboutText.map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">
                    {mode === 'software' ? 'Specializations' : 'Certifications & Specializations'}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {currentCertifications.slice(0, 4).map((cert) => (
                      <span key={cert} className={`px-4 py-2 bg-${current.primaryColor}-500/20 text-${current.primaryColor}-300 rounded-full text-sm`}>
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={current.aboutImage} 
                  alt="About" 
                  className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-${current.primaryColor}-500 to-${current.secondaryColor}-500 rounded-full opacity-70 animate-pulse`}></div>
                <div className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-${current.secondaryColor}-500 to-${current.accentColor}-500 rounded-full opacity-50 animate-bounce`}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible.skills ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-${current.primaryColor}-400 to-${current.secondaryColor}-400 bg-clip-text text-transparent`}>
              {mode === 'software' ? 'Technical Skills & Expertise' : 'Hardware Skills & Expertise'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {currentSkills.map((skill, index) => (
                <div key={skill.name} className={`bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-${current.primaryColor}-500/50`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium text-white">{skill.name}</span>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${skill.color} transition-all duration-1000 ease-out relative overflow-hidden`}
                      style={{ 
                        width: skillsAnimated ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 200}ms`
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tools & Software */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8 text-white">
                {mode === 'software' ? 'Technologies & Tools' : 'Tools & Software'}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {currentTools.map((tool) => (
                  <span key={tool} className={`px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 rounded-lg hover:from-${current.primaryColor}-600 hover:to-${current.secondaryColor}-600 transition-all duration-300 transform hover:scale-105`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible.projects ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-${current.primaryColor}-400 to-${current.secondaryColor}-400 bg-clip-text text-transparent`}>
              {mode === 'software' ? 'Featured Software Projects' : 'Featured Hardware Projects'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {currentProjects.map((project) => (
                <div key={project.id} className={`bg-gray-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-gray-700 hover:border-${current.primaryColor}-500/50`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 bg-${current.primaryColor}-500/90 text-white text-xs font-medium rounded-full`}>
                        {project.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        project.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 
                        project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className={`px-3 py-1 bg-${current.primaryColor}-500/20 text-${current.primaryColor}-300 rounded-full text-sm`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button className={`flex-1 px-4 py-2 bg-${current.primaryColor}-500 text-white rounded-lg hover:bg-${current.primaryColor}-600 transition-colors duration-300`}>
                        {mode === 'software' ? 'View Code' : 'View Details'}
                      </button>
                      <button className={`px-4 py-2 border border-${current.primaryColor}-500 text-${current.primaryColor}-400 rounded-lg hover:bg-${current.primaryColor}-500 hover:text-white transition-all duration-300`}>
                        {mode === 'software' ? 'Live Demo' : 'Schematics'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-${current.primaryColor}-400 to-${current.secondaryColor}-400 bg-clip-text text-transparent`}>
              {mode === 'software' ? 'Let\'s Build Something Amazing' : 'Let\'s Build Something Together'}
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {mode === 'software' ? 'Software Collaboration' : 'Hardware Collaboration'}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {mode === 'software' 
                      ? 'I\'m always excited to work on challenging software projects, from web applications to mobile apps. Whether you need full-stack development, frontend design, or technical consulting, let\'s discuss how we can bring your digital ideas to life.'
                      : 'I\'m always excited to work on challenging hardware projects, from concept to production. Whether you need PCB design, embedded system development, or hardware consulting, let\'s discuss how we can bring your ideas to life.'
                    }
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-${current.primaryColor}-500/20 rounded-full flex items-center justify-center`}>
                      <span className={`text-${current.primaryColor}-400 text-xl`}>📧</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-400">
                        {mode === 'software' ? 'aman.mitra@developer.com' : 'aman.mitra@hardware-engineer.com'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-${current.primaryColor}-500/20 rounded-full flex items-center justify-center`}>
                      <span className={`text-${current.primaryColor}-400 text-xl`}>💼</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">LinkedIn</p>
                      <p className="text-gray-400">
                        {mode === 'software' ? 'linkedin.com/in/aman-mitra-dev' : 'linkedin.com/in/aman-mitra-hardware'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-${current.primaryColor}-500/20 rounded-full flex items-center justify-center`}>
                      <span className={`text-${current.primaryColor}-400 text-xl`}>
                        {mode === 'software' ? '🐙' : '🔧'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">GitHub</p>
                      <p className="text-gray-400">
                        {mode === 'software' ? 'github.com/aman-mitra-dev' : 'github.com/aman-mitra-hw'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-3">Services Offered</h4>
                  <ul className="space-y-2 text-gray-400">
                    {mode === 'software' ? (
                      <>
                        <li>• Full Stack Web Development</li>
                        <li>• Mobile App Development</li>
                        <li>• UI/UX Design & Prototyping</li>
                        <li>• API Development & Integration</li>
                        <li>• Technical Consulting</li>
                      </>
                    ) : (
                      <>
                        <li>• PCB Design & Layout</li>
                        <li>• Embedded System Development</li>
                        <li>• Circuit Analysis & Optimization</li>
                        <li>• Hardware Testing & Validation</li>
                        <li>• Technical Consulting</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-${current.primaryColor}-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-${current.primaryColor}-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                    placeholder="your.email@domain.com"
                  />
                </div>
                <div>
                  <label htmlFor="project-type" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Type
                  </label>
                  <select
                    id="project-type"
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-${current.primaryColor}-500 focus:border-transparent text-white transition-all duration-300`}
                  >
                    <option value="">Select Project Type</option>
                    {mode === 'software' ? (
                      <>
                        <option value="web-app">Web Application</option>
                        <option value="mobile-app">Mobile App</option>
                        <option value="api-development">API Development</option>
                        <option value="ui-ux-design">UI/UX Design</option>
                        <option value="consulting">Technical Consulting</option>
                        <option value="other">Other</option>
                      </>
                    ) : (
                      <>
                        <option value="pcb-design">PCB Design</option>
                        <option value="embedded-system">Embedded System</option>
                        <option value="iot-device">IoT Device</option>
                        <option value="power-electronics">Power Electronics</option>
                        <option value="consulting">Technical Consulting</option>
                        <option value="other">Other</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-${current.primaryColor}-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 resize-none`}
                    placeholder={mode === 'software' 
                      ? 'Tell me about your software project requirements...'
                      : 'Tell me about your hardware project requirements...'
                    }
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full px-8 py-3 bg-gradient-to-r from-${current.primaryColor}-500 to-${current.secondaryColor}-500 text-white font-semibold rounded-lg hover:from-${current.primaryColor}-600 hover:to-${current.secondaryColor}-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  Start Project Discussion
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Aman Mitra - {mode === 'software' ? 'Full Stack Developer' : 'Hardware Engineer'}. 
              {mode === 'software' ? ' Building the future, one line of code at a time. 💻' : ' Designing the future, one circuit at a time. ⚡'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;