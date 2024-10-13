// This file is auto-generated by @hey-api/openapi-ts

export const ActuatorEnumSchema = {
    type: 'string',
    enum: ['solenoid valve', 'proportional valve', 'pump'],
    title: 'ActuatorEnum'
} as const;

export const HTTPValidationErrorSchema = {
    properties: {
        detail: {
            items: {
                '$ref': '#/components/schemas/ValidationError'
            },
            type: 'array',
            title: 'Detail'
        }
    },
    type: 'object',
    title: 'HTTPValidationError'
} as const;

export const ProportionalValveSchema = {
    properties: {
        type: {
            '$ref': '#/components/schemas/ActuatorEnum',
            default: 'proportional valve'
        },
        id: {
            type: 'integer',
            title: 'Id'
        },
        position: {
            type: 'integer',
            title: 'Position'
        }
    },
    type: 'object',
    required: ['id', 'position'],
    title: 'ProportionalValve'
} as const;

export const PumpSchema = {
    properties: {
        type: {
            '$ref': '#/components/schemas/ActuatorEnum',
            default: 'pump'
        },
        id: {
            type: 'integer',
            title: 'Id'
        },
        running: {
            type: 'boolean',
            title: 'Running'
        }
    },
    type: 'object',
    required: ['id', 'running'],
    title: 'Pump'
} as const;

export const SolenoidValveSchema = {
    properties: {
        type: {
            '$ref': '#/components/schemas/ActuatorEnum',
            default: 'solenoid valve'
        },
        id: {
            type: 'integer',
            title: 'Id'
        },
        open: {
            type: 'boolean',
            title: 'Open'
        }
    },
    type: 'object',
    required: ['id', 'open'],
    title: 'SolenoidValve'
} as const;

export const ValidationErrorSchema = {
    properties: {
        loc: {
            items: {
                anyOf: [
                    {
                        type: 'string'
                    },
                    {
                        type: 'integer'
                    }
                ]
            },
            type: 'array',
            title: 'Location'
        },
        msg: {
            type: 'string',
            title: 'Message'
        },
        type: {
            type: 'string',
            title: 'Error Type'
        }
    },
    type: 'object',
    required: ['loc', 'msg', 'type'],
    title: 'ValidationError'
} as const;