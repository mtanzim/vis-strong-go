import { DefinePlugin } from "webpack";

export default {
  webpack(config) {
    config.externals = {
      externals: {
        Plotly: "Plotly",
      },
    };
    config.plugins.push(
      new DefinePlugin({
        __BASE_API__: JSON.stringify(process.env.BASE_API || ""),
      })
    );
  },
};
