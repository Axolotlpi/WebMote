import { setMany, getMany, delMany, keys } from 'idb-keyval';

let actionCount = 0;

let templateAction = {
    id: 0,
    name: '',
    icon: 'send',
    newWindow: true,
    templateLink: 'www.{name}.com',
    inserts: [
        {
            key: 'name',
            value: 'google'
        }
    ]
}

navigator.storage && navigator.storage.persist && navigator.storage.persist();

// TODO add options to run different types of actions
export const runAction = function({templateLink, newWindow, inserts}) {
    window.open(
        parseLinkTemplate(templateLink, inserts),
        newWindow ? '_blank' : '_top'
    );
};

export const readActionsFromStore = async function(){
    try {
        let currentKeys = await keys();
        return await getMany(currentKeys);
    } catch (error) {
        console.log('Counld not read from database: ', error);
    }
};

export const writeActionsToStore = async function(actions){
    let actionsKeyVal = actions.map(a => [a.id, a]);
    try {
        await setMany(actionsKeyVal);
    } catch (error) {
        console.log('Could not write to database: ', error);
    }
};

export const deleteActionsFromStore = async function(keys){
    try {
        await delMany(keys);
    } catch (error) {
        console.log('Could not delete from database: ', error);
    }
}

export const generateNewAction = function(){
    actionCount++;
    return {...templateAction, id: actionCount};
}

const parseLinkTemplate = function(template, inserts){
    let newLink = template;
    inserts.forEach(insert => {
        let reg = new RegExp(`\{${insert.key}\}`);
        newLink = newLink.replace(reg, insert.value);
    });
    return newLink;
}



