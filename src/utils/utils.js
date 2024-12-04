/**
 * Convierte coordenadas decimales a formato DMS (Latitud)
 */
export function decimalToDMS(decimal) {
    const degrees = Math.floor(decimal);
    const minutes = (decimal - degrees) * 60;
    return `${degrees}${minutes.toFixed(2).padStart(5, '0')}`;
}

/**
 * Convierte coordenadas decimales a formato DMS (Longitud)
 */
export function decimalToDMSLong(decimal) {
    const isNegative = decimal < 0;
    const absDecimal = Math.abs(decimal);
    const degrees = Math.floor(absDecimal);
    const minutes = (absDecimal - degrees) * 60;
    const formattedDegrees = String(degrees).padStart(3, '0');
    const formattedMinutes = minutes.toFixed(2).padStart(5, '0');
    return `${formattedDegrees}${formattedMinutes}`;
}

export function parseDateTime(timestamp) {
    // Verificar si el timestamp es válido
    if (!timestamp) return "NA";

    try {
        // Convertir el timestamp a un objeto Date en UTC
        const date = new Date(timestamp * 1000); // Multiplicamos por 1000 para convertir a milisegundos
        if (isNaN(date.getTime())) return "NA";

        // Formatear la fecha en YYYY-MM-DD
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');

        // Formatear la hora en HH:MM:SS
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        // Retornar el formato final
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } catch (error) {
        // En caso de error, retornar "NA"
        return "NA";
    }
}


/**
 * Desestrucuturar las respuesta de getInfoDevice
 */

export const destructWialon = (data) => {
  const deviceInfoList = [];
  data.map( element => {
    const REGEX_IGNITION = /(I(GN|GN|N)?(I|IN)?(CI)?(Ó|O)N?)/i;
    
    const { nm, id, pos, prms, netconn, lmsg, sens  } = element;
    const { y, x, s, t, c, z } = pos;
    const { p } = lmsg;
    const { pwr_ext } = p;
    const time = parseDateTime(t); 
    let params_sens_ignition;
    let params_sens_batery_backup;
    
    Object.values(sens).forEach((sens) => {
        const { n, p } = sens; 
        if ( REGEX_IGNITION.test(n) || n == 'IGN') {
            params_sens_ignition = p;
        }
    });

    Object.values(sens).forEach((sens) => {
        const { n, p } = sens; 
        if ( n == 'BATERIA INTERNA') {
            params_sens_batery_backup = p;
        }
    });

    const ignition = prms[params_sens_ignition]?.v ?? 0;
    const batery_backup = prms[params_sens_batery_backup]?.v ?? 0;
    const odometro = prms['mileage']?.v ?? 0; 
    const SOS = prms['input1']?.v ?? 0;  

    deviceInfoList.push ({ 
        name: nm,
        timestamp: t,
        device_id: id,
        dt: time,
        lat: x,
        lng: y,
        altitude: z,
        angle: c,
        speed : s,
        loc_valid : netconn,
        /* Parametros adicionales */
            acc: ignition,
            accv : pwr_ext ?? 0,
            batp: batery_backup,
            odo: odometro,
            gsmlev: 100,

        /* Eventos */
            SOS: SOS,
            URL: ` https://gps.undercontrolsa.com/api/api_loc.php?imei=${id}&dt=${time}&lat=${x}&lng=${y}&altitude=${z}&angle=${c}&speed=${s}&loc_valid=${netconn}&params=batp=${batery_backup}|acc=${ignition}|accv=${pwr_ext ?? 0}|odo=${odometro}|gsmlev=${100}|&event=ok`
    });
  });
  return deviceInfoList;  
}
