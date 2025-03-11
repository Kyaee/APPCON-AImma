import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import backgroundImage from '/src/assets/job-opportunities/BG Lines.png';
import choiceImage from '/src/assets/job-opportunities/Choice.png'; // Import the image
import customerImage from '/src/assets/job-opportunities/Customer.png'; // Import the image
import shoppingImage from '/src/assets/job-opportunities/Shopping Cart.png'; // Import the image
import missionImage from '/src/assets/job-opportunities/Mission.png'; // Import the image
import wavingCappy from '/src/assets/job-opportunities/WaveCappy.png'; // Import the image
import gemImage from '/src/assets/job-opportunities/gem.png'; // Import the image
import optionImage from '/src/assets/job-opportunities/options.png'; // Import the image
import heartImage from '/src/assets/job-opportunities/heart.png'; // Import the image
import notificationImage from '/src/assets/job-opportunities/Notification.png'; // Import the image

export default function JobOpportunities() {
  const [isHovered, setIsHovered] = useState(false); // State to track hover on button

  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleStartClick = () => {
    const id = 123; // You can replace this with a dynamic value
    navigate(`/job-opportunities-page2/${id}`);  // Navigate to the new route with dynamic ID
  };

  const handleOpportunitiesClick = () => {
    const id = 456; // Replace with the ID relevant to the opportunities
    navigate(`/job-opportunities-page2/${id}`); // Navigate to the second page
  };



  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: '100vh', // Full viewport height
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Make the parent relative for absolute positioning
      }}


    >
      <div
        style={{
          display: 'flex',
          width: '173px',
          height: '40px',
          padding: '10px 23px',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          borderRadius: '10px',
          border: '1px solid #000',
          background: '#FFF',
          position: 'absolute',
          top: '235px',
          left: '19%',
          fontFamily: 'Inter',
          fontSize: '11px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '16px',  /* 133.333% */
          color: '#000',
          textAlign: 'center',
        }}
      >
        Software Development
      </div>

      <div
        style={{
          position: 'absolute', // Absolute positioning
          top: '43px', // Center vertically
          left: '50%', // Center horizontally
          transform: 'translate(-50%, -50%)', // Adjust to truly center it
          width: '700px', // Width of the rectangle
          height: '64px', // Height of the rectangle
          borderRadius: '20px', // Rounded corners
          border: '1px solid #000', // Black border
          background: '#FFF', // White background
          flexShrink: 0, // Prevent shrinking
        }}
      ></div>




      <div
        style={{
          display: 'flex',
          width: '111px',
          height: '40px',
          padding: '10px 23px',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          borderRadius: '10px',
          border: '1px solid #000',
          background: '#FFF',
          position: 'absolute',
          top: '235px',
          left: 'calc(19% + 173px + 10px)',
          fontFamily: 'Inter',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '16px',
          color: '#000',
          textAlign: 'center',
        }}
      >
        Javascript
      </div>

      <div
        style={{
          display: 'flex',
          width: '86px',
          height: '40px',
          padding: '10px 23px',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          borderRadius: '10px',
          border: '1px solid #000',
          background: '#FFF',
          position: 'absolute',
          top: '235px',
          left: 'calc(19% + 173px + 10px + 111px + 10px)',
          fontFamily: 'Inter',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '16px',
          color: '#000',
          textAlign: 'center',
        }}
      >
        React
      </div>

      <div
        style={{
          display: 'flex',
          width: '111px',
          height: '40px',
          padding: '10px 23px',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          borderRadius: '10px',
          border: '1px solid #000',
          background: '#FFF',
          position: 'absolute',
          top: '235px',
          left: 'calc(19% + 173px + 10px + 111px + 10px + 86px + 10px)',
          fontFamily: 'Inter',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '16px',
          color: '#000',
          textAlign: 'center',
        }}
      >
        Add +
      </div>

      {/* Fixed Header */}
      <h1
        style={{
          color: '#4C4C4C',
          fontFamily: 'Inter',
          fontSize: '48px',
          fontStyle: 'normal',
          fontWeight: '800',
          lineHeight: '48px',
          letterSpacing: '-0.576px',
          position: 'absolute', // Fixes the position of the header
          top: '135px', // Set vertical position
          left: '19%', // Center horizontally
          zIndex: 9999, // Ensures this element stays above other content
          width: 'auto',
          maxWidth: '100%',
        }}
      >
        Personalized for You
      </h1>

      {/* Fixed Paragraph */}
      <p
        style={{
          color: '#000',
          fontFamily: 'Inter',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '24px',
          position: 'absolute', // Fixes the position of the paragraph
          top: '190px', // Position just below the header
          left: '19%', // Same horizontal position as the header
          zIndex: 9998, // Below the header
          width: '760px',
          textAlign: 'left',
        }}
      >
        We prepared possible opportunities based on your capabilities and learning.
      </p>

      <div className="upper-center-container">
        {/* Image and Text - Mission */}
        <div className="centered-rect">
          <img
            src={missionImage}
            alt="Mission"
            style={{
              width: '25px',
              height: '25px',
              objectFit: 'contain',
              marginRight: '10px',
            }}
          />
          <span
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: '800',
              lineHeight: '28px',
            }}
          >
            Roadmap
          </span>
        </div>

        {/* Image and Text - Customer */}
        <div className="centered-rect">
          <img
            src={customerImage}
            alt="Customer"
            style={{
              width: '25px',
              height: '25px',
              objectFit: 'contain',
              marginRight: '10px',
            }}
          />
          <span
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '28px',
            }}
          >
            Profile
          </span>
        </div>

        {/* Image and Text - Opportunities */}
        <div
          className="centered-rect"
          onClick={handleOpportunitiesClick} // Add the click handler here
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer', // Change cursor to indicate it's clickable
          }}
        >
          <img
            src={choiceImage}
            alt="Choice"
            style={{
              width: '25px',
              height: '25px',
              objectFit: 'contain',
              marginRight: '10px',
            }}
          />
          <span
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '28px',
            }}
          >
            Opportunities
          </span>
        </div>


        {/* Image and Text - Shopping */}
        <div className="centered-rect">
          <img
            src={shoppingImage}
            alt="Shopping"
            style={{
              width: '25px',
              height: '25px',
              objectFit: 'contain',
              marginRight: '10px',
            }}
          />
          <span
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '28px',
            }}
          >
            Shop
          </span>
        </div>
      </div>








      {/* Heart and Text */}
      <div
        style={{
          position: 'absolute',
          top: '30px', // Adjust top position as needed
          left: 'calc(50% + 365px)', // Position the image outside the rectangle to the right
          display: 'flex', // Use flexbox to align image and text horizontally
          alignItems: 'center', // Vertically center the image and text
        }}
      >
        {/* Image */}
        <img
          src={heartImage} // Replace with your image URL
          alt="heart Image"
          style={{
            width: '25px', // Image size
            height: '25px', // Image size
            objectFit: 'contain', // Ensure image maintains aspect ratio
            marginRight: '10px', // Space between image and text
          }}
        />

        {/* Text */}
        <span
          style={{
            color: '#000',
            fontFamily: 'Inter',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: '900',
            lineHeight: '28px', // Line height set to 28px (155.556%)
          }}
        >
          10
        </span>
      </div>

      {/* Heart and Text */}
      <div
        style={{
          position: 'absolute',
          top: '30px', // Adjust top position as needed
          left: 'calc(50% + 465px)', // Position the image outside the rectangle to the right
          display: 'flex', // Use flexbox to align image and text horizontally
          alignItems: 'center', // Vertically center the image and text
        }}
      >
        {/* Image */}
        <img
          src={gemImage} // Replace with your image URL
          alt="gem Image"
          style={{
            width: '25px', // Image size
            height: '25px', // Image size
            objectFit: 'contain', // Ensure image maintains aspect ratio
            marginRight: '10px', // Space between image and text
          }}
        />

        {/* Text */}
        <span
          style={{
            color: '#000',
            fontFamily: 'Inter',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: '900',
            lineHeight: '28px', // Line height set to 28px (155.556%)
          }}
        >
          500
        </span>
      </div>

      {/* Options Image*/}
      <img
        src={optionImage} // Replace with your image URL
        alt="option Image"
        style={{
          position: 'absolute',
          top: '30px', // Adjust top position as needed
          left: 'calc(50% + 575px)', // Position the image outside the rectangle to the right
          width: '25px', // Image size
          height: '25px', // Image size
          objectFit: 'contain', // Ensure image maintains aspect ratio
          marginLeft: '15px', // Optional margin for spacing
        }}
      />

      {/* notification Image*/}
      <img
        src={notificationImage} // Replace with your image URL
        alt="notification Image"
        style={{
          position: 'absolute',
          top: '30px', // Adjust top position as needed
          left: 'calc(50% + 625px)', // Position the image outside the rectangle to the right
          width: '25px', // Image size
          height: '25px', // Image size
          objectFit: 'contain', // Ensure image maintains aspect ratio
          marginLeft: '15px', // Optional margin for spacing
        }}
      />

      {/* Cappy image and text */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // Stack the image and text vertically
          justifyContent: 'center', // Center both vertically
          alignItems: 'center', // Center horizontally
          height: '100vh', // Full viewport height
        }}
      >
        {/* Image */}
        <img
          src={wavingCappy}
          alt="Centered"
          style={{
            maxWidth: '100%', // Make sure the image is responsive
            maxHeight: '100%', // Ensure the image doesn't overflow
            objectFit: 'contain', // Keep the aspect ratio intact
            marginTop: '60px', // Adjust image top position (move it up or down)
          }}
        />

        {/* Text Below Image */}
        <span
          style={{
            color: '#4C4C4C',
            fontFamily: 'Inter',
            fontSize: '48px',
            fontStyle: 'normal',
            fontWeight: '800',
            lineHeight: '48px', // Line height set to 48px (100%)
            letterSpacing: '-0.576px',
            textAlign: 'center', // Ensure text is centered
            marginTop: '10px', // Adjust this value to move the text slightly down
          }}
        >
          Gather Job Opportunities
        </span>

        <span
          style={{
            color: '#000',
            fontFamily: 'Inter',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '28px', // Line height set to 28px (140%)
            textAlign: 'center', // Center text horizontally
            marginTop: '10px', // Space between the two texts
          }}
        >
          Before you start,
        </span>

        {/* Rectangle Let' start*/}
        <div
          style={{
            borderRadius: '20px', // Rounded corners
            border: '1px solid #000', // Black border
            background: '#007CE8', // Blue background
            boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.75)', // Box shadow
            width: '561px', // Set width of rectangle
            height: '70px', // Set height of rectangle
            flexShrink: '0', // Prevent shrinking
            display: 'flex', // Use flexbox to center any content inside the rectangle
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            marginTop: '20px', // Space between the text and the rectangle
            cursor: 'pointer', // Change cursor to indicate it's clickable
            transition: 'background 0.3s ease', // Smooth transition for hover effect
            backgroundColor: isHovered ? '#0056b3' : '#007CE8', // Change background color on hover
          }}
          onClick={handleStartClick} // Trigger click handler
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsHovered(false)} // Set hover state to false when mouse leaves
        >
          {/* Text Inside the Rectangle */}
          <span
            style={{
              color: '#FFF', // Text color inside the rectangle
              textAlign: 'center', // Center the text
              fontFamily: 'Inter', // Font family
              fontSize: '24px', // Font size
              fontStyle: 'normal', // Normal font style
              fontWeight: '600', // Font weight
              lineHeight: '32px', // Line height for text inside rectangle
              letterSpacing: '-0.144px', // Letter spacing
              width: '386px', // Width of the text
            }}
          >
            Let’s Start!
          </span>
        </div>

        

      </div>

    </div>

  );
}
