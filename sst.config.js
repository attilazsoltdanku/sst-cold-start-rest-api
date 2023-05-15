"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExampleStack_1 = require("./stacks/ExampleStack");
exports.default = {
    config(_input) {
        return {
            name: "sst-cold-start-rest-api",
            region: "eu-central-1",
        };
    },
    stacks(app) {
        app.stack(ExampleStack_1.ExampleStack);
    },
};
satisfies;
SSTConfig;
