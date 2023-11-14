import { Context, nanoid } from "./deps.ts";
import { database } from "./mod.ts";

export async function findURL(ctx: Context) {
  const { originURL } = await database.findOne({ hash: ctx.params.hash });

  ctx.response.headers.set("Location", originURL);
  ctx.response.status = 302;
}

export async function shortenURL(ctx: Context) {
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = "You didn't give me anything to...";
    return;
  }

  const { originURL } = await ctx.request.body().value;
  if (!originURL) {
    ctx.response.status = 400;
    ctx.response.body = "You didn't give me anything to...";
    return;
  }

  const record = await database.findOne({ originURL });
  if (record) {
    ctx.response.status = 201;
    ctx.response.body = record.shortURL;
    return;
  }

  const hash = nanoid(10);
  await database.insertOne({
    originURL,
    hash,
    shortURL: `${ctx.request.url.href}${hash}`,
  });

  const createdRecord = await database.findOne({ hash });
  ctx.response.status = 201;
  ctx.response.body = createdRecord?.shortURL;
}
