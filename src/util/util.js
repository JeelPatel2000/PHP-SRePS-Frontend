export function hasObject(targetProperty, item, list){
    for(let i of list){
        if(i[targetProperty]===item[targetProperty]){
            return true;
        }
    }
    return false;
}

export function findIndex(targetProperty, item, list){
    for(let i in list){
        if(list[i][targetProperty] === item[targetProperty]){
            return i;
        }
    }
    return -1;
}


export function editObjectInList(identificationProperty, targetProperty,item, list){
    let new_list = [...list];
    let i;
    for(i in list){
        if(list[i][identificationProperty] === item[identificationProperty])
        {
            new_list[i][targetProperty]++;
            break;
        }
    }

    return new_list;
}