const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 text-white">

      {/* Radial Gradient Background Overlay */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl text-purple-500 font-bold mb-4">
        Delicious Food, Delivered Fast! 🚀
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-800 max-w-2xl">
        Enjoy gourmet meals from the comfort of your home with our quick & fresh cloud kitchen service.
      </p>

      {/* Order Now Button */}
      <a href="#" className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        Order Now
      </a>

    </section>
  );
};

export default Hero;
