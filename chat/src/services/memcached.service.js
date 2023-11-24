import memjs from "memjs";

class MemcachedService {
    constructor() {
        this.memcached = memjs.Client.create();
    }

    set = async (key, value, options) => {
        return await this.memcached.set(key, JSON.stringify(value), options);
    }

    get = async (key) => {
        const data = await this.memcached.get(key);

        return JSON.parse(data.value);
    }
}

export default MemcachedService;