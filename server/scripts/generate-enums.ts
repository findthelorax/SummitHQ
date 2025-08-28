import pkg from '@prisma/sdk';
const { getDMMF } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMA_PATH = path.resolve(__dirname, '../prisma/schema.prisma');
const ENUMS_OUTPUT_PATH = path.resolve(__dirname, '../../client/src/types/generated-enums.ts');
const TYPES_OUTPUT_PATH = path.resolve(__dirname, '../../client/src/types/index.ts');

function toEnumKey(key: string) {
	return key.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}

function escapeLabel(label: string) {
	return label.replace(/"/g, '\\"');
}

function prismaTypeToTs(type: string) {
	switch (type) {
		case 'String':
			return 'string';
		case 'Int':
			return 'number';
		case 'Float':
			return 'number';
		case 'Boolean':
			return 'boolean';
		case 'DateTime':
			return 'string';
		case 'Decimal':
			return 'number';
		default:
			return type; // Enum or relation
	}
}

function isScalar(type: string) {
	return ['String', 'Int', 'Float', 'Boolean', 'DateTime', 'Decimal'].includes(type);
}

function isEnum(type: string, enums: string[]) {
	return enums.includes(type);
}

function isRelation(field: { relationName?: string; kind?: string }, model: any) {
	return field.relationName || field.kind === 'object';
}

(async () => {
	const dmmf = await getDMMF({ datamodel: fs.readFileSync(SCHEMA_PATH, 'utf8') });

	// --- ENUMS & LABELS ---
	let enumsFile = `// AUTO-GENERATED FILE. DO NOT EDIT.\n// Run server/scripts/generate-types.ts to update.\n\n`;

	for (const en of dmmf.datamodel.enums) {
		enumsFile += `export enum ${en.name} {\n`;
		for (const value of en.values) {
			enumsFile += `  ${toEnumKey(value.name)} = "${value.name}",\n`;
		}
		enumsFile += `}\n\n`;

		enumsFile += `export const ${en.name}_LABELS: Record<${en.name}, string> = {\n`;
		for (const value of en.values) {
			const label =
				value.dbName ||
				value.name
					.toLowerCase()
					.replace(/_/g, ' ')
					.replace(/\b\w/g, (l) => l.toUpperCase());
			enumsFile += `  [${en.name}.${toEnumKey(value.name)}]: "${escapeLabel(label)}",\n`;
		}
		enumsFile += `};\n\n`;
	}

	// --- Add helper functions ---
	enumsFile += `
        // Generic fallback formatter
        export function defaultEnumLabel(value: string) {
            return value.charAt(0) + value.slice(1).toLowerCase().replace(/_/g, ' ');
        }

        // Generic helper to get label for any enum value
        export function getEnumLabel<T extends string>(value: T, labelMap: Record<T, string>): string {
            return labelMap[value] ?? defaultEnumLabel(value);
        }

        // Helper to generate options for selects
        export function enumToOptions<T extends string>(enumObj: Record<string, T>, labelMap: Record<T, string>) {
            return Object.values(enumObj).map((value) => ({
                value,
                label: getEnumLabel(value, labelMap),
            }));
        }
    `;

	fs.writeFileSync(ENUMS_OUTPUT_PATH, enumsFile, 'utf8');
	console.log(`✅ Generated enums and labels to ${ENUMS_OUTPUT_PATH}`);

	// --- DTOs, Full, WithLocation ---
	const allEnums = dmmf.datamodel.enums.map((e) => e.name);
	let typesFile = `// AUTO-GENERATED FILE. DO NOT EDIT.\n// Run server/scripts/generate-types.ts to update.\n\n`;
	typesFile += `import {\n  ${allEnums.join(',\n  ')}\n} from './generated-enums';\n\n`;

	// Collect DTOs for later use in Full/WithLocation
	const modelMap: { [key: string]: (typeof dmmf.datamodel.models)[0] } = {};
	for (const model of dmmf.datamodel.models) {
		modelMap[model.name] = model;
	}

	// --- DTO interfaces ---
	for (const model of dmmf.datamodel.models) {
		typesFile += `export interface ${model.name}DTO {\n`;
		for (const field of model.fields) {
			let tsType = '';
			if (isScalar(field.type)) {
				tsType = prismaTypeToTs(field.type);
			} else if (isEnum(field.type, allEnums)) {
				tsType = field.type;
			} else if (field.isList) {
				// Relation array
				tsType = `${field.type}DTO[]`;
			} else if (isRelation(field, model)) {
				// Single relation
				tsType = `${field.type}DTO | null`;
			} else {
				tsType = 'any';
			}
			if (field.isList) {
				// already handled above
			} else if (field.isRequired === false || field.isNullable) {
				tsType += ' | null';
			}
			typesFile += `  ${field.name}${field.isRequired === false || field.isNullable ? '?' : ''}: ${tsType};\n`;
		}
		typesFile += `}\n\n`;
	}

	// --- Full types ---
	for (const model of dmmf.datamodel.models) {
		// Full = DTO + all relations as DTO/DTO[]
		let fullFields = '';
		for (const field of model.fields) {
			if (!isScalar(field.type) && !isEnum(field.type, allEnums)) {
				if (field.isList) {
					fullFields += `  ${field.name}: ${field.type}DTO[];\n`;
				} else {
					fullFields += `  ${field.name}: ${field.type}DTO | null;\n`;
				}
			}
		}
		if (fullFields) {
			typesFile += `export type ${model.name}Full = ${model.name}DTO & {\n${fullFields}};\n\n`;
		}
	}

	// --- WithLocation types ---
	for (const model of dmmf.datamodel.models) {
		if (model.fields.some((f) => f.name === 'location')) {
			typesFile += `export type ${model.name}WithLocation = ${model.name}DTO & {\n  location?: LocationDTO | null;\n};\n\n`;
		}
	}

	fs.writeFileSync(TYPES_OUTPUT_PATH, typesFile, 'utf8');
	console.log(`✅ Generated DTOs, Full, and WithLocation types to ${TYPES_OUTPUT_PATH}`);
})();
