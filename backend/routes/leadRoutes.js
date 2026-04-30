import express from "express";
import Lead from "../models/Lead.js";
import ExcelJS from "exceljs";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/", async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

router.get("/export/excel", async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("LUNÉVA Leads");

  sheet.columns = [
    { header: "Name", key: "name", width: 25 },
    { header: "Email", key: "email", width: 30 },
    { header: "Phone", key: "phone", width: 20 },
    { header: "Skin Type", key: "skinType", width: 20 },
    { header: "Concern", key: "concern", width: 30 },
    { header: "Date", key: "createdAt", width: 25 }
  ];

  leads.forEach((lead) => {
    sheet.addRow({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      skinType: lead.skinType,
      concern: lead.concern,
      createdAt: lead.createdAt
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=luneva-leads.xlsx"
  );

  await workbook.xlsx.write(res);
  res.end();
});

export default router;