/* eslint-disable prettier/prettier */
export default class ApiResponse {
    status: 'ok' | 'error'
    statusCode: number
    message?: string

    constructor(status: 'ok' | 'error', statusCode: number, message?: string) {
        this.status = status,
        this.statusCode = statusCode,
        this.message = message
    }
}