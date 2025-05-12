const fs = require('fs');
const path = require('path');

const serviceId  = process.env.EMAILJS_SERVICE_ID;
const templateId = process.env.EMAILJS_TEMPLATE_ID;
const publicKey  = process.env.EMAILJS_PUBLIC_KEY;

if (!serviceId || !templateId || !publicKey) {
    console.error('❌ Variáveis EMAILJS_* não definidas');
    process.exit(1);
}

const content = `export const EMAILJS_KEYS = {
  serviceId:  '${serviceId}',
  templateId: '${templateId}',
  publicKey:  '${publicKey}'
};
`;

fs.writeFileSync(
    path.resolve(__dirname, '../src/environments/emailjs-keys.ts'),
    content
);

console.log('✅ emailjs-keys.ts gerado com sucesso');
