import product from "../model/product.js";

export const addProduct = async (req, res, next) => {
  try {
    const singleFile = req.files["thumbnail"]
      ? req.files["thumbnail"][0]
      : null;
    const multipleFiles = req.files["images"] || [];

    const images = [];
    multipleFiles.forEach((image) => {
      images.push("/gallery/" + image.filename);
    });
    // console.log('product::',req.body);

    const obj = {
      title: req.body.title,
      // mainCategory: req.body.mainCategory,
      // subCategory: req.body.subCategory,
      category: req.body.category,
      description: req.body.description,
      productBy: req.body.productBy,
      actual_price: req.body.actual_price,
      selling_price: req.body.selling_price,
      avail_qty: req.body.avail_qty,
      brand: req.body.brand,
      age_group: req.body.age_group,
      discount: req.body.discount,
      thumbnail: "/gallery/" + singleFile.filename,
      images: images,

      no_of_pieces: req.body.no_of_pieces,
      assembly_req: req.body.assembly_req,
      scale: req.body.scale,
      battery_req: req.body.battery_req,
      battery_incl: req.body.battery_incl,
      material_type: req.body.material_type,
      remote_control: req.body.remote_control,
      colour: req.body.colour,
      prod_dimensions: req.body.prod_dimensions,
      manufacturer_recommend_age: req.body.manufacturer_recommend_age,
      manufacturer_name: req.body.manufacturer_name,
      item_weight: req.body.item_weight,
      net_qty: req.body.net_qty,
      packer: req.body.packer,
      isFavourite: req.body.isFavourite,
    };

    const result = await new product(obj).save();
    res.status(200).json({ msg: "Product Added" });
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const result = await product.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const result = await product.findById({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const result = await product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "Product Updated successfully..." });
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const result = await product.findByIdAndDelete(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json({ msg: "Product Deleted successfully..." });
  } catch (error) {
    console.log(error);
  }
};

export const getProductByShop = async (req, res, next) => {
  try {
    const result = await product.find({ productBy: req.params.shop });
    res.status(200).json({ result, count: result.length });
  } catch (error) {
    console.log(error);
  }
};
export const getProductByCategory = async (req, res, next) => {
  try {
    const result = await product.find({
      category: { $regex: `.*${req.params.name}.*`, $options: "i" },
    }); //IGNORE CASE SENSITIVITY
    // const result = await product.find({mainCategory: { $regex: `^${req.params.name}$`, $options: 'i' }})   //IGNORE CASE SENSITIVITY
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
export const getProductBySubCategory = async (req, res, next) => {
  try {
    const result = await product.find({
      subCategory: { $regex: `^${req.params.name}$`, $options: "i" },
    }); //IGNORE CASE SENSITIVITY
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
export const getProductByAllCategory = async (req, res, next) => {
  try {
    const result = await product.find({
      mainCategory: req.params.main,
      subCategory: req.params.sub,
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
export const getProductByName = async (req, res, next) => {
  try {
    const result = await product.find({
      title: { $regex: `.*${req.params.name}.*`, $options: "i" },
    }); //IGNORE CASE SENSITIVITY
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
export const getProductSuggestions = async (req, res) => {
  try {
    const query = req.query.q || "";
    const regex = new RegExp(query, "i");
    const resultProd = await product
      .find(
        { title: { $regex: regex } },
        { title: 1 } // only fetch title to keep it light
      )
      .limit(10); // limit to top 10 suggestions

    const resultCat = await product
      .find(
        { category: { $regex: regex } },
        { category: 1, title: 1 } // return title also for UI
      )
      .limit(10);

    // Merge and deduplicate by _id
    const mergedResults = [...resultProd, ...resultCat];
    const uniqueResults = Array.from(
      new Map(mergedResults.map((item) => [item._id.toString(), item])).values()
    );

    res.status(200).json(uniqueResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch suggestions" });
  }
};
export const filter = async (req, res, next) => {
  try {
    const { ageGroups, brands, categories, priceMin, priceMax, discount } =
      req.query;
console.log('Filter query params:', brands);

    const query = {};

    if (ageGroups) {
      const ages = Array.isArray(ageGroups) ? ageGroups : [ageGroups];
      query.age_group = { $in: ages };
    }

    if (brands) {
      const brandList = Array.isArray(brands) ? brands : [brands];
      query.brand = { $in: brandList };
    }

    if (categories) {
      const catList = Array.isArray(categories) ? categories : [categories];
      query.category = { $in: catList };
    }
    if (discount) {
      const discList = Array.isArray(discount) ? discount : [discount];
      const minDiscount = Math.min(
        ...discList.map(Number).filter((n) => !isNaN(n))
      );

      if (!isNaN(minDiscount)) {
        query.discount = { $gte: minDiscount };
      }
    }

    if (priceMin || priceMax) {
      query.selling_price = {};
      if (priceMin) query.selling_price.$gte = parseInt(priceMin);
      if (priceMax) query.selling_price.$lte = parseInt(priceMax);
    }
    console.log('query:', query);
    
    const products = await product.find(query);
    
    res.json(products);
  } catch (err) {
    console.error("Filter API error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
