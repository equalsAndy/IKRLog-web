import {
    toggleTask_service_api,
    updateTask_service_api,
    removeTask_service_api,
    addTask_service_api,
    getDay_service_api,
    addHabitsToDay_service_api,
    authenticate_service_api,
    addHabit_service_api,
    getUserHabits_service_api
} from './config';




const authenticateUser = function (callData, dataHandler, errorHandler) {
    callRPC(authenticate_service_api, callData, dataHandler, errorHandler)
};


const getDay = function (callData, dataHandler, errorHandler) {
    callRPC(getDay_service_api, callData, dataHandler, errorHandler)
};

const addHabitsToDay = function (callData, dataHandler, errorHandler) {
    callRPC(addHabitsToDay_service_api, callData, dataHandler, errorHandler)
};


const toggleTask = function (callData, dataHandler, errorHandler) {
    callRPC(toggleTask_service_api, callData, dataHandler, errorHandler)
};

const updateTask = function (callData, dataHandler, errorHandler) {
    callRPC(updateTask_service_api, callData, dataHandler, errorHandler)
};

const removeTask = function (callData, dataHandler, errorHandler) {
    callRPC(removeTask_service_api, callData, dataHandler, errorHandler)
};

const addTask = function (callData, dataHandler, errorHandler) {
    callRPC(addTask_service_api, callData, dataHandler, errorHandler)
};


const addHabit = function (callData, dataHandler, errorHandler) {
    callRPC(addHabit_service_api, callData, dataHandler, errorHandler)
};

const getUserHabits = function (callData, dataHandler, errorHandler) {
    callRPC(getUserHabits_service_api, callData, dataHandler, errorHandler)
};




/*************** The generic RPC caller ******************/


const callRPC = function (url, inputParams, dataHandler, errorHandler) {

    let notifyHeader = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log("Calling - " + url);

    //build body object

    fetch(url,
        {
            method: 'POST',
            headers: notifyHeader.headers,
            body: JSON.stringify(inputParams)
        })
        .then(function (response) {
            if (response.status >= 400) {
                console.log("ERROR: Failure Message Returned: Status " + response.status);
            }
            return response.json();
        })
        .then(function (jsonData) {
           // console.log("Response from " + url + ": " + JSON.stringify(jsonData));
            let respSuccess = jsonData.success;

            // Check For Error Case in Response: => success = false
            if (respSuccess === false) {
                let errorMessage = jsonData.error;
                console.log("ERROR Message: " + errorMessage);
                if (!!errorHandler) {
                    return errorHandler(errorMessage)
                } else {
                    throw new Error(errorMessage);
                }
            } else {
                dataHandler(jsonData);
            }
        })
        .catch(function (ex) {
            console.error('Failed to  connect to ' + url, ex)
        });
}

export {
    authenticateUser,
    getDay,
    addHabitsToDay,
    toggleTask,
    updateTask,
    removeTask,
    addTask,
    addHabit,
    getUserHabits

};
