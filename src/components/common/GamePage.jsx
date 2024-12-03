import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Power, Volume2, Settings } from "lucide-react";
import games from "./games.json";

const GamePage = () => {
  const { id } = useParams();
  const [isPowered, setIsPowered] = useState(true);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const game = games.find((g) => g.id === parseInt(id, 10));

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && iframeRef.current) {
        const container = containerRef.current;
        const iframe = iframeRef.current;
        
        // Get the container dimensions
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Get the iframe content dimensions
        const iframeWidth = iframe.scrollWidth;
        const iframeHeight = iframe.scrollHeight;
        
        // Calculate scale factors for both dimensions
        const scaleX = containerWidth / iframeWidth;
        const scaleY = containerHeight / iframeHeight;
        
        // Use the smaller scale factor to ensure content fits in both dimensions
        const newScale = Math.min(scaleX, scaleY, 1);
        
        setScale(newScale);
      }
    };

    // Initial scale update
    updateScale();
    
    // Update scale on window resize
    window.addEventListener('resize', updateScale);
    
    // Update scale when iframe content loads
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', updateScale);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', updateScale);
      }
    };
  }, []);

  if (!game) {
    return <div className="p-4"><h2>Game not found</h2></div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="h-screen max-h-screen flex flex-col">
        {/* TV Container */}
        <div className="relative flex-1 bg-gradient-to-b from-gray-800 to-gray-700 rounded-lg p-6 shadow-[0_0_15px_rgba(0,0,0,0.3)] animate-appear">
          {/* TV Frame */}
          <div className="h-full bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-3xl p-8 shadow-2xl border-t border-gray-600">
            {/* Brand Name */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-gray-400 font-bold tracking-widest text-sm">
              RETRO GAMING TV
            </div>

            {/* TV Screen Container */}
            <div className="relative h-full flex flex-col">
              {/* Screen Bezel */}
              <div className="flex-1 relative rounded-2xl bg-black p-2 border-4 border-gray-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
                {/* Screen Effects */}
                <div className={`absolute inset-0 rounded-xl overflow-hidden ${!isPowered && 'hidden'}`}>
                  {/* Scanlines */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] animate-scan pointer-events-none" />
                  
                  {/* Static noise when powered off */}
                  <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none`} />
                  
                  {/* Screen Glow */}
                  <div className="absolute inset-0 bg-blue-500/5 animate-glow pointer-events-none" />
                </div>

                {/* Game Content */}
                <div 
                  ref={containerRef}
                  className={`relative h-full rounded-lg overflow-hidden transition-opacity duration-300 ${isPowered ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div style={{ 
                      transform: `scale(${scale})`,
                      transformOrigin: 'center',
                      width: '100%',
                      height: '100%'
                    }}>
                      <iframe
                        ref={iframeRef}
                        src={game.url}
                        title={`Game ${game.id}`}
                        className="w-full h-full border-none"
                        style={{ 
                          width: '100%',
                          height: '100%',
                          overflow: 'hidden'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* TV Controls Panel */}
              <div className="mt-6 flex justify-between items-center px-4">
                <div className="flex items-center gap-4">
                  {/* Power Button */}
                  <button 
                    onClick={() => setIsPowered(!isPowered)}
                    className="relative group"
                  >
                    <Power 
                      className={`w-6 h-6 ${isPowered ? 'text-green-400' : 'text-gray-600'} transition-colors duration-300`}
                    />
                    <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${isPowered ? 'bg-green-400' : 'bg-red-500'} animate-pulse`} />
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-gray-400" />
                    <div className="w-16 h-2 bg-gray-700 rounded-full">
                      <div className="w-1/2 h-full bg-gray-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-inner flex items-center justify-center">
                    <Settings className="w-4 h-4 text-gray-500 animate-spin-slow" />
                  </div>
                  {[1, 2].map((n) => (
                    <div 
                      key={n}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-inner"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TV Stand */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1/3">
            <div className="h-16 bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-3xl shadow-lg" />
          </div>
        </div>

        {/* Game Title */}
        <h1 className="text-xl text-center text-gray-300 mt-8 mb-4">
          Game {game.id}
        </h1>
      </div>
    </div>
  );
};

export default GamePage;

// Add these custom animations to your global CSS or Tailwind config
const style = document.createElement('style');
style.textContent = `
  @keyframes appear {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes scan {
    from { transform: translateY(0); }
    to { transform: translateY(4px); }
  }
  
  @keyframes glow {
    0% { opacity: 0.5; }
    50% { opacity: 0.7; }
    100% { opacity: 0.5; }
  }

  .animate-appear {
    animation: appear 0.5s ease-out;
  }
  
  .animate-scan {
    animation: scan 4s linear infinite;
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  
  .animate-spin-slow {
    animation: spin 6s linear infinite;
  }
`;
document.head.appendChild(style);