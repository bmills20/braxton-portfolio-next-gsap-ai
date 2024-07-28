import { ButtonHTMLAttributes } from 'react';

/* Button */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string | Object;
  label: string;
  icon?: boolean;
  anchor?: string;
  onClick?: () => void;
}
