
const dbCatgory = require("../dbSchemas/category");
const dbBanner = require("../dbSchemas/banner");
const getBanners = async (req, res, next) => {
  try {
    const dbResult = await dbBanner.find({});
    res.json({ status: "ok", result: dbResult });
  } catch (error) {
    next(error);
  }
};

const getCatgorys = async (req, res, next) => {
  try {
    const dbResult = await dbCatgory.find({});
    res.json({ status: "ok", result: dbResult });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCatgorys,
  getBanners,
};
