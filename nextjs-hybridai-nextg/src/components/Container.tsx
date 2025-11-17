import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`container mx-auto max-w-6xl px-6 py-12 ${className}`}>
      {children}
    </div>
  );
}

