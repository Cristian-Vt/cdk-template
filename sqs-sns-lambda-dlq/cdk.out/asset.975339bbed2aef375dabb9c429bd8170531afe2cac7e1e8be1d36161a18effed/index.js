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
  throw new Error("throwing an Error \u{1F4A5}");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
