import { makeAutoObservable, runInAction } from "mobx";

class NewssStore {
    news = []

    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    getNews = async () => {
        this.isLoading = true
        // const res = await fetchNews()

        runInAction(() => {
            // this.news = res;
            this.isLoading = false
        })
    }
}


export default new NewssStore();