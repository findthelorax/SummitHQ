import pkg from '@prisma/sdk';
const { getDMMF } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMA_PATH = path.resolve(__dirname, '../prisma/schema.prisma');
const OUTPUT_PATH = path.resolve(__dirname, '../../client/src/types/generated-enums.ts');
function toEnumKey(key: string) {
	// Convert to UPPER_SNAKE_CASE for TS enum keys
	return key.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}

function escapeLabel(label: string) {
	return label.replace(/"/g, '\\"');
}

(async () => {
	const dmmf = await getDMMF({ datamodel: fs.readFileSync(SCHEMA_PATH, 'utf8') });
	let file = `// AUTO-GENERATED FILE. DO NOT EDIT.\n// Run scripts/generate-enums.ts to update.\n\n`;

	for (const en of dmmf.datamodel.enums) {
		// TypeScript Enum
		file += `export enum ${en.name} {\n`;
		for (const value of en.values) {
			file += `  ${toEnumKey(value.name)} = "${value.name}",\n`;
		}
		file += `}\n\n`;

		// Label Map
		file += `export const ${en.name}_LABELS: Record<${en.name}, string> = {\n`;
		for (const value of en.values) {
			const label =
				value.dbName ||
				value.name
					.toLowerCase()
					.replace(/_/g, ' ')
					.replace(/\b\w/g, (l) => l.toUpperCase());
			file += `  [${en.name}.${toEnumKey(value.name)}]: "${escapeLabel(label)}",\n`;
		}
		file += `};\n\n`;
	}

	fs.writeFileSync(OUTPUT_PATH, file, 'utf8');
	console.log(`✅ Generated enums and labels to ${OUTPUT_PATH}`);
})();
