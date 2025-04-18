export default async function updateUser(params) {
    const url = `/api/update-user`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    };
    const res = await fetch(url, options)
    return res
}