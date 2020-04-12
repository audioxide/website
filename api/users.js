import wp from './provider';

const users = [];

export const get = async () => {
    if (users.length === 0) {
        users.push(...(await wp.users().perPage(100).get()));
    }
    return users;
}

// TODO: Improve this hack
export const searchWith = (users, query) => users.find(({ slug }) => query.toLowerCase().replace('é', 'e') === slug);

export const search = async (query) => searchWith(await get(), query);
