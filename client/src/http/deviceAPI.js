import {$autHost, $host} from "./index";
export const createType = async (type) => {
    const {data} = await $autHost.post('api/type', type)
    return data
}
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}
export const updateType = async (id, name) =>{
    const {data} = await $autHost.put(`api/type/${id}`, {id, name})
    return data
}
export const deleteType = async (id) => {
    const {data} = await $autHost.delete(`api/type/${id}`)
    return data
}
export const createBrand = async (brand) => {
    const {data} = await $autHost.post('api/brand', brand)
    return data
}
export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}
export const updateBrand = async (id, name) => {
    const {data} = await $autHost.put(`api/brand/${id}`, {id, name})
    return data
}
export const deleteBrand = async (id) => {
    const {data} = await $autHost.delete(`api/brand/${id}`)
    return data
}
export const createDevice = async (device) => {
    const {data} = await $autHost.post('api/device', device)
    return data
}
export const fetchDevices = async (typeId, brandId, page, limit=5) => {
    const {data} = await $host.get('api/device', {params: {
        typeId, brandId, page, limit
        }})
    return data
}
export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const fetchBrandsByType = async (typeId) => {
    const { data } = await $host.get(`/api/device/${typeId}`);
    return data;
};

export const fetchTypesByBrand = async (brandId) => {
    const { data } = await $host.get(`/api/device/${brandId}`);
    return data;
};
export const updateDevice = async (id, device) => {
    const {data} = await $autHost.put(`api/device/${id}`, device)
    return data
}
export const deleteDevice = async (id) => {
    const {data} = await $autHost.delete(`api/device/${id}`)
    return data
}