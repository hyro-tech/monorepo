import { flatten } from 'flat';
import fr from './fr';

export function translation(key) {
    const translationTree = flatten(fr);

    return translationTree[key];
}
