import * as is from "is_js";

const isSafari = () => {
    return is.safari();
}

const getPath = (path) => {
    return path && path.includes('/post/') ? '/post' : '/post';
}

export { isSafari, getPath };