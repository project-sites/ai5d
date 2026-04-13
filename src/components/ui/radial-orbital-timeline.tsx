'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Plus, 
  ArrowRight, 
  ChevronRight, 
  Activity, 
  Zap, 
  Shield, 
  Target, 
  Cpu, 
  Network 
} from 'lucide-react';

interface TimelineNode {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  energy: number; // 0-100
  connectedTo?: string[];
  color?: string;
}

interface RadialOrbitalTimelineProps {
  nodes: TimelineNode[];
  centerTitle?: string;
  centerDescription?: string;
  className?: string;
}

export function RadialOrbitalTimeline({
  nodes,
  centerTitle = "Transformation IA",
  centerDescription = "Le process AI5D par étapes",
  className,
}: RadialOrbitalTimelineProps) {
  const [activeNode, setActiveNode] = React.useState<string | null>(null);
  const orbitalRadius = 240; // Base radius for the desktop orbit
  const CENTER_X = 0;
  const CENTER_Y = 0;

  // Calculate coordinates for each node on the circle
  const nodesWithCoords = React.useMemo(() => {
    return nodes.map((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI - Math.PI / 2;
      return {
        ...node,
        x: Math.cos(angle) * orbitalRadius,
        y: Math.sin(angle) * orbitalRadius,
        angle,
      };
    });
  }, [nodes, orbitalRadius]);

  const activeNodeData = nodesWithCoords.find(n => n.id === activeNode);

  return (
    <div className={cn("relative flex items-center justify-center min-h-[600px] w-full py-20 px-4 overflow-hidden", className)}>
      {/* Background Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[480px] h-[480px] rounded-full border border-primary/10 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[360px] h-[360px] rounded-full border border-primary/5 animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-primary/[0.03]" />
      </div>

      <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center translate-y-8 md:translate-y-0">
        {/* Core Center */}
        <motion.div 
          className="relative z-20 flex flex-col items-center justify-center w-48 h-48 rounded-full bg-background border-2 border-primary/20 shadow-[0_0_50px_-12px_rgba(245,158,11,0.3)] text-center p-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
          <h3 className="text-xl font-bold font-serif leading-tight text-primary mb-2">{centerTitle}</h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{centerDescription}</p>
        </motion.div>

        {/* Connections Layer (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="-400 -400 800 800">
          {nodesWithCoords.map((node) => (
            <React.Fragment key={`conn-${node.id}`}>
              {/* Line to center */}
              <motion.line
                x1={0}
                y1={0}
                x2={node.x}
                y2={node.y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
              
              {/* Lines to other connected nodes */}
              {node.connectedTo?.map(targetId => {
                const target = nodesWithCoords.find(n => n.id === targetId);
                if (!target) return null;
                return (
                  <motion.path
                    key={`conn-${node.id}-${targetId}`}
                    d={`M ${node.x} ${node.y} Q 0 0 ${target.x} ${target.y}`}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-primary/20"
                    strokeDasharray="4 4"
                  />
                );
              })}
            </React.Fragment>
          ))}
        </svg>

        {/* Nodes Layer */}
        {nodesWithCoords.map((node, idx) => (
          <motion.div
            key={node.id}
            className="absolute z-30"
            style={{ 
              left: `calc(50% + ${node.x}px - 28px)`,
              top: `calc(50% + ${node.y}px - 28px)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.3 + idx * 0.1 }}
          >
            <button
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              className={cn(
                "group relative flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-500",
                activeNode === node.id 
                  ? "bg-primary border-primary shadow-[0_0_30px_rgba(245,158,11,0.5)] scale-110" 
                  : "bg-background border-primary/20 hover:border-primary/60"
              )}
            >
              {/* Orbital Text Badge (shown on hover or if active) */}
              <div className={cn(
                "absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-background/80 backdrop-blur-sm border rounded-full text-[10px] font-bold uppercase transition-all duration-300",
                activeNode === node.id ? "opacity-100 -translate-y-2 text-primary" : "opacity-0 group-hover:opacity-100 group-hover:-translate-y-1"
              )}>
                {node.title}
              </div>

              {(() => {
                const Icon = node.icon as React.ComponentType<{ className?: string }>;
                return <Icon className={cn(
                  "w-6 h-6 transition-colors",
                  activeNode === node.id ? "text-primary-foreground" : "text-primary group-hover:scale-110"
                )} />;
              })()}
              
              {/* Energy Ring */}
              <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90 pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${node.energy * 0.8} 100`}
                  className={cn(
                    "transition-all duration-1000",
                    activeNode === node.id ? "text-primary opacity-100" : "text-primary/10 opacity-50"
                  )}
                />
              </svg>

              {/* Ping Effect if active */}
              {activeNode === node.id && (
                <div className="absolute inset-0 rounded-full animate-ping bg-primary/40" />
              )}
            </button>
          </motion.div>
        ))}

        {/* Active Node Detail Card (Mobile Center / Desktop Side) */}
        <AnimatePresence>
          {activeNodeData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[320px] pointer-events-none"
            >
              <Card className="bg-background/90 backdrop-blur-xl border-primary/30 p-6 shadow-2xl pointer-events-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <activeNodeData.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg">{activeNodeData.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {activeNodeData.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-muted-foreground">Impact</span>
                    <span className="font-mono text-sm text-primary">+{activeNodeData.energy}% ROI</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 text-[11px] gap-2 hover:bg-primary/10" onClick={() => setActiveNode(null)}>
                    Fermer < ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructional Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-medium hidden md:block">
        Explorez les nodes pour le détail du process
      </div>
    </div>
  );
}
