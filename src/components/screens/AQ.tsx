import React, { ReactElement, useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { Head } from '~/components/shared/Head';
import AQI from '~/components/lib/AQI';
import GraphComponent from '~/components/lib/GraphComponent';
import DataFetcher from '../lib/API/DataFetcher';
import { AqiDataEntry, ApiResponseMET } from '../lib/API/APIResponse';

function AQPage() {
  const [aqiValue, setAqiValue] = useState(null);
  const [aqiValueName, setAqiNameValue] = useState(null);
  const [aqiValue2, setAqi2Value] = useState(null);
  const [aqiValue2Name, setAqi2NameValue] = useState(null);
  const [aqiValue3, setAqi3Value] = useState(null);
  const [aqiValue3Name, setAqi3NameValue] = useState(null);

  const [testValues, setTestValues] = useState<ApiResponseMET | null>(null);
  const PRE = DataFetcher('https://api.met.no/weatherapi/airqualityforecast/0.1/?station=NO0057A');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.met.no/weatherapi/airqualityforecast/0.1/?station=NO0060A');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const res2 = await fetch('http://api.waqi.info/feed/bangkok/?token=22f37ad5c0fae31b55ee3304697b74c44a1a4cd0');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const res3 = await fetch('http://api.waqi.info/feed/new-delhi/?token=22f37ad5c0fae31b55ee3304697b74c44a1a4cd0');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        setTestValues(await (PRE.data as unknown as PromiseLike<ApiResponseMET>));
        const data = await res.json();
        const aqiname = data.meta.location.name;
        const aqi = data.data.time[0].variables.AQI.value;
        const data2 = await res2.json();
        const aqi2 = data2;
        const data3 = await res3.json();
        const aqi3 = data3;
        console.log('AQI:', aqi);
        console.log('AQI Name:', aqiValueName);
        console.log('AQI:', aqi2.data.aqi);
        console.log('AQI:', aqi3.data.aqi);
        setAqiValue(aqi.toFixed(1));
        setAqiNameValue(aqiname);
        setAqi2Value(aqi2.data.aqi.toFixed(1));
        setAqi2NameValue(aqi2.data.city.name);
        setAqi3Value(aqi3.data.aqi.toFixed(1));
        setAqi3NameValue(aqi3.data.city.name);
      } catch (error) {
        console.error('Error fetching and sorting data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head title={'Air Quality representation'}></Head>
      <div className="grid">
        <div className="flex justify-center mb-4 p-4 overflow-auto">
          <AQI api={'https://api.met.no/weatherapi/airqualityforecast/0.1/?station=NO0057A'} />
          <AQI api={'https://api.met.no/weatherapi/airqualityforecast/0.1/?station=NO0104A'} />
        </div>
        <div className="flex justify-center items-center mb-4 p-4">
          <GraphComponent />
          <GraphComponent />
        </div>
        <div>
          {/* Display the values of  the testvalues, name of location and date in this component */}
          {/* <p>Location: {testValues?.meta.location.name}</p> */}
          {/* <p>Date and time: {new Date(testValues?.data.time).toLocaleString()}</p> */}
        </div>
      </div>
    </>
  );
}

export default AQPage;
