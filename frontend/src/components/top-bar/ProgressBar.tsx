import { useAuth } from "@/hooks/useAuth";

function getXpForLevel(level: number): number {
    if (level <= 0) return 0;
    if (level === 1) return 50;
    if (level === 2) return 120;
    if (level === 3) return 250;
    if (level === 4) return 370;
    if (level === 5) return 500;
    return 500;
}

export default function ProgressBar() {
    const { user } = useAuth();
    const level = user?.level ?? 1;
    const xp = user?.xp ?? 0;
    const xpForThisLevel = getXpForLevel(level);
    const xpForPrevLevel = getXpForLevel(level - 1);
    const xpInLevel = xp - xpForPrevLevel;
    const xpNeeded = xpForThisLevel - xpForPrevLevel;
    const percent = Math.min((xpInLevel / xpNeeded) * 100, 100);

    return (
        <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto -translate-x-12">
            {/* Bar */}
            <div className="h-4 w-full bg-gray-200 rounded-full mb-1 overflow-hidden relative">
                <div 
                    className="h-4 bg-yellow-400 rounded-full transition-all duration-300 relative"
                    style={{ 
                        width: `${percent}%`,
                        background: `linear-gradient(90deg, 
                            #fbbf24 0%, 
                            #f59e0b 25%, 
                            #fbbf24 50%, 
                            #f59e0b 75%, 
                            #fbbf24 100%)`,
                        backgroundSize: '200% 100%',
                        animation: 'progressShimmer 1.5s ease-in-out infinite'
                    }} 
                />
                {/* Continuous flowing overlay */}
                <div 
                    className="absolute top-0 left-0 h-full w-full opacity-40"
                    style={{
                        background: `linear-gradient(90deg, 
                            transparent 0%, 
                            rgba(255, 255, 255, 0.6) 20%, 
                            rgba(255, 255, 255, 0.8) 50%, 
                            rgba(255, 255, 255, 0.6) 80%, 
                            transparent 100%)`,
                        animation: 'flowingWave 0.8s linear infinite',
                        width: '150%'
                    }}
                />
                {/* Second flowing overlay for more dynamic effect */}
                <div 
                    className="absolute top-0 left-0 h-full w-full opacity-30"
                    style={{
                        background: `linear-gradient(90deg, 
                            transparent 0%, 
                            rgba(255, 255, 255, 0.4) 30%, 
                            rgba(255, 255, 255, 0.7) 60%, 
                            rgba(255, 255, 255, 0.4) 90%, 
                            transparent 100%)`,
                        animation: 'flowingWave 1.2s linear infinite reverse',
                        width: '150%'
                    }}
                />
            </div>
            {/* Bottom: XP Text */}
            <div className="flex justify-between mt-0">
                <span></span>
                <span className="text-xs text-gray-600">{xpInLevel}/{xpNeeded} XP</span>
            </div>
        </div>
    )
}