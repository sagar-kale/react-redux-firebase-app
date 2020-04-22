import * as is from "is_js";

const isSafari = () => {
    return is.safari();
}

const getPath = (path) => {
    return path && path.includes('/post/') ? '/post' : '/post';
}

const isLike = (val) => {
    if (val) {
        return val === 'like';
    }
    return false;
}

const newNotifications = (notifications) => {
    if (notifications) {
        return notifications
            .filter((not) => !not.read)
            .map((not) => not.id);
    }
}

export { isSafari, getPath, isLike, newNotifications };