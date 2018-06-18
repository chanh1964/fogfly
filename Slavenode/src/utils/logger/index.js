import colors from "colors";

export default {
    info(...args) {
        console.info(colors.green("[INFO]"), ...args);
    },

    debug(...args) {
        console.log(colors.yellow("[DEBUG]"), ...args);
    },

    error(...args) {
        console.error(colors.red("[ERROR]"), ...args);
    },

};
