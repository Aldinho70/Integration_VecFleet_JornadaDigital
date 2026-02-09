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
    
    const { nm, id, pos, prms, netconn, lmsg, sens, uid, flds  } = element;
    const { y, x, s, t, c, z } = pos;
    const { p } = lmsg;
    const time = parseDateTime(t); 
    const odometro = prms['mileage']?.v ?? 0; 
    let plate;

    /**
     * Obtener el valor del campo personalizado 'plate'
     */
        for (const key in flds) {
            if (!Object.hasOwn(flds, key)) continue;
            const fld = flds[key];
            if( fld.n == "plates" ){
                plate = fld.v
            }
        }

    deviceInfoList.push ({ 
        imei: uid,
        name: nm,
        plate: plate,
        date: time,
        lat: x,
        lon: y,
        speed : s,
        odometer: odometro,
        direction: 0,
        rpm: 0,
        temperature: 0,
        fuel: 0
    });
  });
  return deviceInfoList;  
}
