import getInfoDevices from './src/api/wialon.js';
import { destructWialon } from './src/utils/utils.js';

import axios from 'axios'
const app = () => {
  getInfoDevices()
    .then((data) => {
      return destructWialon(data);
    })
    .then((devices) => {
      devices.map(device => {
        const { name, URL } = device;

        axios.get(URL)
          .then(response => {
            console.log(`%c${name}: Enviado con exito!`, "color:red;background:yellow;font-size:26px")
          })
          .catch(error => {
            console.error(error);
          });
      })
    })
    .catch((error) => {
      console.error(error);
    });
};

app();

setInterval(app, 60000);
