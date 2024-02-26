// types.ts

import { Key, ReactNode } from 'react';

export interface ApiResponse<T = any> {
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
      variables: T;
    }[];
  };
}

export interface AqiDataEntry {
  value: ReactNode;
  time: Key | null | undefined;
  datetime: string;
  values: Record<string, number>;
}

// Define your different API response interfaces
export interface ApiResponseMET {
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

export type METStations = ApiMETStations[];

export interface ApiMETStations {
  name: string;
  eoi: string;
  height: number;
  longitude: string;
  latitude: string;
  grunnkrets: Grunnkrets;
  delomrade: Delomrade;
  kommune: Kommune;
}

export interface Grunnkrets {
  name: string;
  areacode: string;
}

export interface Delomrade {
  name: string;
  areacode: string;
}

export interface Kommune {
  name: string;
  areacode: string;
}

export interface ApiResponseB {
  // ... Interface for API B
}

// export type ResponseNilu = ApiResponseNilu[];

export interface ApiResponseNilu {
  [station: string]: {
    id: number;
    zone: string;
    municipality: string;
    area: string;
    station: string;
    type: string;
    eoi?: string;
    latitude: number;
    longitude: number;
    owner?: string;
    status?: string;
    description?: string;
    firstMeasurment: string;
    lastMeasurment: string;
    components: string;
    isVisible: boolean;
  };
}

const PM25AQI = (x: number) => {
  let aqi = 1;
  if (x < 0) {
    aqi = 1;
  } else if (x < 30.0) {
    aqi = x / 30.0 + 1;
  } else if (x < 50.0) {
    aqi = (x - 30.0) / (50.0 - 30.0) + 2;
  } else if (x < 150.0) {
    aqi = (x - 50.0) / (150.0 - 50.0) + 3;
  } else {
    aqi = x / 150.0 + 3;
  }

  if (aqi > 4.999) {
    aqi = 4.999;
  }

  return aqi;
};

const PM10AQI = (x: number) => {
  let aqi = 1;
  if (x < 0) {
    aqi = 1;
  } else if (x < 60.0) {
    aqi = x / 60.0 + 1;
  } else if (x < 120.0) {
    aqi = (x - 60.0) / (120.0 - 60.0) + 2;
  } else if (x < 400.0) {
    aqi = (x - 120.0) / (400.0 - 120.0) + 3;
  } else {
    aqi = x / 400.0 + 3;
  }

  if (aqi > 4.999) {
    aqi = 4.999;
  }

  return aqi;
};

const NO2AQI = (x: number) => {
  let aqi = 1;
  if (x < 0) {
    aqi = 1;
  } else if (x < 100.0) {
    aqi = x / 100.0 + 1;
  } else if (x < 200.0) {
    aqi = (x - 100.0) / (200.0 - 100.0) + 2;
  } else if (x < 400.0) {
    aqi = (x - 200.0) / (400.0 - 200.0) + 3;
  } else {
    aqi = x / 400.0 + 3;
  }

  if (aqi > 4.999) {
    aqi = 4.999;
  }

  return aqi;
};

const SO2AQI = (x: number) => {
  let aqi = 1;
  if (x < 0) {
    aqi = 1;
  } else if (x < 100.0) {
    aqi = x / 100.0 + 1;
  } else if (x < 350.0) {
    aqi = (x - 100.0) / (350.0 - 100.0) + 2;
  } else if (x < 500.0) {
    aqi = (x - 350.0) / (500.0 - 350.0) + 3;
  } else {
    aqi = x / 500.0 + 3;
  }

  if (aqi > 4.999) {
    aqi = 4.999;
  }

  return aqi;
};

const O3AQI = (x: number) => {
  let aqi = 1;
  if (x < 0) {
    aqi = 1;
  } else if (x < 100.0) {
    aqi = x / 100.0 + 1;
  } else if (x < 180.0) {
    aqi = (x - 100.0) / (180.0 - 100.0) + 2;
  } else if (x < 240.0) {
    aqi = (x - 180.0) / (240.0 - 180.0) + 3;
  } else {
    aqi = x / 240.0 + 3;
  }

  if (aqi > 4.999) {
    aqi = 4.999;
  }

  return aqi;
};

const AQI = (x: number) => {
  let aqi = 1;
  if (x < 0) {
    aqi = 1;
  } else if (x < 2.0) {
    aqi = x / 2.0 + 1;
  } else if (x < 3.0) {
    aqi = (x - 2.0) / (3.0 - 2.0) + 2;
  } else if (x < 4.0) {
    aqi = (x - 3.0) / (4.0 - 3.0) + 3;
  } else {
    aqi = x / 4.0 + 3;
  }

  if (aqi > 4.999) {
    aqi = 4.999;
  }

  return aqi;
};
