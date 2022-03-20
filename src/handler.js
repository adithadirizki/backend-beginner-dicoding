class NotesHandler {
  /**
   *
   * @param {import("./services/inMemory/NotesService")} service
   */
  constructor(service) {
    this._service = service;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  /**
   * Add Note Handler
   *
   * @param {import("@hapi/hapi").Request} request
   * @param {import("@hapi/hapi").ResponseToolkit} h
   * @returns
   */
  postNoteHandler(request, h) {
    try {
      const { title = "untitled", body, tags } = request.payload;

      const noteId = this._service.addNote({ title, body, tags });

      const response = h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });

      response.code(400);
      return response;
    }
  }

  /**
   * Get All Notes Handler
   *
   * @param {import("@hapi/hapi").Request} request
   * @param {import("@hapi/hapi").ResponseToolkit} h
   * @returns
   */
  getNotesHandler(request, h) {
    const notes = this._service.getNotes();
    return {
      status: "success",
      data: {
        notes,
      },
    };
  }

  /**
   * Get Note By Id Handler
   *
   * @param {import("@hapi/hapi").Request} request
   * @param {import("@hapi/hapi").ResponseToolkit} h
   * @returns
   */
  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const note = this._service.getNoteById(id);

      return {
        status: "success",
        data: {
          note,
        },
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });

      response.code(404);
      return response;
    }
  }

  /**
   * Edit Note By Id Handler
   *
   * @param {import("@hapi/hapi").Request} request
   * @param {import("@hapi/hapi").ResponseToolkit} h
   * @returns
   */
  putNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;

      this._service.editNoteById(id, request.payload);

      return {
        status: "success",
        message: "Catatan berhasil diperbarui",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });

      response.code(404);
      return response;
    }
  }

  /**
   * Delete Note By Id Handler
   *
   * @param {import("@hapi/hapi").Request} request
   * @param {import("@hapi/hapi").ResponseToolkit} h
   * @returns
   */
  deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteNoteById(id);

      return {
        status: "success",
        message: "Catatan berhasil dihapus",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Catatan gagal dihapus. Id tidak ditemukan",
      });

      response.code(404);
      return response;
    }
  }
}

module.exports = NotesHandler;
