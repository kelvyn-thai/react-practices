import Image from "next/image";

export interface IScientistCard {
  id: string;
  name: string;
  imageData: IImageData;
  profession: string;
  accomplishment: string;
}

export interface IImageData {
  src: string;
  alt: string;
}

const ProfileImage = ({ src, alt }: IImageData) => {
  return (
    <div className="w-fit py-1 rounded-2xl">
      <figure className="w-24 h-24 relative">
        <Image {...{ src, alt }} fill style={{ borderRadius: "50%" }} />
      </figure>
    </div>
  );
};

const ProfileDescription = ({
  name,
  profession,
  accomplishment,
}: Partial<IScientistCard>) => {
  return (
    <p className="text-base leading-6 text-left font-bold">
      {`${name} `}
      <span className="inline-block font-medium">{`${profession} known for ${accomplishment}`}</span>
    </p>
  );
};

const ScientistCard = (data: IScientistCard) => {
  return (
    <section className="grid grid-cols-[minmax(140px,_1fr)_1fr] items-center justify-self-start justify-between gap-4 min-w-80 w-full">
      <ProfileImage {...{ ...data.imageData }} />
      <ProfileDescription {...{ ...data }} />
    </section>
  );
};

export default ScientistCard;
