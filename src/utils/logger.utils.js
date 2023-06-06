import winston from "winston";
import { config } from "../config/config.js";

const ENTORNO = config.app.ENTORNO

const customSettings = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "magenta",
        error: "red",
        warning: "yellow",
        info: "blue",
        http: "white",
        debug: "grey",
    },
};

export const logger = winston.createLogger(
    {
        levels: customSettings.levels,
        transports: [
            new winston.transports.Console({
                level: ENTORNO == 'DEV' ? 'debug' : 'info',
                format: winston.format.combine(
                    winston.format.colorize({
                        colors: customSettings.colors
                    }),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: './src/files/errors.log',
                level: 'error',
                format: winston.format.prettyPrint()
            }),
        ]
    }
)