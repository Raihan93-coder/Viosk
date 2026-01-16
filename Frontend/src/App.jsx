import KioskButton from "./Components/button";
import ElectricityImage from "./assets/electricity.jpg";

function App() {
  return (
    <>
      <KioskButton content="Button 1" image={ElectricityImage} />
      <KioskButton content="Button 2" />
    </>
  );
}

export default App;
