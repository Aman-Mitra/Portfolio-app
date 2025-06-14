import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [typedText, setTypedText] = useState('');
  const [skillsAnimated, setSkillsAnimated] = useState(false);

  const fullText = "Hi, I'm Aman Mitra";
  
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

  const skills = [
    { name: 'PCB Design (Altium/KiCad)', level: 92, color: 'bg-green-400' },
    { name: 'Embedded C/C++', level: 88, color: 'bg-blue-400' },
    { name: 'Circuit Analysis', level: 90, color: 'bg-yellow-400' },
    { name: 'Microcontrollers (ARM/AVR)', level: 85, color: 'bg-purple-400' },
    { name: 'FPGA Design (Verilog/VHDL)', level: 80, color: 'bg-red-400' },
    { name: 'Power Electronics', level: 78, color: 'bg-indigo-400' },
    { name: 'Signal Processing', level: 75, color: 'bg-pink-400' },
    { name: 'Hardware Testing & Debug', level: 87, color: 'bg-teal-400' }
  ];

  const projects = [
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

  const certifications = [
    'IPC-A-610 Certified (PCB Assembly)',
    'ARM Cortex-M Specialist',
    'Certified LabVIEW Associate Developer',
    'EMC/EMI Compliance Testing'
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                AM
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeSection === item
                        ? 'bg-green-500 text-white'
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
            src="https://images.unsplash.com/photo-1650530415027-dc9199f473ec" 
            alt="Electronics Workbench" 
            className="w-full h-full object-cover opacity-20"
            style={{
              transform: `translateY(${typeof window !== 'undefined' ? window.scrollY * 0.5 : 0}px)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-blue-900/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Hardware Engineer & Electronics Designer
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Passionate about designing innovative electronic systems, from PCB layout to embedded firmware.
            Bridging the gap between digital concepts and physical reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View My Designs
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border-2 border-green-500 text-green-400 font-semibold rounded-lg hover:bg-green-500 hover:text-white transform hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Floating Circuit Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-500/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-teal-500/20 rounded-full animate-ping"></div>
        
        {/* Circuit Pattern Overlay */}
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
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm a passionate hardware engineer with expertise in electronics design, embedded systems, and PCB development. 
                  With a strong foundation in both analog and digital circuit design, I specialize in creating innovative solutions 
                  that bridge the physical and digital worlds.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  My experience spans from low-level firmware development to high-level system architecture. I enjoy the challenge 
                  of optimizing power consumption, ensuring signal integrity, and designing robust systems that perform reliably 
                  in demanding environments. When not designing circuits, I'm exploring emerging technologies like IoT, edge computing, 
                  and sustainable electronics.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I believe in the power of hardware to solve real-world problems and am committed to creating designs that are 
                  not only functional but also manufacturable, testable, and cost-effective.
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Certifications & Specializations</h3>
                  <div className="flex flex-wrap gap-3">
                    {certifications.map((cert) => (
                      <span key={cert} className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1557701197-2f99da0922dd" 
                  alt="Circuit Board" 
                  className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full opacity-50 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible.skills ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Technical Skills & Expertise
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={skill.name} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-green-500/50">
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
              <h3 className="text-2xl font-bold text-center mb-8 text-white">Tools & Software</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'Altium Designer', 'KiCad', 'MATLAB/Simulink', 'LabVIEW', 'LTspice', 
                  'Oscilloscope', 'Logic Analyzer', 'Spectrum Analyzer', 'Soldering Station',
                  'Xilinx Vivado', 'STM32CubeIDE', 'MPLAB X', 'SIwave', 'CST Studio'
                ].map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
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
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Featured Hardware Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-gray-700 hover:border-green-500/50">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full">
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
                        <span key={tech} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300">
                        Schematics
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
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Let's Build Something Together
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Hardware Collaboration</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    I'm always excited to work on challenging hardware projects, from concept to production. 
                    Whether you need PCB design, embedded system development, or hardware consulting, 
                    let's discuss how we can bring your ideas to life.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 text-xl">📧</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-400">aman.mitra@hardware-engineer.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 text-xl">💼</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">LinkedIn</p>
                      <p className="text-gray-400">linkedin.com/in/aman-mitra-hardware</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 text-xl">🔧</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">GitHub</p>
                      <p className="text-gray-400">github.com/aman-mitra-hw</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 text-xl">📚</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Technical Blog</p>
                      <p className="text-gray-400">hardware-insights.blog</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-3">Services Offered</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>• PCB Design & Layout</li>
                    <li>• Embedded System Development</li>
                    <li>• Circuit Analysis & Optimization</li>
                    <li>• Hardware Testing & Validation</li>
                    <li>• Technical Consulting</li>
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="your.email@domain.com"
                  />
                </div>
                <div>
                  <label htmlFor="project-type" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Type
                  </label>
                  <select
                    id="project-type"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white transition-all duration-300"
                  >
                    <option value="">Select Project Type</option>
                    <option value="pcb-design">PCB Design</option>
                    <option value="embedded-system">Embedded System</option>
                    <option value="iot-device">IoT Device</option>
                    <option value="power-electronics">Power Electronics</option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 resize-none"
                    placeholder="Tell me about your hardware project requirements..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
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
              © 2024 Aman Mitra - Hardware Engineer. Designing the future, one circuit at a time. ⚡
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;