import axios from "axios";


const api = axios.create({
    
    

    //baseURL: 'http://192.168.1.151:3333'

    baseURL: 'https://hopebar-api.onrender.com/'

    //baseURL: 'postgres://hopebar_onbn_user:mueYVPlIYeh2xY3LHF6Ud3P4OcJhk7BW@dpg-chqldsndvk4goetb75v0-a.frankfurt-postgres.render.com/hopebar_onbn'
})

export {api};