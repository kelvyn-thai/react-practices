"use client";
// import { useMemo, useState } from "react";
//
// import { people, getImageUrl } from "@/mock/day-4";
//
// import ScientistCard, { IScientistCard } from "./Scientist";
//
// const Gallery = () => {
//   const [lang, setLang] = useState("en");
//   const scientists: IScientistCard[] = useMemo(() => {
//     console.log("memoize value");
//     return people.map((p) => ({
//       id: String(p.id),
//       name: p.name,
//       imageData: {
//         src: getImageUrl(p),
//         alt: `${lang === "en" ? "Profile of" : "Trang cá nhân"} ${p.name}`,
//       },
//       profession: p.profession,
//       accomplishment: p.accomplishment,
//     }));
//   }, [lang]);
//   return (
//     <section className="pl-4">
//       <p>{lang}</p>
//       <button onClick={() => setLang("vn")}>Change language</button>
//       <h1 className="mb-5 font-bold text-2xl leading-6">Scientists</h1>
//       {scientists.map((p) => (
//         <ScientistCard key={p.id} {...{ ...p }} />
//       ))}
//     </section>
//   );
// };
//
// export default Gallery;
//

// import TeaSet from "./PureComponent";
//
// export default TeaSet;
