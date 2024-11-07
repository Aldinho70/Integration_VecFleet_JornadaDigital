import getInfoDevices from './src/api/wialon.js'
import { destructWialon } from './src/utils/utils.js'
import TcpClient from './src/tcp/Wialon_IPS.js';

const app = () => {
    getInfoDevices()
      .then((data) => {
        return destructWialon( data );  
      })
      .then((devices) => {
        devices.map( _device => {
          const { login, fulldata } = _device;
          console.log( login, fulldata );
          const tcpClient = new TcpClient(login, fulldata);
          tcpClient.connect();
        });
      })
      .catch((error) => {
        console.error(error);
      });
};

app();

setInterval(app, 60000);
