import { ComponentType } from 'react';

interface IconProps {
  color?: string;
  size?: string | number;
  strokeWidth?: string | number;
  className?: string;
  onClick?: () => void;
}

type Icon = ComponentType<IconProps>;

declare module 'lucide-react' {
  export const Mail: Icon;
  export const LogOut: Icon;
  export const Inbox: Icon;
  export const CheckCircle: Icon;
  export const Code: Icon;
  export const Database: Icon;
  export const FileCode: Icon;
  export const Github: Icon;
  export const Linkedin: Icon;
  export const Phone: Icon;
  export const Server: Icon;
  export const X: Icon;
  export const MessageSquare: Icon;
}
