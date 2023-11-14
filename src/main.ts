import { connectToMongoDB, findURL, shortenURL } from "./mod.ts";
import { Application, Context, loadEnvFile, Router } from "./deps.ts";

await loadEnvFile({ export: true });
await connectToMongoDB({ database: "test", collection: "urls" });

const app = new Application();
const router = new Router();

router.get("/", (ctx: Context) => {
  ctx.response.status = 400;
  ctx.response.body =
    "Hey Yo! gimme something dude! I don't have a crystal ball 😠";
});

router.get("/:hash", findURL);
router.post("/", shortenURL);

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: 6969 });
