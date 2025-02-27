const Spinner = ({isOpen}:{isOpen:boolean}) => {
    return (
      <>
      {isOpen &&
        <div className="flex justify-center items-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
        </div>
      }
      </>
    );
  };
  
  export default Spinner;
  