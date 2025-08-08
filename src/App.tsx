import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* A 100vh tall section to have scrolling space. */}
      <section className="margin-4 h-screen w-full border-2 border-cyan-300">
        <h1 className="text-[clamp(4rem,15vw,8rem)] text-cyan-300">
          Next Section
        </h1>
      </section>
    </main>
  );
}

export default App;
