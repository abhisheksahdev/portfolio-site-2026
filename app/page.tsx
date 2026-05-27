export default function Home() {
  return (
    <div className="flex">
      {/* navbar */}
      <nav className="flex w-screen top-[1vw] items-center justify-center fixed">
        <div className="absolute top-0 left-[1vw]">Logo</div>
        <div className="font-medium">Sat 20:45, Ethelbari</div>
        <div className="absolute top-0 right-[1vw] flex gap-[3vw]">
          <div>Services</div>
          <div>Portfolio</div>
          <div>Resume</div>
        </div>
      </nav>
      {/*  */}
    </div>
  );
}
