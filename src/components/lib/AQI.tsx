// import Select from 'react-select';
// import React, { useState, useEffect } from 'react';

// interface Station {
//   name: string;
//   eoi: string;
// }

// interface AQIProps {
//   api: string;
// }

// function AQI({ api }: AQIProps) {
//   const [stations, setStations] = useState<Station[]>([]);
//   const [selectedStation, setSelectedStation] = useState<string | null>(null);
//   const [aqiData, setAqiData] = useState<{ datetime: string; value: number }[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (selectedStation) {
//         try {
//           const res = await fetch(`https://api.met.no/weatherapi/airqualityforecast/0.1/?station=${selectedStation}`);
//           const data = await res.json();

//           const aqiDataArray = data.data.time.map(
//             (timeEntry: { from: string | number | Date; variables: { AQI: { value: any } } }) => {
//               const formattedDatetime = new Date(timeEntry.from).toLocaleString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//                 hour: 'numeric',
//                 hour12: false,
//               });

//               return {
//                 datetime: formattedDatetime,
//                 value: timeEntry.variables?.AQI?.value.toFixed(2) || null,
//               };
//             },
//           );

//           console.log('AQI Data:', aqiDataArray);
//           setAqiData(aqiDataArray);
//         } catch (error) {
//           console.error('Error fetching and sorting data:', error);
//         }
//       }
//     };

//     fetchData();
//   }, [api, selectedStation]);

//   useEffect(() => {
//     // Mock API call to fetch station data
//     const fetchStations = async () => {
//       try {
//         // Replace with actual API endpoint
//         const res = await fetch('https://api.met.no/weatherapi/airqualityforecast/0.1/stations');
//         const data = await res.json();

//         setStations(data);
//       } catch (error) {
//         console.error('Error fetching stations:', error);
//       }
//     };

//     fetchStations();
//   }, []);

//   return (
//     <>
//       <div className="block w-80 h-100 m-3 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
//         <div className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">AQI values of:</div>
//         <Select
//           className="mt-2 mb-2"
//           options={stations.map((station) => ({ value: station.eoi, label: station.name }))}
//           placeholder="Choose a station"
//           onChange={(selectedOption) => setSelectedStation(selectedOption?.value || null)}
//         />
//         <div className="font-normal text-sm text-gray-900 dark:text-gray-400 h-80 overflow-auto">
//           {/*Add a Select tag which is searchable for the station name and returns the aqi value for the selected station.*/}
//           <ul>
//             {aqiData.map((aqiEntry) => (
//               <li key={aqiEntry.datetime}>
//                 {aqiEntry.datetime}: <b>{aqiEntry.value}</b>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AQI;

import Select from 'react-select';
import React, { useState, useEffect, ReactNode } from 'react';

interface Station {
  name: string;
  eoi: string;
  grunnkrets: {
    name: string;
    areacode: string;
  };
  delomrade: {
    name: string;
    areacode: string;
  };
  kommune: {
    name: string;
    areacode: string;
  };
}

interface AQIResponse {
  meta: {
    reftime: string;
    location: {
      name: string;
      path: string;
      longitude: string;
      latitude: string;
      areacode: string;
    };
    superlocation: {
      name: string;
      path: string;
      longitude: string;
      latitude: string;
      areacode: string;
      areaclass: string;
      superareacode: string;
    };
    sublocations: [];
  };
  data: {
    time: {
      from: string;
      to: string;
      variables: {
        AQI: {
          value: number;
          units: string;
        };
        no2_concentration: {
          value: number;
          units: string;
        };
        AQI_no2: {
          value: number;
          units: string;
        };
        no2_nonlocal_fraction: {
          value: number;
          units: string;
        };
        no2_local_fraction_traffic_exhaust: {
          value: number;
          units: string;
        };
        no2_local_fraction_shipping: {
          value: number;
          units: string;
        };
        no2_local_fraction_heating: {
          value: number;
          units: string;
        };
        no2_local_fraction_industry: {
          value: number;
          units: string;
        };
        pm10_concentration: {
          value: number;
          units: string;
        };
        AQI_pm10: {
          value: number;
          units: string;
        };
        pm10_nonlocal_fraction: {
          value: number;
          units: string;
        };
        pm10_nonlocal_fraction_seasalt: {
          value: number;
          units: string;
        };
        pm10_local_fraction_traffic_exhaust: {
          value: number;
          units: string;
        };
        pm10_local_fraction_traffic_nonexhaust: {
          value: number;
          units: string;
        };
        pm10_local_fraction_shipping: {
          value: number;
          units: string;
        };
        pm10_local_fraction_heating: {
          value: number;
          units: string;
        };
        pm10_local_fraction_industry: {
          value: number;
          units: string;
        };
        pm25_concentration: {
          value: number;
          units: string;
        };
        AQI_pm25: {
          value: number;
          units: string;
        };
        pm25_nonlocal_fraction: {
          value: number;
          units: string;
        };
        pm25_nonlocal_fraction_seasalt: {
          value: number;
          units: string;
        };
        pm25_local_fraction_traffic_exhaust: {
          value: number;
          units: string;
        };
        pm25_local_fraction_traffic_nonexhaust: {
          value: number;
          units: string;
        };
        pm25_local_fraction_shipping: {
          value: number;
          units: string;
        };
        pm25_local_fraction_heating: {
          value: number;
          units: string;
        };
        pm25_local_fraction_industry: {
          value: number;
          units: string;
        };
        o3_concentration: {
          value: number;
          units: string;
        };
        AQI_o3: {
          value: number;
          units: string;
        };
        o3_nonlocal_fraction: {
          value: number;
          units: string;
        };
      };
    }[];
  };
}

