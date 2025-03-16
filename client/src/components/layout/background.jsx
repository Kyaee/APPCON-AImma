function Background() {
  return (
    <div 
      className="fixed top-0 -z-10 min-h-screen w-screen bg-[#FFF9F3]"
      style={{
        backgroundImage: "url('/bg-lines.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'multiply', // Add this line
        minHeight: '100vh',
        width: '100vw',
        overflow: 'auto'
      }}
    />
  )
}

function VideoBackground() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover -z-10"
    >
      <source src="/GradientBG.mp4" type="video/mp4" />
    </video>
  )
}

export { Background, VideoBackground }