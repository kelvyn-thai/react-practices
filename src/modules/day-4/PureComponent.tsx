let guest = 0;

const Cup = () => {
  console.log({ guest });
  guest = guest + 1;
  console.log({ guest });
  return <h2>Tea cup for guest #{guest}</h2>;
};

export default function TeaSet() {
  return (
    <>
      <Cup></Cup>
      <Cup></Cup>
      <Cup></Cup>
    </>
  );
}
