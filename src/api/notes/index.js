const NotesHandler = require("../../handler");
const routes = require("../../routes");

module.exports = {
  name: "notes",
  version: "1.0.0",
  /**
   * API Register
   *
   * @param {import("@hapi/hapi").Server} server
   * @param {Object} options
   * @param {import("../../services/inMemory/NotesService")} options.service
   */
  register: async (server, { service }) => {
    const notesHandler = new NotesHandler(service);
    server.route(routes(notesHandler));
  },
};
