// Description:
//   家で家電操作する
//
"use strict"

const irkitServer = process.env.IRKIT_SERVER;
const config = require("config");

function requestToIrkit(robot, msg, json) {
    const req  = msg.http(`${irkitServer}/messages`)
    .header("X-Requested-With", "hubot")
    .post(json)

    req((err, res, body) => {
        if (err) {
            robot.logger.error(err);
            robot.logger.error(res);
            robot.logger.error(body);
            msg.send(err)
        }
        const headers = res.headers;
        msg.send(Object.keys(headers).map((k) => k + ":" + headers[k]).join("\n"));
    });
}

module.exports = (robot) => {
    robot.respond(/AIR ON/i, (msg) => {
        const json = JSON.stringify(config.aircon.on);
        return requestToIrkit(robot, msg, json);
    });

    robot.respond(/AIR OFF/i, (msg) => {
        const json = JSON.stringify(config.aircon.off);
        return requestToIrkit(robot, msg, json);
    });
};
