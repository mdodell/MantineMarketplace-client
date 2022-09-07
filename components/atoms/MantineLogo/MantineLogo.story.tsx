import React from 'react';
import { MantineLogoRounded } from './MantineLogoRounded';
import { MantineLogoText } from './MantineLogoText';

export default { title: 'atoms/MantineLogo' };

export function Rounded() {
  return (
    <div style={{ padding: 40 }}>
      <MantineLogoRounded size={40} />
      <MantineLogoRounded size={40} inverted />
      <MantineLogoRounded size={40} color="cyan" />
      <MantineLogoRounded size={40} color="yellow" />
    </div>
  );
}
export function TextLogo() {
  return (
    <div style={{ padding: 40, backgroundColor: 'silver' }}>
      <MantineLogoText size={30} />
      <MantineLogoText size={30} inverted />
      <MantineLogoText size={30} color="cyan" />
      <MantineLogoText size={30} color="yellow" />
    </div>
  );
}
