export default function Background() {
  return (
    <div 
      className="fixed top-0 -z-10 min-h-screen w-screen bg-[#F6FAFF]"
      style={{
        backgroundImage: "url('/bg-lines.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'auto'
      }}
    />
  )
}