// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-axios';
import type { GetAllActuatorsV1ActuatorsGetData, GetAllActuatorsV1ActuatorsGetResponse, GetAllV1ActuatorsSolenoidGetData, GetAllV1ActuatorsSolenoidGetResponse, GetByIdV1ActuatorsSolenoidActuatorIdGetData, GetByIdV1ActuatorsSolenoidActuatorIdGetResponse, GetByIdV1ActuatorsSolenoidActuatorIdGetError, SetStateV1ActuatorsSolenoidSetPostData, SetStateV1ActuatorsSolenoidSetPostResponse, SetStateV1ActuatorsSolenoidSetPostError, GetAllV1ActuatorsProportionalGetData, GetAllV1ActuatorsProportionalGetResponse, GetByIdV1ActuatorsProportionalActuatorIdGetData, GetByIdV1ActuatorsProportionalActuatorIdGetResponse, GetByIdV1ActuatorsProportionalActuatorIdGetError, SetStateV1ActuatorsProportionalSetPostData, SetStateV1ActuatorsProportionalSetPostResponse, SetStateV1ActuatorsProportionalSetPostError, GetAllV1ActuatorsPumpGetData, GetAllV1ActuatorsPumpGetResponse, GetByIdV1ActuatorsPumpActuatorIdGetData, GetByIdV1ActuatorsPumpActuatorIdGetResponse, GetByIdV1ActuatorsPumpActuatorIdGetError, SetStateV1ActuatorsPumpSetPostData, SetStateV1ActuatorsPumpSetPostResponse, SetStateV1ActuatorsPumpSetPostError, GetAllSensorsV1SensorsGetData, GetAllSensorsV1SensorsGetResponse, GetAllV1SensorsFlowmetersGetData, GetAllV1SensorsFlowmetersGetResponse, GetByIdV1SensorsFlowmetersSensorIdGetData, GetByIdV1SensorsFlowmetersSensorIdGetResponse, GetByIdV1SensorsFlowmetersSensorIdGetError, PostReadingV1SensorsFlowmetersSensorIdReadingPostData, PostReadingV1SensorsFlowmetersSensorIdReadingPostResponse, PostReadingV1SensorsFlowmetersSensorIdReadingPostError, PostSetpointV1SensorsFlowmetersSensorIdSetpointPostData, PostSetpointV1SensorsFlowmetersSensorIdSetpointPostResponse, PostSetpointV1SensorsFlowmetersSensorIdSetpointPostError, GetVersionV1InfoVersionGetData, GetVersionV1InfoVersionGetResponse, AddToQueueV1MissionsFlowQueuePostData, AddToQueueV1MissionsFlowQueuePostError, GetCurrentV1MissionsFlowCurrentGetData, GetCurrentV1MissionsFlowCurrentGetResponse, GetNextV1MissionsFlowNextGetData, GetNextV1MissionsFlowNextGetResponse, GetQueueLengthV1MissionsFlowQueueLengthGetData, GetQueueLengthV1MissionsFlowQueueLengthGetResponse, RootGetData } from './types.gen';

export const client = createClient(createConfig());

/**
 * Get All Actuators
 * Retrieve a list of all actuators, including solenoid valves, proportional valves, and pumps.
 *
 * Returns:
 * List[Union[SolenoidValve, ProportionalValve, Pump]]: A list containing all the actuators.
 */
export const getAllActuatorsV1ActuatorsGet = <ThrowOnError extends boolean = false>(options?: Options<GetAllActuatorsV1ActuatorsGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetAllActuatorsV1ActuatorsGetResponse, unknown, ThrowOnError>({
        url: '/v1/actuators/',
        ...options
    });
};

/**
 * Get All
 * Retrieve all actuators of a specific type.
 *
 * Returns:
 * List[service.item_type]: A list of actuators of the specified type.
 */
export const getAllV1ActuatorsSolenoidGet = <ThrowOnError extends boolean = false>(options?: Options<GetAllV1ActuatorsSolenoidGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetAllV1ActuatorsSolenoidGetResponse, unknown, ThrowOnError>({
        url: '/v1/actuators/solenoid/',
        ...options
    });
};

/**
 * Get By Id
 * Retrieve a specific actuator by its ID.
 *
 * Args:
 * actuator_id (int): The ID of the actuator to retrieve.
 *
 * Returns:
 * service.item_type: The actuator object with the specified ID.
 */
export const getByIdV1ActuatorsSolenoidActuatorIdGet = <ThrowOnError extends boolean = false>(options: Options<GetByIdV1ActuatorsSolenoidActuatorIdGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetByIdV1ActuatorsSolenoidActuatorIdGetResponse, GetByIdV1ActuatorsSolenoidActuatorIdGetError, ThrowOnError>({
        url: '/v1/actuators/solenoid/{actuator_id}',
        ...options
    });
};

