import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import CardMain from "../../components/CardMain";
import IndexLayaut from "../../layauts/indexLayaut";
import { restCountry } from "../../apiconfig/countryApi";
import LoaderComp from "../../components/LoaderComp";
import Countrys from "../../context/countrys";
const Country = () => {
  const router = useRouter();
  const { country } = router.query;
  const [countryName, setCountryName] = useState([]);
  const [loader, setLoader] = useState(false);
  const getName = async (name) => {
    try {
      setLoader(true);
      const { data } = await restCountry(`/name/${name}`);
      const result = await data;
      setLoader(false);
      setCountryName(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getName(country);
  }, [country]);
  return (
    <Countrys.Provider value={countryName}>
      <IndexLayaut>
        <Head>
          <title>Country | {country} </title>
        </Head>
        {loader ? <LoaderComp /> : null}
        {countryName.map(({ name, flags, capital, population, region }) => {
          const official = name.official;
          const keyData = name.common;
          const capitalCity = capital;
          const flagsImage = flags.svg;
          return (
            <CardMain
              key={keyData}
              country={official}
              flag={flagsImage}
              population={population}
              capital={capitalCity}
              region={region}
            />
          );
        })}
      </IndexLayaut>
    </Countrys.Provider>
  );
};

export default Country;
