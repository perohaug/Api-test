import React, { useState, useEffect } from 'react';
import { ApiResponseMET, ApiResponseB, ApiResponse, AqiDataEntry } from './APIResponse';

function DataFetcher(apiEndpoint: string): ApiResponse<ApiResponse> {
  const [fetchedData, setFetchedData] = useState<ApiResponse>({} as ApiResponse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        console.log(response);
        // Use different interfaces based on the API endpoint
        if (apiEndpoint.includes('api.met.no')) {
          const data: ApiResponseMET = await response.json();
          console.log('MET:', data.data.time[0].variables.AQI_pm25);
          setFetchedData(data);
        } else if (apiEndpoint.includes('waqi.info')) {
          const data: ApiResponseB = await response.json();
          setFetchedData(data as ApiResponse);
        }
        // Add more conditions for other APIs as needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiEndpoint]);
  console.log('fetchedData:', fetchedData);
  return fetchedData;
}
export default DataFetcher;
