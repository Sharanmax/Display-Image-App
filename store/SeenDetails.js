import { action, computed, makeObservable, observable } from "mobx";

class SeenDetails {
    SeenList= []

    constructor(){
        makeObservable(this,{
            SeenList: observable,
            addSeen: action,
            deleteSeen: action,
            count: computed
        })
    }

    addSeen(item){
        this.SeenList= [...this.SeenList,item]
    }

    deleteSeen(id){
        this.SeenList= this.SeenList.filter((item)=>item.id!=id)
    }

    get count(){
        return this.SeenList.length;
    }
}

export const SeenDetailsStore= new SeenDetails();