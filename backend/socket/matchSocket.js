let waitingUsers = {};

const initializeSocket = (io) => {

  io.on("connection", (socket) => {
   


    console.log("User Connected:", socket.id);

    socket.on("joinMood", (mood) => {

      if (!waitingUsers[mood]) {
        waitingUsers[mood] = [];
      }

      if (waitingUsers[mood].length > 0) {

        const partnerId =
          waitingUsers[mood].shift();

        const roomId =
          `${socket.id}-${partnerId}`;

        socket.join(roomId);

        io.sockets.sockets
          .get(partnerId)
          ?.join(roomId);

        io.to(roomId).emit(
          "matched",
          {
            roomId,
            mood
          }
        );

      } else {

        waitingUsers[mood].push(
          socket.id
        );

        socket.emit(
          "waiting",
          "Waiting for someone with same mood..."
        );
      }

    });

    socket.on(
      "sendMessage",
      ({ roomId, message }) => {

        socket.to(roomId).emit(
          "receiveMessage",
          {
            sender:
              "Anonymous User",
            message
          }
        );

      }
    );
  socket.on("leaveChat", ({ roomId }) => {

    socket.leave(roomId);

    socket.to(roomId).emit(
      "partnerLeft",
      "Your partner left the chat."
    );

  });

    socket.on(
      "disconnect",
      () => {

        console.log(
          "Disconnected:",
          socket.id
        );

      }
    );

  });

};

module.exports = initializeSocket;