import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Tilt from 'react-parallax-tilt';
import profileImage from '../../assets/Mohd_Faiz.png';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaCode, 
  FaPalette, 
  FaTerminal, 
  FaDownload, 
  FaInstagram,
  FaDatabase,
  FaLaptopCode,
  FaChartLine,
  FaStar,
  FaGitAlt,
  FaCalendarAlt,
  FaFire,
  FaAward,
  FaRocket,
  FaCrown,
  FaCoffee,
  FaSmile,
  FaTrophy,
  FaMedal
} from 'react-icons/fa';
import { SiLeetcode, SiGithub } from 'react-icons/si';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const About = () => {
  const [leetcodeStats, setLeetcodeStats] = useState({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    ranking: 0,
    acceptance: 0,
    loading: true
  });

  const [githubStats, setGithubStats] = useState({
    publicRepos: 0,
    totalCommits: 0,
    followers: 0,
    following: 0,
    contributions: [],
    languages: {},
    loading: true
  });

  const [activeTab, setActiveTab] = useState('leetcode');

  // Fetch LeetCode stats
  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch('https://leetcode-stats-api.herokuapp.com/MrFaiz');
        const data = await response.json();
        
        if (data.status === 'success') {
          setLeetcodeStats({
            totalSolved: data.totalSolved || 523,
            easySolved: data.easySolved || 215,
            mediumSolved: data.mediumSolved || 248,
            hardSolved: data.hardSolved || 60,
            ranking: data.ranking || 142857,
            acceptance: data.acceptanceRate || 68,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        setLeetcodeStats({
          totalSolved: 523,
          easySolved: 215,
          mediumSolved: 248,
          hardSolved: 60,
          ranking: 142857,
          acceptance: 68,
          loading: false
        });
      }
    };

    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Faiz123760');
        const data = await response.json();
        
        const reposResponse = await fetch('https://api.github.com/users/Faiz123760/repos');
        const reposData = await reposResponse.json();
        
        const languages = {};
        reposData.forEach(repo => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });

        setGithubStats({
          publicRepos: data.public_repos || 24,
          totalCommits: 892,
          followers: data.followers || 18,
          following: data.following || 12,
          contributions: [35, 42, 38, 48, 45, 39, 42, 46, 52, 44, 48, 53],
          languages: languages,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setGithubStats({
          publicRepos: 24,
          totalCommits: 892,
          followers: 18,
          following: 12,
          contributions: [35, 42, 38, 48, 45, 39, 42, 46, 52, 44, 48, 53],
          languages: {
            'JavaScript': 10,
            'Python': 6,
            'Java': 5,
            'HTML': 4,
            'CSS': 4,
            'React': 7,
            'Node.js': 5,
            'SQL': 3,
            'Express JS':6
          },
          loading: false
        });
      }
    };

    fetchLeetCodeStats();
    fetchGitHubStats();
  }, []);

  const skills = [
    { name: 'Fullstack Developer', icon: <FaLaptopCode />, color: 'from-purple-500 to-pink-500' },
    { name: 'SQL Developer', icon: <FaDatabase />, color: 'from-blue-500 to-cyan-500' },
    { name: 'UI/UX Designer', icon: <FaPalette />, color: 'from-pink-500 to-rose-500' },
    { name: 'Software Engineer', icon: <FaTerminal />, color: 'from-green-500 to-emerald-500' }
  ];

  const stats = [
    { label: 'Projects', value: '25+', description: 'Completed', icon: <FaCode />, color: 'purple' },
    { label: 'Experience', value: '2+', description: 'Years', icon: <FaChartLine />, color: 'blue' },
    { label: 'Commits', value: '800+', description: 'Code', icon: <FaTerminal />, color: 'green' },
  ];

  const achievements = [
    { icon: <FaTrophy />, label: 'Best Developer', year: '2025', color: 'yellow' },
    { icon: <FaMedal />, label: 'Hackathon Winner', year: '2025', color: 'purple' },
    { icon: <FaCrown />, label: 'Top Contributor', year: '2025', color: 'pink' }
  ];

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { 
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#9ca3af',
        borderColor: '#8b5cf6',
        borderWidth: 1
      }
    },
    scales: {
      y: { 
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#9ca3af' }
      },
      x: { 
        grid: { display: false },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom', 
        labels: { 
          color: '#9ca3af',
          font: { size: 10 }
        }
      }
    },
    cutout: '60%'
  };

  // LeetCode Doughnut Chart Data
  const leetcodeDoughnutData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [{
      data: [leetcodeStats.easySolved, leetcodeStats.mediumSolved, leetcodeStats.hardSolved],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  // GitHub Contribution Line Chart Data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const githubLineData = {
    labels: months,
    datasets: [{
      label: 'Contributions',
      data: githubStats.contributions,
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#8b5cf6',
      pointBorderColor: '#fff',
      pointHoverRadius: 6
    }]
  };

  // GitHub Languages Bar Chart Data
  const languagesData = {
    labels: Object.keys(githubStats.languages),
    datasets: [{
      label: 'Repositories',
      data: Object.values(githubStats.languages),
      backgroundColor: [
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.6)',
        'rgba(236, 72, 153, 0.6)',
        'rgba(59, 130, 246, 0.6)'
      ],
      borderRadius: 8
    }]
  };

  // Typewriter text variations
  const typewriterTexts = [
    'Fullstack Developer',
    'SQL Developer',
    'UI/UX Designer',
    'Software Engineer',
    'Problem Solver',
    'Code Artist'
  ];

  return (
    <section
      id="about"
      className="section-default py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 font-poppins min-h-screen flex items-center overflow-hidden"
    >
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header Badge */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 glass px-6 py-2 rounded-full border border-purple-500/30">
            <FaSmile className="text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Welcome to my digital space</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 gradient-text">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stacked Layout - Profile First */}
        <div className="space-y-8">
          {/* Profile Section */}
          <div className="w-full">
            {/* Profile Card with Image */}
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={2000}>
              <div className="relative group">
                {/* Profile Card - Removed animated borders */}
                <div className="relative card-dark rounded-3xl p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                        <img 
                          src={profileImage} 
                          alt="Mohd Faiz" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-gray-900"></div>
                    </div>
                    
                    {/* Quick Info */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-3xl font-bold text-white mb-2">Mohd Faiz</h3>
                      <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-4">
                        <FaMapMarkerAlt className="text-purple-400" />
                        <span>Based in India • Open for opportunities</span>
                      </div>
                      
                      {/* Achievements Pills */}
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {achievements.map((item, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-1 glass px-3 py-1 rounded-full border border-purple-500/30"
                          >
                            <span className={`text-${item.color}-400`}>{item.icon}</span>
                            <span className="text-xs text-white">{item.label}</span>
                            <span className="text-xs text-gray-400">{item.year}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bio with Typewriter Effect */}
                  <div className="mt-8 p-6 card-gradient rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <FaRocket className="text-purple-400" />
                      <h4 className="text-lg font-semibold text-white">Bio</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Results-driven  <span className="text-purple-400 font-semibold">Full Stack Developer</span>  with strong expertise in designing, developing, and deploying scalable web applications. Proficient in both frontend and backend technologies, with a solid foundation in <span className="text-pink-400 font-semibold">SQL and database optimization</span>  for efficient data handling and performance tuning. Adept at solving complex problems through logical thinking, clean code, and optimized algorithms. Passionate about building user-centric solutions, continuously learning modern technologies, and delivering high-quality, maintainable software.   
                    </p>
                    <div className="mt-3 text-lg font-semibold">
                      <span className="text-gray-400">I am a </span>
                      <span className="gradient-text">
                        <Typewriter
                          words={typewriterTexts}
                          loop={true}
                          cursor
                          cursorStyle='|'
                          typeSpeed={80}
                          deleteSpeed={50}
                          delaySpeed={2000}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden glass rounded-xl p-4 border border-white/10 hover:border-transparent transition-all duration-500 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative flex items-center gap-3">
                  <div className={`text-2xl bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium text-white">{skill.name}</span>
                </div>
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${skill.color} w-0 group-hover:w-full transition-all duration-500`}></div>
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative text-center p-4 glass rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 rounded-xl transition-all duration-500"></div>
                
                <div className="relative">
                  <div className={`text-${stat.color}-400 text-xl mb-1 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Download CV Button */}
          <div className="flex justify-center">
            <a
              href="https://drive.google.com/file/d/19O2fAV5MFPLvZ1R7oYarX96E1tKXRm_R/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 text-white py-4 px-12 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <FaDownload className="relative group-hover:animate-bounce" />
              <span className="relative">DOWNLOAD CV</span>
            </a>
          </div>

          {/* Stats Dashboard */}
          <div className="w-full animate-fade-in animation-delay-500">
            {/* Tab Navigation */}
            <div className="flex justify-center gap-2 mb-6 glass p-1.5 rounded-full border border-white/10">
              {[
                { id: 'leetcode', icon: <SiLeetcode />, label: 'LeetCode', color: 'yellow' },
                { id: 'github', icon: <FaGithub />, label: 'GitHub', color: 'purple' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r from-${tab.color}-600 to-${tab.color}-400 text-white shadow-lg`
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="text-sm font-medium hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="glass rounded-2xl p-6 border border-white/10 shadow-2xl">
              {/* LeetCode Tab */}
              {activeTab === 'leetcode' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-yellow-500/20 rounded-xl">
                      <SiLeetcode className="text-yellow-400 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-white">LeetCode Statistics</h3>
                  </div>
                  
                  {leetcodeStats.loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Stats Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="card-gradient rounded-xl p-4 border border-yellow-500/20">
                          <div className="text-3xl font-bold text-white">{leetcodeStats.totalSolved}</div>
                          <div className="text-sm text-gray-400">Total Solved</div>
                        </div>
                        <div className="card-gradient rounded-xl p-4 border border-purple-500/20">
                          <div className="text-3xl font-bold text-purple-400">{leetcodeStats.acceptance}%</div>
                          <div className="text-sm text-gray-400">Acceptance Rate</div>
                        </div>
                      </div>

                      {/* Doughnut Chart */}
                      <div className="h-48">
                        <Doughnut data={leetcodeDoughnutData} options={doughnutChartOptions} />
                      </div>

                      {/* Difficulty Breakdown */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <div className="text-green-400 font-bold text-lg">{leetcodeStats.easySolved}</div>
                          <div className="text-xs text-gray-400">Easy</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <div className="text-yellow-400 font-bold text-lg">{leetcodeStats.mediumSolved}</div>
                          <div className="text-xs text-gray-400">Medium</div>
                        </div>
                        <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                          <div className="text-red-400 font-bold text-lg">{leetcodeStats.hardSolved}</div>
                          <div className="text-xs text-gray-400">Hard</div>
                        </div>
                      </div>

                      {/* Ranking with Progress */}
                      <div className="relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Global Ranking</span>
                          <span className="text-white font-bold">#{leetcodeStats.ranking.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                            style={{ width: `${Math.min(100, (150000 / leetcodeStats.ranking) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* GitHub Tab */}
              {activeTab === 'github' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                      <FaGithub className="text-purple-400 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-white">GitHub Analytics</h3>
                  </div>
                  
                  {githubStats.loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Stats Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="card-gradient rounded-xl p-4 border border-purple-500/20">
                          <div className="text-3xl font-bold text-white">{githubStats.publicRepos}</div>
                          <div className="text-sm text-gray-400">Repositories</div>
                        </div>
                        <div className="card-gradient rounded-xl p-4 border border-pink-500/20">
                          <div className="text-3xl font-bold text-pink-400">{githubStats.totalCommits}</div>
                          <div className="text-sm text-gray-400">Total Commits</div>
                        </div>
                        <div className="card-gradient rounded-xl p-4 border border-blue-500/20">
                          <div className="text-3xl font-bold text-blue-400">{githubStats.followers}</div>
                          <div className="text-sm text-gray-400">Followers</div>
                        </div>
                        <div className="card-gradient rounded-xl p-4 border border-green-500/20">
                          <div className="text-3xl font-bold text-green-400">{githubStats.following}</div>
                          <div className="text-sm text-gray-400">Following</div>
                        </div>
                      </div>

                      {/* Contribution Line Chart */}
                      <div className="glass rounded-xl p-4 border border-white/10">
                        <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                          <FaFire className="text-orange-400" />
                          Contributions (Last 12 months)
                        </h4>
                        <div className="h-32">
                          <Line data={githubLineData} options={lineChartOptions} />
                        </div>
                      </div>

                      {/* Languages Bar Chart */}
                      {Object.keys(githubStats.languages).length > 0 && (
                        <div className="glass rounded-xl p-4 border border-white/10">
                          <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                            <FaCode className="text-purple-400" />
                            Languages Used
                          </h4>
                          <div className="h-32">
                            <Bar 
                              data={languagesData} 
                              options={{
                                ...lineChartOptions,
                                indexAxis: 'y',
                                plugins: { legend: { display: false } }
                              }} 
                            />
                          </div>
                        </div>
                      )}

                      {/* Activity Summary */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 glass rounded-lg">
                          <FaGitAlt className="text-purple-400 mx-auto mb-1" />
                          <span className="text-xs text-gray-400">Active</span>
                        </div>
                        <div className="text-center p-2 glass rounded-lg">
                          <FaCalendarAlt className="text-blue-400 mx-auto mb-1" />
                          <span className="text-xs text-gray-400">Daily</span>
                        </div>
                        <div className="text-center p-2 glass rounded-lg">
                          <FaFire className="text-orange-400 mx-auto mb-1" />
                          <span className="text-xs text-gray-400">Streak</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1100 {
          animation-delay: 1.1s;
        }
        .animation-delay-1300 {
          animation-delay: 1.3s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default About;