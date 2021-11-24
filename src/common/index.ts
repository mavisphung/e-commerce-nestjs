import defaultConfig from "./default.json";
import merge from "lodash";

// const envConfig = process.env;
// // console.log(envConfig);
const mergeConfig = merge(defaultConfig);
// // console.log(mergeConfig);
export default (): any => mergeConfig;
// export default defaultConfig;