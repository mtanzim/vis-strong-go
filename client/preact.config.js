import { DefinePlugin } from "webpack";

export default {
  webpack(config) {
    config.plugins.push(
      new DefinePlugin({
        __BASE_API__: JSON.stringify(process.env.BASE_API || ""),
      })
    );
  },
};
