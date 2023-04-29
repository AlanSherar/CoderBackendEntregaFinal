  import parseArgs from "yargs/yargs"

const yargs = parseArgs(process.argv.slice(2))

const { mode, port, debug, dao, _ } = yargs
  .alias({
    m: "mode",
    p: "port",
    d: "debug",
    D: "dao"
  })
  .boolean("debug")
  .default({
    mode: "PROD",
    port: 3000,
    debug: false,
    dao: "MONGO"
  })
  .argv

export const DOT_ENV = {
  PORT: port,
  MODE: mode,
  DEBUG: debug,
  DAO: dao
}
