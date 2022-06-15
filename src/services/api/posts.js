import api from './api';

export function create (post, config) {
    return api.post('/post/create', {
        post, config
    });
}