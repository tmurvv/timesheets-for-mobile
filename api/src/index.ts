import createServer from "./server";

const PORT = 3050;
const server = createServer()

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
