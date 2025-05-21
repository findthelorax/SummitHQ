import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INPUT = path.join(__dirname, '../src/generated/enums/enums.d.ts');
const OUTPUT = path.join(__dirname, '../src/generated/enums/enums.ts');

// Ensure output directory exists
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });

if (!fs.existsSync(INPUT)) {
    console.error(`Input file not found: ${INPUT}`);
    process.exit(1);
}

const dts = fs.readFileSync(INPUT, 'utf8');

// Extract all exported enums and types
const enumRegex = /export enum [\w]+\s*\{[\s\S]+?\}/g;
const typeRegex = /export type [\w\W]+?;/g;

let result = '';
let match;

// Copy all enums
while ((match = enumRegex.exec(dts)) !== null) {
    result += match[0] + '\n\n';
}

// Copy all types
while ((match = typeRegex.exec(dts)) !== null) {
    result += match[0] + '\n\n';
}

// Add a file header
result = `// AUTO-GENERATED FROM enums.d.ts. DO NOT EDIT MANUALLY.\n\n${result}`;

fs.writeFileSync(OUTPUT, result, 'utf8');
console.log('Generated enums.ts from enums.d.ts');