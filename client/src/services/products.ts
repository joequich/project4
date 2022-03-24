import API from "../config/axios";
import { IProductCrud } from "../interfaces/Products";
import UploadService from "./uploads";

const ProductService = {
    getAll: () => {
        return API.get(`products/`).then(res => res.data);
    },
    getById: (id: string) => {
        return API.get(`products/${id}`).then(res => res.data);
    },
    create: async(data: IProductCrud) => {
        let newData = data;
        if(data.image) {
            await UploadService.uploadSingleFile(data.image).then(res => {
                newData = { ...data, image: res.url} 
            });
        }
        return API.post(`products/`, newData).then(res => res.data);
    },
    updateById: async(id: string, data: IProductCrud) => {
        let newData = data;
        if(data.image) {
            await UploadService.uploadSingleFile(data.image).then(res => {
                newData = { ...data, image: res.url} 
            });
        }
        return API.patch(`products/${id}`, newData).then(res => res.data);
    },
    deleteById: (id: string) => {
        return API.delete(`products/${id}`).then(res => res.data);
    }
}

export default ProductService;