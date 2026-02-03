import axios from 'axios'
import getInfoDevices from './src/api/wialon.js';
import { API_VecFleet } from './src/api/VecFleet.js';
import { destructWialon } from './src/utils/utils.js';

const ApiVecFleet = new API_VecFleet();
const payload = [{
      "imei": "860369050435922",
      "plate": "EK2965D",
      "date": "2026-01-27T12:00:00",
      "lat": 25.6866,
      "lon": -100.3161,
      "speed": 65,
      "odometer": 152340,
      "direction": 90,
      "rpm": 2100,
      "temperature": 82,
      "fuel": 70
    },
    {
      "imei": "868963049982333",
      "plate": "EK5219D",
      "date": "2026-01-27T12:01:00",
      "lat": 25.6875,
      "lon": -100.3180,
      "speed": 58,
      "odometer": 98765,
      "direction": 120,
      "rpm": 2000,
      "temperature": 80,
      "fuel": 65
    },
    {
      "imei": "860369050436169",
      "plate": "FLV286C",
      "date": "2026-01-27T12:02:00",
      "lat": 25.6890,
      "lon": -100.3205,
      "speed": 72,
      "odometer": 203450,
      "direction": 85,
      "rpm": 2300,
      "temperature": 88,
      "fuel": 55
    },
    {
      "imei": "860369050375904",
      "plate": "GBT709C",
      "date": "2026-01-27T12:03:00",
      "lat": 25.6902,
      "lon": -100.3221,
      "speed": 40,
      "odometer": 176890,
      "direction": 60,
      "rpm": 1500,
      "temperature": 75,
      "fuel": 80
    },
    {
      "imei": "860369050668464",
      "plate": "GBR092C",
      "date": "2026-01-27T12:04:00",
      "lat": 25.6920,
      "lon": -100.3250,
      "speed": 90,
      "odometer": 245600,
      "direction": 100,
      "rpm": 2500,
      "temperature": 92,
      "fuel": 45
    },
    {
      "imei": "860369050291606",
      "plate": "GBT714C",
      "date": "2026-01-27T12:05:00",
      "lat": 25.6938,
      "lon": -100.3274,
      "speed": 0,
      "odometer": 134500,
      "direction": 0,
      "rpm": 800,
      "temperature": 70,
      "fuel": 90
    }];

const app = async () => {
  try {
    const data = await getInfoDevices();
    const devices = destructWialon(data);

    const response = await ApiVecFleet.sendAvl(devices);
    if( response.status = 200 ){
      console.log(`Response Ok, [Code]:200 in URL[${response.config.url}]`);
      // console.log(response.data);
      console.table(devices);
    }else if( response.status = 401 ){
      console.log('Token invalido o usuario incorrecto.');
      const reponseLogin = await ApiVecFleet.getToken();
      console.log(`Token sugerido ${reponseLogin}`);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

app();

setInterval(app, 60000);
