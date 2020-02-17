import {$log, ServerLoader} from "@tsed/common";
import {Server} from "./Server";

// tslint:disable-next-line: typedef
async function bootstrap() {
  try {
    $log.debug("Start server...");
    // tslint:disable-next-line: typedef
    const server = await ServerLoader.bootstrap(Server);


    await server.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();