import { useRouter } from 'next/navigation';

type Props = {
  title: string;
  imgUri: string;
  recipeId: number;
};

const Card: React.FC<Props> = ({ title, imgUri, recipeId }) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/recipes/${recipeId}`);
  };

  return (
    <div
      className="border-4 flex flex-col justify-center items-center text-center pb-1
      mt-2 mx-2 w-[300px] bg-white cursor-pointer md:w-[600px] md:mt-4 md:mx-4
      hover:shadow-[0_0_5px_5px_rgba(59,130,246,0.5)] transition-all duration-500"
      onClick={handleOnClick}
    >
      <div className="">
        <h2 className="text-xl md:text-2xl">{title}</h2>
      </div>
      <div className="w-full h-auto max-w-[150px] md:max-w-[300px] border-1 rounded-full overflow-hidden">
        <img
          src={imgUri}
          alt={title}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Card;
