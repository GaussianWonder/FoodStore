const NotAuthedBanner = () => {
  return (
    <section className="relative max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 text-gray-800 bg-white">
      <div className="max-w-screen-xl px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 h-16">
            Food store app
          </h1>

          <p className="max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl text-gray-700">
            Please re-authenticate to continue!
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotAuthedBanner;
