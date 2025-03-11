import React from 'react';

// Reusable TextBlock Component
const TextBlock = ({ text, style, fontSize, fontWeight, top, left, color, fontStyle, width }) => (
  <div
    style={{
      width: width || '477px',
      fontFamily: 'Inter',
      fontSize: fontSize || '16px',
      fontStyle: fontStyle || 'normal',
      fontWeight: fontWeight || 400,
      lineHeight: '28px',
      letterSpacing: '-0.1px',
      color: color || '#000',
      position: 'absolute',
      top: top || '5%',
      left: left || '5%',
      ...style,
    }}
  >
    {text}
  </div>
);

const OpportunitiesMenu = ({ top, left }) => (
  <div
    style={{
      width: '565px',
      height: '423px',
      flexShrink: 0,
      borderRadius: '10px',
      border: '1px solid #000',
      background: '#FBFAF9',
      boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.25)',
      position: 'absolute', // Ensure absolute positioning
      top: top || '8%', // Default to '8%' if no prop is passed
      left: left || '5%', // Default to '5%' if no prop is passed
    }}
  >
    {/* Text blocks */}
    <TextBlock
      text="Opportunities"
      fontSize="24px"
      fontWeight={600}
      top="8%"
      left="5%"
    />
    <TextBlock
      text="Insights"
      fontSize="20px"
      fontWeight={600}
      top="38%"
      left="5%"
    />
    <TextBlock
      text="XYZ Company"
      fontSize="16px"
      fontStyle="italic"
      fontWeight={400}
      color="#444"
      top="23%"
      left="10%"
    />
    <TextBlock
      text="Full-time - Arizona 123, America, Yawa Pistalsan/Hybrid Online"
      fontSize="16px"
      fontWeight={400}
      color="#4C4C4C"
      top="30%"
      left="5%"
    />
    <TextBlock
      text="PHP 16,000 - PHP 25,000 a month"
      fontSize="18px"
      fontWeight={400}
      top="16%"
      left="5%"
    />
    <TextBlock
      text="This a good fit for you because... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed condimentum ante. Integer eget augue vel sapien luctus auctor sed a lorem."
      fontSize="16px"
      fontWeight={500}
      color="#4C4C4C"
      top="45%"
      left="5%"
      width="497px"
    />

    {/* Horizontal line */}
    <div
      style={{
        width: '500px',
        height: '1px',
        background: '#000',
        position: 'absolute',
        top: '75%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    />

    {/* Smaller rectangle and button */}
    <div
      style={{
        width: '172px',
        height: '39px',
        borderRadius: '5px',
        border: '1px solid #000',
        position: 'absolute',
        top: '84.5%',
        left: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <span
        style={{
          color: '#000', // Black color
          fontFamily: 'Inter', // Font family set to 'Inter'
          fontSize: '16px', // Font size set to 16px
          fontStyle: 'normal', // Normal font style
          fontWeight: 500, // Font weight set to 500
          lineHeight: '24px', // Line height set to 24px (150% of the font size)
        }}
      >
        Not-Interested
      </span>
    </div>

    <div
      style={{
        width: '140px',
        height: '39px',
        borderRadius: '5px',
        border: '1px solid #000',
        background: '#81B7FF',
        position: 'absolute',
        top: '80%',
        left: '82%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translateX(-50%)',
      }}
    >
      <span
        style={{
          color: '#000', // Black text color
          fontFamily: 'Inter', // Font family set to 'Inter'
          fontSize: '16px', // Font size set to 16px
          fontStyle: 'normal', // Normal font style
          fontWeight: 500, // Medium font weight (500)
          lineHeight: '24px', // Line height set to 24px (150% of the font size)
        }}
      >
        Check now
      </span>
    </div>
  </div>
);

export default OpportunitiesMenu;
