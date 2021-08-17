const { join } = require("path");
const { config } = require("./src/config");

exports.createOpenGraphImage = (createPage, options) => {
  config.init(options)
  const { defaultSize, componentGenerationDir, defaultWaitCondition } = config.getConfig();
  const { path, component, context } = options;

  const size = { ...defaultSize, ...(options.size || {}) };
  const waitCondition = options.waitCondition ? options.waitCondition : defaultWaitCondition;
  const componentPath = join(componentGenerationDir, encodeURIComponent(path.split("/").join("")));
  const imgPath = join("public", path);

  const generationContext = { componentPath, imgPath, size, waitCondition };
  const ogImageMetaData = { path, size, __ogImageGenerationContext: generationContext };

  createPage({
    path: componentPath,
    component: component,
    context: {
      ...context,
      ogImage: ogImageMetaData,
    },
  });

  return ogImageMetaData;
};
