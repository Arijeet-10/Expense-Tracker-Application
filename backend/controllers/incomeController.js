const User = require("../models/User");
// import { utils } from './../node_modules/cfb/types/index.d';
const Income = require("../models/Income");
const xlsx = require("xlsx");

// Add Income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Income Source
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message : "Income Deleted Successfully "});
    } catch(err){
        res.status(500).json({message : "Server Error "});
    }
};

// Download Income Source
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({userId}).sort({date :-1});
        const data = income.map((item) => ({
            Source : item.source,
            Amount : item.amount,
            Date : item.date
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Income');
    xlsx.writeFile(wb,'income_details.xlsx');
    res.download('income_details.xlsx');
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};
