import React from 'react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};

interface PopInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const PopIn: React.FC<PopInProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  children,
  className = '',
}) => {
  return <div className={`overflow-hidden ${className}`}>{children}</div>;
};

interface FloatingProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export const Floating: React.FC<FloatingProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};

interface GlowPulseProps {
  children: React.ReactNode;
  className?: string;
}

export const GlowPulse: React.FC<GlowPulseProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};
