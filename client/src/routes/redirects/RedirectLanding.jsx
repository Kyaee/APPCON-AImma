
export default function RedirectLanding() {
  setTimeout(() => {
    // Redirect to the appropriate page after 2 seconds
    if (window.innerWidth < 768) {
      window.location.href = "/m";
    } else {
      window.location.href = "/d";
    }
  }
  , 1000);
  
  return null
}
  