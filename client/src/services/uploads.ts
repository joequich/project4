import API from '../config/axios';

const UploadService = {
    uploadSingleFile: (file: File) => {
        const formData = new FormData();
        formData.append('file',file);

        return API.post(`uploads/`, formData, { 
            headers: { 'content-type': 'multipart/form-data'}
        }).then(res => res.data);
    }
}

export default UploadService;