const requestIp = require('request-ip');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const ExcelJS = require('exceljs');
const filePath = path.resolve(__dirname, '../log.csv')
const dayjs = require('dayjs');
const headers = ['request url', 'client ip', 'request time']
const sheetName = 'Sheet1'
const logMiddleware = async function (req, res, next) {
  const fileExsit = fs.existsSync(filePath)
  const clientIp = requestIp.getClientIp(req);
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const row = [req.url, clientIp, time]
  const workbook = new ExcelJS.Workbook();
  let worksheet
  if (fileExsit) {
    worksheet = await workbook.csv.readFile(filePath, {
      sheetName: sheetName
    });
  } else {
    worksheet = workbook.addWorksheet(sheetName);
    worksheet.addRow(headers);
  }
  worksheet.addRow(row);
  await workbook.csv.writeFile(filePath);
  next();
};
module.exports = logMiddleware