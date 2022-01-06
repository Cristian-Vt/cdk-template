var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// index.ts
__markAsModule(exports);
__export(exports, {
  main: () => main
});
async function main(event) {
  const messages = event.Records.map((record) => {
    const body = JSON.parse(record.body);
    return {subject: body.Subject, message: body.Message};
  });
  console.log("messages ", JSON.stringify(messages, null, 2));
  return {
    body: JSON.stringify({messages}),
    statusCode: 2e3
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
