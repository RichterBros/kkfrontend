import {observable} from 'mobx';
import {fetchJson} from "../services/Networking";
import {apiUrl} from "../globals";

class DefaultChoresStore2{
    @observable choreSuggestions;

    loadChoresFromApi =  (idToken) => {
        const chores = fetchJson(apiUrl + '/defaultchores', {
            headers: {
                Authorization: 'Bearer ' + idToken
            }
        });
       
        return this.choreSuggestions = chores;
    }

}

const choresRepository = new DefaultChoresStore2();

export default choresRepository;