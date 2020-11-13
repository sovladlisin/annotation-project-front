export const SERVER_URL = 'http://localhost:8000/'

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
    console.log(tree)
    return tree;

}