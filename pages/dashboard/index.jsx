import AlexioHead from "src/AlexioHead";
import AlexioState from "src/Context";
import Preloader from "src/Preloader";

import { useEffect, useState } from "react";
import Index from "./main";

export default function MainApp() {
  const [load, setLoad] = useState(false);
  const [load1, setLoad1] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoad1(true);
    }, 1000);
    setTimeout(() => {
      setLoad(true);
    }, 2000);
  }, []);

  return (
    <AlexioState>
      <AlexioHead />
      {!load && <Preloader />}
      {load1 && <Index />}
    </AlexioState>
  );
}