/**
 * Set State
 * Set the state of a specific actuator.
 *
 * Args:
 * actuator (service.item_type): The actuator object with the state to be set.
 *
 * Returns:
 * service.item_type: The actuator object after its state has been updated.
 */
export const setStateV1ActuatorsSolenoidSetPost = <ThrowOnError extends boolean = false>(options: Options<SetStateV1ActuatorsSolenoidSetPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<SetStateV1ActuatorsSolenoidSetPostResponse, SetStateV1ActuatorsSolenoidSetPostError, ThrowOnError>({
        url: '/v1/actuators/solenoid/set',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get All
 * Retrieve all actuators of a specific type.
 *
 * Returns:
 * List[service.item_type]: A list of actuators of the specified type.
 */
export const getAllV1ActuatorsProportionalGet = <ThrowOnError extends boolean = false>(options?: Options<GetAllV1ActuatorsProportionalGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetAllV1ActuatorsProportionalGetResponse, unknown, ThrowOnError>({
        url: '/v1/actuators/proportional/',
        ...options
    });
};

/**
 * Get By Id
 * Retrieve a specific actuator by its ID.
 *
 * Args:
 * actuator_id (int): The ID of the actuator to retrieve.
 *
 * Returns:
 * service.item_type: The actuator object with the specified ID.
 */
export const getByIdV1ActuatorsProportionalActuatorIdGet = <ThrowOnError extends boolean = false>(options: Options<GetByIdV1ActuatorsProportionalActuatorIdGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetByIdV1ActuatorsProportionalActuatorIdGetResponse, GetByIdV1ActuatorsProportionalActuatorIdGetError, ThrowOnError>({
        url: '/v1/actuators/proportional/{actuator_id}',
        ...options
    });
};

/**
 * Set State
 * Set the state of a specific actuator.
 *
 * Args:
 * actuator (service.item_type): The actuator object with the state to be set.
 *
 * Returns:
 * service.item_type: The actuator object after its state has been updated.
 */
export const setStateV1ActuatorsProportionalSetPost = <ThrowOnError extends boolean = false>(options: Options<SetStateV1ActuatorsProportionalSetPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<SetStateV1ActuatorsProportionalSetPostResponse, SetStateV1ActuatorsProportionalSetPostError, ThrowOnError>({
        url: '/v1/actuators/proportional/set',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get All
 * Retrieve all actuators of a specific type.
 *
 * Returns:
 * List[service.item_type]: A list of actuators of the specified type.
 */
export const getAllV1ActuatorsPumpGet = <ThrowOnError extends boolean = false>(options?: Options<GetAllV1ActuatorsPumpGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetAllV1ActuatorsPumpGetResponse, unknown, ThrowOnError>({
        url: '/v1/actuators/pump/',
        ...options
    });
};

/**
 * Get By Id
 * Retrieve a specific actuator by its ID.
 *
 * Args:
 * actuator_id (int): The ID of the actuator to retrieve.
 *
 * Returns:
 * service.item_type: The actuator object with the specified ID.
 */
export const getByIdV1ActuatorsPumpActuatorIdGet = <ThrowOnError extends boolean = false>(options: Options<GetByIdV1ActuatorsPumpActuatorIdGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetByIdV1ActuatorsPumpActuatorIdGetResponse, GetByIdV1ActuatorsPumpActuatorIdGetError, ThrowOnError>({
        url: '/v1/actuators/pump/{actuator_id}',
        ...options
    });
};

/**
 * Set State
 * Set the state of a specific actuator.
 *
 * Args:
 * actuator (service.item_type): The actuator object with the state to be set.
 *
 * Returns:
 * service.item_type: The actuator object after its state has been updated.
 */
export const setStateV1ActuatorsPumpSetPost = <ThrowOnError extends boolean = false>(options: Options<SetStateV1ActuatorsPumpSetPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<SetStateV1ActuatorsPumpSetPostResponse, SetStateV1ActuatorsPumpSetPostError, ThrowOnError>({
        url: '/v1/actuators/pump/set',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get All Sensors
 * Retrieve a list of all sensors, including flowmeters.
 *
 * Returns:
 * List[Union[Flowmeter]]: A list containing all the sensors.
 */
export const getAllSensorsV1SensorsGet = <ThrowOnError extends boolean = false>(options?: Options<GetAllSensorsV1SensorsGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetAllSensorsV1SensorsGetResponse, unknown, ThrowOnError>({
        url: '/v1/sensors/',
        ...options
    });
};

/**
 * Get All
 * Retrieve all sensors of a specific type.
 *
 * Returns:
 * List[self.service.item_type]: A list of sensors of the specified type.
 */
export const getAllV1SensorsFlowmetersGet = <ThrowOnError extends boolean = false>(options?: Options<GetAllV1SensorsFlowmetersGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetAllV1SensorsFlowmetersGetResponse, unknown, ThrowOnError>({
        url: '/v1/sensors/flowmeters/',
        ...options
    });
};

/**
 * Get By Id
 * Retrieve a specific sensor by its ID.
 *
 * Args:
 * sensor_id (int): The ID of the sensor to retrieve.
 *
 * Returns:
 * self.service.item_type: The sensor object with the specified ID.
 */
export const getByIdV1SensorsFlowmetersSensorIdGet = <ThrowOnError extends boolean = false>(options: Options<GetByIdV1SensorsFlowmetersSensorIdGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetByIdV1SensorsFlowmetersSensorIdGetResponse, GetByIdV1SensorsFlowmetersSensorIdGetError, ThrowOnError>({
        url: '/v1/sensors/flowmeters/{sensor_id}',
        ...options
    });
};

/**
 * Post Reading
 * Post a new reading for a specific sensor.
 *
 * Args:
 * sensor_id (int): The ID of the sensor.
 * reading (SensorReading): The new reading to update.
 *
 * Returns:
 * self.service.item_type: The updated sensor object.
 */
export const postReadingV1SensorsFlowmetersSensorIdReadingPost = <ThrowOnError extends boolean = false>(options: Options<PostReadingV1SensorsFlowmetersSensorIdReadingPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostReadingV1SensorsFlowmetersSensorIdReadingPostResponse, PostReadingV1SensorsFlowmetersSensorIdReadingPostError, ThrowOnError>({
        url: '/v1/sensors/flowmeters/{sensor_id}/reading',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Post Setpoint
 */
export const postSetpointV1SensorsFlowmetersSensorIdSetpointPost = <ThrowOnError extends boolean = false>(options: Options<PostSetpointV1SensorsFlowmetersSensorIdSetpointPostData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostSetpointV1SensorsFlowmetersSensorIdSetpointPostResponse, PostSetpointV1SensorsFlowmetersSensorIdSetpointPostError, ThrowOnError>({
        url: '/v1/sensors/flowmeters/{sensor_id}/setpoint',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get Version
 * **Summary**
 *
 * Retrieves the current version information of the application.
 *
 * **Parameters**
 *
 * None
 *
 * **Returns**
 *
 * str
 * The version information of the application, as defined in `settings.VERSION`.
 *
 * **Notes**
 *
 * This endpoint provides a simple way to determine the version of the API.
 * The version information is sourced from the application's settings.
 *
 * **Examples**
 *
 * >>> response = get_version()
 * >>> print(response)
 * # Output: <current_version_string> (e.g., "1.2.3")
 */
export const getVersionV1InfoVersionGet = <ThrowOnError extends boolean = false>(options?: Options<GetVersionV1InfoVersionGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetVersionV1InfoVersionGetResponse, unknown, ThrowOnError>({
        url: '/v1/info/version',
        ...options
    });
};

/**
 * Add To Queue
 * Add a new mission to the queue.
 */
export const addToQueueV1MissionsFlowQueuePost = <ThrowOnError extends boolean = false>(options: Options<AddToQueueV1MissionsFlowQueuePostData, ThrowOnError>) => {
    return (options?.client ?? client).post<unknown, AddToQueueV1MissionsFlowQueuePostError, ThrowOnError>({
        url: '/v1/missions/flow/queue',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

/**
 * Get Current
 * Get the currently executing mission.
 */
export const getCurrentV1MissionsFlowCurrentGet = <ThrowOnError extends boolean = false>(options?: Options<GetCurrentV1MissionsFlowCurrentGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetCurrentV1MissionsFlowCurrentGetResponse, unknown, ThrowOnError>({
        url: '/v1/missions/flow/current',
        ...options
    });
};

/**
 * Get Next
 * Get the next mission in the queue.
 */
export const getNextV1MissionsFlowNextGet = <ThrowOnError extends boolean = false>(options?: Options<GetNextV1MissionsFlowNextGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetNextV1MissionsFlowNextGetResponse, unknown, ThrowOnError>({
        url: '/v1/missions/flow/next',
        ...options
    });
};

/**
 * Get Queue Length
 * Get the current length of the mission queue.
 */
export const getQueueLengthV1MissionsFlowQueueLengthGet = <ThrowOnError extends boolean = false>(options?: Options<GetQueueLengthV1MissionsFlowQueueLengthGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetQueueLengthV1MissionsFlowQueueLengthGetResponse, unknown, ThrowOnError>({
        url: '/v1/missions/flow/queue/length',
        ...options
    });
};

/**
 * Root
 * Returns a simple greeting message.
 *
 * Returns:
 * dict: A dictionary containing a single key-value pair with the message.
 */
export const rootGet = <ThrowOnError extends boolean = false>(options?: Options<RootGetData, ThrowOnError>) => {
    return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
        url: '/',
        ...options
    });
};