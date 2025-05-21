import { STATUS } from '../../../shared/types/enums.js';

export function mapLiftToSharedEnum(lift: any) {
    return {
        ...lift,
        status: STATUS[lift.status as keyof typeof STATUS] ?? STATUS.UNKNOWN,
    };
}