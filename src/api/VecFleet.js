// services/GpsService.js
import axios from 'axios';

const BASE_URL_VEC_FLEET = process.env.BASE_URL_VEC_FLEET;  
const TOKEN_VEC_FLEET = process.env.TOKEN_VEC_FLEET;

export class API_VecFleet {
    constructor(  ) {
        this.client = axios.create({
            BASE_URL_VEC_FLEET,
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN_VEC_FLEET}`
            }
        });
    }

    /**
     * POST /gps/avl
     * Envia datos AVL de una unidad
     */
    async sendAvl(data) {
        try {
            const response = await this.client.post('https://api.staging.vecfleet.io/gps/avl', {
                data: data
            });
            return response;
            
        } catch (error) {

            throw this._handleError(error);
        }
    }

    async getToken() {
        try {
            const response = await this.client.post('https://api.staging.vecfleet.io/auth/login', {
                data: {
                        "email": "gafi-test@vecfleet.io",
                        "password": "G4T3s-er56Gn7J"
                    }
            });
            return response;
            
        } catch (error) {

            throw this._handleError(error);
        }
    }

    /**
     * 🔧 Segundo método (placeholder)
     * async otroMetodo(payload) {
     *     return await this.client.post('/gps/otro-endpoint', payload);
     * }
     */

    _handleError(error) {
        console.log(error);
        
        // return {
        //     message: 'Error en petición GPS',
        //     status: error.response?.status,
        //     data: error.response?.data
        // };
    }
}
