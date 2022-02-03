import React from "react";


export async function PostCall(token, isNext, posts) {

    let ipAddress = "http://" + window.location.toString().split("://")[1].split(":")[0];
    var getUrl = new URL(ipAddress + ':5050/api/posts/');
    try {
        if (posts !== undefined) {
            getUrl.href += "getchunk"

            if (isNext) {
                console.log(posts)
                if (posts.length == 5) {
                    getUrl.searchParams.append('next', true);
                    getUrl.searchParams.append('id', posts[posts.length - 1].date);
                }
                else {
                    return Promise.reject("Last Posts")
                }

            }
            else {
                getUrl.searchParams.append('id', posts[0].date);
                console.log(posts)
                getUrl.searchParams.append('next', false);
            }

        }

    }
    catch (err) {

    }
    let postRequest = new Request(getUrl, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    });
    let result = await fetch(postRequest);
    let data = await result.text();
    try {
        data = JSON.parse(data)
    }
    catch (err) {
        return Promise.reject("Error with request try to login again!")
    }
    if (data.length == 0 && posts !== undefined)
        return Promise.reject('Earliest Post')
    if (result.status === 401)
        return Promise.reject('Unauthorized')
    else
        return Promise.resolve(data);
}

export async function deleteUser(token) {
    let ipAddress = "http://" + window.location.toString().split("://")[1].split(":")[0];
    var getUrl = new URL(ipAddress + ':5050/api/auth/deleteuser');
    let postRequest = new Request(getUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': token,
        }
    });
    try {
        let result = await fetch(postRequest);
        let data = await result.text();
        return Promise.resolve(data)
    }
    catch (err) {

    }

}