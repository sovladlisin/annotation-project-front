import { TAlert } from './actions/alerts/types'
import { TClass, TClassAttribute } from './actions/models/classes/types'
import { TCorpus } from './actions/models/corpuses/types'

// export const SERVER_URL = 'http://localhost:8000/'
export const SERVER_URL = 'https://annotation-project-backend.herokuapp.com/'

export type TPin = {
    model_name: string,
    model_pk: number,
    name: string
}

export const buildTree = (data) => {
    var arr = []
    data.forEach(element => {
        arr.push({ id: element.id, parentid: element.parent, name: element.name })
    });

    var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for (var i = 0, len = arr.length; i < len; i++) {
        arrElem = arr[i];
        mappedArr[arrElem.id] = arrElem;
        mappedArr[arrElem.id]['children'] = [];
    }


    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            // If the element is not at the root level, add it to its parent array of children.
            if (mappedElem.parentid) {
                mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
            }
            // If the element is at the root level, add it to first level elements array.
            else {
                tree.push(mappedElem);
            }
        }
    }
    return tree;

}


export const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}


export const utilsGetClassAttributes = (class_id: number, class_attributes: TClassAttribute[], classes: TClass[], result: TClassAttribute[] = []) => {
    result = result.concat(class_attributes.filter(attr => attr.related_class === class_id))
    var parent: number = classes.find(c => c.id === class_id).parent
    if (parent === null)
        return result
    return utilsGetClassAttributes(parent, class_attributes, classes, result)
}


export const getColorForModel = (model: string): string => {
    switch (model) {
        case 'object':
            return '#ffba93'
        case 'place':
            return '#9f5f80'
        case 'author':
            return '#583d72'
        case 'class':
            return '#ff8e71'
        case 'corpus':
            return '#34626c'
        case 'resource':
            return '#ff6766'

        default:
            return 'white';
    }
}

export const handleError = (err): TAlert => {
    var message = ''
    if (err.response) {
        switch (err.response.status) {
            case 401:
                message = 'Ошибка авторизации. Пожалуйста, войдите в систему'
                break;

            case 500:
                message = 'Ошибка сервера, обновите страницу и попробуйте операцию снова'
                break;

            default:
                message = err.response.data.detail
                break;
        }
    }
    return { type: err.response.status, message }
}

export const getPrimeCorpusParent = (corpus_id: number, corpuses: TCorpus[]): number => {
    const current = corpuses.find(c => c.id == corpus_id)
    if (current.parent === null) return current.id
    return getPrimeCorpusParent(current.parent, corpuses)
}