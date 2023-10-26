import { jsPDF } from 'jspdf';

const pdfGenerator = (record) => {
  const { params } = record;
  const doc = new jsPDF();

  doc.text(params.StartUp_Name, 10, 10);
  doc.text(params.Idea_Description, 150, 10);
  doc.text(params.Website, 150, 10);
  // doc.text(params.StartUpLogo.file, 150, 10);
  doc.text(params.Founder_Name, 150, 10); 
  doc.text(params.CoFounder_Name, 150, 10); 
  doc.text(params.Centre_Name, 150, 10);
  doc.text(params.Professor_Name, 150, 10);

  const filename = `/${params.id}.pdf`;
  doc.save(`../PDFs${filename}`);

  return filename;
};

export default pdfGenerator;
