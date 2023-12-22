import next from "next";
var PORT = Number(process.env.PORT) || 3000;
export var nextApp = next({
    dev: process.env.NODE_ENV !== "production",
    port: PORT
});
export var nextHandler = nextApp.getRequestHandler();
