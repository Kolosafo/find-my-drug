export default function Loader() {
  return (
    <div className="grid min-h-[calc(100vh-136px)] place-content-center">
      <div className="flex flex-col gap-8 items-center justify-center">
        <div className="three-body">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <p className="text-blue-600">Loading...</p>
      </div>
    </div>
  );
}
