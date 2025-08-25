import Header from "./header";
import Journey from "./journey";
import Main from "./main";

export default function AboutSection() {
  return (
    <section className="w-full lg:max-h-dvh min-h-dvh bg-background flex  items-center flex-col  space-y-5 p-5 relative">
      <Header />
      <div className="flex w-11/12 max-lg:flex-col flex-1 gap-5 lg:overflow-hidden">
        <Main />
        <Journey />
      </div>
    </section>
  );
}
