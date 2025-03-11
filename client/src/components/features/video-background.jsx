export default function VideoBackground() {
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