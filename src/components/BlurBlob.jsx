// components/BlurBlob.jsx
import React from 'react';
import PropTypes from 'prop-types';

const BlurBlob = ({ 
  position = { top: '50%', left: '50%' }, 
  size = { width: '400px', height: '400px' },
  color = 'from-purple-600 to-pink-600',
  opacity = '20',
  blur = '3xl',
  animation = 'animate-blob',
  zIndex = '0',
  mixBlend = 'multiply'
}) => {
  // Destructure position and size with defaults
  const { top, left } = position;
  const { width, height } = size;

  // Opacity mapping
  const opacityClasses = {
    '5': 'opacity-5',
    '10': 'opacity-10',
    '20': 'opacity-20',
    '30': 'opacity-30',
    '40': 'opacity-40',
    '50': 'opacity-50',
  };

  // Blur mapping
  const blurClasses = {
    'sm': 'blur-sm',
    'md': 'blur-md',
    'lg': 'blur-lg',
    'xl': 'blur-xl',
    '2xl': 'blur-2xl',
    '3xl': 'blur-3xl',
  };

  // Color mapping for gradient backgrounds
  const colorClasses = {
    'from-purple-600 to-pink-600': 'bg-gradient-to-r from-purple-600 to-pink-600',
    'from-blue-600 to-cyan-600': 'bg-gradient-to-r from-blue-600 to-cyan-600',
    'from-green-600 to-emerald-600': 'bg-gradient-to-r from-green-600 to-emerald-600',
    'from-orange-600 to-red-600': 'bg-gradient-to-r from-orange-600 to-red-600',
    'from-yellow-600 to-orange-600': 'bg-gradient-to-r from-yellow-600 to-orange-600',
    'from-indigo-600 to-purple-600': 'bg-gradient-to-r from-indigo-600 to-purple-600',
    'purple': 'bg-purple-500',
    'pink': 'bg-pink-500',
    'blue': 'bg-blue-500',
    'green': 'bg-green-500',
    'yellow': 'bg-yellow-500',
    'orange': 'bg-orange-500',
    'red': 'bg-red-500',
  };

  const colorClass = colorClasses[color] || 'bg-purple-500';
  const opacityClass = opacityClasses[opacity] || 'opacity-20';
  const blurClass = blurClasses[blur] || 'blur-3xl';

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: top,
        left: left,
        width: width,
        height: height,
        transform: 'translate(-50%, -50%)',
        zIndex: zIndex,
        mixBlendMode: mixBlend,
      }}
    >
      <div
        className={`w-full h-full rounded-full ${colorClass} ${opacityClass} ${blurClass} ${animation}`}
        style={{
          willChange: 'transform',
        }}
      ></div>
    </div>
  );
};

// Animation keyframes to add to your global CSS or component
export const BlobAnimations = () => (
  <style jsx global>{`
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
    
    .animate-blob {
      animation: blob 7s infinite;
    }
    
    @keyframes blob-slow {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(40px, -60px) scale(1.2);
      }
      66% {
        transform: translate(-30px, 30px) scale(0.8);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
    
    .animate-blob-slow {
      animation: blob-slow 10s infinite;
    }
    
    @keyframes blob-fast {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(20px, -30px) scale(1.05);
      }
      66% {
        transform: translate(-15px, 15px) scale(0.95);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
    
    .animate-blob-fast {
      animation: blob-fast 4s infinite;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px) scale(1);
      }
      50% {
        transform: translateY(-20px) scale(1.05);
      }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    @keyframes pulse-slow {
      0%, 100% {
        opacity: 0.2;
        transform: scale(1);
      }
      50% {
        opacity: 0.3;
        transform: scale(1.1);
      }
    }
    
    .animate-pulse-slow {
      animation: pulse-slow 4s ease-in-out infinite;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    
    .animation-delay-6000 {
      animation-delay: 6s;
    }
  `}</style>
);

// Predefined blob configurations for common use cases
export const BlobConfigs = {
  primary: {
    color: 'from-purple-600 to-pink-600',
    opacity: '20',
    blur: '3xl',
    animation: 'animate-blob',
  },
  secondary: {
    color: 'from-blue-600 to-cyan-600',
    opacity: '15',
    blur: '2xl',
    animation: 'animate-blob-slow',
  },
  accent: {
    color: 'from-green-600 to-emerald-600',
    opacity: '10',
    blur: 'xl',
    animation: 'animate-float',
  },
  subtle: {
    color: 'purple',
    opacity: '5',
    blur: 'lg',
    animation: 'animate-pulse-slow',
  },
};

// Example usage component
export const BlobBackground = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <BlurBlob 
        position={{ top: '20%', left: '20%' }}
        size={{ width: '500px', height: '500px' }}
        {...BlobConfigs.primary}
      />
      <BlurBlob 
        position={{ top: '70%', left: '80%' }}
        size={{ width: '400px', height: '400px' }}
        {...BlobConfigs.secondary}
        animation="animate-blob animation-delay-2000"
      />
      <BlurBlob 
        position={{ top: '40%', left: '60%' }}
        size={{ width: '300px', height: '300px' }}
        {...BlobConfigs.accent}
        animation="animate-float animation-delay-4000"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Define prop types
BlurBlob.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string,
  }),
  size: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  color: PropTypes.string,
  opacity: PropTypes.string,
  blur: PropTypes.string,
  animation: PropTypes.string,
  zIndex: PropTypes.string,
  mixBlend: PropTypes.string,
};

export default BlurBlob;