import wp from './provider';

const users = [];

export const get = async () => {
    if (users.length === 0) {
        users.push(...(await wp.users().perPage(100).get()));
    }
    return users;
}

export const searchByIdWith = (users, query) => users.find(({ id }) => query === id);

// TODO: Improve this hack
export const searchBySlugWith = (users, query) => users.find(({ slug }) => query.toLowerCase().replace('é', 'e') === slug);

export const searchById = async (query) => searchByIdWith(await get(), query);

export const searchBySlug = async (query) => searchBySlugWith(await get(), query);
