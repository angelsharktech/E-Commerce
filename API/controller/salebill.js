import salebill from "../model/salebill.js";

export const addSaleBill = async (req, res) => {
    try {
        console.log(req.body);
        const result = await new salebill(req.body).save();

        res.status(201).json({ msg: "Sale Bill added successfully" ,status: "Success",id:result._id });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}
export const getSaleBillById = async (req, res) => {
  try {
    const result = await salebill.findById(req.params.id).populate('products.product_detail');
   res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sale bill', error: err });
  }
};
export const getSaleBill = async (req, res) => {
  try {
    const result = await salebill.find().populate('products.product_detail');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sale bills', error: err });
  }
};