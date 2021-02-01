type Options = {
    method?: "POST" | "GET" | "UPDATE" | "DELETE";
    headers?: any;
    body?: any;
};

/**
 * 
 * @param url 
 * @param options 
 * @returns 
 * 
 * client function interact with remote endpoint to fetch for the questions of the challenge.
 * it uses javascript fetch. 
 */
export async function client(url: string, options?: Options): Promise<any> {
    options = {
        method: options?.body ? "POST" : "GET",
        ...options || {},

    };

    if (options && options.body) {
        options.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    } catch (error) {
        return Promise.reject(error)
    }
}

client.get = function (url: string) {
    return client(url, { method: 'GET' })
}
