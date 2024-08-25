module.exports = {
    apps : [
        {
            name   : "Monica_Schedule_Site",
            script : "npx",
            interpreter: "none",
            args: "serve -p 3000 -s build"
        }
    ]
}