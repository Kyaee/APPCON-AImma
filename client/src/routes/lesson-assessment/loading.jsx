export default function loading() {
  return (
    <main
      className="h-screen w-full py-5 flex flex-col justify-center items-center select-none"
      style={{
        backgroundImage: "url('/static-gradient.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <l-bouncy
        size="80"
        speed="1.75"
        color="white"
        className="mb-8"
      ></l-bouncy>
      <h3 className="font-extrabold text-xl mb-2">Tip:</h3>
      <p className="max-w-1/4 text-center text-white">
        Did you know that capybaras are the largest rodents in the world?
      </p>
    </main>
  );
}
