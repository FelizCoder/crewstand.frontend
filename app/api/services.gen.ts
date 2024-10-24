// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-axios';
import type { GetAllV1ActuatorsGetError, GetAllV1ActuatorsGetResponse, GetAllV1ActuatorsSolenoidGetError, GetAllV1ActuatorsSolenoidGetResponse, GetByIdV1ActuatorsSolenoidActuatorIdGetData, GetByIdV1ActuatorsSolenoidActuatorIdGetError, GetByIdV1ActuatorsSolenoidActuatorIdGetResponse, SetStateV1ActuatorsSolenoidSetPostData, SetStateV1ActuatorsSolenoidSetPostError, SetStateV1ActuatorsSolenoidSetPostResponse, GetAllV1ActuatorsProportionalGetError, GetAllV1ActuatorsProportionalGetResponse, GetByIdV1ActuatorsProportionalActuatorIdGetData, GetByIdV1ActuatorsProportionalActuatorIdGetError, GetByIdV1ActuatorsProportionalActuatorIdGetResponse, SetStateV1ActuatorsProportionalSetPostData, SetStateV1ActuatorsProportionalSetPostError, SetStateV1ActuatorsProportionalSetPostResponse, GetAllV1ActuatorsPumpGetError, GetAllV1ActuatorsPumpGetResponse, GetByIdV1ActuatorsPumpActuatorIdGetData, GetByIdV1ActuatorsPumpActuatorIdGetError, GetByIdV1ActuatorsPumpActuatorIdGetResponse, SetStateV1ActuatorsPumpSetPostData, SetStateV1ActuatorsPumpSetPostError, SetStateV1ActuatorsPumpSetPostResponse, RootGetError, RootGetResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * Get All
 */
export const getAllV1ActuatorsGet = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<GetAllV1ActuatorsGetResponse, GetAllV1ActuatorsGetError, ThrowOnError>({
    ...options,
    url: '/v1/actuators/'
}); };

/**
 * Get All
 */
export const getAllV1ActuatorsSolenoidGet = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<GetAllV1ActuatorsSolenoidGetResponse, GetAllV1ActuatorsSolenoidGetError, ThrowOnError>({
    ...options,
    url: '/v1/actuators/solenoid/'
}); };

/**
 * Get By Id
 */
export const getByIdV1ActuatorsSolenoidActuatorIdGet = <ThrowOnError extends boolean = false>(options: Options<GetByIdV1ActuatorsSolenoidActuatorIdGetData, ThrowOnError>) => { return (options?.client ?? client).get<GetByIdV1ActuatorsSolenoidActuatorIdGetResponse, GetByIdV1ActuatorsSolenoidActuatorIdGetError, ThrowOnError>({
    ...options,
    url: '/v1/actuators/solenoid/{actuator_id}'
}); };

/**
 * Set State
 */
export const setStateV1ActuatorsSolenoidSetPost = <ThrowOnError extends boolean = false>(options: Options<SetStateV1ActuatorsSolenoidSetPostData, ThrowOnError>) => { return (options?.client ?? client).post<SetStateV1ActuatorsSolenoidSetPostResponse, SetStateV1ActuatorsSolenoidSetPostError, ThrowOnError>({
    ...options,
    url: '/v1/actuators/solenoid/set'
}); };

/**
 * Get All
 */
export const getAllV1ActuatorsProportionalGet = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<GetAllV1ActuatorsProportionalGetResponse, GetAllV1ActuatorsProportionalGetError, ThrowOnError>({
    ...options,
    url: '/v1/actuators/proportional/'
}); };

/**
 * Get By Id
 */
export const getByIdV1ActuatorsProportionalActuatorIdGet = <ThrowOnError extends boolean = false>(options: Options<GetByIdV1ActuatorsProportionalActuatorIdGetData, ThrowOnError>) => { return (options?.client ?? client).get<GetByIdV1ActuatorsProportionalActuatorIdGetResponse, GetByIdV1ActuatorsProportionalActuatorIdGetError, ThrowOnError>({
    ...options,
    url: '/v1/actuators/proportional/{actuator_id}'
}); };

/**
 * Set State
 */
export const setStateV1ActuatorsProportionalSetPost = <ThrowOnError extends boolean = false>(options: Options<SetStateV1ActuatorsProportionalSetPostData, ThrowOnError>) => { return (options?.client ?? client).post<SetStateV1ActuatorsProportionalSetPostResponse, SetStateV1ActuatorsProportionalSetPostError, ThrowOnError>({
    ...options,
    url: '/v1/actuators/proportional/set'
}); };

/**
 * Get All
 */
export const getAllV1ActuatorsPumpGet = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<GetAllV1ActuatorsPumpGetResponse, GetAllV1ActuatorsPumpGetError, ThrowOnError>({
    ...options,
    url: '/v1/actuators/pump/'
}); };

/**
 * Get By Id
 */
export const getByIdV1ActuatorsPumpActuatorIdGet = <ThrowOnError extends boolean = false>(options: Options<GetByIdV1ActuatorsPumpActuatorIdGetData, ThrowOnError>) => { return (options?.client ?? client).get<GetByIdV1ActuatorsPumpActuatorIdGetResponse, GetByIdV1ActuatorsPumpActuatorIdGetError, ThrowOnError>({
    ...options,
    url: '/v1/actuators/pump/{actuator_id}'
}); };

/**
 * Set State
 */
export const setStateV1ActuatorsPumpSetPost = <ThrowOnError extends boolean = false>(options: Options<SetStateV1ActuatorsPumpSetPostData, ThrowOnError>) => { return (options?.client ?? client).post<SetStateV1ActuatorsPumpSetPostResponse, SetStateV1ActuatorsPumpSetPostError, ThrowOnError>({
    ...options,
    url: '/v1/actuators/pump/set'
}); };

/**
 * Root
 */
export const rootGet = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<RootGetResponse, RootGetError, ThrowOnError>({
    ...options,
    url: '/'
}); };