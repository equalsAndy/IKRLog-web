require('dotenv').config();  //instantiate environment variables

let CONFIG = {}; //Make this global to use all over the application

CONFIG.fq_api_v1=process.env.REACT_APP_4q_API_V1 || "http://localhost:4000/v1";
CONFIG.login_redirect_uri=process.env.REACT_APP_login_redirect_uri || "http://localhost:3000/home";


//APP Service Calls
CONFIG.addUser_service_api = CONFIG.fq_api_v1 + "/addUser"  || "http://localhost:4000/v1/addUser";
CONFIG.getUserById_service_api = CONFIG.fq_api_v1 + "/getUserById"  || "http://localhost:4000/v1/getUserById";
CONFIG.authenticate_service_api = CONFIG.fq_api_v1 + "/authenticate"|| "http://localhost:4000/v1/authenticate";
CONFIG.getDay_service_api = CONFIG.fq_api_v1 + "/getDay"|| "http://localhost:4000/v1/getDay";
CONFIG.addHabitsToDay_service_api = CONFIG.fq_api_v1 + "/addHabitsToDay"|| "http://localhost:4000/v1/addHabitsToDay";
CONFIG.toggleTask_service_api = CONFIG.fq_api_v1 + "/toggleTask"|| "http://localhost:4000/v1/toggleTask";
CONFIG.updateTask_service_api = CONFIG.fq_api_v1 + "/updateTask"|| "http://localhost:4000/v1/updateTask";
CONFIG.removeTask_service_api = CONFIG.fq_api_v1 + "/removeTask"|| "http://localhost:4000/v1/removeTask";
CONFIG.addTask_service_api = CONFIG.fq_api_v1 + "/addTask"|| "http://localhost:4000/v1/addTask";
CONFIG.addHabit_service_api = CONFIG.fq_api_v1 + "/addHabit"|| "http://localhost:4000/v1/addHabit";
CONFIG.getUserHabits_service_api = CONFIG.fq_api_v1 + "/getUserHabits"|| "http://localhost:4000/v1/getUserHabits";


module.exports = CONFIG;
