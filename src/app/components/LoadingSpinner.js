import './LoadingScreen.css';
const LoadingSpinner = () => {
    return (
      <div className=" flex-col text-black flex justify-center items-center h-screen w-screen">
      <div className="loader"></div>
      <p className="p-5">Wait!</p>
    </div>
    );
  };
  
  export default LoadingSpinner;
  