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
        __STRONG_HELP__: JSON.stringify(
          "https://help.strongapp.io/article/235-export-strong-data"
        ),
        __STRONG_URL__: JSON.stringify("https://www.strong.app/"),
      })
    );
  },
};