interface AQIProps {
  api: string;
}

function AQI({ api }: AQIProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [aqiData, setAqiData] = useState<
    {
      color: string | undefined;
      descriptionNO: string;
      datetime: string;
      value: number;
    }[]
  >([]);
  const [aqiDescriptions, setAqiDescriptions] = useState<any>({}); // Store AQI descriptions

  useEffect(() => {
    // Fetch AQI descriptions
    const fetchAqiDescriptions = async () => {
      try {
        const res = await fetch('https://api.met.no/weatherapi/airqualityforecast/0.1/aqi_description');
        const data = await res.json();
        setAqiDescriptions(data.variables.AQI);
        // console.log('desc:', aqiDescriptions);
      } catch (error) {
        console.error('Error fetching AQI descriptions:', error);
      }
    };

    fetchAqiDescriptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedStation) {
        try {
          const res = await fetch(`https://api.met.no/weatherapi/airqualityforecast/0.1/?station=${selectedStation}`);
          const data = await res.json();

          const dominantPollutant = getDominantPollutant(data);

          const aqiDataArray = data.data.time.map(
            (timeEntry: { from: string | number | Date; variables: { AQI: { value: any } } }) => {
              const formattedDatetime = new Date(timeEntry.from).toLocaleString('no-NO', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                hour12: false,
              });

              const roundedAqi = parseFloat(timeEntry.variables?.AQI?.value || 0).toFixed(2);

              return {
                datetime: formattedDatetime,
                value: roundedAqi,
                descriptionNO: aqiDescriptions.aqis.find((aqi: any) => roundedAqi <= aqi.to)?.description_NO,
                color: aqiDescriptions.aqis.find((aqi: any) => roundedAqi <= aqi.to)?.color,
              };
            },
          );

          // console.log('AQI Data:', aqiDataArray);
          setAqiData(aqiDataArray);
          console.log(`${dominantPollutant} is the dominant pollutant right now`);
        } catch (error) {
          console.error('Error fetching and sorting data:', error);
        }
      }
    };

    fetchData();
  }, [api, selectedStation, aqiDescriptions]);

  // Add a function to determine the dominant pollutant
  const getDominantPollutant = (data: any) => {
    // Define the pollutant variables and their AQI values
    const pollutants = [
      { variable: 'AQI_pm10', value: data.data.time[0].variables.AQI_pm10.value },
      { variable: 'AQI_pm25', value: data.data.time[0].variables.AQI_pm25.value },
      { variable: 'AQI_o3', value: data.data.time[0].variables.AQI_o3.value },
      { variable: 'AQI_no2', value: data.data.time[0].variables.AQI_no2.value },
      // Add more pollutants as needed
    ];
    console.log('Verdier for pollutants:', pollutants);
    // Find the pollutant with the highest AQI value
    const dominantPollutant = pollutants.reduce((prev, current) => (prev.value > current.value ? prev : current));

    return dominantPollutant.variable;
  };

  useEffect(() => {
    // Mock API call to fetch station data
    const fetchStations = async () => {
      try {
        // Replace with actual API endpoint
        const res = await fetch('https://api.met.no/weatherapi/airqualityforecast/0.1/stations');
        const data = await res.json();

        setStations(data);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, []);

  return (
    <>
      <div className="block w-1/4 h-100 m-3 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <div className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">AQI values of:</div>
        <Select
          className="mt-2 mb-2"
          options={stations.map((station) => ({
            value: station.eoi,
            label: station.name + ', ' + station.delomrade.name + ', ' + station.kommune.name,
          }))}
          placeholder="Choose a station"
          isSearchable={true}
          onChange={(selectedOption) => setSelectedStation(selectedOption?.value || null)}
        />
        <div className="font-normal text-sm text-gray-900 dark:text-gray-400 h-80 overflow-auto">
          <ul>
            {aqiData.map((aqiEntry) => (
              <li key={aqiEntry.datetime} /* style={{ background: aqiEntry.color }} */>
                {aqiEntry.datetime}: <b style={{ color: aqiEntry.color }}>{aqiEntry.value}</b> -{' '}
                {aqiEntry.descriptionNO}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AQI;
