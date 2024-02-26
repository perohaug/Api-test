import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Select from 'react-select';

interface ApiResponse {
  status: string;
  data: {
    aqi: number;
    idx: number;
    city: {
      name: string;
      geo: any[];
      url: string;
      location: string;
    };
    dominentpol: string;
    time: {
      s: string;
      tz: string;
      v: number;
      iso: string;
    };
    forecast: {
      daily: {
        pm10: {
          avg: number;
          day: string;
          max: number;
          min: number;
        }[];
        pm25: {
          avg: number;
          day: string;
          max: number;
          min: number;
        }[];
      };
    };
    iaqi: any;
    attributions: any[];
    debug: any;
  };
}

interface ChartData {
  series: {
    name: string;
    data: number[];
  }[];
  options: {
    xaxis: {
      categories: string[];
    };
  };
}

const GraphComponent: React.FC = () => {
  const [graphData, setGraphData] = useState<ChartData>({ series: [], options: { xaxis: { categories: [] } } });
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://api.waqi.info/search/?keyword=${selectedCity}&token=22f37ad5c0fae31b55ee3304697b74c44a1a4cd0`,
        );
        // console.log('response:', response);
        const jsonData = await response.json();

        // Extract city names from the API response
        const cityNames = jsonData.data.map((entry: { station: { name: string } }) => entry.station.name);
        setCities(cityNames);
        // console.log('cities:', cityNames, jsonData.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [selectedCity]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCity) {
          const response = await fetch(
            `https://api.waqi.info/feed/${encodeURIComponent(
              selectedCity,
            )}/?token=22f37ad5c0fae31b55ee3304697b74c44a1a4cd0`,
          );
          const jsonData2: ApiResponse = await response.json();

          // Extract relevant data
          const isoDate = jsonData2.data.time.iso.split('T')[0]; // Extract date part only
          const pm10Avg = jsonData2.data.forecast.daily.pm10.find((entry) => entry.day === isoDate)?.avg || 0;
          const pm25Avg = jsonData2.data.forecast.daily.pm25.find((entry) => entry.day === isoDate)?.avg || 0;

          // Prepare data for ApexCharts
          const chartData: ChartData = {
            series: [
              {
                name: 'PM10',
                data: [pm10Avg],
              },
              {
                name: 'PM25',
                data: [pm25Avg],
              },
            ],
            options: {
              xaxis: {
                categories: ['PM10', 'PM25'],
              },
            },
          };

          // Set data for the graph
          setGraphData(chartData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCity]);

  return (
    <div className="text-center">
      <h2>{`AQI Data for PM10 and PM25`}</h2>
      <Select
        options={cities.map((city) => ({ value: city, label: city }))}
        placeholder="Search for a city"
        isSearchable
        onChange={(selectedOption) => setSelectedCity(selectedOption?.value || null)}
      />
      <Chart
        options={graphData.options}
        series={graphData.series}
        type="bar"
        height={250}
        className="p-4 border border-gray-200 rounded-lg shadow m-4"
      />
    </div>
  );
};

export default GraphComponent;
