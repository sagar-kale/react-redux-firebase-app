
// comment fetch query from db

const commentsQuery = (postId) => ({
    collection: 'comments',
    orderBy: ['createdAt', 'desc'],
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

export { commentsQuery, allUsersQuery, notificationsQuery };