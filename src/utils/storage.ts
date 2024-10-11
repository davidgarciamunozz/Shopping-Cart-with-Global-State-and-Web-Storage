const get = (key: string, defaultValue:any) => {
    const value = localStorage.getItem(key) || sessionStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
}

const set = (key: string, value: string, session: any) => {
    const storage = session ? sessionStorage : localStorage;
    storage.setItem(key, JSON.stringify(value));   
}

export { get, set }