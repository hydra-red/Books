import { GiElectric } from "react-icons/gi";

function RateLimit() {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="border-2 border-primary py-5 px-2 md:px-15 bg-base-content/20 text-center flex rounded-3xl">
      <div className=" bg-primary/50 p-4 rounded-full">
      <GiElectric className="size-10 md:size-20"/>
      </div>
      <div className="mx-10 flex flex-col justify-center items-center">
        <h1 className="text-primary font-bold md:text-3xl mb-5">Rate Limit Reached</h1>
        <p className="text-primary/80">Please Try again Later</p>
      </div>
      </div>
    </div>
  );
}

export default RateLimit;
