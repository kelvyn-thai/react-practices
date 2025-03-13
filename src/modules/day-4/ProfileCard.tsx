import Image from "next/image";

export interface IImageData {
  src: string;
  alt: string;
}

export interface IProfileCard {
  id: string;
  name: string;
  imageData: IImageData;
  todos?: ITodoItem[];
  theme?: { backgroundColor: string; color: string };
}

export interface ITodoItem {
  id: string;
  label: string;
  description?: string;
  isCompleted?: boolean;
}

export interface IProfileTodoList {
  todos: ITodoItem[];
}

const ProfileImage = ({ src, alt }: IImageData) => {
  return (
    <div className="w-fit m-1 p-5 border-solid border-[#aaa] border-[1px] rounded-2xl">
      <figure className="w-24 h-24 relative">
        <Image {...{ src, alt }} fill style={{ borderRadius: "50%" }} />
      </figure>
    </div>
  );
};

const ProfileTodoList = ({ todos }: IProfileTodoList) => {
  return (
    <ul className="mt-5">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="pl-5 relative before:absolute before:content-[''] before:left-2.5 before:top-3 before:-translate-1/2 before:w-1.5 before:h-1.5  before:rounded-[50%] before:bg-green-400 "
        >
          {`${todo.label} ${todo.isCompleted && "✅"}`}
        </li>
      ))}
    </ul>
  );
};

const ProfileCard = ({
  name,
  imageData: { src, alt },
  todos,
  theme = { backgroundColor: "white", color: "black" },
}: IProfileCard) => {
  return (
    <div style={{ ...theme }}>
      <h1 className="text-2xl font-bold leading-8 mb-5">{name}</h1>
      <ProfileImage {...{ src, alt }} />
      <ProfileTodoList todos={todos || []} />
    </div>
  );
};

export default ProfileCard;
