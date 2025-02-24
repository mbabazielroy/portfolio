declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }

  export type Icon = FC<IconProps>;

  export const ArrowRight: Icon;
  export const CheckCircle: Icon;
  export const Code: Icon;
  export const Database: Icon;
  export const FileCode: Icon;
  export const Github: Icon;
  export const Inbox: Icon;
  export const Link: Icon;
  export const Linkedin: Icon;
  export const LogOut: Icon;
  export const Mail: Icon;
  export const Menu: Icon;
  export const Moon: Icon;
  export const Phone: Icon;
  export const Server: Icon;
  export const Sun: Icon;
  export const X: Icon;
}
