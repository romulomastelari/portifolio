const fs   = require('fs');
const path = require('path');

const {
    EMAILJS_SERVICE_ID:  serviceId,
    EMAILJS_TEMPLATE_ID: templateId,
    EMAILJS_PUBLIC_KEY:  publicKey
} = process.env;

if (!serviceId || !templateId || !publicKey) {
    console.error('❌ Missing one of the EMAILJS_* env vars.');
    process.exit(1);
}

const outDir = path.resolve(__dirname, '../environments');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const outFile = path.join(outDir, 'emailjs-keys.ts');
const content = `export const EMAILJS_KEYS = {
  serviceId:  '${serviceId}',
  templateId: '${templateId}',
  publicKey:  '${publicKey}'
};\n`;

fs.writeFileSync(outFile, content);
console.log(`✅ Generated ${outFile}`);
