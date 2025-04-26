
export default function RedirectLanding() {
  if (screen.width < 1080) {
    window.location.href = "/m";
  } else {
    window.location.href = "/d";
  }
  
  return (
    <></>
  )
}
