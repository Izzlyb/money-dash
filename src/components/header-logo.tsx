

import Image from "next/image";

type Props = {};

const HeaderLogo = (props: Props) => {
  return (
    <div>
      <div className=" hidden lg:flex items-center justify-center " >
        <Image 
          src="/images/st-bank.svg"
          alt="bank logo"
          width={110}
          height={110}
        />
        <p className=" font-semibold text-yellow-200 text-2xl ml-2.5 ">
          Finance Dashboard
        </p>
      </div>
    </div>
  );
};

export default HeaderLogo;
