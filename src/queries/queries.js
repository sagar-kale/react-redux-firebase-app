
// comment fetch query from db

const commentsQuery = (postId) => ({
    collection: 'comments',
    orderBy: ['createdAt', 'asc'],
    where: ['postId', '==', postId]
});

//users fetch query foorm db

const allUsersQuery = () => ({
    collection: 'users',
    orderBy: ['createdAt', 'desc']
});

// fetching top 5 notificaions 

const notificationsQuery = () => ({
    collection: 'notifications',
    limit: 5,
    orderBy: ['time', 'desc']
});

// fetching top 10 user notifications

const userNotificationsQuery = (handle) => ({
    collection: 'user_notifications',
    where: ['recipient', '==', handle],
    limit: 10,
    orderBy: ['createdAt', 'desc']
});

export { commentsQuery, allUsersQuery, notificationsQuery, userNotificationsQuery };